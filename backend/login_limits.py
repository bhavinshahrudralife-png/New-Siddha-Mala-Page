"""Proxy-independent, shared MongoDB account lockouts.

The account key never depends on an ingress-hop IP or untrusted forwarded header.
The implicit unique _id index serializes counters across processes; expiry is also
checked in the update so correctness never depends on MongoDB's TTL sweep timing.
"""
from datetime import datetime, timedelta, timezone
from hashlib import sha256
from math import ceil

from fastapi import HTTPException
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError

WINDOW = timedelta(minutes=15)
MAX_FAILURES = 5


def account_key(email: str) -> str:
    return "account:" + sha256(email.lower().strip().encode()).hexdigest()


def raise_locked(expires_at, now):
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    remaining = max(1, ceil((expires_at - now).total_seconds()))
    raise HTTPException(
        status_code=429,
        detail="Too many failed attempts. Try again in 15 minutes.",
        headers={"Retry-After": str(remaining)},
    )


async def check_lock(db, key):
    now = datetime.now(timezone.utc)
    record = await db.login_attempts.find_one(
        {"_id": key, "expires_at": {"$gt": now}, "count": {"$gte": MAX_FAILURES}},
        {"_id": 0, "expires_at": 1},
    )
    if record:
        raise_locked(record["expires_at"], now)


async def record_failure(db, key):
    now = datetime.now(timezone.utc)
    expired = {"$lte": [{"$ifNull": ["$expires_at", now]}, now]}
    pipeline = [{"$set": {
        "count": {"$cond": [expired, 1, {"$add": [{"$ifNull": ["$count", 0]}, 1]}]},
        "expires_at": {"$cond": [expired, now + WINDOW, "$expires_at"]},
        "updated_at": now,
    }}]
    try:
        record = await db.login_attempts.find_one_and_update(
            {"_id": key}, pipeline, upsert=True, return_document=ReturnDocument.AFTER,
            projection={"_id": 0, "count": 1, "expires_at": 1},
        )
    except DuplicateKeyError:
        # Concurrent first attempts can race at insertion, but must share a counter.
        record = await db.login_attempts.find_one_and_update(
            {"_id": key}, pipeline, return_document=ReturnDocument.AFTER,
            projection={"_id": 0, "count": 1, "expires_at": 1},
        )
    if record and record["count"] > MAX_FAILURES:
        raise_locked(record["expires_at"], now)