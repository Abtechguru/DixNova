"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BarChart3, 
  ArrowRight, 
  Users, 
  DollarSign, 
  Bus, 
  Database, 
  CheckCircle2, 
  ChevronRight, 
  Wrench, 
  Navigation, 
  Sparkles, 
  Target, 
  LineChart, 
  Activity, 
  Briefcase, 
  DownloadCloud, 
  Layers, 
  PieChart, 
  MonitorCheck, 
  Rocket, 
  Smartphone, 
  Tablet, 
  Monitor, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Lock, 
  Check, 
  Eye, 
  TrendingUp, 
  Filter, 
  Layout, 
  ArrowLeft,
  XCircle,
  Sliders
} from 'lucide-react';
import bgImg from '@/app/public/bg.jpg';
import dix0Img from '@/app/public/dix0.jpeg';

export default function SolutionPage() {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Solution Architecture Flow
  const architectureFlow = [
    { step: '01', title: 'Transportation Dataset', desc: 'Raw GTFS schedules, GPS telematics, ticket sales & maintenance logs', icon: DownloadCloud, color: 'from-blue-500 to-indigo-600' },
    { step: '02', title: 'Data Cleaning & Modeling', desc: 'Power Query M-Code ETL + DAX Measures + Star-Schema relational model', icon: Layers, color: 'from-purple-500 to-indigo-600' },
    { step: '03', title: 'Interactive Dashboards', desc: 'Embedded Power BI Fabric visuals with dynamic time-intelligence slicers', icon: PieChart, color: 'from-amber-500 to-orange-500' },
    { step: '04', title: 'Analytics Website', desc: 'Next.js 14 glassmorphic web portal with secure admin controls', icon: MonitorCheck, color: 'from-emerald-500 to-teal-600' },
    { step: '05', title: 'Decision Makers', desc: 'Transit planners & executives executing data-driven fleet dispatches', icon: Rocket, color: 'from-cyan-500 to-blue-500' }
  ];

  // Six Feature Cards
  const sixFeatures = [
    {
      title: 'Executive Dashboard',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      badge: 'High-Level Overview',
      description: 'Centralized executive command center delivering real-time transit KPIs, total revenue summaries, active fleet availability, and system-wide operational health.'
    },
    {
      title: 'Passenger Analytics',
      icon: Users,
      color: 'from-cyan-500 to-blue-500',
      badge: 'Demand Intelligence',
      description: 'Commuter volume heatmaps, peak rush-hour surge tracking, terminal queue bottleneck analysis, and origin-destination trip patterns.'
    },
    {
      title: 'Revenue Analytics',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Fare Leakage Control',
      description: 'Automated fare collection auditing, operator revenue reconciliation, cash leakage point detection, and digital payment trend analytics.'
    },
    {
      title: 'Fleet Monitoring',
      icon: Bus,
      color: 'from-amber-500 to-orange-500',
      badge: 'Real-Time Telematics',
      description: 'Live GPS vehicle location tracking, corridor transit speed metrics, bus availability ratios, and dynamic dispatch optimization.'
    },
    {
      title: 'Maintenance Analytics',
      icon: Wrench,
      color: 'from-rose-500 to-purple-600',
      badge: 'Predictive Maintenance',
      description: 'Thermal engine sensor monitoring, component wear alerts, out-of-service breakdown frequency logs, and preventive service scheduling.'
    },
    {
      title: 'Route Performance',
      icon: Navigation,
      color: 'from-purple-500 to-indigo-600',
      badge: 'Corridor Optimization',
      description: 'Corridor transit speed drops, traffic bottleneck delay analysis, scheduled vs actual arrival time compliance, and route throughput.'
    }
  ];

  // Platform Features (6 Items)
  const platformFeatures = [
    { title: 'Interactive Dashboards', desc: 'Filterable Power BI Fabric visuals with instant slicer response.', icon: Sliders, color: 'from-blue-500 to-indigo-600' },
    { title: 'Responsive Design', desc: 'Flawlessly optimized for desktop, tablet, and mobile viewports.', icon: Layout, color: 'from-emerald-500 to-teal-600' },
    { title: 'Dynamic KPI Monitoring', desc: 'Real-time threshold alerts and operational indicator badges.', icon: Activity, color: 'from-amber-500 to-orange-500' },
    { title: 'Executive Reporting', desc: 'Audit-ready report summaries and policy recommendation feeds.', icon: FileText, color: 'from-purple-500 to-violet-600' },
    { title: 'Secure Navigation', desc: 'Role-based admin access control and session encryption.', icon: Lock, color: 'from-cyan-500 to-blue-500' },
    { title: 'Professional User Experience', desc: 'SaaS glassmorphism, dark mode, and sleek micro-interactions.', icon: Sparkles, color: 'from-rose-500 to-pink-600' }
  ];

  // Key Benefits (5 Animated Cards)
  const keyBenefits = [
    { title: 'Full Operational Visibility', desc: 'End-to-end telemetry into corridor speeds, bus locations, and terminal queues.', icon: Eye, color: 'from-blue-500 to-indigo-600' },
    { title: '100% Revenue Monitoring', desc: 'Eliminate fare leakage through automated transaction auditing and digital reconciliations.', icon: ShieldCheck, color: 'from-emerald-500 to-teal-600' },
    { title: 'Predictive Maintenance Tracking', desc: 'Detect engine thermal alerts early to prevent out-of-service breakdowns.', icon: Wrench, color: 'from-rose-500 to-purple-600' },
    { title: 'Dynamic Fleet Optimization', desc: 'Dispatch surge buses precisely when and where commuter queues build up.', icon: Cpu, color: 'from-amber-500 to-orange-500' },
    { title: 'Data-Driven Decision Making', desc: 'Empower municipal transit planners with empirical evidence for policy investments.', icon: TrendingUp, color: 'from-cyan-500 to-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white font-sans">
      
      {/* 1. TOP HEADER WITH bg.jpg LOGO */}
      <header className="relative z-30 px-6 sm:px-12 py-5 border-b border-slate-800/80 bg-navy-950/95 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with bg.jpg */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-xl group-hover:scale-105 transition-transform bg-slate-900">
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
                Dix<span className="text-emerald-400">Nova</span>
              </span>
              <p className="text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">
                Transportation Analytics Solution
              </p>
            </div>
          </Link>

          {/* Navigation Action */}
          <div className="flex items-center gap-3">
            <Link href="/problem-statement" className="hidden sm:block">
              <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-all cursor-pointer">
                Problem Statement
              </button>
            </Link>

            <Link href="/dashboard">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <Sparkles size={15} className="animate-pulse" />
            <span>PRODUCTION ANALYTICS PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Our Solution: <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">Centralized Intelligence</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            DixNova solves fragmented transportation reporting by unifying operational datasets into interactive, embedded Power BI Fabric dashboards for real-time municipal decision-making.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-emerald-400">
              ⚡ POWER BI FABRIC EMBEDDED
            </span>
            <span className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-blue-400">
              📊 REAL-TIME TELEMETRY KPI CARDS
            </span>
            <span className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-amber-400">
              🛡️ 100% REVENUE LEAKAGE AUDITING
            </span>
          </div>
        </section>

        {/* 2. SOLUTION OVERVIEW & VISUAL ARCHITECTURE DIAGRAM */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              END-TO-END DATA ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Solution Architecture</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              How raw transportation data transforms into executive policy decisions.
            </p>
          </div>

          {/* Architecture Pipeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {architectureFlow.map((arc, idx) => {
              const Icon = arc.icon;
              const isLast = idx === architectureFlow.length - 1;

              return (
                <React.Fragment key={arc.step}>
                  <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 text-center h-full flex flex-col justify-between group">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${arc.color} flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400">STEP {arc.step}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {arc.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        {arc.desc}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </section>

        {/* 3. SIX FEATURE CARDS */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              ENTERPRISE MODULES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Six Core Analytics Modules</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Purpose-built Power BI dashboards tailored for municipal transport operators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sixFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl space-y-4 group backdrop-blur-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-slate-950 text-emerald-400 border border-slate-800">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-emerald-400 font-semibold">
                    <span>LIVE IN COMMAND CENTER</span>
                    <CheckCircle2 size={15} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. PLATFORM FEATURES GRID */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              PLATFORM CAPABILITIES
            </span>
            <h2 className="text-3xl font-black text-white">Built for Enterprise Performance</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Designed from the ground up for high reliability, responsiveness, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((pf, idx) => {
              const Icon = pf.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/40 transition-all flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${pf.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-white">{pf.title}</h3>
                    <p className="text-xs text-slate-300 leading-normal">{pf.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. SIDE-BY-SIDE COMPARISON */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              TRANSFORMATION ADVANTAGE
            </span>
            <h2 className="text-3xl font-black text-white">Traditional Reporting vs DixNova Analytics Platform</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Why transport authorities are upgrading to automated BI telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Card */}
            <div className="p-7 rounded-3xl bg-red-950/20 border-2 border-red-500/40 space-y-6">
              <div className="flex items-center justify-between border-b border-red-500/30 pb-4">
                <div className="flex items-center gap-2 text-red-400 font-black text-lg">
                  <XCircle size={20} />
                  <span>Traditional Reporting</span>
                </div>
                <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/40 font-bold">
                  OLD WAY
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-red-500/20">
                  <XCircle size={16} className="text-red-400 shrink-0" />
                  <span>Manual Excel spreadsheets and fragmented paper logs</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-red-500/20">
                  <XCircle size={16} className="text-red-400 shrink-0" />
                  <span>Reactive breakdown repairs after vehicles fail on corridor</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-red-500/20">
                  <XCircle size={16} className="text-red-400 shrink-0" />
                  <span>Un-audited cash fare collection causing 25% revenue loss</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-red-500/20">
                  <XCircle size={16} className="text-red-400 shrink-0" />
                  <span>Weekly static reports with zero real-time visibility</span>
                </div>
              </div>
            </div>

            {/* DixNova Solution Card */}
            <div className="p-7 rounded-3xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
                  <CheckCircle2 size={20} />
                  <span>DixNova Analytics Platform</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 font-bold">
                  OUR SOLUTION
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Centralized Power BI Fabric Data Lake with automated ETL</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Predictive telemetry & thermal alerts for proactive maintenance</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>100% digital fare auditing & automated revenue reconciliations</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Live interactive Command Center telemetry dashboards</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. DEVICE MOCKUPS (DESKTOP, TABLET, MOBILE) */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              RESPONSIVE EXPERIENCE
            </span>
            <h2 className="text-3xl font-black text-white">Cross-Device Preview</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Access the Command Center seamlessly across desktop, tablet, and mobile devices.
            </p>

            {/* Device Switcher Controls */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setActiveDevice('desktop')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  activeDevice === 'desktop' ? 'bg-emerald-500 text-slate-950 border border-emerald-400 shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <Monitor size={14} />
                <span>Desktop</span>
              </button>

              <button
                onClick={() => setActiveDevice('tablet')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  activeDevice === 'tablet' ? 'bg-emerald-500 text-slate-950 border border-emerald-400 shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <Tablet size={14} />
                <span>Tablet</span>
              </button>

              <button
                onClick={() => setActiveDevice('mobile')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  activeDevice === 'mobile' ? 'bg-emerald-500 text-slate-950 border border-emerald-400 shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <Smartphone size={14} />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* Interactive Mockup Container */}
          <div className="flex justify-center items-center py-6">
            {activeDevice === 'desktop' && (
              <div className="w-full max-w-4xl rounded-2xl border-4 border-slate-800 bg-slate-950 shadow-2xl p-4 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">dixnova-analytics.vercel.app/dashboard</span>
                </div>
                <div className="h-64 sm:h-80 rounded-xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <Image src={dix0Img} alt="Preview" fill className="object-cover" />
                  </div>
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-emerald-400">LIVE DESKTOP COMMAND CENTER</span>
                    <span className="text-xs font-mono text-slate-400">FPS: 60 • SYNCED</span>
                  </div>
                  <div className="relative z-10 grid grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center"><span className="text-sm font-bold text-white">50,000+</span><p className="text-[9px] text-slate-400">Trips</p></div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center"><span className="text-sm font-bold text-emerald-400">94.2%</span><p className="text-[9px] text-slate-400">Efficiency</p></div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center"><span className="text-sm font-bold text-amber-400">250 Active</span><p className="text-[9px] text-slate-400">Buses</p></div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center"><span className="text-sm font-bold text-cyan-400 font-mono">100%</span><p className="text-[9px] text-slate-400">Audit</p></div>
                  </div>
                </div>
              </div>
            )}

            {activeDevice === 'tablet' && (
              <div className="w-full max-w-xl rounded-3xl border-8 border-slate-800 bg-slate-950 shadow-2xl p-4 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="h-72 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 text-center">TABLET TOUCH DASHBOARD VIEW</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center"><span className="text-sm font-bold text-white">250 Active Fleet</span></div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center"><span className="text-sm font-bold text-emerald-400">94.2% On-Time</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeDevice === 'mobile' && (
              <div className="w-64 rounded-[40px] border-8 border-slate-800 bg-slate-950 shadow-2xl p-4 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto" />
                <div className="h-80 rounded-2xl bg-slate-900/90 border border-slate-800 p-4 flex flex-col justify-between text-center space-y-4">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">MOBILE COMMAND UI</span>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800"><span className="text-xs font-bold text-white">50K+ Trips</span></div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800"><span className="text-xs font-bold text-emerald-400">100% Audited</span></div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 7. KEY BENEFITS SECTION (ANIMATED CARDS) */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              BUSINESS IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Key Platform Benefits</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Quantifiable impact delivered across transit authority operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyBenefits.map((kb, idx) => {
              const Icon = kb.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl space-y-4 group backdrop-blur-md"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${kb.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                    {kb.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {kb.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. CALL TO ACTION BUTTON: "Continue to Project Objectives" */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 border-2 border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              NEXT STEP IN EVALUATION
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Explore Our Hackathon Project Objectives
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Discover the 6 core goals and deliverables designed for transport authorities.
            </p>
          </div>

          <Link href="/problem-statement?tab=objectives">
            <button className="px-9 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer shrink-0">
              <span>Continue to Project Objectives</span>
              <ArrowRight size={20} />
            </button>
          </Link>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-emerald-400 font-semibold tracking-wide">Innovation Driven By Data</span>
      </footer>
    </div>
  );
}
