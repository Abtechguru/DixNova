"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, CheckCircle2, ExternalLink, LogOut, User } from 'lucide-react';

export function AdminHeader() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<string>('dixnova@admin');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dixnova_admin_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.username) setAdminUser(parsed.username);
      }
    } catch (e) {
      // fallback
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dixnova_admin_user');
    document.cookie = 'dixnova_admin_session=; path=/; max-age=0';
    router.push('/admin/login');
  };

  return (
    <header className="px-4 sm:px-8 py-4 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-sm sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Shield size={18} className="text-emerald-400 shrink-0" />
          <span className="truncate">Admin Management Hub</span>
        </h1>
        <span className="text-slate-600 hidden sm:inline">|</span>
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-800">
          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
          <span>Live Data Persistence Enabled</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <Link
          href="/solution"
          target="_blank"
          className="text-xs text-slate-400 hover:text-emerald-400 transition-colors hidden sm:flex items-center gap-1 font-medium"
        >
          <span>Public Solution</span>
          <ExternalLink size={12} />
        </Link>

        <Link
          href="/dashboard"
          target="_blank"
          className="text-xs text-slate-400 hover:text-emerald-400 transition-colors hidden sm:flex items-center gap-1 font-medium"
        >
          <span>Command Center</span>
          <ExternalLink size={12} />
        </Link>

        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        {/* User Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-white">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black">
            <User size={14} />
          </div>
          <span className="font-mono text-emerald-300 hidden sm:inline">{adminUser}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <LogOut size={13} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
