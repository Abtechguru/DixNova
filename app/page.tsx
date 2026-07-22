"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Bus, 
  DollarSign
} from 'lucide-react';
import dix0Img from '@/app/public/dix0.jpeg';
import bgImg from '@/app/public/bg.jpg';

export default function Home() {
  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative selection:bg-amber-500 selection:text-white font-sans">
      
      {/* 1. SINGLE PAGE BACKGROUND IMAGE (dix0.jpeg) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={dix0Img}
          alt="Lagos Public Transportation Background"
          priority
          fill
          className="object-fill w-full h-full filter brightness-105 contrast-105"
        />
        
        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />
      </div>

      {/* 2. TOP HEADER WITH bg.jpg AS LOGO AT TOP LEFT CORNER */}
      <header className="relative z-30 px-6 sm:px-12 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Brand Logo Using bg.jpg at Top Left Corner */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl group-hover:scale-105 transition-transform bg-slate-900">
            <Image
              src={bgImg}
              alt="DixNova Logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
              Dix<span className="text-amber-400">Nova</span>
            </span>
            <p className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase">
              Innovation Driven By Data
            </p>
          </div>
        </Link>

      </header>

      {/* 3. CENTER HERO - TEXT REMOVED, EXTREME RIGHT END ACTION BUTTON ONLY */}
      <main className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-end justify-center pb-8">
        <Link href="/problem-statement" className="self-end">
          <button className="relative group inline-flex items-center justify-center gap-4 px-10 py-4.5 sm:px-12 sm:py-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg sm:text-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/80 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/40 backdrop-blur-md overflow-hidden cursor-pointer">
            <FileText size={24} className="relative z-10 text-white" />
            <span className="relative z-10 tracking-wide uppercase">Problem Statement</span>
            <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </Link>
      </main>

      {/* 4. FOCUS AREAS GLASS CARDS */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 pb-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Passenger Demand */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-slate-800/80 backdrop-blur-md shadow-xl flex items-center gap-4 hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
              <Users size={22} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-white">Passenger Demand</h3>
              <p className="text-[11px] text-slate-300 leading-tight">
                Surge commuter dispatch models.
              </p>
            </div>
          </div>

          {/* Card 2: Fleet Utilization */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-slate-800/80 backdrop-blur-md shadow-xl flex items-center gap-4 hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
              <Bus size={22} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-white">Fleet Utilization</h3>
              <p className="text-[11px] text-slate-300 leading-tight">
                GPS telematics & engine telemetry.
              </p>
            </div>
          </div>

          {/* Card 3: Revenue Performance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-slate-800/80 backdrop-blur-md shadow-xl flex items-center gap-4 hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
              <DollarSign size={22} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-white">Revenue Performance</h3>
              <p className="text-[11px] text-slate-300 leading-tight">
                Automated fare collection audit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="relative z-20 px-8 py-3.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 bg-slate-950/85 backdrop-blur-md">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <Link href="/team" className="hover:text-amber-400 transition-colors">
            Team
          </Link>
          <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
            Command Center
          </Link>
          <span className="text-amber-400 font-semibold tracking-wide">
            Innovation Driven by Data
          </span>
        </div>
      </footer>
    </div>
  );
}
