"use client"
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { FleetStatusPieChart } from '@/components/dashboard/Charts';

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Fleet Telemetry & Diagnostics" />
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Active Fleet</span>
              <p className="text-2xl font-bold text-emerald-400 mt-2">1,240 Buses</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Avg Fuel Efficiency</span>
              <p className="text-2xl font-bold text-white mt-2">4.2 km / L</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Electric / CNG Fleet</span>
              <p className="text-2xl font-bold text-blue-400 mt-2">320 Clean Buses</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">GPS Signal Connectivity</span>
              <p className="text-2xl font-bold text-emerald-400 mt-2">99.8%</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Fleet Telemetry Health Breakdown</h3>
            <FleetStatusPieChart />
          </div>
        </main>
      </div>
    </div>
  );
}
