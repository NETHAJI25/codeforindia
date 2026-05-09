import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(date: string): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "y"], [2592000, "mo"], [86400, "d"],
    [3600, "h"], [60, "m"], [1, "s"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count}${label} ago`;
  }
  return "just now";
}

export function severityColor(severity: string): string {
  switch (severity) {
    case "Critical": return "text-red-400 border-red-500/40 bg-red-500/10";
    case "High": return "text-amber-400 border-amber-500/40 bg-amber-500/10";
    case "Medium": return "text-yellow-400 border-yellow-500/40 bg-yellow-500/10";
    case "Low": return "text-green-400 border-green-500/40 bg-green-500/10";
    default: return "text-gray-400 border-gray-500/40 bg-gray-500/10";
  }
}

export function priorityColor(priority: string): string {
  switch (priority) {
    case "Critical": return "text-red-400";
    case "High": return "text-amber-400";
    case "Medium": return "text-yellow-400";
    case "Low": return "text-green-400";
    default: return "text-gray-400";
  }
}

export function riskColor(score: number): string {
  if (score >= 70) return "text-red-400";
  if (score >= 40) return "text-amber-400";
  return "text-green-400";
}

export function riskBgColor(score: number): string {
  if (score >= 70) return "bg-red-500/20 border-red-500/40";
  if (score >= 40) return "bg-amber-500/20 border-amber-500/40";
  return "bg-green-500/20 border-green-500/40";
}
