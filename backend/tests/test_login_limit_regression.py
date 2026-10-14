import hashlib
import os
import uuid
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone

import pytest
import requests
from dotenv import dotenv_values
from pymongo import MongoClient


# Login-limit + auth regression checks for normalized account-key lockouts.
ENV_PATH = "/app/backend/.env"
env = dotenv_values(ENV_PATH)

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    frontend_env = dotenv_values("/app/frontend/.env")
    BASE_URL = frontend_env.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)
BASE_URL = BASE_URL.rstrip("/")

MONGO_URL = os.environ.get("MONGO_URL") or env.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME") or env.get("DB_NAME")
ADMIN_EMAIL = (os.environ.get("ADMIN_EMAIL") or env.get("ADMIN_EMAIL") or "").strip().strip('"').lower()
ADMIN_PASSWORD = (os.environ.get("ADMIN_PASSWORD") or env.get("ADMIN_PASSWORD") or "").strip().strip('"')

if not MONGO_URL or not DB_NAME:
    pytest.skip("MONGO_URL and DB_NAME are required", allow_module_level=True)

MONGO_URL = str(MONGO_URL).strip().strip('"')
DB_NAME = str(DB_NAME).strip().strip('"')


def account_key(email: str) -> str:
    normalized = email.lower().strip()
    return "account:" + hashlib.sha256(normalized.encode()).hexdigest()


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture
def mongo_db():
    client = MongoClient(MONGO_URL)
    db = client[DB_NAME]
    yield db
    client.close()


@pytest.fixture
def cleanup_login_attempts(mongo_db):
    keys = []
    yield keys
    if keys:
        mongo_db.login_attempts.delete_many({"_id": {"$in": keys}})


def test_lockout_aggregates_casing_whitespace_and_headers(api_client, cleanup_login_attempts):
    email_variants = [
        " test.user.lock@example.com ",
        "TEST.USER.LOCK@EXAMPLE.COM",
        "test.user.lock@example.com",
        " Test.User.Lock@example.com ",
        "test.user.lock@example.com  ",
        "TEST.user.lock@example.com",
    ]
    key = account_key("test.user.lock@example.com")
    cleanup_login_attempts.append(key)

    statuses = []
    retry_after = None
    for idx, email in enumerate(email_variants):
        response = api_client.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": email, "password": "wrong-pass"},
            headers={"X-Forwarded-For": f"203.0.113.{10 + idx}"},
        )
        statuses.append(response.status_code)
        if response.status_code == 429:
            retry_after = response.headers.get("Retry-After")

    assert statuses[:5] == [401, 401, 401, 401, 401]
    assert statuses[5] == 429
    assert retry_after is not None
    assert int(retry_after) >= 1


def test_concurrent_failures_return_five_401_rest_429(cleanup_login_attempts):
    email = f"concurrent-{uuid.uuid4().hex[:8]}@example.com"
    key = account_key(email)
    cleanup_login_attempts.append(key)

    def attempt(i):
        session = requests.Session()
        try:
            response = session.post(
                f"{BASE_URL}/api/auth/login",
                json={"email": email, "password": f"bad-{i}"},
                headers={"Content-Type": "application/json", "X-Forwarded-For": f"198.51.100.{i+1}"},
                timeout=15,
            )
            return response.status_code
        finally:
            session.close()

    statuses = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(attempt, i) for i in range(8)]
        for fut in as_completed(futures):
            statuses.append(fut.result())

    count_401 = statuses.count(401)
    count_429 = statuses.count(429)
    assert count_401 == 5
    assert count_429 == 3


def test_expired_window_resets_without_waiting_ttl(api_client, mongo_db, cleanup_login_attempts):
    email = f"expiry-reset-{uuid.uuid4().hex[:8]}@example.com"
    key = account_key(email)
    cleanup_login_attempts.append(key)

    for _ in range(2):
        response = api_client.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": email, "password": "wrong-pass"},
        )
        assert response.status_code == 401

    mongo_db.login_attempts.update_one(
        {"_id": key},
        {"$set": {"expires_at": datetime.now(timezone.utc) - timedelta(minutes=1), "count": 2}},
    )

    next_attempt = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": email, "password": "wrong-pass"},
    )
    assert next_attempt.status_code == 401

    doc = mongo_db.login_attempts.find_one({"_id": key}, {"_id": 0, "count": 1})
    assert doc is not None
    assert doc["count"] == 1


def test_successful_login_clears_counter_before_lock(api_client, mongo_db, cleanup_login_attempts):
    key = account_key(ADMIN_EMAIL)
    cleanup_login_attempts.append(key)

    for _ in range(2):
        bad = api_client.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "  ADMIN@RUDRALIFE.COM ", "password": "wrong-pass"},
        )
        assert bad.status_code == 401

    good = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": " admin@rudralife.com ", "password": ADMIN_PASSWORD},
    )
    assert good.status_code == 200
    assert good.json()["email"] == "admin@rudralife.com"

    remaining = mongo_db.login_attempts.find_one({"_id": key})
    assert remaining is None


def test_auth_admin_and_cookie_still_work(api_client):
    login = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
    )
    assert login.status_code == 200
    set_cookie = login.headers.get("set-cookie", "")
    assert "access_token=" in set_cookie
    assert "HttpOnly" in set_cookie
    assert "Secure" in set_cookie
    assert "SameSite=none".lower() in set_cookie.lower()

    me = api_client.get(f"{BASE_URL}/api/auth/me")
    assert me.status_code == 200
    assert me.json()["email"] == ADMIN_EMAIL

    leads = api_client.get(f"{BASE_URL}/api/admin/leads")
    assert leads.status_code == 200
    assert isinstance(leads.json(), list)


def test_cors_preflight_allows_credentials_for_explicit_origin():
    origin = BASE_URL
    response = requests.options(
        f"{BASE_URL}/api/auth/login",
        headers={
            "Origin": origin,
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
        timeout=15,
    )
    assert response.status_code in (200, 204)
    assert response.headers.get("access-control-allow-origin") == origin
    assert response.headers.get("access-control-allow-credentials") == "true"


def test_admin_password_hash_prefix_is_bcrypt_2b(mongo_db):
    admin = mongo_db.users.find_one({"email": ADMIN_EMAIL}, {"_id": 0, "password_hash": 1})
    assert admin is not None
    assert admin["password_hash"].startswith("$2b$")
