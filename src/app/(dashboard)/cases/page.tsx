"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
} from "lucide-react";
import { cn, formatDate, riskColor, riskBgColor, timeAgo } from "@/lib/utils";
import type { Case, Priority, Status, CaseType } from "@/types";
import { useData } from "@/lib/store";

const priorities: Priority[] = ["Low", "Medium", "High", "Critical"];
const statuses: Status[] = ["Active", "Pending", "Closed", "Archived"];
const caseTypes: CaseType[] = ["Homicide", "Accident", "Missing Person", "Cybercrime", "Other"];
const sortOptions = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "priority", label: "Priority" },
  { value: "risk", label: "Risk Score" },
] as const;

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export default function CasesPage() {
  const router = useRouter();
  const { cases, deleteCase, updateCase } = useData();
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<Priority | "">("");
  const [status, setStatus] = useState<Status | "">("");
  const [caseType, setCaseType] = useState<CaseType | "">("");
  const [officer, setOfficer] = useState("");
  const [sort, setSort] = useState<string>("date-desc");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewCase, setViewCase] = useState<Case | null>(null);

  const officers = useMemo(() => Array.from(new Set(cases.map((c) => c.officer))), [cases]);

  const filtered = useMemo(() => {
    let list = [...cases];

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
  }, [search, priority, status, caseType, officer, sort, cases]);

  const handleEdit = (c: Case) => {
    const newTitle = prompt("Edit case title:", c.title);
    if (newTitle && newTitle !== c.title) {
      updateCase(c.id, { title: newTitle });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to archive this case?")) {
      deleteCase(id);
    }
  };

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

      {/* View Case Dialog */}
      <AnimatePresence>
        {viewCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setViewCase(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111827] border border-cyan-500/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">{viewCase.id}</h3>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-semibold border",
                    viewCase.status === "Active" && "bg-green-500/20 text-green-400 border-green-500/30",
                    viewCase.status === "Pending" && "bg-amber-500/20 text-amber-400 border-amber-500/30",
                    viewCase.status === "Closed" && "bg-gray-500/20 text-gray-400 border-gray-500/30",
                    viewCase.status === "Archived" && "bg-red-500/20 text-red-400 border-red-500/30",
                  )}>{viewCase.status}</span>
                </div>
                <button onClick={() => setViewCase(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div>
                  <p className="text-lg font-bold text-white">{viewCase.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-gray-400 block text-xs">Victim</span><span className="text-white">{viewCase.victim}{viewCase.victimAge ? ` (${viewCase.victimAge}y)` : ""}</span></div>
                  <div><span className="text-gray-400 block text-xs">Officer</span><span className="text-white">{viewCase.officer}</span></div>
                  <div><span className="text-gray-400 block text-xs">Type</span><span className="text-white">{viewCase.type}</span></div>
                  <div><span className="text-gray-400 block text-xs">Priority</span><span className="text-white">{viewCase.priority}</span></div>
                  <div><span className="text-gray-400 block text-xs">Risk Score</span><span className={cn("font-mono font-bold", riskColor(viewCase.riskScore))}>{viewCase.riskScore}/100</span></div>
                  <div><span className="text-gray-400 block text-xs">Location</span><span className="text-white">{viewCase.location}</span></div>
                </div>
                {viewCase.notes && (
                  <div><span className="text-gray-400 block text-xs mb-1">Notes</span><p className="text-gray-300 text-sm">{viewCase.notes}</p></div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setViewCase(null); handleEdit(viewCase); }}
                  className="flex-1 py-2 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 hover:bg-blue-500/30 text-sm font-medium transition-all"
                >
                  Edit Case
                </button>
                <button
                  onClick={() => { setViewCase(null); router.push("/evidence"); }}
                  className="flex-1 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 text-sm font-medium transition-all"
                >
                  View Evidence
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
