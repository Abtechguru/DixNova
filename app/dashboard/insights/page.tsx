"use client"
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="AI Insights & Predictive Analytics" />
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-navy-900 to-emerald-950/40 border border-blue-500/30">
            <div className="flex items-center gap-3">
              <Brain size={24} className="text-emerald-400" />
              <div>
                <h2 className="text-lg font-bold text-white">DixNova AI Recommendation Engine</h2>
                <p className="text-xs text-slate-300">Automated insights derived from Power BI DAX modeling & telematics</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Highest Revenue Opportunity</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">CONFIDENCE: 98%</span>
              </div>
              <h3 className="text-base font-bold text-white">Extend Ikeja - CMS Express Frequency</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Passenger demand models project an un-served surge of ~4,500 commuters daily between 18:00 and 20:00. Increasing bus frequency by 2.5 mins will add ₦2.1M in daily fare revenue.
              </p>
              <Button size="sm" variant="gradient" className="gap-1.5 text-xs">
                <span>Apply Optimization Plan</span>
                <ArrowRight size={14} />
              </Button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Predictive Maintenance Warning</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold">URGENT</span>
              </div>
              <h3 className="text-base font-bold text-white">Engine Overheat Telemetry in 14 CNG Buses</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sensor logs indicate abnormal transmission thermal cycles on Oshodi BRT fleet. Scheduled servicing recommended immediately to prevent ₦18M repair cost.
              </p>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs text-amber-400 border-amber-500/30">
                <span>Schedule Depot Servicing</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
