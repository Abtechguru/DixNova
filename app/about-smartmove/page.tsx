"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  Bus, 
  MapPin, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Clock, 
  ChevronRight
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';
import dix0Img from '@/app/public/dix0.jpeg';

export default function AboutSmartMovePage() {
  const transitStats = [
    { title: 'Municipal Fleet', value: '850+ Buses', desc: 'Active BRT & municipal bus inventory', color: 'text-amber-400' },
    { title: 'Daily Commuters', value: '450,000+', desc: 'Commuters served daily across Lagos & FCT', color: 'text-blue-400' },
    { title: 'Corridor Coverage', value: '24 Corridors', desc: 'Primary transit corridors monitored live', color: 'text-emerald-400' },
    { title: 'Tech Partner', value: 'DixNova', desc: 'Data & software technology partner', color: 'text-purple-400' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Building2 size={15} className="animate-pulse" />
            <span>STEP 3 OF 17 • CLIENT PROFILE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            About <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">SmartMove Nigeria</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            SmartMove Nigeria is a premier public transportation operator dedicated to modernizing municipal transit, improving bus availability, and delivering reliable mobility for millions of commuters across Nigeria.
          </p>
        </section>

        {/* TRANSIT FLEET OVERVIEW CARD */}
        <section className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl p-8 sm:p-14 bg-slate-900/90 backdrop-blur-md">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image src={dix0Img} alt="SmartMove Fleet" fill sizes="100vw" className="object-cover" />
          </div>

          <div className="relative z-10 space-y-6 max-w-3xl">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-widest inline-block">
              CLIENT MISSION
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Pioneering Intelligent Urban Mobility in Nigeria
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed bg-slate-950/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
              SmartMove Nigeria partnered with technology leader <strong className="text-amber-400">DixNova</strong> to replace fragmented paper logs and Excel spreadsheets with a state-of-the-art Power BI Fabric analytics platform.
            </p>
          </div>
        </section>

        {/* TRANSIT STATS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {transitStats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl text-center space-y-2 backdrop-blur-md">
              <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
              <h3 className="text-sm font-bold text-white">{stat.title}</h3>
              <p className="text-xs text-slate-400">{stat.desc}</p>
            </div>
          ))}
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">NEXT EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 4: Problem Statement Brief</h3>
            <p className="text-xs text-slate-300">Discover the operational challenges motivating the DixNova solution.</p>
          </div>

          <Link href="/problem-statement">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Continue to Problem Statement</span>
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
