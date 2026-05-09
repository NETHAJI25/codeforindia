"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  badgeId: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: string; badgeId: string }) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const name = email.split("@")[0].replace(/[.]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    setUser({
      name,
      email,
      role: email.includes("investigator") ? "Investigator"
        : email.includes("analyst") ? "Forensic Analyst"
        : email.includes("admin") ? "Admin"
        : email.includes("medical") ? "Medical Officer"
        : "Investigator",
      badgeId: `INV-${Math.floor(100 + Math.random() * 900)}`,
    });
  }, []);

  const register = useCallback(async (data: { name: string; email: string; password: string; role: string; badgeId: string }) => {
    await new Promise(r => setTimeout(r, 800));
    setUser({
      name: data.name,
      email: data.email,
      role: data.role,
      badgeId: data.badgeId,
    });
  }, []);

  const forgotPassword = useCallback(async (_email: string) => {
    await new Promise(r => setTimeout(r, 1000));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
