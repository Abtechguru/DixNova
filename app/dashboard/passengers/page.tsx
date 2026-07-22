"use client"
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { PassengerDemandChart } from '@/components/dashboard/Charts';

export default function PassengersPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Passenger Intelligence" />
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Peak Hour Demand</span>
              <p className="text-2xl font-bold text-white mt-2">52,400 <span className="text-xs font-normal text-slate-400">passengers/hr</span></p>
              <p className="text-xs text-emerald-400 mt-2">17:00 - 19:00 Evening Rush</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Top Ticket Category</span>
              <p className="text-2xl font-bold text-emerald-400 mt-2">Contactless Smartcard</p>
              <p className="text-xs text-slate-400 mt-2">78% of total commuter check-ins</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Customer Satisfaction</span>
              <p className="text-2xl font-bold text-blue-400 mt-2">4.8 / 5.0</p>
              <p className="text-xs text-emerald-400 mt-2">+0.3 rating improvement</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Passenger Growth & Hourly Density</h3>
            <PassengerDemandChart />
          </div>
        </main>
      </div>
    </div>
  );
}
