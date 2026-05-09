from fastapi import APIRouter, HTTPException
from models.schemas import UserCreate, UserLogin
from datetime import datetime, timedelta
from jose import jwt
import os

router = APIRouter()
SECRET_KEY = os.getenv("AIVENTRA_SECRET", "aiventra-secret-key-change-in-production")
ALGORITHM = "HS256"

fake_users_db = {
    "priya.sharma@aiventra.gov": {
        "name": "Priya Sharma",
        "email": "priya.sharma@aiventra.gov",
        "role": "Investigator",
        "badge_id": "INV-001",
        "password": "$2b$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5Gz8Yq0Pq0Pq0Pq0Pq0Pq0O",  # password: demo1234
    }
}

@router.post("/login")
async def login(data: UserLogin):
    user = fake_users_db.get(data.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode(
        {"sub": data.email, "role": user["role"], "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY, algorithm=ALGORITHM,
    )
    return {"access_token": token, "token_type": "bearer", "user": {k: v for k, v in user.items() if k != "password"}}

@router.post("/register")
async def register(data: UserCreate):
    if data.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    fake_users_db[data.email] = data.model_dump()
    return {"message": "User registered successfully"}

@router.post("/forgot-password")
async def forgot_password(email: str):
    return {"message": "Password reset link sent to email"}
