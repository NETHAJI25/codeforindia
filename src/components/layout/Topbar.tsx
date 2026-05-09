"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, riskColor, riskBgColor } from "@/lib/utils";
import { getSocket } from "@/lib/socket";
import { useData } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { Bell, ChevronDown, Circle, User } from "lucide-react";

const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  cases: "Cases",
  evidence: "Evidence Upload",
  autopsy: "Autopsy Analysis",
  tod: "TOD Estimation",
  timeline: "Timeline",
  correlation: "Correlation Graph",
  "crime-map": "Crime Map",
  sensors: "Live Sensors",
  custody: "Chain of Custody",
  anomalies: "Anomaly Detection",
  "ai-summary": "AI Summary",
  chat: "AI Chat",
  notifications: "Notifications",
  reports: "Reports & Export",
};

export default function Topbar() {
  const pathname = usePathname();
  const { cases, notifications } = useData();
  const { user } = useAuth();
  const [connected, setConnected] = useState(false);
  const [caseSelectorOpen, setCaseSelectorOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id ?? "");
  const unreadCount = notifications.filter((n) => !n.read).length;
  const selectedCase = cases.find((c) => c.id === selectedCaseId);

  const segments = pathname.split("/").filter(Boolean);
  const label = breadcrumbLabels[segments[0] ?? ""] ?? "Dashboard";

  useEffect(() => {
    const socket = getSocket();
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    socket.on("connected", onConnect);
    socket.on("disconnected", onDisconnect);
    return () => {
      socket.off("connected", onConnect);
      socket.off("disconnected", onDisconnect);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 bg-[#0B1020]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
            AIVENTRA
          </Link>
          {segments.length > 0 && (
            <>
              <span className="text-gray-600">/</span>
              <span className="text-white font-medium">{label}</span>
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setCaseSelectorOpen(!caseSelectorOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-cyan-500/30 transition-colors"
          >
            <span className="truncate max-w-32">{selectedCase?.id ?? "Select Case"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
          {caseSelectorOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[#111827] border border-white/10 shadow-2xl overflow-hidden z-50">
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCaseId(c.id); setCaseSelectorOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors",
                    c.id === selectedCaseId ? "bg-cyan-500/10 text-cyan-400" : "text-gray-300"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{c.id}</span>
                    <span className="text-xs text-gray-500">{c.priority}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{c.title}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
          <Circle
            className={cn(
              "w-2 h-2 fill-current",
              connected ? "text-green-400 animate-pulse" : "text-red-400"
            )}
          />
          <span className={cn(connected ? "text-green-400" : "text-red-400")}>
            {connected ? "Live" : "Offline"}
          </span>
        </div>

        <Link
          href="/notifications"
          className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        {selectedCase && (
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border",
            riskBgColor(selectedCase.riskScore),
            riskColor(selectedCase.riskScore)
          )}>
            <span>RISK {selectedCase.riskScore}</span>
          </div>
        )}

          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm text-white leading-tight">{user?.name ?? "Guest"}</p>
              <p className="text-[10px] text-cyan-400 leading-tight">{user?.role ?? "—"}</p>
            </div>
          </div>
      </div>
    </header>
  );
}
