"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Fingerprint, Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  async function onSubmit(data: LoginForm) {
    setIsLoading(true);
    console.log("Login attempt:", data);
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
    router.push("/dashboard");
  }

  const loading = isSubmitting || isLoading;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1020]">
      <div className="animate-grid-bg absolute inset-0" />
      <div className="scanline absolute inset-0 pointer-events-none z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 w-full max-w-md px-4"
      >
        <div className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,245,255,0.08)]">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <Shield className="w-10 h-10 text-cyan-400" />
              <div className="absolute inset-0 blur-xl bg-cyan-500/30 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-sans)] tracking-tight">
              AIVENTRA
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Forensic Intelligence System
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@agency.gov"
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition-all duration-200",
                  "focus:border-cyan-500/50 focus:shadow-[0_0_12px_rgba(0,245,255,0.15)]",
                  errors.email
                    ? "border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                    : "border-white/10"
                )}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                  className={cn(
                    "w-full px-4 py-2.5 pr-10 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition-all duration-200",
                    "focus:border-cyan-500/50 focus:shadow-[0_0_12px_rgba(0,245,255,0.15)]",
                    errors.password
                      ? "border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                      : "border-white/10"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register("remember")}
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 accent-cyan-400"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2",
                "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
              <Fingerprint size={16} className="text-cyan-500/50" />
              <span>Biometric Auth — Coming Soon</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          &copy; {new Date().getFullYear()} AIVENTRA. Restricted access.
        </p>
      </motion.div>
    </div>
  );
}
