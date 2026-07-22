"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Layers, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Code, 
  Table, 
  Workflow
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';

export default function DataModelingPage() {
  const daxMeasures = [
    { name: 'Total Fare Revenue ₦', formula: 'SUM(Fact_Ticketing[FareAmount])', desc: 'Aggregates daily fare collection across all transit corridors.' },
    { name: 'On-Time Performance %', formula: 'DIVIDE(CALCULATE(COUNT(Fact_Trips[ID]), Fact_Trips[DelayMin] <= 5), COUNT(Fact_Trips[ID]), 0)', desc: 'Calculates the ratio of trips departing on schedule.' },
    { name: 'Fleet Utilization %', formula: 'AVERAGE(Fact_Fleet[OccupancyRate])', desc: 'Computes average vehicle capacity utilization.' },
    { name: 'Fare Revenue Variance', formula: 'SUM(Fact_Ticketing[FareAmount]) - SUM(Dim_Routes[TargetRevenue])', desc: 'Detects cash fare leakage anomalies across stops.' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-400 uppercase tracking-widest">
            <Layers size={15} className="animate-pulse" />
            <span>STEP 10 OF 17 • STAR SCHEMA DAX MODEL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Data <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Modeling</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Architecting a high-performance Star Schema relational data model in Microsoft Power BI with custom DAX Time Intelligence business measures.
          </p>
        </section>

        {/* STAR SCHEMA ARCHITECTURE */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">RELATIONAL SCHEMA</span>
            <h2 className="text-3xl font-black text-white">Star Schema Relational Architecture</h2>
            <p className="text-xs sm:text-sm text-slate-300">Central Fact tables connected to Dimension lookup tables via 1-to-Many relationships.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold">DIMENSION TABLE</span>
              <h3 className="text-base font-bold text-white">Dim_Routes</h3>
              <p className="text-xs text-slate-400">RouteID [PK] • CorridorName • TerminalOrigin • TargetRevenue</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-950 border-2 border-purple-500/50 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">CENTRAL FACT TABLE</span>
              <h3 className="text-lg font-black text-white">Fact_Trips & Fact_Ticketing</h3>
              <p className="text-xs text-slate-200">TripID [PK] • RouteID [FK] • BusID [FK] • PassengerCount • FareAmount • DelayMin</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold">DIMENSION TABLE</span>
              <h3 className="text-base font-bold text-white">Dim_Buses & Dim_Date</h3>
              <p className="text-xs text-slate-400">BusID [PK] • FuelType • Capacity • DateKey [PK] • MonthName</p>
            </div>
          </div>
        </section>

        {/* DAX MEASURES GRID */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">DAX MEASURES LIBRARY</span>
            <h2 className="text-2xl font-black text-white">Custom Power BI DAX Formulas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {daxMeasures.map((d, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg backdrop-blur-md">
                <h3 className="text-sm font-black text-white">{d.name}</h3>
                <code className="text-xs font-mono text-cyan-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 block truncate">
                  {d.formula}
                </code>
                <p className="text-xs text-slate-400">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">NEXT EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 11: KPI Framework</h3>
            <p className="text-xs text-slate-300">Discover the target thresholds and conditional formatting framework.</p>
          </div>

          <Link href="/kpi-framework">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-purple-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Continue to KPI Framework</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-purple-400 font-semibold tracking-wide">Driven by Data</span>
      </footer>
    </PresentationLayout>
  );
}
