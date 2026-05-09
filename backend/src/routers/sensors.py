from fastapi import APIRouter
from models.schemas import SensorIngest
from datetime import datetime

router = APIRouter()

latest_sensor_reading = {
    "temperature": 31.4,
    "humidity": 72,
    "motion": False,
    "gps": {"lat": 13.0827, "lng": 80.2707},
    "aqi": 145,
    "vibration": False,
    "timestamp": datetime.utcnow().isoformat(),
}

@router.get("/latest")
async def get_latest():
    return latest_sensor_reading

@router.post("/ingest")
async def ingest_sensor(data: SensorIngest):
    global latest_sensor_reading
    latest_sensor_reading = {
        "temperature": data.temperature,
        "humidity": data.humidity,
        "motion": data.motion,
        "gps": {"lat": data.gps_lat, "lng": data.gps_lng},
        "aqi": data.aqi,
        "vibration": data.vibration,
        "timestamp": datetime.utcnow().isoformat(),
    }
    return {"status": "ok", "message": "Sensor data ingested"}

@router.get("/simulate")
async def simulate_trigger():
    return {"status": "triggered", "motion": True, "alert": "Motion detected"}
