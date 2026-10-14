from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone, timedelta
import os
import uuid
import logging
import bcrypt
import jwt

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "type": "access",
               "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# ---------- Models ----------
class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    city: str
    profession: str
    message: Optional[str] = ""

class Enquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    city: str
    profession: str
    message: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class LoginInput(BaseModel):
    email: str
    password: str

DEFAULT_CONTENT: Dict[str, Any] = {
    "hero_title": "Are you searching for something more — a stillness, a strength, a sense of destiny awakening within you?",
    "hero_subtitle": "For thousands of years, seekers, sages, and kings turned to a single sacred treasure to align mind, body and soul — the Siddha Mala. Today, that same sacred power finds its way to those who are ready.",
    "phone": "+91 98203 02028",
    "email": "info@rudralife.com",
    "whatsapp": "919820302028",
    "address": "Rudralife®, Mumbai, Maharashtra, India",
    "hours": "Mon – Sat · 10:00 AM to 7:00 PM (IST)",
    "website": "www.rudralife.com",
    "stat_certified": "100%",
    "stat_years": "25+",
    "stat_souls": "5,00,000+",
}

# ---------- Public ----------
@api_router.get("/")
async def root():
    return {"message": "Rudralife Siddha Mala API"}

@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    enquiry = Enquiry(**input.model_dump())
    await db.enquiries.insert_one(enquiry.model_dump())
    return enquiry

@api_router.get("/content")
async def get_content():
    doc = await db.site_content.find_one({"key": "main"}, {"_id": 0})
    if not doc:
        return DEFAULT_CONTENT
    doc.pop("key", None)
    return doc

# ---------- Auth ----------
@api_router.post("/auth/login")
async def login(input: LoginInput, response: Response, request: Request):
    email = input.email.lower().strip()
    identifier = f"{request.client.host}:{email}"
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("count", 0) >= 5:
        locked_at = datetime.fromisoformat(attempts["updated_at"])
        if datetime.now(timezone.utc) - locked_at < timedelta(minutes=15):
            raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"updated_at": datetime.now(timezone.utc).isoformat()}},
            upsert=True)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(user["id"], email)
    response.set_cookie(key="access_token", value=token, httponly=True, secure=True,
                        samesite="none", max_age=43200, path="/")
    return {"id": user["id"], "email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}

@api_router.get("/auth/me")
async def me(user=Depends(get_current_user)):
    return user

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"message": "Logged out"}

# ---------- Admin ----------
@api_router.get("/admin/leads", response_model=List[Enquiry])
async def get_leads(user=Depends(get_current_user)):
    leads = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return leads

@api_router.delete("/admin/leads/{lead_id}")
async def delete_lead(lead_id: str, user=Depends(get_current_user)):
    result = await db.enquiries.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Deleted"}

@api_router.put("/admin/content")
async def update_content(content: Dict[str, Any], user=Depends(get_current_user)):
    content.pop("_id", None)
    content.pop("key", None)
    await db.site_content.update_one({"key": "main"}, {"$set": {**content, "key": "main"}}, upsert=True)
    return {"message": "Content updated"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@rudralife.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "Rudralife@2025")
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "id": str(uuid.uuid4()), "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Rudralife Admin", "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()})
        logger.info("Admin user seeded")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email},
                                  {"$set": {"password_hash": hash_password(admin_password)}})
    if not await db.site_content.find_one({"key": "main"}):
        await db.site_content.insert_one({**DEFAULT_CONTENT, "key": "main"})

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
