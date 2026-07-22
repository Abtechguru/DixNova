import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

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
        <AdminHeader />

        {/* Content Body */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
