# AIVENTRA — AI-Powered Forensic Triage & Postmortem Intelligence System

AIVENTRA is an AI-powered forensic intelligence ecosystem designed to help investigators, forensic analysts, police departments, cybercrime teams, and medical officers process huge amounts of evidence faster and more intelligently.

---

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Visualization:** Framer Motion, Recharts, Leaflet, @xyflow/react
- **Real-time:** Custom MockWebSocket (Socket.IO compatible)
- **Backend:** FastAPI (Python 3.12), JWT Auth, Uvicorn
- **Icons:** Lucide React

## Getting Started

```bash
cd aiventra

# Frontend (production)
npx next build && npx next start --port 3001

# Backend (separate terminal)
cd backend/src
pip install -r requirements.txt
python main.py
```

Open [http://localhost:3001](http://localhost:3001) to see the login page.

## 16 Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Auth with validation |
| Register | `/register` | User registration |
| Forgot Password | `/forgot-password` | Password reset |
| Dashboard | `/dashboard` | Command center with live data |
| Cases | `/cases` | Case list with filters |
| Create Case | `/cases/new` | New case form |
| Evidence | `/evidence` | Upload & manage evidence |
| Autopsy | `/autopsy` | AI report analysis |
| TOD | `/tod` | Time-of-death estimation |
| Timeline | `/timeline` | Interactive investigation timeline |
| Correlation | `/correlation` | Evidence node graph |
| Crime Map | `/crime-map` | Leaflet crime scene map |
| Sensors | `/sensors` | Live IoT sensor monitoring |
| Custody | `/custody` | Chain of custody tracker |
| Anomalies | `/anomalies` | Anomaly detection center |
| AI Summary | `/ai-summary` | AI-generated case summary |
| Chat | `/chat` | AI chat assistant |
| Notifications | `/notifications` | Notification center |
| Reports | `/reports` | Report generator & export |

## API Endpoints (FastAPI)

Base URL: `http://localhost:8001`

- `POST /api/auth/login` — JWT authentication
- `GET/POST /api/cases` — List/create cases
- `GET/POST /api/evidence` — Manage evidence
- `POST /api/sensors/ingest` — ESP32 data ingestion
- `POST /api/ai/analyze-report` — NLP forensic extraction
- `POST /api/ai/estimate-tod` — Henssge calculation
- `POST /api/ai/generate-summary` — AI summary
- `POST /api/ai/detect-anomalies` — Anomaly detection
- `GET /api/timeline` — Timeline events

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

*AIVENTRA — Intelligence that investigates.*
