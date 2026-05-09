from fastapi import APIRouter

router = APIRouter()

@router.get("/anomalies")
async def get_anomalies(case_id: str = None):
    return {"anomalies": [], "total": 0}

@router.get("/custody")
async def get_custody(evidence_id: str = None):
    return {"records": [], "total": 0}

@router.get("/notifications")
async def get_notifications():
    return {"notifications": [], "total": 0}

@router.get("/reports")
async def get_reports():
    return {"reports": [], "total": 0}
