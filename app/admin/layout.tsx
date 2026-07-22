import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Shield, CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Control Center | DixNova Transit Analytics',
  description: 'Manage data feeds, team members, problem statements, and system settings.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col md:flex-row selection:bg-emerald-500 selection:text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Header */}
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
              href="/team"
              target="_blank"
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors hidden sm:flex items-center gap-1 font-medium"
            >
              <span>Public Team</span>
              <ExternalLink size={12} />
            </Link>

            <Link
              href="/problem-statement"
              target="_blank"
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors hidden sm:flex items-center gap-1 font-medium"
            >
              <span>Problem Statement</span>
              <ExternalLink size={12} />
            </Link>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-white">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black">
                A
              </div>
              <span className="hidden sm:inline">Administrator</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
