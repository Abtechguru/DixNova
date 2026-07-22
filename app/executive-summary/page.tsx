"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  Users, 
  Bus, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  ChevronRight,
  Target
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';
import dix0Img from '@/app/public/dix0.jpeg';

export default function ExecutiveSummaryPage() {
  const highlights = [
    { title: 'The Opportunity', desc: 'Municipal transit authorities collect millions of records, but 80% remains locked in fragmented department spreadsheets.', icon: Target, color: 'from-blue-500 to-indigo-600' },
    { title: 'The DixNova Solution', desc: 'An enterprise Microsoft Power BI Fabric command center with automated ETL hygiene, Star Schema DAX modeling & live telemetry REST APIs.', icon: Sparkles, color: 'from-amber-500 to-orange-500' },
    { title: 'Quantifiable Impact', desc: '25% revenue leakage recovered, 35% commuter wait time reduction, and 40% lower unplanned vehicle breakdown costs.', icon: TrendingUp, color: 'from-emerald-500 to-teal-600' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Star size={15} className="fill-amber-400 text-amber-400" />
            <span>STEP 5 OF 17 • EXECUTIVE SUMMARY ⭐</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Executive <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">Summary</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            A high-level synthesis for hackathon judges detailing the problem, solution, architecture, and business outcomes achieved by DixNova.
          </p>
        </section>

        {/* PROMINENT SUMMARY CARD */}
        <section className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl p-8 sm:p-14 bg-slate-900/95 backdrop-blur-md">
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            <Image src={dix0Img} alt="Executive Summary" fill sizes="100vw" className="object-cover" />
          </div>

          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-widest">
                JUDGES QUICK REFERENCE
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                100% PRODUCTION READY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Transforming Transit Data Into Actionable Intelligence
            </h2>

            <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed">
              <p className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
                Public transportation operators across Nigeria face traffic congestion, vehicle breakdowns, rising fuel costs, and revenue leakage. Although rich data is collected daily, transport planners lack real-time visibility due to fragmented spreadsheets and manual reporting.
              </p>
              <p className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
                DixNova delivered a complete, reusable <strong className="text-amber-400">Transportation Intelligence Platform</strong> powered by Microsoft Power BI Fabric, automated ETL data cleaning, Star Schema relational modeling, and real-time REST API telemetry feeds.
              </p>
            </div>
          </div>
        </section>

        {/* 3 HIGHLIGHT CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div key={idx} className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${h.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-black text-white">{h.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{h.desc}</p>
              </div>
            );
          })}
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">NEXT EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 6: Project Objectives</h3>
            <p className="text-xs text-slate-300">Discover the 6 core goals and scope boundaries of the platform.</p>
          </div>

          <Link href="/objectives">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Continue to Objectives</span>
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
