from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class Priority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

class CaseStatus(str, Enum):
    ACTIVE = "Active"
    PENDING = "Pending"
    CLOSED = "Closed"
    ARCHIVED = "Archived"

class EvidenceType(str, Enum):
    PDF = "PDF"
    DOCX = "DOCX"
    IMAGE = "Image"
    VIDEO = "Video"
    CSV = "CSV"
    GPS = "GPS"

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str
    badge_id: str

class UserLogin(BaseModel):
    email: str
    password: str

class CaseCreate(BaseModel):
    title: str
    case_id: str
    case_type: str
    priority: Priority
    incident_datetime: datetime
    location: str
    victim_name: str
    victim_age: Optional[int] = None
    victim_gender: Optional[str] = None
    officer: str
    analyst: Optional[str] = None
    medical_officer: Optional[str] = None
    notes: Optional[str] = None

class EvidenceCreate(BaseModel):
    case_id: str
    name: str
    type: EvidenceType
    tags: List[str] = []
    ai_classification: Optional[str] = None

class SensorIngest(BaseModel):
    temperature: float
    humidity: float
    motion: bool
    gps_lat: float
    gps_lng: float
    aqi: int
    vibration: bool
    device_id: str

class TODRequest(BaseModel):
    body_temp: float = Field(ge=20, le=40)
    ambient_temp: float = Field(ge=10, le=45)
    humidity: float = Field(ge=0, le=100)
    rigor_mortis: str = "None"
    livor_mortis: str = "None"

class AnalyzeReportRequest(BaseModel):
    evidence_id: str
    case_id: str
