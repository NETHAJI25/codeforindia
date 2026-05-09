"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Shield, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotForm) {
    setIsLoading(true);
    await forgotPassword(data.email);
    setIsLoading(false);
    setSent(true);
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
              Reset Password
            </h1>
            <p className="text-sm text-gray-400 mt-1 text-center">
              {sent
                ? "Check your inbox for the reset link"
                : "Enter your email to receive a reset link"}
            </p>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 py-4"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
              >
                <CheckCircle2 size={56} className="text-emerald-400" />
              </motion.div>
              <p className="text-sm text-gray-300 text-center">
                Reset link sent to{" "}
                <span className="text-cyan-400 font-mono">your email</span>.
                It expires in 30 minutes.
              </p>
              <Link
                href="/login"
                className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Back to login
              </Link>
            </motion.div>
          ) : (
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
                    Sending link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}

          {!sent && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          &copy; {new Date().getFullYear()} AIVENTRA. Restricted access.
        </p>
      </motion.div>
    </div>
  );
}
