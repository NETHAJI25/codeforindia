from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from models.schemas import EvidenceCreate
from typing import List, Optional

router = APIRouter()

mock_evidence_db = [
    {"id": "E-001", "caseId": "CI-2025-014", "name": "Autopsy Report.pdf", "type": "PDF", "size": "4.2 MB", "uploadedAt": "2025-01-14T10:15:00Z", "tags": ["autopsy"], "custodyStatus": "Secured"},
]

@router.get("/")
async def get_evidence(case_id: Optional[str] = None, type: Optional[str] = None):
    items = mock_evidence_db
    if case_id:
        items = [e for e in items if e["caseId"] == case_id]
    if type:
        items = [e for e in items if e["type"].lower() == type.lower()]
    return {"evidence": items, "total": len(items)}

@router.post("/upload")
async def upload_evidence(file: UploadFile = File(...), metadata: str = Form(...)):
    return {"message": "File uploaded", "filename": file.filename, "size": file.size}

@router.delete("/{evidence_id}")
async def delete_evidence(evidence_id: str):
    return {"message": f"Evidence {evidence_id} deleted"}
