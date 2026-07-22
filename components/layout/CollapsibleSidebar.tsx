"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Users, 
  Building2, 
  FileText, 
  Star, 
  Target, 
  Layers, 
  Database, 
  Eraser, 
  BarChart3, 
  TrendingUp, 
  CheckCheck, 
  Rocket, 
  Send,
  UploadCloud,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Lock,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import bgImg from '@/app/public/bg.jpg';

export interface NavGroup {
  title: string;
  items: {
    name: string;
    href: string;
    icon: any;
    star?: boolean;
    badge?: string;
  }[];
}

export const PRESENTATION_NAV_GROUPS: NavGroup[] = [
  {
    title: 'Strategic Alignment (1-7)',
    items: [
      { name: '1. Landing Page', href: '/', icon: Home },
      { name: '2. Team (DixNova)', href: '/team', icon: Users },
      { name: '3. About SmartMove', href: '/about-smartmove', icon: Building2 },
      { name: '4. Problem Statement', href: '/problem-statement', icon: FileText },
      { name: '5. Executive Summary ⭐', href: '/executive-summary', icon: Star, star: true },
      { name: '6. Project Objectives', href: '/objectives', icon: Target },
      { name: '7. Our Solution', href: '/solution', icon: Layers },
    ]
  },
  {
    title: 'Technical Deep Dive (8-17)',
    items: [
      { name: '8. Dataset Overview', href: '/dataset-overview', icon: Database },
      { name: '9. Data Preparation', href: '/data-preparation', icon: Eraser },
      { name: '10. Data Modeling', href: '/data-modeling', icon: Layers },
      { name: '11. KPI Framework', href: '/kpi-framework', icon: BarChart3 },
      { name: '12. Command Center', href: '/dashboard', icon: BarChart3, badge: 'LIVE' },
      { name: '13. Insights', href: '/dashboard/insights', icon: TrendingUp },
      { name: '14. Recommendations', href: '/recommendations', icon: CheckCheck },
      { name: '15. Business Impact', href: '/business-impact', icon: TrendingUp },
      { name: '16. Future Roadmap', href: '/roadmap', icon: Rocket },
      { name: '17. Contact / Thank You', href: '/contact', icon: Send },
    ]
  }
];

export const ADMIN_NAV_GROUP: NavGroup = {
  title: 'Admin Control Hub (Restricted)',
  items: [
    { name: 'Admin Overview', href: '/admin', icon: ShieldCheck, badge: 'ADMIN' },
    { name: 'Upload Dataset', href: '/admin/data', icon: UploadCloud },
    { name: 'Team Roster', href: '/admin/team', icon: Users },
    { name: 'Problem Brief', href: '/admin/problems', icon: FileText },
    { name: 'System Settings', href: '/admin/settings', icon: Sliders },
  ]
};

export function CollapsibleSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie.includes('dixnova_admin_session=authenticated');
    const hasLocalStorage = Boolean(localStorage.getItem('dixnova_admin_user'));
    setIsAdminLoggedIn(hasCookie || hasLocalStorage);
  }, [pathname]);

  const handleAdminLogout = () => {
    localStorage.removeItem('dixnova_admin_user');
    document.cookie = 'dixnova_admin_session=; path=/; max-age=0';
    setIsAdminLoggedIn(false);
    router.push('/admin/login');
  };

  return (
    <aside className={cn(
      "bg-navy-950/95 border-r border-slate-800/80 flex flex-col h-screen sticky top-0 shrink-0 select-none z-40 font-sans transition-all duration-300 backdrop-blur-md",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Brand Header with Expand / Collapse Toggle */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shadow-xl group-hover:scale-105 transition-transform bg-slate-900 shrink-0">
            <Image
              src={bgImg}
              alt="DixNova Logo"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-base font-black text-white tracking-tight truncate leading-tight">
                Dix<span className="text-amber-400">Nova</span>
              </h1>
              <p className="text-[9px] text-amber-300 font-semibold tracking-wider uppercase truncate">
                Driven by Data
              </p>
            </div>
          )}
        </Link>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Enlarge Sidebar" : "Collapse Sidebar"}
          className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 text-slate-400 hover:text-amber-400 transition-all cursor-pointer"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        {PRESENTATION_NAV_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-2 truncate">
                {group.title}
              </p>
            )}

            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.name : undefined}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative",
                      isActive 
                        ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black shadow-md" 
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon size={18} className={cn("shrink-0 transition-colors", isActive ? "text-slate-950" : "text-slate-400 group-hover:text-slate-200")} />
                      {!collapsed && (
                        <span className="truncate flex items-center gap-1">
                          {item.name}
                          {item.star && <Star size={12} className="text-amber-400 fill-amber-400 inline shrink-0" />}
                        </span>
                      )}
                    </div>

                    {!collapsed && item.badge && (
                      <span className={cn(
                        "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0",
                        isActive ? "bg-slate-950 text-amber-400 border-amber-400/40" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      )}>
                        {item.badge}
                      </span>
                    )}

                    {collapsed && isActive && (
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-slate-950" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}

        {/* RESTRICTED ADMIN SECTION */}
        <div className="space-y-1 pt-2 border-t border-slate-800/80">
          {!collapsed && (
            <p className="px-3 text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400 mb-2 truncate flex items-center gap-1">
              <Lock size={11} />
              <span>{ADMIN_NAV_GROUP.title}</span>
            </p>
          )}

          {isAdminLoggedIn ? (
            <nav className="space-y-1">
              {ADMIN_NAV_GROUP.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.name : undefined}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative",
                      isActive 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black shadow-md" 
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon size={18} className={cn("shrink-0 transition-colors", isActive ? "text-slate-950" : "text-emerald-400 group-hover:text-emerald-300")} />
                      {!collapsed && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </div>

                    {!collapsed && item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          ) : (
            <Link
              href="/admin/login"
              title={collapsed ? "Admin Portal Access (Restricted)" : undefined}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Lock size={18} className="text-amber-400 shrink-0" />
                {!collapsed && (
                  <span className="truncate">Admin Login (Restricted)</span>
                )}
              </div>
              {!collapsed && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-yellow-300 border border-yellow-400/30 shrink-0">
                  AUTH
                </span>
              )}
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-black text-xs shrink-0">
            DN
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">DixNova BI</p>
              <p className="text-[9px] text-emerald-400 font-mono font-semibold">
                {isAdminLoggedIn ? 'Admin Session' : 'Driven by Data'}
              </p>
            </div>
          )}
        </div>

        {isAdminLoggedIn && !collapsed && (
          <button
            onClick={handleAdminLogout}
            title="Logout Admin"
            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
          </button>
        )}
      </div>
    </aside>
  );
}
