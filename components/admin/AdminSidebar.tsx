"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Users, 
  FileText, 
  Sliders, 
  ArrowLeft, 
  ShieldCheck,
  Activity,
  Menu,
  X
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Upload Analysis Data', href: '/admin/data', icon: UploadCloud },
    { name: 'Manage Team & Photos', href: '/admin/team', icon: Users },
    { name: 'Problem Statement Sections', href: '/admin/problems', icon: FileText },
    { name: 'General Settings & Controls', href: '/admin/settings', icon: Sliders },
  ];

  return (
    <>
      {/* Mobile Header Toggle Bar */}
      <div className="md:hidden sticky top-0 z-50 bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between backdrop-blur-md">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white">
            <ShieldCheck size={18} />
          </div>
          <span className="text-base font-black text-white">Dix<span className="text-emerald-400">Nova Admin</span></span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="md:hidden fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40" 
        />
      )}

      {/* Sidebar Container (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed md:sticky top-0 z-50 md:z-40 h-screen w-64 bg-slate-900/95 border-r border-slate-800/80 flex flex-col justify-between shrink-0 backdrop-blur-md transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white">Dix<span className="text-emerald-400">Nova</span></span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">ADMIN</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Control & Data Operations</p>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
              Management Portal
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/10 text-emerald-400 border border-emerald-500/30 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer System Status & Return Link */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Activity size={12} className="text-emerald-400 animate-pulse" />
                Engine Status
              </span>
              <span className="text-emerald-400 font-mono font-bold">ONLINE</span>
            </div>
            <p className="text-[10px] text-slate-500">Database Engine: Active</p>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700/60 shadow"
          >
            <ArrowLeft size={14} />
            <span>Return to Command Center</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
