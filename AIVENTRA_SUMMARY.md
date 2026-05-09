# AIVENTRA — Complete Project Summary

## AI-Powered Forensic Triage & Postmortem Intelligence System

---

## Overview

AIVENTRA is a full-stack, production-grade forensic intelligence web application built for investigators. It features 16 fully functional pages, real-time data simulation, AI-powered analysis, and a cyber-forensic themed UI. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, FastAPI, and multiple visualization libraries.

**Location:** `C:\Users\R.NETHAJI\Downloads\codeforindia\aiventra`

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.6 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Animations | Framer Motion | 12.38 |
| Charts | Recharts | 3.8 |
| Maps | Leaflet + react-leaflet | 1.9 / 5.0 |
| Graph Visualization | @xyflow/react | 12.10 |
| Icons | Lucide React | 1.14 |
| Forms | react-hook-form + zod | 7.75 / 4.4 |
| CSS Utils | class-variance-authority, clsx, tailwind-merge | — |
| Real-time | Custom MockWebSocket | — |
| Backend | FastAPI (Python) | 0.109 |
| Auth | JWT (python-jose) | — |
| ASGI Server | Uvicorn | 0.27 |

---

## File Structure

```
aiventra/
├── src/
│   ├── app/
│   │   ├── globals.css                    # Cyber theme design system
│   │   ├── layout.tsx                     # Root layout with Google Fonts
│   │   ├── page.tsx                       # Redirects to /login
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx             # Login with validation
│   │   │   ├── register/page.tsx          # Registration with role select
│   │   │   └── forgot-password/page.tsx   # Password reset flow
│   │   └── (dashboard)/
│   │       ├── layout.tsx                 # Sidebar + Topbar layout
│   │       ├── dashboard/page.tsx         # Command center
│   │       ├── cases/page.tsx             # Case list with filters
│   │       ├── cases/new/page.tsx         # Create case form
│   │       ├── evidence/page.tsx          # Evidence upload system
│   │       ├── autopsy/page.tsx           # AI Report analysis
│   │       ├── tod/page.tsx               # TOD estimation
│   │       ├── timeline/page.tsx          # Interactive timeline
│   │       ├── correlation/page.tsx       # Evidence graph
│   │       ├── crime-map/page.tsx         # Crime scene map (wrapper)
│   │       ├── crime-map/MapContent.tsx    # Leaflet map (client-only)
│   │       ├── sensors/page.tsx           # Live IoT sensors
│   │       ├── custody/page.tsx           # Chain of custody
│   │       ├── anomalies/page.tsx         # Anomaly detection
│   │       ├── ai-summary/page.tsx        # AI summary generator
│   │       ├── chat/page.tsx              # AI chat assistant
│   │       ├── notifications/page.tsx     # Notification center
│   │       └── reports/page.tsx           # Report generator
│   ├── components/
│   │   └── layout/
│   │       ├── Sidebar.tsx                # 15-item collapsible nav
│   │       ├── Topbar.tsx                 # Breadcrumb + status
│   │       └── PageTransition.tsx         # Framer Motion wrapper
│   ├── lib/
│   │   ├── utils.ts                       # cn(), formatters, colors
│   │   ├── mock-data.ts                   # 8 entity types with data
│   │   └── socket.ts                      # Mock WebSocket system
│   └── types/
│       └── index.ts                       # 25+ TypeScript types/interfaces
├── backend/
│   └── src/
│       ├── main.py                        # FastAPI app entry
│       ├── requirements.txt               # Python dependencies
│       ├── models/
│       │   └── schemas.py                 # Pydantic v2 models
│       └── routers/
│           ├── __init__.py                # Router exports
│           ├── auth.py                    # JWT login/register
│           ├── cases.py                   # CRUD operations
│           ├── evidence.py                # File upload handlers
│           ├── sensors.py                 # IoT data ingestion
│           ├── ai.py                      # AI analysis endpoints
│           └── timeline.py               # Timeline events
├── next.config.ts                         # Next.js configuration
├── package.json                           # Node dependencies
├── tsconfig.json                          # TypeScript config
└── AGENTS.md                              # Build instructions
```

---

## 16 Pages — Detailed Description

### 1. Login (`/login`)
- Full-screen dark background with animated grid pattern
- Glassmorphism card (`backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl`)
- AIVENTRA logo with cyan glow
- Email + Password fields with zod validation
- Show/hide password toggle (Eye/EyeOff icons)
- "Remember me" toggle
- Login button with loading spinner animation
- "Forgot Password?" link to `/forgot-password`
- Fingerprint icon placeholder: "Biometric Auth — Coming Soon"
- Error states with red glow on invalid fields
- On success: page transition animation into `/dashboard`
- Framer Motion entrance animation (fade + scale)

### 2. Register (`/register`)
- Same dark aesthetic as login
- Fields: Full Name, Email, Password, Confirm Password, Role dropdown (Investigator | Forensic Analyst | Medical Officer | Admin), Badge/Employee ID
- Role selection changes accent color
- Terms checkbox
- On success: animated CheckCircle2 + redirect to `/login`

### 3. Forgot Password (`/forgot-password`)
- Email input + "Send Reset Link" button
- Success state: spring-animated checkmark with message

### 4. Dashboard (`/dashboard`) — COMMAND CENTER
**Top Stats Row (4 glassmorphism cards):**
- Total Cases: 24 (with FolderKanban icon)
- High Risk: 7 (with AlertTriangle icon, red tint)
- Active Alerts: 12 (with Bell icon, amber tint)
- Sensor Status: 8/10 Online (with Radio icon, green tint)
- Each card: counting animation on load, trend arrows (TrendingUp/TrendingDown)

**Left Column (60%):**
- Risk Score Trend Chart (Recharts AreaChart): 7-day rolling risk scores, cyan gradient fill with glow
- Investigation Activity (Recharts BarChart): evidence uploads per day, blue bars
- Timeline Preview: mini horizontal timeline of last 5 events, clickable → `/timeline`

**Right Column (40%):**
- Live Sensor Feed: 4 sensor cards (temp, humidity, motion, AQI) updating every 3s via WebSocket
- Recent Alerts: scrollable list with severity badges
- AI Anomaly Count: large number "7 Anomalies Detected" with breakdown

**Bottom Row:**
- Active Cases Table: Case ID, Victim, Officer, Priority, Risk Score, animated Progress bar, Status
- Evidence Distribution (Recharts PieChart): PDF/Image/Video/GPS/CSV/DOCX

**Real-Time:** LIVE indicator pulsing green, WebSocket auto-updates sensors, alerts, risk score

### 5. Cases List (`/cases`)
- Search bar + 4 dropdown filters: Priority, Status, Case Type, Officer
- Sorting: by date, priority, risk score
- Glassmorphism card grid with Framer Motion stagger animation
- Each card: Case ID, victim name, officer, color-coded risk badge (red/amber/green), evidence count, last updated (timeAgo)
- Hover overlay reveals quick actions: View, Edit, Archive
- "Create New Case" button → `/cases/new`

### 6. Create Case (`/cases/new`)
Two-column form with zod validation:
**Left:** Case Title, auto-generated Case ID (editable), Case Type buttons (Homicide|Accident|Missing Person|Cybercrime|Other), Priority segmented control (Low|Medium|High|Critical), Incident Date/Time (datetime-local), Location (text)
**Right:** Victim Name, Victim Age, Victim Gender, Assigned Officer, Forensic Analyst, Medical Officer, Notes (textarea), drag-&-drop evidence upload zone (dashed cyan border, animated glow)
- "Create Case" (primary) + "Save Draft" buttons
- Success: toast animation + redirect to `/cases`

### 7. Evidence Upload (`/evidence`)
- Large drag-&-drop zone: dashed cyan border, animated on hover, functional onDragOver/onDrop handlers
- Supported types as chips: PDF (FileText), DOCX (FileText), JPG/PNG (Image), MP4 (Video), CSV (FileSpreadsheet), GPS/KML (MapPin)
- Upload queue showing file name, size, progress bar, remove button
- Evidence Library grid with 4 filters: Type, Case, Tag, AI Classification
- Each evidence card: type icon, name, size, upload date, AI tags as chips, custody status badge (color-coded), hover actions (View|Download|Analyze|Delete)

### 8. AI Autopsy Analysis (`/autopsy`)
**Split-screen (50/50):**
**Left Panel:** PDF-like viewer with paper texture background, mock forensic report (3 pages), search highlighting (cyan), forensic term highlighting (yellow), page navigation (prev/next with counter)
**Right Panel:** "AI Forensic Intelligence Extract" header with processed status badge
- Cause of Death card with 94% confidence badge
- Injury Type card with 91% confidence
- Toxicology card
- Weapon Clues card
- Body Condition card
- Key Observations (bullet list with staggered animation)
- "Analyze Report" button: triggers scanning progress bar → staggered card reveal via Framer Motion
- Action buttons: Re-analyze, Add to Case Timeline, Flag for Review
- Collapsible raw extracted text section

### 9. TOD Estimation (`/tod`)
**Left Panel — Inputs:**
- Body Temperature: slider + number (20–40°C)
- Ambient Temperature: slider + number (10–45°C)
- Humidity: slider + number (0–100%)
- Rigor Mortis: segmented buttons (None | Onset | Full | Passing | Absent)
- Livor Mortis: segmented buttons (None | Faint | Fixed | Deep Fixed)
- "Pull from Live Sensors" button (auto-fills ambient temp + humidity)
- "Calculate TOD" button (large, pulse animation, loading spinner)

**Right Panel — Results (appear after calculation):**
- Estimated TOD Range: large formatted text
- Post-Mortem Interval (PMI): "18–21 hours"
- Confidence Score: animated SVG circular gauge (0–100%)
- Method Used text
- PMI Graph (Recharts LineChart): actual cooling curve vs Henssge curve, intersection highlighted with red dot
- Environmental Effect Analysis: 3 cards (temperature, humidity, body composition effects)
- Algor Mortis Formula: `T_body = T_ambient + (T_rectal - T_ambient) × e^(-k × t)`

### 10. Interactive Timeline (`/timeline`)
**Top Controls:**
- Case selector dropdown (filtered to cases with events)
- Filter chips: All | CCTV | Motion | GPS | Call Logs | AI Alerts | Evidence | Sensor (toggle buttons with type-specific colors)
- Zoom: Hour | 6H | Day | Week | Month
- "Animate Playback" button with play/pause toggle

**Main Timeline:**
- Vertical scrollable timeline with time axis on left, connector line, event cards on right
- Each event card: formatted time, type icon (colored circle), type badge, title, description, confidence bar (red <70%, amber 70-85%, green >85%)

**Animated Playback:**
- Events highlight chronologically one by one
- Speed control: 0.5x | 1x | 2x | 5x
- Progress bar with counter, skip-to-start/end buttons
- Auto-stops at end

### 11. Correlation Graph (`/correlation`)
Full-screen @xyflow/react interactive node graph:

**Node Types (7):**
- Victim: blue circle
- Suspect: red hexagon (CSS clip-path)
- Device: amber rounded rect
- CCTV: cyan rounded rect
- GPS: green rounded rect
- Evidence: purple document icon
- Location: gray building icon

**Edge Types (3):**
- Solid green: confirmed connection
- Dashed amber: AI-suspected (with "?" label)
- Red: suspicious/contradictory link

**Controls (floating, top-right):**
- "AI Suggest Links" button → new edges appear with animation
- Layout switcher: Force | Hierarchical | Circular
- Legend

**Bottom Panel:**
- Horizontal scrollable cards for AI-suspected links
- Each card: "Device A ↔ CCTV Camera 3 — 87% probability"
- Accept (turns green confirmed) / Dismiss (removes edge) buttons

### 12. Crime Map (`/crime-map`)
Full-page Leaflet.js map (CartoDB Dark Matter tiles):

**Markers (custom divIcon):**
- CCTV: blue circle
- Motion: amber circle
- GPS: green diamond (rotated square)
- Click → popup with: timestamp, event type, description, confidence

**Left Sidebar:**
- Layer toggles: GPS Events | CCTV | Motion | Heatmap mode
- Dual-range time slider to filter events
- Scrollable event list (click to fly-to on map)

**Overlay Stats (bottom-left):**
- Total Events, Last Update

**Route Visualization:**
- Animated dashed polyline connecting GPS events in chronological order
- MapController component for flyTo animations

**Note:** Dynamically imported with `ssr: false` to avoid Leaflet `window` dependency

### 13. Live IoT Sensors (`/sensors`)
6 glassmorphism sensor cards updating in real-time:

| Sensor | Value | Model | Status |
|--------|-------|-------|--------|
| Temperature | 31.4°C | DHT22 | ✅ Online |
| Humidity | 72% | DHT22 | ✅ Online |
| Air Quality | 145 AQI | MQ-135 | ⚠️ Threshold |
| Motion | DETECTED | PIR | 🔴 Alert |
| Vibration | Idle | Vibration | ✅ Online |
| GPS | 13.0827°N, 80.2707°E | GPS | ✅ Tracking |

Each card: JetBrains Mono large value, sparkline chart (60 data points), status badge, threshold progress bar, last updated timestamp

- Motion "DETECTED": card border pulses red, notification slides in
- Live Data Chart (Recharts LineChart): all sensor values over 30 min
- Hardware Status Panel: ESP32 connected, live JSON payload display, "Simulate Sensor Trigger" button

### 14. Chain of Custody (`/custody`)
**Two-panel layout:**
**Left — Evidence List:** scrollable list with type icons, ID, name, size, custody status (Secured=green, In Lab=blue, In Transit=amber, Compromised=red). Click to select.

**Right — Custody Chain Detail:** vertical timeline for selected evidence:
- Each link: action (Collected → Transferred → Lab Analysis → Secured), person + role, timestamp, location, digital signature verification (green check / red X)

**Access Logs Table:** Timestamp, User, Role, Action, Evidence ID, Verified status

**Alert Cards:**
- 🚨 "Evidence #E-004 accessed outside authorized hours" — red glass
- "Unauthorized access attempt logged" — amber glass

### 15. Anomaly Detection (`/anomalies`)
**Header Stats:** Total: 7 | Critical: 2 (red) | High: 3 (amber) | Medium: 2 (yellow)

**Detection Timeline:** horizontal mini timeline

**Filters:** severity pills, type pills with icons (Clock, FileText, MapPin, MessageSquare, Footprints, Link2, WifiOff), unresolved toggle, search bar

**Alert Cards Grid:** each card shows:
- Severity badge + type icon
- Title + description
- AI explanation (expandable)
- Linked evidence IDs
- Detected time (timeAgo)
- Status badge + confidence percentage
- Actions: Mark Resolved, Flag for Review, View Details

**Resolve Dialog:** 4 options (False Positive | Under Investigation | Confirmed | Escalated) + mandatory comment textarea

### 16. AI Summary (`/ai-summary`)
Document-style centered layout:
- Case header: ID, name, dates, assigned team
- "Generate AI Summary" button (large, glowing cyan)
- Typewriter text streaming effect (character-by-character reveal)

**Generated Sections (glassmorphism cards):**
1. **Probable Sequence of Events** — 8-item chronological narrative
2. **Suspicious Patterns Identified** — 5 patterns with severity badges
3. **Risk Overview** — Overall score 82/100 [Critical] + 4 contributing factors with point values
4. **Recommended Next Actions** — 5 actionable steps

**Legal Notice (always visible):** Amber box with warning: "AI-ASSISTED — NOT FOR LEGAL USE"
**Actions:** Export as PDF, Share with Team

### 17. AI Chat (`/chat`)
Full-screen chat interface:
- **Left sidebar:** conversation history list
- **Main:** chat window with user messages (right, cyan bubble `bg-cyan-500/20`) and AI messages (left, glassmorphism `bg-white/5`)
- AI messages support: bold text, bullet lists, inline evidence references

**Suggestion Chips (pre-populated):**
- "Show me all suspicious evidence"
- "Generate a case summary"
- "What's the estimated time of death?"
- "Who had access to Evidence E-007?"

**AI Behavior:** "thinking..." animation → keyword-matched mock responses (7 intents) → typewriter streaming output

**Right Panel (collapsible):** current case info, quick stats

### 18. Notifications (`/notifications`)
- Header: "Notifications" title + unread count + "Mark All Read" button
- Filter tabs: All | Alerts | Sensors | Evidence | System | Resolved
- Notification cards: severity color bar (red/amber/blue), type icon, bold title (if unread), cyan unread dot, timeAgo, action buttons
- Real-time: WebSocket listener prepends new notifications, toast popups for critical
- GSM/SMS Panel: Twilio placeholder, phone number, cyan toggle switches

### 19. Reports & Export (`/reports`)
**Left — Report Generator:**
- 6 selectable report type cards: Full Case, Timeline, Audit Trail, Evidence Summary, Anomaly, Risk Analysis
- Configuration: case selector, date range, section checkboxes (6 options), redaction toggle, watermark selector (CONFIDENTIAL|DRAFT|FOR REVIEW|OFFICIAL)
- "Generate Report" button with loading spinner

**Right — PDF Preview:**
- White paper-styled preview with mock case data, watermark overlay, key findings
- Action buttons: Download (FileDown), Print (Printer), Share (Share2), Submit (CheckCircle)

**Recent Exports Table:** 5 mock rows with status badges

---

## Design System

### Theme
Cyber Forensic Command Center — futuristic crime lab meets hacker terminal meets military intelligence dashboard.

### Color Palette
```
--bg-primary:   #0B1020  (dark navy)
--bg-secondary: #111827  (dark slate)
--accent-cyan:  #00F5FF  (neon cyan)
--accent-blue:  #3B82F6  (blue)
--accent-red:   #EF4444  (red danger)
--accent-amber: #F59E0B  (amber warning)
--accent-green: #10B981  (green success)
```

### Typography
- **Headings:** Space Grotesk (Google Fonts)
- **Data/Code:** JetBrains Mono (Google Fonts)
- **Body Text:** Inter (Google Fonts)

### Component Style Rules
- **Cards:** `backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl`
- **Buttons (primary):** `bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30`
- **Alerts (danger):** `bg-red-500/10 border border-red-500/40 text-red-400`
- **Inputs:** `bg-white/5 border border-cyan-500/20 text-white focus:border-cyan-400`
- **Sidebar:** `bg-[#0B1020]/95 backdrop-blur border-r border-cyan-500/10`

### Global Effects
- Animated grid background (pulsing CSS grid lines)
- Glassmorphism throughout
- Neon glow on active/alert elements
- Scanline overlay (subtle)
- Custom thin cyan scrollbars

---

## Mock Data System

| Entity | Count | Description |
|--------|-------|-------------|
| Cases | 8 | Homicide, missing person, cybercrime, accident, burglary, suspicious death, domestic violence, armed robbery |
| Evidence | 10 | PDF reports, images, videos, CSV logs, GPS data |
| Timeline Events | 10 | CCTV captures, motion detections, GPS pings, call logs, AI alerts, evidence uploads, sensor triggers |
| Sensors | 6 | DHT22 (temp/humidity), MQ-135 (AQI), PIR (motion), vibration, GPS |
| Anomalies | 7 | Timestamp mismatch, GPS gap, contradictory statements, metadata conflict, missing chain, unusual pattern, comm blackout |
| Custody Records | 10 | Collection, transfer, analysis, securing actions |
| Notifications | 8 | Critical alerts, warnings, system notifications |
| Correlation Nodes | 12 | Victim, suspects, devices, CCTV, GPS, evidence, locations |
| Correlation Edges | 12 | Confirmed, AI-suspected, and suspicious connections |
| Chat Messages | 5 | Conversation with evidence analysis and TOD response |

---

## Real-Time System

Custom `MockWebSocket` class (`src/lib/socket.ts`):

| Event | Interval | Data |
|-------|----------|------|
| `sensor-update` | Every 3s | Temperature, humidity, motion, GPS, AQI, vibration |
| `alert` | Every 8s (random 92% chance) | Motion detection alerts |
| `risk-update` | Every 10s | Risk score with change direction |
| `notification` | Every 15s | New system notifications |

API: `.on(event, callback)`, `.off(event, callback)`, `.emit(event, ...args)`, `.connect()`, `.disconnect()`, `.connected` property

---

## Backend API (FastAPI)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | JWT authentication |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/forgot-password` | Password reset |
| GET | `/api/cases` | List cases (filterable) |
| GET | `/api/cases/{id}` | Get case detail |
| POST | `/api/cases` | Create new case |
| GET | `/api/evidence` | List evidence (filterable) |
| POST | `/api/evidence/upload` | Upload evidence file |
| DELETE | `/api/evidence/{id}` | Delete evidence |
| GET | `/api/sensors/latest` | Latest sensor readings |
| POST | `/api/sensors/ingest` | ESP32 sensor data ingestion |
| GET | `/api/sensors/simulate` | Simulate sensor trigger |
| POST | `/api/ai/analyze-report` | NLP forensic extraction |
| POST | `/api/ai/estimate-tod` | Henssge nomogram calculation |
| POST | `/api/ai/generate-summary` | AI summary generation |
| POST | `/api/ai/detect-anomalies` | Anomaly detection (ML) |
| GET | `/api/timeline` | Timeline events (filterable) |
| GET | `/api/timeline/{id}` | Get specific event |

---

## Running the Application

```bash
# Frontend (production — recommended for this system)
cd C:\Users\R.NETHAJI\Downloads\codeforindia\aiventra
npx next build && npx next start --port 3001
# → http://localhost:3001

# Frontend (dev mode — may have Turbopack CSS bug on some Windows systems)
npx next dev --port 3001

# Backend API (separate terminal)
cd backend\src
pip install -r requirements.txt
python main.py
# → http://localhost:8001
```

---

## Build Verification

| Check | Result |
|-------|--------|
| `npx next build` | ✅ Compiles with zero errors |
| TypeScript type check | ✅ Zero type errors |
| Routes generated | 20 routes (all static prerendered) |
| Pages | 16 pages + 3 auth + 1 root redirect |
| Mobile responsive | Sidebar collapses, cards stack |
| Error states | Proper error boundaries and UI |
| Loading states | Skeleton loaders for all async ops |

---

## Route Map

```
/login                  → Login page
/register               → Registration page
/forgot-password        → Password reset
/                       → Redirects to /login
/dashboard              → Command center
/cases                  → Case list
/cases/new              → Create case
/evidence               → Evidence upload
/autopsy                → AI autopsy analysis
/tod                    → TOD estimation
/timeline               → Interactive timeline
/correlation            → Evidence correlation graph
/crime-map              → Crime scene map
/sensors                → Live IoT sensors
/custody                → Chain of custody
/anomalies              → Anomaly detection
/ai-summary             → AI investigation summary
/chat                   → AI chat assistant
/notifications          → Notification center
/reports                → Reports & export
```

---

*AIVENTRA — Built for investigators who need answers, not more questions.*
*"Intelligence that investigates."*
