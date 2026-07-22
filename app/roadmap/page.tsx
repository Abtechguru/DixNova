"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Rocket, 
  Cpu, 
  Wifi, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Clock
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';

export default function RoadmapPage() {
  const roadmap = [
    { phase: 'Phase 1 • Q3 2026', title: 'Automated GTFS-RT Telematics Feed Integration', status: 'In Progress', desc: 'Direct live GPS stream ingestion from 850 municipal buses.' },
    { phase: 'Phase 2 • Q4 2026', title: 'Predictive Passenger Demand Machine Learning', status: 'Upcoming', desc: 'Deploying neural network models for 30-minute surge prediction.' },
    { phase: 'Phase 3 • Q1 2027', title: 'National Multi-Modal Expansion', status: 'Planned', desc: 'Expanding platform coverage to Lagos Waterways & Abuja Rail Transit.' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-400 uppercase tracking-widest">
            <Rocket size={15} className="animate-pulse" />
            <span>STEP 16 OF 17 • FUTURE ROADMAP</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Future <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent">Roadmap</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Strategic technology roadmap for scaling DixNova transit intelligence nationwide.
          </p>
        </section>

        {/* ROADMAP TIMELINE */}
        <section className="space-y-6 max-w-4xl mx-auto">
          {roadmap.map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 backdrop-blur-md relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">{item.phase}</span>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  {item.status}
                </span>
              </div>
              <h3 className="text-xl font-black text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">FINAL EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 17: Contact / Thank You</h3>
            <p className="text-xs text-slate-300">Conclude presentation with DixNova contacts & team credentials.</p>
          </div>

          <Link href="/contact">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Go to Final Step: Contact</span>
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
