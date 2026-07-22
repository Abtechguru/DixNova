"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCheck, 
  TrendingUp, 
  Clock, 
  Wrench, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';

export default function RecommendationsPage() {
  const recommendations = [
    { title: 'Dynamic Surge Dispatch', impact: '35% Reduced Wait Times', desc: 'Reallocate 45 reserve CNG buses from low-demand corridors to Ikeja-CMS and Oshodi Express during 06:30–09:00 peak hours.', priority: 'HIGH PRIORITY' },
    { title: 'Automated Fare Reconciliation', impact: '₦85M Annual Savings', desc: 'Mandate contactless Cowry card tap-in/tap-out at all high-volume stops to eliminate unrecorded cash ticket collections.', priority: 'HIGH PRIORITY' },
    { title: 'Predictive Brake & Tyre Maintenance', impact: '40% Lower Breakdowns', desc: 'Deploy automated engine thermal sensors to service brake pads every 15,000 km, preventing corridor breakdowns.', priority: 'MEDIUM PRIORITY' },
    { title: 'Dedicated BRT Corridor Signal Priority', impact: '18% Speed Increase', desc: 'Collaborate with traffic management authorities to integrate GPS priority signaling along major arterial bottlenecks.', priority: 'MEDIUM PRIORITY' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <CheckCheck size={15} className="animate-pulse" />
            <span>STEP 14 OF 17 • STRATEGIC RECOMMENDATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Strategic <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">Recommendations</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Actionable, data-backed operational intervention strategies derived directly from Power BI Fabric analytics.
          </p>
        </section>

        {/* RECOMMENDATIONS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((r, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                    {r.priority}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">{r.impact}</span>
                </div>
                <h3 className="text-xl font-black text-white">{r.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{r.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Zap size={15} />
                <span>Immediate ROI Implementation</span>
              </div>
            </div>
          ))}
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">NEXT EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 15: Business Impact</h3>
            <p className="text-xs text-slate-300">Evaluate financial ROI and municipal public mobility gains.</p>
          </div>

          <Link href="/business-impact">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Continue to Business Impact</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-emerald-400 font-semibold tracking-wide">Driven by Data</span>
      </footer>
    </PresentationLayout>
  );
}
