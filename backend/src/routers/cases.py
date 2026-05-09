from fastapi import APIRouter, HTTPException
from models.schemas import CaseCreate
from datetime import datetime
from typing import Optional

router = APIRouter()

mock_cases_db = [
    {"id": "CI-2025-014", "title": "Industrial District Homicide", "victim": "Rajesh Kumar", "officer": "Inspector Priya Sharma", "type": "Homicide", "priority": "Critical", "riskScore": 82, "status": "Active", "createdAt": "2025-01-14T08:30:00Z", "evidenceCount": 12, "anomalies": 7},
]

@router.get("/")
async def get_cases(status: Optional[str] = None, priority: Optional[str] = None):
    cases = mock_cases_db
    if status:
        cases = [c for c in cases if c["status"].lower() == status.lower()]
    if priority:
        cases = [c for c in cases if c["priority"].lower() == priority.lower()]
    return {"cases": cases, "total": len(cases)}

@router.get("/{case_id}")
async def get_case(case_id: str):
    case = next((c for c in mock_cases_db if c["id"] == case_id), None)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case

@router.post("/")
async def create_case(data: CaseCreate):
    case = {
        "id": data.case_id,
        "title": data.title,
        "victim": data.victim_name,
        "officer": data.officer,
        "type": data.case_type,
        "priority": data.priority.value,
        "riskScore": 0,
        "status": "Active",
        "createdAt": datetime.utcnow().isoformat() + "Z",
        "evidenceCount": 0,
        "anomalies": 0,
        "location": data.location,
    }
    mock_cases_db.insert(0, case)
    return case
