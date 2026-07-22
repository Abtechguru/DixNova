"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Bus, 
  MapPin, 
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

const navItems = [
  { name: 'Executive Command', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Passenger Analytics', href: '/dashboard/passengers', icon: Users },
  { name: 'Revenue Intelligence', href: '/dashboard/revenue', icon: DollarSign },
  { name: 'Fleet Telemetry', href: '/dashboard/fleet', icon: Bus },
  { name: 'Route Performance', href: '/dashboard/routes', icon: MapPin },
  { name: 'Predictive Insights', href: '/dashboard/insights', icon: TrendingUp },
  { name: 'Power BI Embedded', href: '/dashboard/powerbi', icon: BarChart3, badge: 'BI' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-950/95 border-r border-slate-800/80 flex flex-col h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header with official DN Logo */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo size="sm" />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-extrabold text-white">Dix<span className="text-emerald-400">Nova</span></span>
            </div>
            <p className="text-[9px] text-slate-400 tracking-wider font-semibold uppercase">Innovation driven by data</p>
          </div>
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Core Command</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                    isActive 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20 font-semibold" 
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={cn("transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200")} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Integration Status Box */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Power BI Service</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <p className="text-[11px] font-semibold text-slate-200">Connected to Fabric Data Lake</p>
          <p className="text-[10px] text-slate-400">Sync Frequency: Live 15s</p>
        </div>
      </div>

      {/* Footer Profile Mini */}
      <div className="p-4 border-t border-slate-800/80 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white">
          TA
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-200 truncate">Transport Authority</p>
          <p className="text-[10px] text-slate-400 truncate">Federal Ministry of Transport</p>
        </div>
      </div>
    </aside>
  );
}
