"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  Globe, 
  Phone, 
  Users, 
  Building2, 
  Star,
  Award
} from 'lucide-react';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';

export default function ContactThankYouPage() {
  return (
    <PresentationLayout>
      <JudgesNavigation />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <CheckCircle2 size={15} className="animate-pulse" />
            <span>STEP 17 OF 17 • PRESENTATION CONCLUSION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Thank You, <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">Judges!</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            DixNova is proud to present this enterprise Transportation Intelligence Platform designed for SmartMove Nigeria.
          </p>
        </section>

        {/* THANK YOU CARD */}
        <section className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl p-8 sm:p-14 bg-slate-900/95 text-center space-y-6 backdrop-blur-md max-w-4xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 mx-auto shadow-xl">
            <Award size={32} />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Driven by Data • Built by DixNova
          </h2>

          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
            Our team of 7 data engineers, BI architects, and software specialists built an end-to-end production solution transforming raw transit data into actionable municipal intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/team">
              <button className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer">
                Meet Team DixNova
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all cursor-pointer">
                Explore Command Center
              </button>
            </Link>
          </div>
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
