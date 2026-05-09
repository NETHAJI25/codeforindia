from fastapi import APIRouter
from typing import Optional

router = APIRouter()

mock_timeline_events = [
    {"id": "TL-001", "caseId": "CI-2025-014", "timestamp": "2025-01-14T01:30:00Z", "type": "CCTV", "title": "Victim enters industrial zone", "confidence": 92},
    {"id": "TL-002", "caseId": "CI-2025-014", "timestamp": "2025-01-14T01:45:00Z", "type": "CCTV", "title": "Suspect vehicle arrives", "confidence": 88},
    {"id": "TL-003", "caseId": "CI-2025-014", "timestamp": "2025-01-14T02:00:00Z", "type": "Motion", "title": "Motion detected inside warehouse", "confidence": 95},
]

@router.get("/")
async def get_timeline(case_id: Optional[str] = None):
    events = mock_timeline_events
    if case_id:
        events = [e for e in events if e["caseId"] == case_id]
    return {"events": events, "total": len(events)}

@router.get("/{event_id}")
async def get_event(event_id: str):
    event = next((e for e in mock_timeline_events if e["id"] == event_id), None)
    return event or {"error": "Event not found"}
