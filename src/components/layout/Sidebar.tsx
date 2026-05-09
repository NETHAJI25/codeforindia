"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import {
  LayoutDashboard, FolderKanban, Upload, Microscope, Clock, CalendarDays,
  Share2, Map, Radio, ShieldCheck, AlertTriangle, Bot, MessageSquare,
  Bell, FileText, ChevronLeft, ChevronRight, LogOut, User,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: FolderKanban },
  { href: "/evidence", label: "Evidence Upload", icon: Upload },
  { href: "/autopsy", label: "Autopsy Analysis", icon: Microscope },
  { href: "/tod", label: "TOD Estimation", icon: Clock },
  { href: "/timeline", label: "Timeline", icon: CalendarDays },
  { href: "/correlation", label: "Correlation Graph", icon: Share2 },
  { href: "/crime-map", label: "Crime Map", icon: Map },
  { href: "/sensors", label: "Live Sensors", icon: Radio },
  { href: "/custody", label: "Chain of Custody", icon: ShieldCheck },
  { href: "/anomalies", label: "Anomaly Detection", icon: AlertTriangle },
  { href: "/ai-summary", label: "AI Summary", icon: Bot },
  { href: "/chat", label: "AI Chat", icon: MessageSquare },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/reports", label: "Reports & Export", icon: FileText },
];

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full z-50 flex flex-col bg-[#0B1020]/95 backdrop-blur border-r border-cyan-500/10 transition-all duration-300",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-cyan-500/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
              <span className="text-cyan-400 font-bold text-sm">AI</span>
            </div>
            <span className="text-cyan-400 font-bold font-['Space_Grotesk'] tracking-wider">AIVENTRA</span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
              <span className="text-cyan-400 font-bold text-sm">AI</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-all duration-200 group",
                active
                  ? "bg-cyan-500/10 border-l-2 border-cyan-400 text-cyan-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="text-sm whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </div>
      <div className="border-t border-cyan-500/10 p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{user?.name ?? "Guest"}</p>
              <p className="text-xs text-cyan-400">{user?.role ?? "—"}</p>
            </div>
            <LogOut onClick={logout} className="w-4 h-4 text-gray-500 hover:text-red-400 cursor-pointer" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <LogOut onClick={logout} className="w-4 h-4 text-gray-500 hover:text-red-400 cursor-pointer" />
          </div>
        )}
      </div>
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0B1020] border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
