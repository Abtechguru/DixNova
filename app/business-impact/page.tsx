"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Bus, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Award, 
  PieChart
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';

export default function BusinessImpactPage() {
  const impacts = [
    { title: '25% Revenue Leakage Recovery', metric: '+₦120M Reconciled', desc: 'Plugged cash handling audit gaps via automated card tap reconciliation.', color: 'text-amber-400' },
    { title: '35% Reduced Commuter Wait Time', metric: '14 Min Saved', desc: 'Surge dispatch algorithms lowered peak corridor queue lengths.', color: 'text-blue-400' },
    { title: '40% Breakdown Cost Avoidance', metric: '₦32M Saved', desc: 'Predictive sensor telemetry prevented costly roadside engine overhauls.', color: 'text-emerald-400' },
    { title: '18% Fuel Efficiency Gain', metric: '85,000L Saved', desc: 'Optimized speed limits and idling reduction along congested corridors.', color: 'text-purple-400' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Award size={15} className="animate-pulse" />
            <span>STEP 15 OF 17 • BUSINESS IMPACT & ROI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Business <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">Impact</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Quantifiable financial returns, public commuter satisfaction gains, and municipal operational excellence.
          </p>
        </section>

        {/* IMPACT CARDS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((i, idx) => (
            <div key={idx} className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 backdrop-blur-md text-center">
              <span className={`text-3xl font-black ${i.color}`}>{i.metric}</span>
              <h3 className="text-base font-bold text-white">{i.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{i.desc}</p>
            </div>
          ))}
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">NEXT EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 16: Future Roadmap</h3>
            <p className="text-xs text-slate-300">Inspect upcoming AI dispatch models and IoT sensor expansions.</p>
          </div>

          <Link href="/roadmap">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Continue to Future Roadmap</span>
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
