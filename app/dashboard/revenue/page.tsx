"use client"
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { RouteRevenueChart } from '@/components/dashboard/Charts';

export default function RevenuePage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Revenue Intelligence" />
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Monthly Fare Revenue</span>
              <p className="text-2xl font-bold text-emerald-400 mt-2">₦5.42 Billion</p>
              <p className="text-xs text-emerald-400 mt-2">+12.4% vs last month</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Digital Ticketing Ratio</span>
              <p className="text-2xl font-bold text-white mt-2">91.5%</p>
              <p className="text-xs text-slate-400 mt-2">Zero cash leakage policy target met</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Avg Revenue Per Vehicle</span>
              <p className="text-2xl font-bold text-blue-400 mt-2">₦148,900 / day</p>
              <p className="text-xs text-emerald-400 mt-2">+5.2% operational margin</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Revenue by Corridor (Millions ₦)</h3>
            <RouteRevenueChart />
          </div>
        </main>
      </div>
    </div>
  );
}
