"use client";

import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import type {
  Case, EvidenceItem, TimelineEvent, SensorDevice, Anomaly,
  CustodyRecord, Notification, CorrelationNode, CorrelationEdge,
  ChatMessage,
} from "@/types";
import {
  mockCases, mockEvidence, mockTimelineEvents, mockSensors, mockAnomalies,
  mockCustodyRecords, mockNotifications, mockCorrelationNodes, mockCorrelationEdges, mockChatMessages,
} from "./mock-data";

interface DataState {
  cases: Case[];
  evidence: EvidenceItem[];
  timelineEvents: TimelineEvent[];
  sensors: SensorDevice[];
  anomalies: Anomaly[];
  custodyRecords: CustodyRecord[];
  notifications: Notification[];
  chatMessages: ChatMessage[];
  correlationNodes: CorrelationNode[];
  correlationEdges: CorrelationEdge[];
}

type Action =
  | { type: "SET_STATE"; payload: Partial<DataState> }
  | { type: "ADD_CASE"; payload: Case }
  | { type: "UPDATE_CASE"; payload: { id: string; data: Partial<Case> } }
  | { type: "DELETE_CASE"; payload: string }
  | { type: "ADD_EVIDENCE"; payload: EvidenceItem }
  | { type: "UPDATE_EVIDENCE"; payload: { id: string; data: Partial<EvidenceItem> } }
  | { type: "DELETE_EVIDENCE"; payload: string }
  | { type: "ADD_TIMELINE_EVENT"; payload: TimelineEvent }
  | { type: "UPDATE_TIMELINE_EVENT"; payload: { id: string; data: Partial<TimelineEvent> } }
  | { type: "DELETE_TIMELINE_EVENT"; payload: string }
  | { type: "UPDATE_SENSOR"; payload: { id: string; data: Partial<SensorDevice> } }
  | { type: "ADD_ANOMALY"; payload: Anomaly }
  | { type: "UPDATE_ANOMALY"; payload: { id: string; data: Partial<Anomaly> } }
  | { type: "DELETE_ANOMALY"; payload: string }
  | { type: "ADD_CUSTODY_RECORD"; payload: CustodyRecord }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "DELETE_NOTIFICATION"; payload: string }
  | { type: "ADD_CHAT_MESSAGE"; payload: ChatMessage }
  | { type: "ADD_CORRELATION_NODE"; payload: CorrelationNode }
  | { type: "ADD_CORRELATION_EDGE"; payload: CorrelationEdge }
  | { type: "DELETE_CORRELATION_EDGE"; payload: string }
  | { type: "UPDATE_CORRELATION_EDGE"; payload: { id: string; data: Partial<CorrelationEdge> } };

function dataReducer(state: DataState, action: Action): DataState {
  switch (action.type) {
    case "SET_STATE": return { ...state, ...action.payload };
    case "ADD_CASE": return { ...state, cases: [action.payload, ...state.cases] };
    case "UPDATE_CASE": return { ...state, cases: state.cases.map(c => c.id === action.payload.id ? { ...c, ...action.payload.data } : c) };
    case "DELETE_CASE": return { ...state, cases: state.cases.filter(c => c.id !== action.payload) };
    case "ADD_EVIDENCE": return { ...state, evidence: [action.payload, ...state.evidence] };
    case "UPDATE_EVIDENCE": return { ...state, evidence: state.evidence.map(e => e.id === action.payload.id ? { ...e, ...action.payload.data } : e) };
    case "DELETE_EVIDENCE": return { ...state, evidence: state.evidence.filter(e => e.id !== action.payload) };
    case "ADD_TIMELINE_EVENT": return { ...state, timelineEvents: [action.payload, ...state.timelineEvents] };
    case "UPDATE_TIMELINE_EVENT": return { ...state, timelineEvents: state.timelineEvents.map(t => t.id === action.payload.id ? { ...t, ...action.payload.data } : t) };
    case "DELETE_TIMELINE_EVENT": return { ...state, timelineEvents: state.timelineEvents.filter(t => t.id !== action.payload) };
    case "UPDATE_SENSOR": return { ...state, sensors: state.sensors.map(s => s.id === action.payload.id ? { ...s, ...action.payload.data } : s) };
    case "ADD_ANOMALY": return { ...state, anomalies: [action.payload, ...state.anomalies] };
    case "UPDATE_ANOMALY": return { ...state, anomalies: state.anomalies.map(a => a.id === action.payload.id ? { ...a, ...action.payload.data } : a) };
    case "DELETE_ANOMALY": return { ...state, anomalies: state.anomalies.filter(a => a.id !== action.payload) };
    case "ADD_CUSTODY_RECORD": return { ...state, custodyRecords: [action.payload, ...state.custodyRecords] };
    case "ADD_NOTIFICATION": return { ...state, notifications: [action.payload, ...state.notifications] };
    case "MARK_NOTIFICATION_READ": return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };
    case "MARK_ALL_NOTIFICATIONS_READ": return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };
    case "DELETE_NOTIFICATION": return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    case "ADD_CHAT_MESSAGE": return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case "ADD_CORRELATION_NODE": return { ...state, correlationNodes: [...state.correlationNodes, action.payload] };
    case "ADD_CORRELATION_EDGE": return { ...state, correlationEdges: [...state.correlationEdges, action.payload] };
    case "DELETE_CORRELATION_EDGE": return { ...state, correlationEdges: state.correlationEdges.filter(e => e.id !== action.payload) };
    case "UPDATE_CORRELATION_EDGE": return { ...state, correlationEdges: state.correlationEdges.map(e => e.id === action.payload.id ? { ...e, ...action.payload.data } : e) };
    default: return state;
  }
}

const initialState: DataState = {
  cases: mockCases,
  evidence: mockEvidence,
  timelineEvents: mockTimelineEvents,
  sensors: mockSensors,
  anomalies: mockAnomalies,
  custodyRecords: mockCustodyRecords,
  notifications: mockNotifications,
  chatMessages: mockChatMessages,
  correlationNodes: mockCorrelationNodes,
  correlationEdges: mockCorrelationEdges,
};

interface DataContextValue extends DataState {
  dispatch: React.Dispatch<Action>;
  addCase: (data: Omit<Case, "id" | "createdAt">) => void;
  updateCase: (id: string, data: Partial<Case>) => void;
  deleteCase: (id: string) => void;
  addEvidence: (data: Omit<EvidenceItem, "id" | "uploadedAt">) => void;
  updateEvidence: (id: string, data: Partial<EvidenceItem>) => void;
  deleteEvidence: (id: string) => void;
  addTimelineEvent: (data: Omit<TimelineEvent, "id">) => void;
  updateTimelineEvent: (id: string, data: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;
  updateSensor: (id: string, data: Partial<SensorDevice>) => void;
  addAnomaly: (data: Omit<Anomaly, "id" | "detectedAt">) => void;
  updateAnomaly: (id: string, data: Partial<Anomaly>) => void;
  deleteAnomaly: (id: string) => void;
  addCustodyRecord: (data: Omit<CustodyRecord, "id">) => void;
  addNotification: (data: Omit<Notification, "id">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  addChatMessage: (data: Omit<ChatMessage, "id" | "timestamp">) => void;
  addCorrelationNode: (data: Omit<CorrelationNode, "id">) => void;
  addCorrelationEdge: (data: Omit<CorrelationEdge, "id">) => void;
  deleteCorrelationEdge: (id: string) => void;
  updateCorrelationEdge: (id: string, data: Partial<CorrelationEdge>) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const addCase = useCallback((data: Omit<Case, "id" | "createdAt">) => {
    const newCase: Case = { ...data, id: genId("CI"), createdAt: new Date().toISOString() };
    dispatch({ type: "ADD_CASE", payload: newCase });
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: { id: genId("TL"), caseId: newCase.id, timestamp: new Date().toISOString(), type: "Evidence Upload", title: `Case created: ${newCase.title}`, description: `New case opened by ${newCase.officer}`, confidence: 100 } });
    dispatch({ type: "ADD_NOTIFICATION", payload: { id: genId("N"), type: "system", title: "New Case Created", description: `Case ${newCase.id} — ${newCase.title}`, timestamp: new Date().toISOString(), read: false } });
  }, []);

  const updateCase = useCallback((id: string, data: Partial<Case>) => dispatch({ type: "UPDATE_CASE", payload: { id, data } }), []);
  const deleteCase = useCallback((id: string) => dispatch({ type: "DELETE_CASE", payload: id }), []);

  const addEvidence = useCallback((data: Omit<EvidenceItem, "id" | "uploadedAt">) => {
    const newItem: EvidenceItem = { ...data, id: genId("E"), uploadedAt: new Date().toISOString() };
    dispatch({ type: "ADD_EVIDENCE", payload: newItem });
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: { id: genId("TL"), caseId: data.caseId, timestamp: new Date().toISOString(), type: "Evidence Upload", title: `Evidence uploaded: ${data.name}`, description: `Type: ${data.type}`, confidence: 100 } });
    dispatch({ type: "ADD_NOTIFICATION", payload: { id: genId("N"), type: "evidence", title: "New Evidence Uploaded", description: `${data.name} added to case ${data.caseId}`, timestamp: new Date().toISOString(), read: false } });
  }, []);

  const updateEvidence = useCallback((id: string, data: Partial<EvidenceItem>) => dispatch({ type: "UPDATE_EVIDENCE", payload: { id, data } }), []);
  const deleteEvidence = useCallback((id: string) => dispatch({ type: "DELETE_EVIDENCE", payload: id }), []);

  const addTimelineEvent = useCallback((data: Omit<TimelineEvent, "id">) => {
    dispatch({ type: "ADD_TIMELINE_EVENT", payload: { ...data, id: genId("TL") } });
  }, []);

  const updateTimelineEvent = useCallback((id: string, data: Partial<TimelineEvent>) => dispatch({ type: "UPDATE_TIMELINE_EVENT", payload: { id, data } }), []);
  const deleteTimelineEvent = useCallback((id: string) => dispatch({ type: "DELETE_TIMELINE_EVENT", payload: id }), []);

  const updateSensor = useCallback((id: string, data: Partial<SensorDevice>) => dispatch({ type: "UPDATE_SENSOR", payload: { id, data } }), []);

  const addAnomaly = useCallback((data: Omit<Anomaly, "id" | "detectedAt">) => {
    const newAnomaly: Anomaly = { ...data, id: genId("A"), detectedAt: new Date().toISOString() };
    dispatch({ type: "ADD_ANOMALY", payload: newAnomaly });
    dispatch({ type: "ADD_NOTIFICATION", payload: { id: genId("N"), type: "alert", severity: data.severity === "Critical" ? "critical" : "warning", title: `New Anomaly: ${data.type}`, description: data.title, timestamp: new Date().toISOString(), read: false } });
  }, []);

  const updateAnomaly = useCallback((id: string, data: Partial<Anomaly>) => dispatch({ type: "UPDATE_ANOMALY", payload: { id, data } }), []);
  const deleteAnomaly = useCallback((id: string) => dispatch({ type: "DELETE_ANOMALY", payload: id }), []);

  const addCustodyRecord = useCallback((data: Omit<CustodyRecord, "id">) => {
    dispatch({ type: "ADD_CUSTODY_RECORD", payload: { ...data, id: genId("CR") } });
  }, []);

  const addNotification = useCallback((data: Omit<Notification, "id">) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: { ...data, id: genId("N") } });
  }, []);

  const markNotificationRead = useCallback((id: string) => dispatch({ type: "MARK_NOTIFICATION_READ", payload: id }), []);
  const markAllNotificationsRead = useCallback(() => dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" }), []);
  const deleteNotification = useCallback((id: string) => dispatch({ type: "DELETE_NOTIFICATION", payload: id }), []);

  const addChatMessage = useCallback((data: Omit<ChatMessage, "id" | "timestamp">) => {
    dispatch({ type: "ADD_CHAT_MESSAGE", payload: { ...data, id: genId("CM"), timestamp: new Date().toISOString() } });
  }, []);

  const addCorrelationNode = useCallback((data: Omit<CorrelationNode, "id">) => {
    dispatch({ type: "ADD_CORRELATION_NODE", payload: { ...data, id: genId("NODE") } });
  }, []);

  const addCorrelationEdge = useCallback((data: Omit<CorrelationEdge, "id">) => {
    dispatch({ type: "ADD_CORRELATION_EDGE", payload: { ...data, id: genId("EDGE") } });
  }, []);

  const deleteCorrelationEdge = useCallback((id: string) => dispatch({ type: "DELETE_CORRELATION_EDGE", payload: id }), []);
  const updateCorrelationEdge = useCallback((id: string, data: Partial<CorrelationEdge>) => dispatch({ type: "UPDATE_CORRELATION_EDGE", payload: { id, data } }), []);

  return (
    <DataContext.Provider value={{
      ...state,
      dispatch,
      addCase, updateCase, deleteCase,
      addEvidence, updateEvidence, deleteEvidence,
      addTimelineEvent, updateTimelineEvent, deleteTimelineEvent,
      updateSensor,
      addAnomaly, updateAnomaly, deleteAnomaly,
      addCustodyRecord,
      addNotification, markNotificationRead, markAllNotificationsRead, deleteNotification,
      addChatMessage,
      addCorrelationNode, addCorrelationEdge, deleteCorrelationEdge, updateCorrelationEdge,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
