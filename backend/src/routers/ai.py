from fastapi import APIRouter
from models.schemas import TODRequest, AnalyzeReportRequest
import math

router = APIRouter()

@router.post("/analyze-report")
async def analyze_report(data: AnalyzeReportRequest):
    return {
        "evidence_id": data.evidence_id,
        "case_id": data.case_id,
        "status": "completed",
        "result": {
            "causeOfDeath": "Blunt Force Trauma to the Head",
            "causeConfidence": 94,
            "injuryType": "Contusion with Subdural Hematoma",
            "injuryConfidence": 91,
            "toxicology": "Ethanol detected (0.12% BAC). No other substances found.",
            "weaponClues": "Blunt object with rectangular striking surface",
            "bodyCondition": "Moderate decomposition. Livor mortis fixed. Rigor mortis passing.",
            "keyObservations": [
                "Fracture of temporal bone consistent with single high-impact blow",
                "Defensive wounds present on forearms and hands",
                "No gunshot residue detected on clothing or hands",
                "Victim's watch stopped at 01:47",
            ],
        },
    }

@router.post("/estimate-tod")
async def estimate_tod(data: TODRequest):
    k = 0.0015 if data.humidity < 60 else 0.0020
    pmi_hours = -math.log((data.body_temp - data.ambient_temp) / (37 - data.ambient_temp + 0.01)) / k if data.body_temp > data.ambient_temp else 18
    pmi_hours = max(1, min(72, pmi_hours))

    rigor_map = {"None": 0, "Onset": 3, "Full": 9, "Passing": 24, "Absent": 48}
    rigor_offset = rigor_map.get(data.rigor_mortis, 0)
    pmi_adjusted = (pmi_hours + rigor_offset) / 2

    return {
        "estimatedRange": {
            "start": f"2025-01-14T{max(0, int(2 - pmi_adjusted/2)):02d}:00:00Z",
            "end": f"2025-01-14T{min(23, int(2 + pmi_adjusted/2)):02d}:00:00Z",
        },
        "pmi": f"{int(pmi_adjusted)} hours",
        "confidence": min(95, int(70 + pmi_adjusted * 0.5)),
        "method": "Henssge Nomogram + Rigor/Livor adjustment",
        "effects": [
            {"factor": "Temperature", "description": f"Ambient temp {data.ambient_temp}°C affects cooling rate"},
            {"factor": "Humidity", "description": f"Humidity {data.humidity}% {'slows' if data.humidity > 70 else 'accelerates'} lividity"},
        ],
    }

@router.post("/generate-summary")
async def generate_summary(case_id: str):
    return {
        "caseId": case_id,
        "sequence": [
            "Victim arrived at location at approximately 01:30 AM.",
            "Suspect vehicle arrived at 01:45 AM with two occupants.",
            "Motion sensors detected activity from 02:00-02:10 AM.",
            "Suspect vehicle left at high speed at 02:15 AM.",
            "Body discovered at 06:30 AM by security guard.",
        ],
        "suspiciousPatterns": [
            {"pattern": "Evidence metadata timestamp mismatch", "severity": "Critical"},
            {"pattern": "GPS data shows impossible speed", "severity": "High"},
            {"pattern": "Photo EXIF data mismatches reported device", "severity": "High"},
        ],
        "riskOverview": {"score": 82, "factors": [
            {"label": "Timestamp anomalies", "points": 15},
            {"label": "GPS gaps", "points": 20},
            {"label": "Contradictory evidence", "points": 25},
            {"label": "Unidentified suspects", "points": 22},
        ]},
        "recommendedActions": [
            "Obtain warrant for suspect phone analysis",
            "Cross-reference CCTV footage with GPS route data",
        ],
        "generatedAt": "2025-01-15T10:00:00Z",
    }

@router.post("/detect-anomalies")
async def detect_anomalies(case_id: str):
    return {
        "caseId": case_id,
        "anomalies": [
            {
                "type": "Timestamp Mismatch",
                "severity": "Critical",
                "description": "Evidence E-001 metadata inconsistent with CCTV footage",
                "confidence": 94,
            },
            {
                "type": "GPS Gap",
                "severity": "High",
                "description": "Impossible location jump in suspect device GPS",
                "confidence": 87,
            },
        ],
        "total": 2,
    }
