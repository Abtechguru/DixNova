"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  Bus, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  CheckCheck
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';

export default function KPIFrameworkPage() {
  const kpis = [
    { title: 'Total Fare Revenue', target: '₦400M Target', cond: 'Green badge if ≥ ₦400M', desc: 'Aggregates electronic ticket transactions & cash reconciliations.', color: 'border-emerald-500/40 text-emerald-400' },
    { title: 'Total Passenger Volume', target: '1.4M Passengers', cond: 'Green badge if ≥ 1.4M', desc: 'Total commuter boardings across all 24 monitored corridors.', color: 'border-blue-500/40 text-blue-400' },
    { title: 'Fleet Utilization Rate', target: '85% Target', cond: 'Green badge if ≥ 85%', desc: 'Percentage of bus inventory actively dispatched on routes.', color: 'border-amber-500/40 text-amber-400' },
    { title: 'On-Time Performance', target: '90% Target', cond: 'Red badge if < 90%', desc: 'Trips departing within 5 minutes of scheduled departure time.', color: 'border-rose-500/40 text-rose-400' },
    { title: 'Total Maintenance Cost', target: 'Max ₦45M Budget', cond: 'Green badge if ≤ ₦45M', desc: 'Sum of preventive maintenance, tire replacements & overhaul costs.', color: 'border-purple-500/40 text-purple-400' },
    { title: 'Completed Trips Rate', target: '95% Target', cond: 'Green badge if ≥ 95%', desc: 'Percentage of scheduled bus runs completed without breakdown.', color: 'border-cyan-500/40 text-cyan-400' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <BarChart3 size={15} className="animate-pulse" />
            <span>STEP 11 OF 17 • KPI CONDITIONAL FRAMEWORK</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            KPI <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">Framework</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Six target KPI cards configured with automated Green/Red conditional formatting thresholds for real-time executive decision support.
          </p>
        </section>

        {/* KPI CARDS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((k, idx) => (
            <div key={idx} className={`p-7 rounded-3xl bg-slate-900/90 border-2 ${k.color} shadow-xl space-y-3 backdrop-blur-md flex flex-col justify-between`}>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">{k.target}</span>
                <h3 className="text-xl font-black text-white">{k.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{k.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 font-bold">{k.cond}</span>
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>
            </div>
          ))}
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">NEXT EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 12: Executive Command Center</h3>
            <p className="text-xs text-slate-300">Launch the live Command Center dashboard with real charts and corridor feeds.</p>
          </div>

          <Link href="/dashboard">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Launch Command Center</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-amber-400 font-semibold tracking-wide">Driven by Data</span>
      </footer>
    </PresentationLayout>
  );
}
