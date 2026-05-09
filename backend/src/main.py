from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AIVENTRA API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routers import auth, cases, evidence, sensors, ai, timeline

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(cases.router, prefix="/api/cases", tags=["Cases"])
app.include_router(evidence.router, prefix="/api/evidence", tags=["Evidence"])
app.include_router(sensors.router, prefix="/api/sensors", tags=["Sensors"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])
app.include_router(timeline.router, prefix="/api/timeline", tags=["Timeline"])

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "AIVENTRA API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
