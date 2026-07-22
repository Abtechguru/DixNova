"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Target, 
  Users, 
  DollarSign, 
  Bus, 
  Wrench, 
  Navigation, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Rocket, 
  Check, 
  ChevronRight,
  Database,
  FileSpreadsheet,
  Globe,
  Smartphone,
  Eye
} from 'lucide-react';
import bgImg from '@/app/public/bg.jpg';
import dix0Img from '@/app/public/dix0.jpeg';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';

export default function ObjectivesPage() {

  // Six Animated Objective Cards
  const sixObjectives = [
    {
      title: 'Passenger Analytics',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Demand Intelligence',
      description: 'Tracking origin-destination commuter surges, hourly terminal passenger volumes, and queue bottleneck patterns to minimize wait times.'
    },
    {
      title: 'Fleet Utilization',
      icon: Bus,
      color: 'from-amber-500 to-orange-500',
      badge: 'Capacity Optimization',
      description: 'Maximizing bus availability and dynamic vehicle dispatch during peak commuter rush hours across major municipal transit corridors.'
    },
    {
      title: 'Revenue Intelligence',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Financial Audit',
      description: 'Eliminating manual paper ticket fare leakage through digital automated fare auditing and operator revenue reconciliation.'
    },
    {
      title: 'Maintenance Analytics',
      icon: Wrench,
      color: 'from-rose-500 to-purple-600',
      badge: 'Predictive Telemetry',
      description: 'Deploying predictive telemetry sensors to monitor engine thermal health, component wear, and out-of-service breakdown frequencies.'
    },
    {
      title: 'Route Performance',
      icon: Navigation,
      color: 'from-purple-500 to-indigo-600',
      badge: 'Corridor Speeds',
      description: 'Evaluating corridor transit speeds, traffic bottleneck delays, scheduled vs actual arrival times, and route commuter throughput.'
    },
    {
      title: 'Interactive Dashboards',
      icon: BarChart3,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Decision Support BI',
      description: 'Delivering an enterprise Microsoft Power BI Fabric command center providing transport authorities with real-time actionable insights.'
    }
  ];

  // Included Features vs Future Enhancements
  const scopeIncluded = [
    'End-to-end GTFS & telematics data cleaning ETL',
    'Star-Schema relational data model in Power BI',
    'Custom DAX Time-Intelligence business measures',
    'Real-time REST API aggregation endpoints',
    'SaaS glassmorphic Command Center web portal',
    'Admin Portal CSV dataset upload & management'
  ];

  const scopeFuture = [
    'AI-powered predictive congestion & weather forecasting',
    'Automated GTFS-Realtime commuter alert notifications',
    'IoT bus camera edge AI passenger occupancy counting',
    'Mobile transit pass app with live arrival countdowns'
  ];

  // Success Metrics
  const successMetrics = [
    { metric: '+25%', title: 'Revenue Recovered', desc: 'Elimination of un-audited manual paper ticket fare leakage', color: 'text-emerald-400', border: 'border-emerald-500/30' },
    { metric: '35%', title: 'Wait Time Reduction', desc: 'Optimized rush-hour bus frequency & surge dispatches', color: 'text-blue-400', border: 'border-blue-500/30' },
    { metric: '40%', title: 'Fewer Breakdowns', desc: 'Predictive thermal telemetry alerts before engine failures', color: 'text-amber-400', border: 'border-amber-500/30' },
    { metric: '95%+', title: 'On-Time Compliance', desc: 'Real-time corridor speed tracking & bottleneck bypasses', color: 'text-cyan-400', border: 'border-cyan-500/30' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      {/* 1. TOP HEADER WITH bg.jpg LOGO */}
      <header className="relative z-30 px-6 sm:px-12 py-5 border-b border-slate-800/80 bg-navy-950/95 backdrop-blur-md sticky top-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with bg.jpg */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shadow-xl group-hover:scale-105 transition-transform bg-slate-900">
              <Image
                src={bgImg}
                alt="DixNova Logo"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">
                Dix<span className="text-amber-400">Nova</span>
              </span>
              <p className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase">
                Project Objectives
              </p>
            </div>
          </Link>

          {/* Navigation Action */}
          <div className="flex items-center gap-3">
            <Link href="/data-preparation" className="hidden sm:block">
              <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer">
                Data Prep
              </button>
            </Link>

            <Link href="/solution" className="hidden sm:block">
              <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-all cursor-pointer">
                Our Solution
              </button>
            </Link>

            <Link href="/dashboard">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
                <span>Command Center</span>
                <ChevronRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-20">
        
        {/* 1. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Target size={15} className="animate-pulse" />
            <span>HACKATHON STRATEGIC ROADMAP</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Project <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">Objectives</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Transforming fragmented public transportation operational data into actionable business intelligence using Microsoft Power BI Fabric and modern full-stack web technologies.
          </p>
        </section>

        {/* 2. OVERARCHING MAIN OBJECTIVE CARD */}
        <section className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl p-8 sm:p-14 bg-slate-900/90 backdrop-blur-md">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src={dix0Img}
              alt="Transportation Background"
              fill
              sizes="100vw"
              className="object-cover filter contrast-125"
            />
          </div>

          <div className="relative z-10 space-y-6 max-w-3xl">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-widest inline-block">
              OVERARCHING MISSION
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Centralizing Municipal Transit Operational Intelligence
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed bg-slate-950/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
              To build a production-grade analytics platform that provides transport authorities with 360-degree visibility into passenger demand, fleet utilization, fare revenue, maintenance trends, and corridor efficiency — enabling data-driven decisions that modernize urban transit.
            </p>
          </div>
        </section>

        {/* 3. SIX ANIMATED OBJECTIVE CARDS */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              CORE DELIVERABLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Six Strategic Objectives</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              The primary objectives governing the DixNova analytics platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sixObjectives.map((obj, idx) => {
              const Icon = obj.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl space-y-4 group backdrop-blur-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${obj.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-slate-950 text-amber-400 border border-slate-800">
                        {obj.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                      {obj.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {obj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-emerald-400 font-semibold">
                    <span>DELIVERED & VERIFIED</span>
                    <CheckCircle2 size={15} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. PROJECT SCOPE (INCLUDED VS FUTURE ENHANCEMENTS) */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              IMPLEMENTATION SCOPE
            </span>
            <h2 className="text-3xl font-black text-white">Project Scope & Roadmap</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Clear demarcation of delivered capabilities versus future platform extensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Included Features */}
            <div className="p-7 rounded-3xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
                  <CheckCircle2 size={20} />
                  <span>Included Features (Delivered)</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 font-bold">
                  PRODUCTION READY
                </span>
              </div>

              <div className="space-y-3">
                {scopeIncluded.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Enhancements */}
            <div className="p-7 rounded-3xl bg-blue-950/20 border-2 border-blue-500/40 space-y-6">
              <div className="flex items-center justify-between border-b border-blue-500/30 pb-4">
                <div className="flex items-center gap-2 text-blue-400 font-black text-lg">
                  <Rocket size={20} />
                  <span>Future Enhancements (Roadmap)</span>
                </div>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/40 font-bold">
                  NEXT PHASES
                </span>
              </div>

              <div className="space-y-3">
                {scopeFuture.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-blue-100 bg-slate-950/80 p-3 rounded-xl border border-blue-500/30">
                    <Sparkles size={16} className="text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 5. SUCCESS METRICS */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              TARGET KPI METRICS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Project Success Metrics</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Measurable operational targets established for municipal transit authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((sm, idx) => (
              <div key={idx} className={`p-6 rounded-3xl bg-slate-900/90 border ${sm.border} shadow-xl space-y-3 text-center backdrop-blur-md`}>
                <span className={`text-4xl font-black ${sm.color}`}>{sm.metric}</span>
                <h3 className="text-sm font-bold text-white">{sm.title}</h3>
                <p className="text-xs text-slate-400 leading-normal">{sm.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. EXPECTED BUSINESS OUTCOME */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              TRANSFORMATIVE VALUE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Expected Business Outcomes</h2>
          </div>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
            By deploying DixNova's Power BI Fabric analytics platform, municipal transport authorities transform fragmented operational logs into a single source of truth. Transport planners gain the empirical tools required to optimize fleet dispatches, prevent fare revenue leakage, cut fuel expenditure, and provide commuters with dependable public transit.
          </p>
        </section>

        {/* 7. LARGE CTA: "EXPLORE THE DATASET" */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 border-2 border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              INTERACTIVE DATA PERSISTENCE
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Ready to analyze live transit data feeds?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Upload custom CSV datasets or inspect real corridor telemetry in the Admin Portal.
            </p>
          </div>

          <Link href="/admin/data">
            <button className="px-9 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer shrink-0">
              <Database size={20} />
              <span>Explore the Dataset</span>
              <ArrowRight size={20} />
            </button>
          </Link>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-amber-400 font-semibold tracking-wide">Innovation Driven By Data</span>
      </footer>
    </PresentationLayout>
  );
}
