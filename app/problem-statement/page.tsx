"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BarChart3, 
  ArrowRight, 
  AlertTriangle, 
  Users, 
  DollarSign, 
  Bus, 
  Database, 
  CheckCircle2, 
  ChevronRight,
  FileText,
  Wrench,
  Navigation,
  Sparkles,
  Target,
  LineChart,
  Activity,
  Briefcase,
  DownloadCloud,
  Eraser,
  Layers,
  Search,
  PieChart,
  Lightbulb,
  CheckCheck,
  Play,
  Pause,
  ArrowDown,
  XCircle,
  TrendingUp,
  FileSpreadsheet,
  Building2,
  EyeOff,
  ThumbsDown,
  Upload,
  Cpu,
  MonitorCheck,
  Rocket,
  Flame,
  Clock,
  Ticket,
  Workflow,
  ShieldAlert,
  ArrowRightCircle,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import bgImg from '@/app/public/bg.jpg';
import dix0Img from '@/app/public/dix0.jpeg';

export default function ProblemStatementPage() {
  const [activeTab, setActiveTab] = useState<'brief' | 'objectives' | 'process'>('brief');
  
  // Analytics Process Step Runner state
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Six Major Challenges
  const majorChallenges = [
    {
      title: 'Traffic Congestion',
      icon: Navigation,
      color: 'from-amber-500 to-orange-600',
      badge: 'Corridor Delays',
      description: 'Severe peak-hour traffic bottlenecks causing up to 45-minute transit delays across major municipal commuter corridors.'
    },
    {
      title: 'Vehicle Breakdowns',
      icon: Wrench,
      color: 'from-rose-500 to-purple-600',
      badge: 'Fleet Reliability',
      description: 'Unplanned engine overheating and tire wear reducing active bus fleet availability by 18% during peak hours.'
    },
    {
      title: 'Rising Fuel Costs',
      icon: Flame,
      color: 'from-red-500 to-amber-600',
      badge: 'Operating Expense',
      description: 'Escalating diesel prices compounded by excessive fuel consumption during prolonged traffic gridlocks and idling.'
    },
    {
      title: 'Poor Fleet Utilization',
      icon: Bus,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Capacity Mismatch',
      description: 'Imbalanced vehicle allocation resulting in empty off-peak runs alongside severe overcrowding at high-demand terminals.'
    },
    {
      title: 'Passenger Dissatisfaction',
      icon: Users,
      color: 'from-purple-500 to-indigo-600',
      badge: 'Commuter Frustration',
      description: 'Unpredictable terminal wait times, inconsistent arrival schedules, and complete lack of real-time transit information.'
    },
    {
      title: 'Revenue Loss',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Fare Leakage',
      description: 'Significant cash fare leakage originating from un-audited manual paper tickets and un-reconciled operator collections.'
    }
  ];

  // Data Generation Workflow Steps
  const dataGenerationFlow = [
    { step: 1, title: 'Passenger Volumes', desc: 'Commuter boarding counts & terminal origin-destination surges', icon: Users, color: 'from-blue-500 to-indigo-600' },
    { step: 2, title: 'Ticket Sales', desc: 'Electronic card swipes & cash ticket transaction logs', icon: Ticket, color: 'from-emerald-500 to-teal-600' },
    { step: 3, title: 'Fleet Operations', desc: 'Bus GPS telematics, speed logs & active trip dispatches', icon: Bus, color: 'from-cyan-500 to-blue-500' },
    { step: 4, title: 'Maintenance Records', desc: 'Engine thermal sensor alerts, oil health & breakdown logs', icon: Wrench, color: 'from-amber-500 to-orange-500' },
    { step: 5, title: 'Route Information', desc: 'Corridor transit speeds, traffic bottlenecks & schedule variance', icon: Navigation, color: 'from-purple-500 to-indigo-600' }
  ];

  // Why Systems Fail Pipeline
  const systemFailureFlow = [
    { title: 'Fragmented Data Silos', desc: 'Operational data stored in isolated department systems' },
    { title: 'Manual Reporting', desc: 'Slow paper logs & error-prone Excel spreadsheets' },
    { title: 'Disconnected Information', desc: 'Zero real-time telematics visibility across routes' },
    { title: 'Slow Decision-Making', desc: 'Delayed dispatches & un-mitigated revenue loss' },
    { title: 'Severe Inefficiencies', desc: 'Rising operational costs & passenger frustration' }
  ];

  // Analytics Lifecycle Steps
  const analyticsLifecycleSteps = [
    {
      id: 1,
      title: 'Business Understanding',
      icon: Briefcase,
      color: 'from-amber-500 to-orange-500',
      badge: 'Step 1 • Context & Goal',
      description: 'Identifying municipal transit bottlenecks, operational constraints, 25% revenue leakage, and passenger rush-hour delays in Nigerian transport networks.',
      input: 'Stakeholder interviews, LAMATA policy goals, passenger wait times',
      outcome: 'Clear analytics objective & Power BI solution roadmap'
    },
    {
      id: 2,
      title: 'Data Collection',
      icon: DownloadCloud,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Step 2 • Data Ingestion',
      description: 'Ingesting raw GTFS public transit schedules, BRT electronic ticket logs, vehicle GPS telematics feeds, and fuel maintenance records.',
      input: 'GTFS CSVs, MySQL ticketing databases, Azure Blob storage telemetry',
      outcome: 'Raw unified data staging lake for DixNova'
    },
    {
      id: 3,
      title: 'Data Cleaning',
      icon: Eraser,
      color: 'from-cyan-500 to-blue-500',
      badge: 'Step 3 • ETL & Hygiene',
      description: 'Normalizing mixed timestamps, handling null passenger counts, deduplicating transaction records, and mapping missing terminal codes.',
      input: 'Power Query M-Code transformations, null imputation',
      outcome: '100% clean, sanitized, audit-ready data tables'
    },
    {
      id: 4,
      title: 'Data Modeling',
      icon: Layers,
      color: 'from-purple-500 to-violet-600',
      badge: 'Step 4 • Star Schema & DAX',
      description: 'Designing high-performance Star-Schema relational model in Power BI with Fact_Trips, Fact_Ticketing, Dim_Routes, and custom DAX measures.',
      input: 'Fact/Dimension schema, DAX Time Intelligence functions',
      outcome: 'Optimized tabular data model supporting real-time slicing'
    },
    {
      id: 5,
      title: 'Data Analysis',
      icon: Search,
      color: 'from-rose-500 to-pink-600',
      badge: 'Step 5 • Analytics Engine',
      description: 'Performing descriptive, diagnostic, and predictive analytics to detect peak surge hours, corridor speed drops, and engine thermal breakdown triggers.',
      input: 'Corridor speed analysis, fare variance algorithms',
      outcome: 'Empirical diagnostic findings & statistical anomalies'
    },
    {
      id: 6,
      title: 'Data Visualization',
      icon: PieChart,
      color: 'from-indigo-500 to-blue-600',
      badge: 'Step 6 • UI & UX Design',
      description: 'Building an enterprise Microsoft Power BI Fabric dashboard with dark-mode telemetry, corridor map visuals, and executive KPI cards.',
      input: 'DixNova UI design tokens, custom Power BI visual layouts',
      outcome: 'State-of-the-art interactive Command Center UI'
    },
    {
      id: 7,
      title: 'Insights',
      icon: Lightbulb,
      color: 'from-amber-400 to-yellow-500',
      badge: 'Step 7 • Value Discovery',
      description: 'Uncovering 25% cash fare leakage at un-monitored stops, 45-minute Ikeja terminal queue bottlenecks, and high-wear bus maintenance alerts.',
      input: 'Corridor heatmap analysis, revenue reconciliation variance',
      outcome: 'High-impact actionable discoveries for transit planners'
    },
    {
      id: 8,
      title: 'Recommendations',
      icon: CheckCheck,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Step 8 • Policy Action',
      description: 'Delivering data-driven recommendations: automated surge bus dispatches, 100% digital ticketing rollout, and proactive fleet maintenance schedules.',
      input: 'Executive decision framework, implementation roadmap',
      outcome: 'Transformative data-driven public transport operations'
    }
  ];

  // Auto-play timeline step runner
  useEffect(() => {
    if (!isAutoPlaying || activeTab !== 'process') return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % analyticsLifecycleSteps.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, activeTab, analyticsLifecycleSteps.length]);

  const currentStepData = analyticsLifecycleSteps[activeStep];

  const projectObjectives = [
    {
      emoji: '🎯',
      title: 'Optimize Fleet Allocation',
      description: 'Maximizing bus availability and dynamic vehicle dispatch during peak commuter rush hours across major municipal corridors.',
      icon: Target,
      color: 'from-amber-500 to-orange-600',
      badge: 'Operational Efficiency'
    },
    {
      emoji: '📊',
      title: 'Analyze Passenger Demand',
      description: 'Tracking origin-destination commuter surges, hourly terminal volumes, and bottleneck queue patterns to eliminate wait times.',
      icon: LineChart,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Demand Intelligence'
    },
    {
      emoji: '💵',
      title: 'Improve Revenue',
      description: 'Eliminating manual paper ticket fare leakage through digital automated fare auditing and operator revenue reconciliation.',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Financial Compliance'
    },
    {
      emoji: '🛠',
      title: 'Reduce Maintenance Cost',
      description: 'Deploying predictive telemetry sensors to monitor engine heat, component health, and out-of-service breakdown frequencies.',
      icon: Wrench,
      color: 'from-rose-500 to-purple-600',
      badge: 'Predictive Telemetry'
    },
    {
      emoji: '🗺',
      title: 'Improve Route Efficiency',
      description: 'Evaluating corridor transit speeds, traffic bottleneck delays, scheduled vs actual arrival times, and route throughput.',
      icon: Navigation,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Corridor Optimization'
    },
    {
      emoji: '📈',
      title: 'Build Interactive Dashboard',
      description: 'Delivering an enterprise Microsoft Power BI Fabric command center providing transport authorities with actionable insights.',
      icon: BarChart3,
      color: 'from-indigo-600 to-violet-600',
      badge: 'Decision Support BI'
    }
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
                Problem Statement & Analysis
              </p>
            </div>
          </Link>

          {/* Navigation Action */}
          <div className="flex items-center gap-3">
            <Link href="/objectives" className="hidden sm:block">
              <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-amber-400 border border-amber-500/30 transition-all cursor-pointer">
                Objectives
              </button>
            </Link>

            <Link href="/solution" className="hidden sm:block">
              <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-all cursor-pointer">
                Our Solution
              </button>
            </Link>

            <Link href="/team">
              <Button variant="gradient" size="sm" className="gap-2 text-xs px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white shadow-lg hover:scale-105 transition-all">
                <Users size={16} />
                <span>Meet Our Team</span>
                <ChevronRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full space-y-16">
        
        {/* TOP TAB CONTROLS */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-400 uppercase tracking-widest">
            <Sparkles size={15} className="animate-pulse" />
            <span>Judges Evaluation Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Public Transportation <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">Problem Statement</span>
          </h1>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('brief')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer ${
                activeTab === 'brief'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black border border-blue-400 shadow-blue-500/40 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <FileText size={16} />
              <span>Problem Statement & Challenges</span>
            </button>

            <button
              onClick={() => setActiveTab('objectives')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer ${
                activeTab === 'objectives'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black border border-amber-400 shadow-amber-500/40 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Target size={16} />
              <span>Project Objectives</span>
            </button>

            <button
              onClick={() => setActiveTab('process')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer ${
                activeTab === 'process'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black border border-emerald-400 shadow-emerald-500/40 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Activity size={16} />
              <span>Analytics Process (Lifecycle)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PREMIUM PROBLEM STATEMENT & ENHANCED SECTIONS */}
        {activeTab === 'brief' && (
          <div className="space-y-16 animate-in fade-in duration-500">
            
            {/* 1. HERO SECTION: "The Challenge Facing Public Transportation" */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl p-8 sm:p-14 bg-slate-900/90 backdrop-blur-md">
              <div className="absolute inset-0 z-0 opacity-20">
                <Image
                  src={dix0Img}
                  alt="Transit Background"
                  fill
                  sizes="100vw"
                  className="object-cover filter contrast-125"
                />
              </div>

              <div className="relative z-10 space-y-6 max-w-3xl">
                <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-widest inline-block">
                  EXECUTIVE PROBLEM SUMMARY
                </span>
                
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  The Challenge Facing <span className="text-amber-400">Public Transportation</span>
                </h2>

                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal bg-slate-950/70 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
                  Public transportation systems across Nigeria face surging commuter demand while operating under severe constraints such as traffic congestion, frequent breakdowns, escalating fuel costs, and limited fleet visibility.
                </p>

                {/* Hero Overlay Glass Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center">
                    <span className="text-2xl font-black text-amber-400">25%</span>
                    <p className="text-[11px] font-mono text-slate-300 font-bold uppercase">Fare Revenue Leakage</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 text-center">
                    <span className="text-2xl font-black text-rose-400">45 Mins</span>
                    <p className="text-[11px] font-mono text-slate-300 font-bold uppercase">Peak Terminal Delay</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-center">
                    <span className="text-2xl font-black text-emerald-400">50,000+</span>
                    <p className="text-[11px] font-mono text-slate-300 font-bold uppercase">Daily Passengers Affected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CURRENT SITUATION & OPERATIONAL DATA GENERATION WORKFLOW */}
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
              <div className="space-y-2 text-center max-w-2xl mx-auto">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                  OPERATIONAL DATA LANDSCAPE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">Current Situation</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Transport operators continuously collect rich operational data across multiple touchpoints, yet the data remains fragmented and underutilized.
                </p>
              </div>

              {/* Data Generation Flow (5 Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {dataGenerationFlow.map((df) => {
                  const Icon = df.icon;
                  return (
                    <div 
                      key={df.step} 
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3 group"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${df.color} flex items-center justify-center text-white font-bold shadow-md`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">DATA TYPE {df.step}</span>
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{df.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{df.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. SIX MAJOR CHALLENGES (ANIMATED CARDS) */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
                  CRITICAL BOTTLENECKS
                </span>
                <h3 className="text-3xl font-black text-white">Six Major Transportation Challenges</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  The primary operational challenges paralyzing municipal transit systems.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {majorChallenges.map((mc, idx) => {
                  const Icon = mc.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 shadow-xl space-y-4 group backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mc.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon size={24} />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-slate-950 text-amber-400 border border-slate-800">
                          {mc.badge}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                        {mc.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {mc.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. WHY CURRENT SYSTEMS FAIL (VISUAL PIPELINE) */}
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  ROOT CAUSE ANALYSIS
                </span>
                <h3 className="text-3xl font-black text-white">Why Current Systems Fail</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  How fragmented data silos trigger a cascading failure across municipal transportation operations.
                </p>
              </div>

              {/* Visual Pipeline with ↓ Arrows */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                {systemFailureFlow.map((sf, index) => {
                  const isLast = index === systemFailureFlow.length - 1;
                  return (
                    <React.Fragment key={index}>
                      <div className="p-5 rounded-2xl bg-slate-950/80 border border-red-500/30 space-y-2 text-center h-full flex flex-col justify-between">
                        <span className="text-[10px] font-mono font-bold text-red-400">STAGE {index + 1}</span>
                        <h4 className="text-xs font-bold text-white">{sf.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-tight">{sf.desc}</p>
                      </div>

                      {!isLast && (
                        <div className="hidden sm:flex justify-center text-red-400">
                          <ArrowRight size={20} className="animate-pulse" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* 5. HIGHLIGHTED CORE PROBLEM STATEMENT BRIEF */}
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-2xl space-y-8 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <FileText size={160} className="text-amber-400" />
              </div>

              <div className="space-y-2 border-b border-slate-800 pb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                  OFFICIAL HACKATHON BRIEF
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Public Transportation Analytics Problem Brief
                </h3>
              </div>

              {/* PARAGRAPH 1 */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">1. Operational Constraints</span>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                  Public transportation systems across Nigeria face increasing demand while operating under constraints such as traffic congestion, vehicle breakdowns, rising fuel costs, inconsistent passenger demand, and limited fleet availability. These operational challenges contribute to service delays, reduced passenger satisfaction, and higher operating expenses.
                </p>
              </div>

              {/* PARAGRAPH 2 */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">2. Fragmented Data & Limited Visibility</span>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                  Although transport operators collect data relating to routes, passenger volumes, ticket sales, vehicle maintenance, and fleet operations, much of this information remains fragmented across operational systems. As a result, transport planners have limited visibility into service performance and are unable to optimize fleet deployment or improve operational efficiency effectively.
                </p>
              </div>

              {/* PARAGRAPH 3 */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">3. Expected Power BI Solution</span>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-semibold bg-gradient-to-br from-emerald-950/60 via-slate-950/60 to-slate-950/60 p-6 rounded-2xl border-2 border-emerald-500/40 text-emerald-100 shadow-xl">
                  Participants are expected to develop a Power BI analytics solution that provides transport authorities with actionable insights into passenger demand, fleet utilization, revenue performance, maintenance trends, and route efficiency, enabling data-driven decisions that improve public transport operations.
                </p>
              </div>
            </div>

            {/* 6. COMPARISON: TRADITIONAL OPERATIONS VS ANALYTICS-DRIVEN DECISION MAKING */}
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10 backdrop-blur-md">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  PARADIGM SHIFT
                </span>
                <h3 className="text-3xl font-black text-white">Traditional vs Analytics-Driven Operations</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Comparing baseline manual operations with DixNova data-driven analytics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Traditional Card */}
                <div className="p-7 rounded-3xl bg-red-950/20 border-2 border-red-500/40 space-y-6">
                  <div className="flex items-center justify-between border-b border-red-500/30 pb-4">
                    <div className="flex items-center gap-2 text-red-400 font-black text-lg">
                      <XCircle size={20} />
                      <span>Traditional Manual Operations</span>
                    </div>
                    <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/40 font-bold">
                      CURRENT BASELINE
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-red-500/20">
                      <FileSpreadsheet size={16} className="text-red-400 shrink-0" />
                      <span>Disconnected paper tickets & manual Excel files</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-red-500/20">
                      <Wrench size={16} className="text-red-400 shrink-0" />
                      <span>Reactive breakdown maintenance after vehicle failures</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-red-500/20">
                      <DollarSign size={16} className="text-red-400 shrink-0" />
                      <span>Un-audited cash fare collection and revenue leakage</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-red-500/20">
                      <Clock size={16} className="text-red-400 shrink-0" />
                      <span>Delayed weekly static reports with zero real-time visibility</span>
                    </div>
                  </div>
                </div>

                {/* DixNova Analytics Card */}
                <div className="p-7 rounded-3xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
                      <CheckCircle2 size={20} />
                      <span>DixNova Analytics-Driven Operations</span>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 font-bold">
                      DIXNOVA SOLUTION
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                      <Database size={16} className="text-emerald-400 shrink-0" />
                      <span>Centralized Power BI Fabric Data Lake & automated ETL</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                      <Activity size={16} className="text-emerald-400 shrink-0" />
                      <span>Proactive predictive fleet telemetry & thermal alerts</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                      <ShieldAlert size={16} className="text-emerald-400 shrink-0" />
                      <span>100% digital fare auditing & automated revenue control</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-emerald-100 bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30">
                      <BarChart3 size={16} className="text-emerald-400 shrink-0" />
                      <span>Live interactive Command Center telemetry dashboards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. CLOSING SECTION & PROMINENT CTA BUTTON */}
            <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-2 border-blue-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                  TRANSFORMATION AWAITS
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white">
                  How can transportation authorities transform operational data into actionable insights?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Discover the team, data architecture, and Power BI solutions built by DixNova.
                </p>
              </div>

              <Link href="/team">
                <button className="px-9 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer shrink-0">
                  <span>Discover Our Solution</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECT OBJECTIVES */}
        {activeTab === 'objectives' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="text-center max-w-2xl mx-auto space-y-2 p-6 rounded-3xl bg-slate-900/60 border border-amber-500/30">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                JUDGES REFERENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Project Objectives</h2>
              <p className="text-slate-300 text-xs sm:text-sm font-medium">
                This page tells the judges exactly what you wanted to achieve.
              </p>
            </div>

            {/* 6 OBJECTIVES CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectObjectives.map((obj, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl space-y-4 group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                          {obj.emoji}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
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
                      <span>STATUS: DELIVERED</span>
                      <CheckCircle2 size={15} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ANALYTICS PROCESS (HORIZONTAL TIMELINE) */}
        {activeTab === 'process' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase border border-amber-500/40">
                  ⚡ VERY IMPORTANT FOR JUDGES
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Analytics Process Lifecycle
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Demonstrating that DixNova followed the end-to-end analytical lifecycle — from business understanding to actionable recommendations.
                </p>
              </div>

              {/* Play / Pause Runner Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 flex items-center gap-2 border border-slate-700 shadow cursor-pointer transition-all"
                >
                  {isAutoPlaying ? <Pause size={14} className="text-amber-400" /> : <Play size={14} />}
                  <span>{isAutoPlaying ? 'Auto-Playing Process' : 'Paused Step Runner'}</span>
                </button>
              </div>
            </div>

            {/* HORIZONTAL TIMELINE STEP BUTTONS */}
            <div className="relative py-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-between min-w-[900px] px-4 gap-2 relative">
                
                {/* Connecting Timeline Line */}
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-8 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 -translate-y-1/2 z-0 transition-all duration-500" 
                  style={{ width: `${(activeStep / (analyticsLifecycleSteps.length - 1)) * 90}%` }}
                />

                {/* Steps Nodes */}
                {analyticsLifecycleSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx === activeStep;
                  const isCompleted = idx < activeStep;

                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        setActiveStep(idx);
                        setIsAutoPlaying(false);
                      }}
                      className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-300 group cursor-pointer ${
                        isActive ? 'scale-110' : 'hover:scale-105'
                      }`}
                    >
                      <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold transition-all shadow-xl
                        ${isActive 
                          ? 'bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-white ring-4 ring-amber-500/30' 
                          : isCompleted 
                            ? 'bg-emerald-500/90 text-white border border-emerald-400' 
                            : 'bg-slate-900 border border-slate-700 text-slate-400'}
                      `}>
                        <Icon size={20} />
                      </div>
                      <span className={`text-[11px] font-bold text-center w-24 leading-tight ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE STEP ANIMATED DETAILS CARD */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/95 border-2 border-amber-500/40 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center text-white shadow-xl`}>
                    {React.createElement(currentStepData.icon, { size: 28 })}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                      {currentStepData.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {currentStepData.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                  <span>STEP {activeStep + 1} OF 8</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                "{currentStepData.description}"
              </p>

              {/* Input vs Outcome Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-400">INPUTS & METHODOLOGY</span>
                  <p className="text-xs text-slate-300 font-medium">{currentStepData.input}</p>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">STAGE OUTCOME</span>
                  <p className="text-xs text-emerald-100 font-semibold">{currentStepData.outcome}</p>
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <button
                  disabled={activeStep === 0}
                  onClick={() => {
                    setActiveStep((prev) => Math.max(0, prev - 1));
                    setIsAutoPlaying(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-all"
                >
                  ← Previous Step
                </button>

                <button
                  disabled={activeStep === analyticsLifecycleSteps.length - 1}
                  onClick={() => {
                    setActiveStep((prev) => Math.min(analyticsLifecycleSteps.length - 1, prev + 1));
                    setIsAutoPlaying(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-40 hover:from-amber-600 hover:to-orange-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg cursor-pointer transition-all"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-amber-400 font-semibold tracking-wide">Innovation Driven By Data</span>
      </footer>
    </PresentationLayout>
  );
}
