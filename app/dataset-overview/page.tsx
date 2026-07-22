"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Database, 
  FileSpreadsheet, 
  Layers, 
  Table, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Server, 
  Cpu, 
  Download
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';

export default function DatasetOverviewPage() {
  const tables = [
    { name: 'Fact_Trips', records: '50,000+', desc: 'Trip dispatches, departure delays, passenger counts, and corridor speed pings.', schema: 'Fact Table' },
    { name: 'Fact_Ticketing', records: '124,000+', desc: 'Electronic card swipes, paper fare sales, and operator revenue reconciliations.', schema: 'Fact Table' },
    { name: 'Dim_Routes', records: '24 Corridors', desc: 'Corridor names, terminal origin-destinations, and municipal agency mappings.', schema: 'Dimension Table' },
    { name: 'Dim_Buses', records: '850+ Vehicles', desc: 'Bus IDs, fuel types (CNG/Diesel), active status, and maintenance engine logs.', schema: 'Dimension Table' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-400 uppercase tracking-widest">
            <Database size={15} className="animate-pulse" />
            <span>STEP 8 OF 17 • TECHNICAL DEEP DIVE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Dataset <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Overview</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Examining the raw GTFS, ticketing transactions, and vehicle telematics datasets ingested into the DixNova database engine.
          </p>
        </section>

        {/* DATASET TABLES GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tables.map((t, idx) => (
            <div key={idx} className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                  {t.schema}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">{t.records}</span>
              </div>
              <h3 className="text-xl font-black text-white">{t.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">NEXT EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 9: Data Preparation & Cleaning</h3>
            <p className="text-xs text-slate-300">Inspect the 6-stage ETL workflow and Power Query transformations.</p>
          </div>

          <Link href="/data-preparation">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-blue-600/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Continue to Data Preparation</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-blue-400 font-semibold tracking-wide">Driven by Data</span>
      </footer>
    </PresentationLayout>
  );
}
