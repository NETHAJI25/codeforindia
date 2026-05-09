import type {
  Case, EvidenceItem, TimelineEvent, SensorDevice, Anomaly,
  CustodyRecord, Notification, CorrelationNode, CorrelationEdge,
  AIAnalysisResult, TODResult, AISummary, ChatMessage,
} from "@/types";

export const mockCases: Case[] = [
  { id: "CI-2025-014", title: "Industrial District Homicide", victim: "Rajesh Kumar", victimAge: 34, victimGender: "Male", officer: "Inspector Priya Sharma", analyst: "Dr. Arjun Mehta", medicalOfficer: "Dr. Kavita Singh", type: "Homicide", priority: "Critical", riskScore: 82, status: "Active", createdAt: "2025-01-14T08:30:00Z", location: "Sector 7, Industrial Area", evidenceCount: 12, anomalies: 7 },
  { id: "CI-2025-013", title: "Missing College Student", victim: "Ananya Reddy", victimAge: 19, victimGender: "Female", officer: "Inspector Vikram Joshi", analyst: "Dr. Neha Gupta", type: "Missing Person", priority: "High", riskScore: 65, status: "Active", createdAt: "2025-01-12T14:20:00Z", location: "University Campus", evidenceCount: 8, anomalies: 3 },
  { id: "CI-2025-012", title: "Cyber Fraud Investigation", victim: "Suresh Patel", victimAge: 45, victimGender: "Male", officer: "Inspector Priya Sharma", analyst: "Ravi Verma", type: "Cybercrime", priority: "Medium", riskScore: 38, status: "Active", createdAt: "2025-01-10T10:00:00Z", location: "Online Banking Portal", evidenceCount: 15, anomalies: 2 },
  { id: "CI-2025-011", title: "Hit and Run Accident", victim: "Lakshmi Devi", victimAge: 52, victimGender: "Female", officer: "Inspector Arun Singh", analyst: "Dr. Arjun Mehta", type: "Accident", priority: "High", riskScore: 55, status: "Pending", createdAt: "2025-01-08T16:45:00Z", location: "NH-44, Outer Ring Road", evidenceCount: 6, anomalies: 1 },
  { id: "CI-2025-010", title: "Residential Burglary", victim: "Mohammed Ali", victimAge: 38, victimGender: "Male", officer: "Inspector Vikram Joshi", type: "Other", priority: "Low", riskScore: 22, status: "Pending", createdAt: "2025-01-05T22:15:00Z", location: "Green Valley Apartments", evidenceCount: 4, anomalies: 0 },
  { id: "CI-2025-009", title: "Suspicious Death Investigation", victim: "Unknown Male", officer: "Inspector Priya Sharma", analyst: "Dr. Kavita Singh", medicalOfficer: "Dr. Kavita Singh", type: "Homicide", priority: "Critical", riskScore: 91, status: "Active", createdAt: "2025-01-03T06:00:00Z", location: "Railway Tracks, West Zone", evidenceCount: 20, anomalies: 11 },
  { id: "CI-2025-008", title: "Domestic Violence Case", victim: "Sunita Devi", victimAge: 29, victimGender: "Female", officer: "Inspector Arun Singh", type: "Other", priority: "Medium", riskScore: 45, status: "Closed", createdAt: "2024-12-28T11:30:00Z", location: "Ramesh Nagar", evidenceCount: 5, anomalies: 0 },
  { id: "CI-2025-007", title: "Armed Robbery Investigation", victim: "Petrol Pump Owner", officer: "Inspector Vikram Joshi", analyst: "Ravi Verma", type: "Other", priority: "High", riskScore: 60, status: "Active", createdAt: "2024-12-26T19:00:00Z", location: "Highway Petrol Pump", evidenceCount: 9, anomalies: 4 },
];

export const mockEvidence: EvidenceItem[] = [
  { id: "E-001", caseId: "CI-2025-014", name: "Autopsy Report.pdf", type: "PDF", size: "4.2 MB", uploadedAt: "2025-01-14T10:15:00Z", tags: ["autopsy", "forensic"], aiClassification: "Forensic Report", custodyStatus: "Secured" },
  { id: "E-002", caseId: "CI-2025-014", name: "Crime Scene Photo 1.jpg", type: "Image", size: "8.7 MB", uploadedAt: "2025-01-14T09:30:00Z", tags: ["crime-scene", "photograph"], aiClassification: "Crime Scene Photo", custodyStatus: "In Lab" },
  { id: "E-003", caseId: "CI-2025-014", name: "CCTV Feed - Sector 7.mp4", type: "Video", size: "156 MB", uploadedAt: "2025-01-14T11:00:00Z", tags: ["cctv", "surveillance"], aiClassification: "Surveillance Video", custodyStatus: "Secured" },
  { id: "E-004", caseId: "CI-2025-014", name: "Phone Call Logs.csv", type: "CSV", size: "234 KB", uploadedAt: "2025-01-14T12:30:00Z", tags: ["call-logs", "digital"], aiClassification: "Call Log Data", custodyStatus: "In Transit" },
  { id: "E-005", caseId: "CI-2025-013", name: "GPS Location Data.kml", type: "GPS", size: "89 KB", uploadedAt: "2025-01-12T16:00:00Z", tags: ["gps", "location"], aiClassification: "GPS Log", custodyStatus: "Secured" },
  { id: "E-006", caseId: "CI-2025-013", name: "Missing Person Report.docx", type: "DOCX", size: "1.1 MB", uploadedAt: "2025-01-12T15:00:00Z", tags: ["report", "missing"], aiClassification: "Forensic Report", custodyStatus: "Secured" },
  { id: "E-007", caseId: "CI-2025-009", name: "Toxicology Report.pdf", type: "PDF", size: "3.4 MB", uploadedAt: "2025-01-03T08:00:00Z", tags: ["toxicology", "forensic"], aiClassification: "Forensic Report", custodyStatus: "In Lab" },
  { id: "E-008", caseId: "CI-2025-009", name: "Body Camera Footage.mp4", type: "Video", size: "890 MB", uploadedAt: "2025-01-03T07:30:00Z", tags: ["body-cam", "investigation"], aiClassification: "Surveillance Video", custodyStatus: "Secured" },
  { id: "E-009", caseId: "CI-2025-012", name: "Bank Transaction Records.csv", type: "CSV", size: "567 KB", uploadedAt: "2025-01-10T12:00:00Z", tags: ["banking", "transaction"], aiClassification: "Financial Record", custodyStatus: "Secured" },
  { id: "E-010", caseId: "CI-2025-012", name: "Screenshot of Fraud Email.png", type: "Image", size: "345 KB", uploadedAt: "2025-01-10T11:30:00Z", tags: ["screenshot", "phishing"], aiClassification: "Crime Scene Photo", custodyStatus: "Secured" },
];

export const mockTimelineEvents: TimelineEvent[] = [
  { id: "TL-001", caseId: "CI-2025-014", timestamp: "2025-01-14T01:30:00Z", type: "CCTV", title: "Victim enters industrial zone", description: "CCTV Camera 3 captures victim walking towards Sector 7 warehouse", confidence: 92, evidenceId: "E-003", location: { lat: 13.0827, lng: 80.2707 } },
  { id: "TL-002", caseId: "CI-2025-014", timestamp: "2025-01-14T01:45:00Z", type: "CCTV", title: "Suspect vehicle arrives", description: "White SUV (MH-12-AB-3456) enters frame near warehouse entrance", confidence: 88, evidenceId: "E-003", location: { lat: 13.0830, lng: 80.2710 } },
  { id: "TL-003", caseId: "CI-2025-014", timestamp: "2025-01-14T02:00:00Z", type: "Motion", title: "Motion detected inside warehouse", description: "PIR Sensor 02 triggered - movement inside restricted area", confidence: 95, location: { lat: 13.0825, lng: 80.2705 } },
  { id: "TL-004", caseId: "CI-2025-014", timestamp: "2025-01-14T02:15:00Z", type: "GPS", title: "Suspect phone leaves area", description: "GPS ping shows suspect's device leaving at high speed towards highway", confidence: 85, location: { lat: 13.0850, lng: 80.2750 } },
  { id: "TL-005", caseId: "CI-2025-014", timestamp: "2025-01-14T03:00:00Z", type: "Call Log", title: "Unknown call to emergency services", description: "Disconnected call from burner phone to emergency dispatch", confidence: 76 },
  { id: "TL-006", caseId: "CI-2025-014", timestamp: "2025-01-14T06:30:00Z", type: "Evidence Upload", title: "Body discovered by security guard", description: "Security guard reports finding victim's body at 6:30 AM", confidence: 98, location: { lat: 13.0827, lng: 80.2707 } },
  { id: "TL-007", caseId: "CI-2025-014", timestamp: "2025-01-14T08:00:00Z", type: "Sensor Trigger", title: "Forensic team arrives on scene", description: "Motion sensors activate as investigative team enters warehouse", confidence: 90 },
  { id: "TL-008", caseId: "CI-2025-014", timestamp: "2025-01-14T09:00:00Z", type: "AI Alert", title: "Timestamp anomaly detected", description: "Evidence E-001 metadata shows modification at 4:30 AM - possible tampering", confidence: 82, evidenceId: "E-001" },
  { id: "TL-009", caseId: "CI-2025-013", timestamp: "2025-01-12T18:00:00Z", type: "CCTV", title: "Missing student last seen", description: "Ananya Reddy exits university library, walking towards bus stop", confidence: 94, location: { lat: 13.0400, lng: 80.2300 } },
  { id: "TL-010", caseId: "CI-2025-013", timestamp: "2025-01-12T18:30:00Z", type: "GPS", title: "Phone signal lost", description: "Last GPS ping from victim's phone at bus stop - phone switched off", confidence: 73, location: { lat: 13.0410, lng: 80.2310 } },
];

export const mockSensors: SensorDevice[] = [
  { id: "S-001", name: "Temperature Sensor", type: "DHT22", value: 31.4, unit: "°C", status: "Online", lastUpdated: new Date().toISOString(), history: Array.from({ length: 60 }, (_, i) => ({ value: 30 + Math.sin(i * 0.1) * 2 + Math.random() * 0.5, timestamp: new Date(Date.now() - (60 - i) * 3000).toISOString() })) },
  { id: "S-002", name: "Humidity Sensor", type: "DHT22", value: 72, unit: "%", status: "Online", lastUpdated: new Date().toISOString(), history: Array.from({ length: 60 }, (_, i) => ({ value: 70 + Math.sin(i * 0.05) * 5 + Math.random() * 1, timestamp: new Date(Date.now() - (60 - i) * 3000).toISOString() })) },
  { id: "S-003", name: "Air Quality Monitor", type: "MQ-135", value: 145, unit: "AQI", status: "Threshold", lastUpdated: new Date().toISOString(), history: Array.from({ length: 60 }, (_, i) => ({ value: 120 + Math.sin(i * 0.08) * 30 + Math.random() * 5, timestamp: new Date(Date.now() - (60 - i) * 3000).toISOString() })) },
  { id: "S-004", name: "Motion Detector", type: "PIR", value: "DETECTED", status: "Alert", lastUpdated: new Date().toISOString(), history: Array.from({ length: 60 }, (_, i) => ({ value: i > 50 ? 1 : 0, timestamp: new Date(Date.now() - (60 - i) * 3000).toISOString() })) },
  { id: "S-005", name: "Vibration Sensor", type: "Vibration", value: false, status: "Online", lastUpdated: new Date().toISOString(), history: Array.from({ length: 60 }, (_, i) => ({ value: Math.random() > 0.9 ? 1 : 0, timestamp: new Date(Date.now() - (60 - i) * 3000).toISOString() })) },
  { id: "S-006", name: "GPS Tracker", type: "GPS", value: "13.0827°N, 80.2707°E", status: "Online", lastUpdated: new Date().toISOString(), history: Array.from({ length: 60 }, (_, i) => ({ value: 13.0827 + Math.sin(i * 0.02) * 0.001, timestamp: new Date(Date.now() - (60 - i) * 3000).toISOString() })) },
];

export const mockAnomalies: Anomaly[] = [
  { id: "A-001", caseId: "CI-2025-014", severity: "Critical", type: "Timestamp Mismatch", title: "Evidence E-001 timestamp manipulation", description: "Evidence #E-001 has metadata timestamp inconsistent with CCTV footage by 4 hours 23 minutes.", aiExplanation: "File modification timestamp post-dates capture timestamp by 4h23m — possible tampering after the incident. The PDF metadata shows 'Last Modified: 2025-01-14T04:53:00Z' but CCTV confirms report was still being written at scene at 08:00.", evidenceIds: ["E-001", "E-003"], detectedAt: "2025-01-14T10:00:00Z", status: "Unresolved", confidence: 94 },
  { id: "A-002", caseId: "CI-2025-014", severity: "High", type: "GPS Gap", title: "Unexplained location jump", description: "Suspect device GPS shows impossible 15km jump in 2 minutes — indicates GPS spoofing or device handoff.", aiExplanation: "GPS coordinates jump from (13.0827, 80.2707) to (13.2100, 80.0800) in 120 seconds. Maximum possible speed of 450 km/h is inconsistent with ground transportation. Possible GPS spoofing.", evidenceIds: ["E-004"], detectedAt: "2025-01-14T11:30:00Z", status: "Under Investigation", confidence: 87 },
  { id: "A-003", caseId: "CI-2025-009", severity: "Critical", type: "Contradictory Statements", title: "Witness statements conflict with forensic evidence", description: "Two witnesses claim victim was seen alive at 8 PM, but body temp suggests TOD at 6 PM.", aiExplanation: "Body temperature of 27.2°C at discovery (7 AM) with ambient 24°C gives PMI of 13 hours, placing TOD at approximately 6 PM. Witness statements place victim alive at 8 PM — 2 hour discrepancy.", evidenceIds: ["E-007"], detectedAt: "2025-01-04T09:00:00Z", status: "Confirmed", confidence: 96 },
  { id: "A-004", caseId: "CI-2025-014", severity: "High", type: "Metadata Conflict", title: "Photo metadata inconsistent with device", description: "Crime scene photo claims to be from iPhone 15 but EXIF shows Xiaomi camera signature.", aiExplanation: "EXIF data shows 'Make: Xiaomi, Model: 14 Pro' but evidence log states photos were taken with official iPhone 15. XOR operation on metadata blocks reveals inconsistent camera signatures.", evidenceIds: ["E-002"], detectedAt: "2025-01-14T14:00:00Z", status: "Unresolved", confidence: 91 },
  { id: "A-005", caseId: "CI-2025-013", severity: "Medium", type: "Missing Evidence Chain", title: "Gap in custody trail for GPS data", description: "GPS evidence E-005 has 6-hour gap in chain of custody logs.", aiExplanation: "Custody records show evidence was signed out at 16:00 but next check-in not recorded until 22:00. 6-hour unaccounted window raises integrity concerns.", evidenceIds: ["E-005"], detectedAt: "2025-01-13T10:00:00Z", status: "Under Investigation", confidence: 78 },
  { id: "A-006", caseId: "CI-2025-007", severity: "High", type: "Unusual Movement Pattern", title: "Suspect device circled block 7 times before incident", description: "GPS log shows suspect vehicle circled target location 7 times in 45 minutes before robbery.", aiExplanation: "Pattern recognition on GPS data shows repeated circular path around petrol pump between 18:15-19:00. 7 complete circuits with 4-6 minute intervals — consistent with surveillance behavior.", evidenceIds: ["E-004"], detectedAt: "2024-12-27T08:00:00Z", status: "Confirmed", confidence: 93 },
  { id: "A-007", caseId: "CI-2025-014", severity: "Medium", type: "Comm Blackout", title: "No phone activity during critical window", description: "Victim's phone shows no activity between 01:00-03:00 — unusual for known usage patterns.", aiExplanation: "Victim's historical data shows average 12 interactions/hour during night. Zero activity from 01:00-03:00 on incident date is 4.2 standard deviations from mean. Phone may have been disabled.", evidenceIds: ["E-004"], detectedAt: "2025-01-15T09:00:00Z", status: "Unresolved", confidence: 85 },
];

export const mockCustodyRecords: CustodyRecord[] = [
  { id: "CR-001", evidenceId: "E-001", action: "Collected", person: "Inspector Priya Sharma", role: "Investigator", timestamp: "2025-01-14T09:15:00Z", location: "Crime Scene - Sector 7", verified: true },
  { id: "CR-002", evidenceId: "E-001", action: "Transferred", person: "Dr. Arjun Mehta", role: "Forensic Analyst", timestamp: "2025-01-15T14:30:00Z", location: "Forensic Lab - East Wing", verified: true },
  { id: "CR-003", evidenceId: "E-001", action: "Lab Analysis", person: "Tech. Ravi Verma", role: "Forensic Analyst", timestamp: "2025-01-16T10:00:00Z", location: "Digital Forensics Unit", verified: true },
  { id: "CR-004", evidenceId: "E-001", action: "Secured", person: "Evidence Room Admin", role: "Admin", timestamp: "2025-01-17T06:45:00Z", location: "Main Evidence Vault", verified: true },
  { id: "CR-005", evidenceId: "E-002", action: "Collected", person: "Inspector Priya Sharma", role: "Investigator", timestamp: "2025-01-14T09:20:00Z", location: "Crime Scene - Sector 7", verified: true },
  { id: "CR-006", evidenceId: "E-002", action: "Transferred", person: "Dr. Kavita Singh", role: "Medical Officer", timestamp: "2025-01-14T11:00:00Z", location: "Medical Examiner Office", verified: true },
  { id: "CR-007", evidenceId: "E-002", action: "Analyzed", person: "Dr. Kavita Singh", role: "Medical Officer", timestamp: "2025-01-15T09:30:00Z", location: "Autopsy Suite", verified: true },
  { id: "CR-008", evidenceId: "E-003", action: "Collected", person: "Inspector Vikram Joshi", role: "Investigator", timestamp: "2025-01-14T10:00:00Z", location: "CCTV Control Room", verified: true },
  { id: "CR-009", evidenceId: "E-004", action: "Collected", person: "Tech. Ravi Verma", role: "Forensic Analyst", timestamp: "2025-01-14T12:30:00Z", location: "Digital Forensics Unit", verified: true },
  { id: "CR-010", evidenceId: "E-005", action: "Collected", person: "Inspector Vikram Joshi", role: "Investigator", timestamp: "2025-01-12T16:00:00Z", location: "University Campus", verified: true },
];

export const mockNotifications: Notification[] = [
  { id: "N-001", type: "alert", severity: "critical", title: "Motion Detected — PIR-01", description: "Movement detected at coordinates 13.0827°N, 80.2707°E. Camera snapshot available.", timestamp: new Date(Date.now() - 120000).toISOString(), read: false, actionable: true, actionLabel: "View on Map", actionLink: "/crime-map" },
  { id: "N-002", type: "evidence", severity: "warning", title: "Evidence Tampering Alert", description: "Evidence #E-004 accessed outside authorized hours (3:15 AM).", timestamp: new Date(Date.now() - 600000).toISOString(), read: false, actionable: true, actionLabel: "Review", actionLink: "/custody" },
  { id: "N-003", type: "sensor", severity: "warning", title: "Sensor Offline — MQ-135", description: "Air Quality Monitor in Sector 7 has been offline for 15 minutes.", timestamp: new Date(Date.now() - 900000).toISOString(), read: false },
  { id: "N-004", type: "alert", severity: "critical", title: "Metadata Conflict Detected", description: "Photo E-002 EXIF data inconsistent with reported device. Possible evidence tampering.", timestamp: new Date(Date.now() - 1800000).toISOString(), read: false, actionable: true, actionLabel: "View Evidence", actionLink: "/evidence" },
  { id: "N-005", type: "system", title: "AI Analysis Complete", description: "Autopsy report analysis for Case CI-2025-014 is now available.", timestamp: new Date(Date.now() - 3600000).toISOString(), read: false, actionable: true, actionLabel: "View Analysis", actionLink: "/autopsy" },
  { id: "N-006", type: "alert", severity: "info", title: "New Anomaly Flagged", description: "GPS Gap anomaly detected in Case CI-2025-014. Confidence: 87%.", timestamp: new Date(Date.now() - 7200000).toISOString(), read: true },
  { id: "N-007", type: "evidence", title: "New Evidence Uploaded", description: "CCTV Feed (156 MB) uploaded to Case CI-2025-014 by Inspector Priya Sharma.", timestamp: new Date(Date.now() - 10800000).toISOString(), read: true },
  { id: "N-008", type: "system", title: "Case Status Updated", description: "Case CI-2025-013 priority changed to High.", timestamp: new Date(Date.now() - 14400000).toISOString(), read: true },
];

export const mockCorrelationNodes: CorrelationNode[] = [
  { id: "V-001", type: "victim", label: "Rajesh Kumar", data: { age: 34, gender: "Male", occupation: "Factory Worker" } },
  { id: "S-001", type: "suspect", label: "Unknown Suspect A", data: { description: "Tall, dark clothing, masked" } },
  { id: "S-002", type: "suspect", label: "Unknown Suspect B", data: { description: "Driver, white SUV" } },
  { id: "D-001", type: "device", label: "Victim's iPhone", data: { imei: "351234567890123", lastPing: "2025-01-14T01:00:00Z" } },
  { id: "D-002", type: "device", label: "Suspect Burner Phone", data: { imei: "359876543210987", lastPing: "2025-01-14T02:15:00Z" } },
  { id: "C-001", type: "cctv", label: "CCTV Camera 3", data: { location: "Sector 7 Entrance", angle: "NE" } },
  { id: "C-002", type: "cctv", label: "CCTV Camera 7", data: { location: "Highway Junction", angle: "SW" } },
  { id: "G-001", type: "gps", label: "GPS Track Point A", data: { lat: 13.0827, lng: 80.2707, time: "02:00" } },
  { id: "G-002", type: "gps", label: "GPS Track Point B", data: { lat: 13.0850, lng: 80.2750, time: "02:15" } },
  { id: "E-001", type: "evidence", label: "Autopsy Report", data: { type: "PDF", keyFinding: "Cause: Blunt force trauma" } },
  { id: "E-002", type: "evidence", label: "Crime Scene Photo", data: { type: "Image", location: "Inside warehouse" } },
  { id: "L-001", type: "location", label: "Warehouse 7B", data: { address: "Sector 7, Industrial Area" } },
];

export const mockCorrelationEdges: CorrelationEdge[] = [
  { id: "E-V-D1", source: "V-001", target: "D-001", label: "Owns", confidence: 99, confirmed: true, suspicious: false },
  { id: "E-V-L", source: "V-001", target: "L-001", label: "Last seen at", confidence: 95, confirmed: true, suspicious: false },
  { id: "E-V-C1", source: "V-001", target: "C-001", label: "Captured by", confidence: 92, confirmed: true, suspicious: false },
  { id: "E-S1-G1", source: "S-001", target: "G-001", label: "Present at", confidence: 88, confirmed: true, suspicious: false },
  { id: "E-S1-D2", source: "S-001", target: "D-002", label: "Carried", confidence: 85, confirmed: false, suspicious: false },
  { id: "E-S1-V", source: "S-001", target: "V-001", label: "AI-suspected contact", confidence: 67, confirmed: false, suspicious: true },
  { id: "E-D2-G2", source: "D-002", target: "G-002", label: "Pinged at", confidence: 90, confirmed: true, suspicious: false },
  { id: "E-G1-G2", source: "G-001", target: "G-002", label: "Movement route", confidence: 86, confirmed: true, suspicious: false },
  { id: "E-S2-C2", source: "S-002", target: "C-002", label: "Captured at junction", confidence: 78, confirmed: false, suspicious: false },
  { id: "E-C1-L", source: "C-001", target: "L-001", label: "Monitors", confidence: 98, confirmed: true, suspicious: false },
  { id: "E-E1-V", source: "E-001", target: "V-001", label: "Documents", confidence: 97, confirmed: true, suspicious: false },
  { id: "E-S1-E2", source: "S-001", target: "E-002", label: "Captured in", confidence: 82, confirmed: false, suspicious: true },
];

export function mockAIAnalysisResult(): AIAnalysisResult {
  return {
    causeOfDeath: "Blunt Force Trauma to the Head",
    causeConfidence: 94,
    injuryType: "Contusion with Subdural Hematoma",
    injuryConfidence: 91,
    toxicology: "Ethanol detected (0.12% BAC). No other substances found.",
    weaponClues: "Blunt object with rectangular striking surface — consistent with metal pipe or crowbar",
    bodyCondition: "Moderate decomposition (PMI ~18-21 hours). Livor mortis fixed. Rigor mortis passing.",
    keyObservations: [
      "Fracture of temporal bone consistent with single high-impact blow",
      "Defensive wounds present on forearms and hands",
      "No gunshot residue detected on clothing or hands",
      "Blood spatter pattern indicates attack occurred while victim was standing",
      "Victim's watch stopped at 01:47 — potential time of impact",
      "Cellular data shows incoming call at 01:46 from unknown number",
    ],
  };
}

export function mockTODResult(): TODResult {
  return {
    estimatedRange: { start: "2025-01-14T00:30:00Z", end: "2025-01-14T03:45:00Z" },
    pmi: "18–21 hours",
    confidence: 87,
    method: "Henssge Nomogram + Rigor/Livor adjustment",
    coolingCurve: Array.from({ length: 24 }, (_, i) => ({ hour: i, temp: 37 - (i > 4 ? (i - 4) * 0.8 : 0) - Math.random() * 0.3 })),
    henssgeCurve: Array.from({ length: 24 }, (_, i) => ({ hour: i, temp: i < 4 ? 37 - i * 0.5 : 35 - (i - 4) * 0.7 })),
    effects: [
      { factor: "Temperature", description: "High ambient temp (31°C) — Accelerated cooling in first 6 hours" },
      { factor: "Humidity", description: "High humidity (72%) — Slowed lividity development" },
      { factor: "Body Composition", description: "Victim had low BMI — Faster heat loss" },
    ],
  };
}

export function mockAISummary(): AISummary {
  return {
    caseId: "CI-2025-014",
    sequence: [
      "Victim Rajesh Kumar arrived at Sector 7 warehouse at approximately 01:30 AM for an unknown meeting.",
      "At 01:45 AM, a white SUV (MH-12-AB-3456) arrived at the warehouse with two unidentified occupants.",
      "Motion sensors detected activity inside the warehouse from 02:00-02:10 AM — consistent with altercation.",
      "At 02:15 AM, the SUV was observed leaving at high speed towards the highway (captured by CCTV Camera 7).",
      "Victim's phone ceased all activity at 01:47 AM (watch also stopped at this time — likely TOD).",
      "An anonymous call was placed to emergency services at 03:00 AM from a burner phone — disconnected before speaking.",
      "Body was discovered by security guard at 06:30 AM during routine patrol.",
      "Forensic team arrived at 08:00 AM and secured the scene.",
    ],
    suspiciousPatterns: [
      { pattern: "Evidence metadata timestamp mismatch (+4h23m)", severity: "Critical" },
      { pattern: "GPS data shows impossible speed (450 km/h)", severity: "High" },
      { pattern: "Photo EXIF data mismatches reported device", severity: "High" },
      { pattern: "Victim phone blackout during critical window", severity: "Medium" },
      { pattern: "Burner phone call at 03:00 AM — untraceable", severity: "Medium" },
    ],
    riskOverview: {
      score: 82,
      factors: [
        { label: "Multiple timestamp anomalies", points: 15 },
        { label: "GPS location gaps", points: 20 },
        { label: "Contradictory evidence", points: 25 },
        { label: "Unidentified suspects", points: 22 },
      ],
    },
    recommendedActions: [
      "Obtain warrant for analysis of Suspect Burner Phone (IMEI: 359876543210987)",
      "Cross-reference CCTV footage from Camera 3 and Camera 7 with GPS route data",
      "Request toxicology re-analysis for presence of sedatives beyond ethanol",
      "Interview Security Guard regarding any unusual activity before 06:30 AM",
      "Trace the white SUV (MH-12-AB-3456) registration and ownership history",
    ],
    generatedAt: new Date().toISOString(),
  };
}

export const mockChatMessages: ChatMessage[] = [
  { id: "CM-001", role: "assistant", content: "Welcome to AIVENTRA AI Assistant. I can help you analyze evidence, generate summaries, and answer questions about your cases. Try asking me something!", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "CM-002", role: "user", content: "Show me all suspicious evidence in Case CI-2025-014", timestamp: new Date(Date.now() - 3000000).toISOString() },
  { id: "CM-003", role: "assistant", content: "**Suspicious Evidence in CI-2025-014:**\n\n1. **E-001 — Autopsy Report** ⚠️ *Timestamp Mismatch*\n   - Metadata modified 4h23m after capture\n   - Confidence: 94%\n\n2. **E-002 — Crime Scene Photo** ⚠️ *Metadata Conflict*\n   - EXIF shows wrong camera make\n   - Confidence: 91%\n\n3. **E-004 — Call Logs** ⚠️ *GPS Gap*\n   - Impossible location jump in data\n   - Confidence: 87%\n\n4. **E-003 — CCTV Feed** ✅ Clean\n   - No anomalies detected\n\nI'd recommend investigating E-001 first as it has the highest confidence score.", timestamp: new Date(Date.now() - 2900000).toISOString() },
  { id: "CM-004", role: "user", content: "What's the estimated time of death?", timestamp: new Date(Date.now() - 2400000).toISOString() },
  { id: "CM-005", role: "assistant", content: "**Time of Death Estimation for CI-2025-014:**\n\n**Estimated TOD:** 01:47 AM (± 1.5 hours)\n**PMI:** 18-21 hours\n**Confidence:** 87%\n\n**Method Used:** Henssge Nomogram + Rigor/Livor adjustment\n\n**Key Factors:**\n- Ambient temperature: 31°C (accelerated cooling)\n- Body temp at discovery: 27.2°C\n- Rigor mortis: Passing stage\n- Livor mortis: Fixed\n\n**Watch Evidence:** Victim's wristwatch stopped at 01:47, consistent with TOD estimate. This is our most precise timestamp indicator.", timestamp: new Date(Date.now() - 2300000).toISOString() },
];

export function generateMockSensorReading() {
  return {
    temperature: 30 + Math.random() * 3,
    humidity: 68 + Math.random() * 8,
    motion: Math.random() > 0.85,
    gps: { lat: 13.0827 + Math.random() * 0.001, lng: 80.2707 + Math.random() * 0.001 },
    aqi: 120 + Math.random() * 50,
    vibration: Math.random() > 0.9,
    timestamp: new Date().toISOString(),
  };
}
