"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  ArrowUpDown,
  FolderKanban,
  User,
  Calendar,
  FileText,
  Eye,
  Edit3,
  Archive,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import { cn, formatDate, riskColor, riskBgColor, timeAgo } from "@/lib/utils";
import type { Case, Priority, Status, CaseType } from "@/types";
import { mockCases } from "@/lib/mock-data";

const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];
const statuses: Status[] = ["Active", "Pending", "Closed", "Archived"];
const caseTypes: CaseType[] = ["Homicide", "Accident", "Missing Person", "Cybercrime", "Other"];
const sortOptions = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "priority", label: "Priority" },
  { value: "risk", label: "Risk Score" },
] as const;

const officers = Array.from(new Set(mockCases.map((c) => c.officer)));

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<Priority | "">("");
  const [status, setStatus] = useState<Status | "">("");
  const [caseType, setCaseType] = useState<CaseType | "">("");
  const [officer, setOfficer] = useState("");
  const [sort, setSort] = useState<string>("date-desc");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...mockCases];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.victim.toLowerCase().includes(q) ||
          c.officer.toLowerCase().includes(q)
      );
    }
    if (priority) list = list.filter((c) => c.priority === priority);
    if (status) list = list.filter((c) => c.status === status);
    if (caseType) list = list.filter((c) => c.type === caseType);
    if (officer) list = list.filter((c) => c.officer === officer);

    list.sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "date-desc":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "priority": {
          const order: Record<Priority, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
          return order[a.priority] - order[b.priority];
        }
        case "risk":
          return b.riskScore - a.riskScore;
        default:
          return 0;
      }
    });

    return list;
  }, [search, priority, status, caseType, officer, sort]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Cases</h1>
          <p className="text-sm text-gray-400 mt-1">{filtered.length} case{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/cases/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 transition-all text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Create New Case
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="glass p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search cases by ID, title, victim, or officer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-cyan-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority | "")}
              className="appearance-none pl-9 pr-8 py-2 rounded-lg bg-white/5 border border-cyan-500/20 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50 cursor-pointer min-w-[120px]"
            >
              <option value="">All Priorities</option>
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status | "")}
              className="appearance-none pl-9 pr-8 py-2 rounded-lg bg-white/5 border border-cyan-500/20 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50 cursor-pointer min-w-[120px]"
            >
              <option value="">All Statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <FolderKanban className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value as CaseType | "")}
              className="appearance-none pl-9 pr-8 py-2 rounded-lg bg-white/5 border border-cyan-500/20 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50 cursor-pointer min-w-[140px]"
            >
              <option value="">All Types</option>
              {caseTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select
              value={officer}
              onChange={(e) => setOfficer(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2 rounded-lg bg-white/5 border border-cyan-500/20 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50 cursor-pointer min-w-[160px]"
            >
              <option value="">All Officers</option>
              {officers.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="relative ml-auto">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2 rounded-lg bg-white/5 border border-cyan-500/20 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50 cursor-pointer min-w-[140px]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filtered.map((c) => (
          <motion.div
            key={c.id}
            variants={fadeUp}
            onMouseEnter={() => setHoveredId(c.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative glass rounded-xl p-5 transition-all duration-300 hover:border-cyan-500/30 group"
          >
            {/* Risk Badge */}
            <div
              className={cn(
                "absolute top-3 right-3 px-2 py-0.5 rounded-full border text-xs font-mono font-semibold",
                riskBgColor(c.riskScore),
                riskColor(c.riskScore)
              )}
            >
              RISK {c.riskScore}
            </div>

            {/* Case ID */}
            <div className="flex items-center gap-2 mb-3">
              <FolderKanban className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400 font-semibold">{c.id}</span>
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-medium ml-auto",
                  c.status === "Active" && "bg-green-500/20 text-green-400 border border-green-500/30",
                  c.status === "Pending" && "bg-amber-500/20 text-amber-400 border border-amber-500/30",
                  c.status === "Closed" && "bg-gray-500/20 text-gray-400 border border-gray-500/30",
                  c.status === "Archived" && "bg-red-500/20 text-red-400 border border-red-500/30"
                )}
              >
                {c.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-white font-semibold text-sm leading-snug mb-3 line-clamp-2">
              {c.title}
            </h3>

            {/* Victim + Officer */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <User className="w-3 h-3 text-gray-500 shrink-0" />
                <span className="truncate">{c.victim}</span>
                {c.victimAge && (
                  <span className="text-gray-500 shrink-0">({c.victimAge}y)</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Shield className="w-3 h-3 text-gray-500 shrink-0" />
                <span className="truncate">{c.officer}</span>
              </div>
            </div>

            {/* Meta Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 border-t border-cyan-500/10 pt-3">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3 h-3" />
                <span>{c.evidenceCount} evidence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{timeAgo(c.createdAt)}</span>
              </div>
            </div>

            {/* Hover Actions Overlay */}
            {hoveredId === c.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 rounded-xl bg-[#0B1020]/90 backdrop-blur-sm flex items-center justify-center gap-3"
              >
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 text-xs font-medium transition-all">
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-400 hover:bg-blue-500/30 text-xs font-medium transition-all">
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 text-xs font-medium transition-all">
                  <Archive className="w-3.5 h-3.5" />
                  Archive
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <FolderKanban className="w-12 h-12 mb-3 opacity-40" />
            <p className="text-sm">No cases match your filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
