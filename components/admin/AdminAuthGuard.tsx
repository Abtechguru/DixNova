"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, ShieldAlert, KeyRound } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // If on login page, no guard needed
    if (pathname === '/admin/login') {
      setChecking(false);
      setAuthenticated(true);
      return;
    }

    // Check authentication session
    const hasCookie = document.cookie.includes('dixnova_admin_session=authenticated');
    const hasLocalStorage = Boolean(localStorage.getItem('dixnova_admin_user'));

    if (hasCookie || hasLocalStorage) {
      setAuthenticated(true);
      setChecking(false);
    } else {
      setAuthenticated(false);
      setChecking(false);
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="h-screen w-screen bg-navy-950 flex flex-col items-center justify-center space-y-4 text-slate-100 font-sans">
        <Loader2 size={36} className="animate-spin text-amber-400" />
        <p className="text-xs font-mono font-bold text-slate-400">Verifying Admin Access Credentials...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="h-screen w-screen bg-navy-950 flex flex-col items-center justify-center p-6 text-center space-y-4 text-slate-100 font-sans">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center">
          <ShieldAlert size={32} />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white">Access Denied • Admin Authentication Required</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You must be logged in with admin credentials (dixnova@admin) to access the Admin Control Center.
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/login')}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
        >
          Go to Admin Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
