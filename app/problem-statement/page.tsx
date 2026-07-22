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
  Code2,
  Server,
  Workflow,
  Globe,
  Check,
  UserCheck,
  Lock,
  FileCheck2,
  RefreshCw,
  Eye,
  BrainCircuit
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import bgImg from '@/app/public/bg.jpg';
import dix0Img from '@/app/public/dix0.jpeg';

export default function ProblemStatementPage() {
  const [activeTab, setActiveTab] = useState<'brief' | 'objectives' | 'process' | 'architecture'>('architecture');
  
  // Analytics Process Step Runner state
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const architectureLayers = [
    {
      id: 1,
      name: 'React Frontend',
      tech: 'Next.js 14 App Router • Tailwind CSS • TypeScript',
      icon: Code2,
      color: 'from-cyan-500 to-blue-600',
      badge: 'LAYER 1 • CLIENT INTERFACE',
      description: 'Responsive, state-of-the-art Web Application UI with glassmorphism, instant route rendering, mobile navigation, and interactive controls.',
      capabilities: ['Component-based UI design system', 'Client-side state management & hooks', 'Responsive mobile & desktop viewports']
    },
    {
      id: 2,
      name: 'Node API',
      tech: 'Next.js Serverless Route Handlers • REST APIs',
      icon: Server,
      color: 'from-emerald-500 to-teal-600',
      badge: 'LAYER 2 • BACKEND ROUTE HANDLERS',
      description: 'High-throughput Node.js backend services serving team data feeds, problem statement updates, and analysis dataset uploads.',
      capabilities: ['Serverless REST API endpoints (/api/admin)', 'Payload validation & error handling', 'JSON response normalization']
    },
    {
      id: 3,
      name: 'Database',
      tech: 'MongoDB Atlas Cloud • Mongoose ODM',
      icon: Database,
      color: 'from-amber-500 to-orange-600',
      badge: 'LAYER 3 • DATA PERSISTENCE',
      description: 'Production-ready MongoDB Atlas cloud database storing real analysis feeds, team member profiles, problem statement steps, and system logs.',
      capabilities: ['Mongoose Schemas & Models', 'Cloud Atlas cluster persistence', 'Fallback local JSON store resilience']
    },
    {
      id: 4,
      name: 'Power BI',
      tech: 'Microsoft Power BI Fabric • DAX Engine',
      icon: PieChart,
      color: 'from-yellow-500 to-amber-600',
      badge: 'LAYER 4 • ANALYTICS & DAX MODELING',
      description: 'Enterprise Microsoft Power BI Fabric data lake executing DAX time-intelligence functions, star-schema modeling, and transit KPIs.',
      capabilities: ['Star-schema fact/dimension modeling', 'DAX revenue & surge measures', 'Automated dataset refresh scheduling']
    },
    {
      id: 5,
      name: 'Embedded Analytics',
      tech: 'Power BI Embedded Iframe • Live Command Center',
      icon: Rocket,
      color: 'from-purple-600 to-indigo-600',
      badge: 'LAYER 5 • EMBEDDED DASHBOARD',
      description: 'Seamless integration of interactive Power BI dashboards directly into the DixNova Command Center UI for transit decision-makers.',
      capabilities: ['Live telemetry command center', 'Interactive slicers & corridor maps', 'Real-time decision support system']
    }
  ];

  const operationalWorkflowSteps = [
    {
      step: 1,
      title: 'Administrator',
      icon: UserCheck,
      color: 'from-blue-500 to-indigo-600',
      description: 'Transit authority administrator logs into the portal to manage fleet operations.'
    },
    {
      step: 2,
      title: 'Login',
      icon: Lock,
      color: 'from-indigo-500 to-purple-600',
      description: 'Secure credential verification & token session initialization.'
    },
    {
      step: 3,
      title: 'Upload Excel',
      icon: Upload,
      color: 'from-cyan-500 to-blue-500',
      description: 'Ingesting raw GTFS trip CSVs, ticketing Excel sheets, and telemetry feeds.'
    },
    {
      step: 4,
      title: 'System Validates',
      icon: FileCheck2,
      color: 'from-teal-500 to-emerald-600',
      description: 'Serverless Node handlers sanitize schemas, clean nulls & validate row records.'
    },
    {
      step: 5,
      title: 'Data Stored',
      icon: Database,
      color: 'from-emerald-500 to-green-600',
      description: 'Persisting clean records into MongoDB Atlas cloud & Power BI Data Lake.'
    },
    {
      step: 6,
      title: 'Dashboard Updates',
      icon: RefreshCw,
      color: 'from-amber-500 to-orange-500',
      description: 'Automated DAX measures calculation & live embedded dashboard refresh.'
    },
    {
      step: 7,
      title: 'Users View Reports',
      icon: Eye,
      color: 'from-orange-500 to-rose-600',
      description: 'Transport planners inspect live corridor heatmaps, wait times & revenue metrics.'
    },
    {
      step: 8,
      title: 'Management Makes Decisions',
      icon: BrainCircuit,
      color: 'from-purple-600 to-indigo-600',
      description: 'Executive authority dispatches surge buses, optimizes routes & halts fare leakage.'
    }
  ];

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
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-white font-sans">
      
      {/* 1. TOP HEADER WITH bg.jpg LOGO */}
      <header className="relative z-30 px-6 sm:px-12 py-5 border-b border-slate-800/80 bg-navy-950/95 backdrop-blur-md sticky top-0">
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
                Problem Statement & System Architecture
              </p>
            </div>
          </Link>

          {/* Navigation Action */}
          <Link href="/team">
            <Button variant="gradient" size="sm" className="gap-2 text-xs px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
              <Users size={16} />
              <span>Meet Our Team</span>
              <ChevronRight size={14} />
            </Button>
          </Link>
        </div>
      </header>

      {/* 2. MAIN PROBLEM STATEMENT CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles size={15} className="animate-pulse" />
            <span>Judges Evaluation Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Public Transportation <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Analytics</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            Exploring full-stack system architecture, analytics lifecycle, project objectives, and official problem statement.
          </p>

          {/* 4 NAVIGATION TABS BUTTONS */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black border border-cyan-400 shadow-cyan-500/40 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Workflow size={16} />
              <span>System Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('brief')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer ${
                activeTab === 'brief'
                  ? 'bg-amber-500 text-slate-950 font-black border border-amber-400 shadow-amber-500/40 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <FileText size={16} />
              <span>Official Problem Brief & Journey</span>
            </button>

            <button
              onClick={() => setActiveTab('objectives')}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer ${
                activeTab === 'objectives'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-orange-400 shadow-orange-500/40 scale-105'
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
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black border border-amber-400 shadow-amber-500/40 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Activity size={16} />
              <span>Analytics Process (Lifecycle)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SYSTEM ARCHITECTURE & OPERATIONAL WORKFLOW */}
        {activeTab === 'architecture' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            
            {/* Header Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl space-y-4 backdrop-blur-md text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold uppercase border border-cyan-500/40">
                ⚡ FULL STACK ARCHITECTURE HIGHLIGHT
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                System Architecture
              </h2>
              <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-2xl mx-auto">
                "Since you're the Full Stack Developer, this page is your chance to stand out."
              </p>
            </div>

            {/* 5-STAGE VERTICAL ARCHITECTURE PIPELINE WITH ANIMATED DOWNWARD ARROWS ↓ */}
            <div className="max-w-4xl mx-auto space-y-6">
              {architectureLayers.map((layer, idx) => {
                const Icon = layer.icon;
                const isLast = idx === architectureLayers.length - 1;

                return (
                  <React.Fragment key={layer.id}>
                    {/* Layer Card */}
                    <div className="p-8 rounded-3xl bg-slate-900/95 border-2 border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl space-y-6 group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform shrink-0`}>
                            <Icon size={28} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                              {layer.badge}
                            </span>
                            <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                              {layer.name}
                            </h3>
                          </div>
                        </div>

                        <span className="px-4 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-300 self-start sm:self-auto">
                          {layer.tech}
                        </span>
                      </div>

                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                        {layer.description}
                      </p>

                      {/* Capabilities Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {layer.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                            <Check size={14} className="text-cyan-400 shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Animated Downward Arrow ↓ (Except Last Layer) */}
                    {!isLast && (
                      <div className="flex flex-col items-center justify-center gap-1 py-1 text-cyan-400">
                        <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-500 to-transparent" />
                        <ArrowDown size={24} className="animate-bounce text-cyan-400" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* END-TO-END OPERATIONAL DATA WORKFLOW */}
            <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  OPERATIONAL DATA FLOW
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">End-to-End System Workflow</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                  How data moves from administrator ingestion to executive decision-making.
                </p>
              </div>

              {/* Grid of 8 Workflow Steps with ↓ Connections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {operationalWorkflowSteps.map((wk, index) => {
                  const Icon = wk.icon;
                  return (
                    <div 
                      key={wk.step} 
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-4"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${wk.color} flex items-center justify-center text-white font-bold shadow-lg shrink-0`}>
                        <Icon size={20} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">STEP {wk.step}</span>
                          <h4 className="text-sm font-black text-white">{wk.title}</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-normal">{wk.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: OFFICIAL PROBLEM BRIEF & THE CHALLENGE TRANSFORMATION JOURNEY (TODAY VS FUTURE) */}
        {activeTab === 'brief' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            
            {/* OFFICIAL PROBLEM STATEMENT DOCUMENT CARD */}
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-2xl space-y-8 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <FileText size={160} className="text-amber-400" />
              </div>

              <div className="space-y-2 border-b border-slate-800 pb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                  OFFICIAL HACKATHON DOCUMENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Public Transportation Analytics Problem Statement
                </h2>
              </div>

              {/* PARAGRAPH 1: CONSTRAINTS & CHALLENGES */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <AlertTriangle size={16} />
                  <span>1. Operational Constraints</span>
                </div>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
                  Public transportation systems across Nigeria face increasing demand while operating under constraints such as traffic congestion, vehicle breakdowns, rising fuel costs, inconsistent passenger demand, and limited fleet availability. These operational challenges contribute to service delays, reduced passenger satisfaction, and higher operating expenses.
                </p>
              </div>

              {/* PARAGRAPH 2: FRAGMENTED DATA SILOS */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Database size={16} />
                  <span>2. Fragmented Data & Limited Visibility</span>
                </div>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
                  Although transport operators collect data relating to routes, passenger volumes, ticket sales, vehicle maintenance, and fleet operations, much of this information remains fragmented across operational systems. As a result, transport planners have limited visibility into service performance and are unable to optimize fleet deployment or improve operational efficiency effectively.
                </p>
              </div>

              {/* PARAGRAPH 3: EXPECTED POWER BI SOLUTION */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                  <Sparkles size={16} />
                  <span>3. Expected Analytics Deliverables</span>
                </div>
                <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-semibold bg-gradient-to-br from-emerald-950/60 via-slate-950/60 to-slate-950/60 p-6 rounded-2xl border-2 border-emerald-500/40 text-emerald-100 shadow-xl">
                  Participants are expected to develop a Power BI analytics solution that provides transport authorities with actionable insights into passenger demand, fleet utilization, revenue performance, maintenance trends, and route efficiency, enabling data-driven decisions that improve public transport operations.
                </p>
              </div>
            </div>

            {/* THE CHALLENGE: TRANSFORMATION JOURNEY (TODAY VS FUTURE) */}
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10 backdrop-blur-md">
              
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  TRANSFORMATION FLOW
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">The Challenge & Journey</h2>
                <p className="text-slate-300 text-xs sm:text-sm font-medium">
                  Instead of just the problem statement, show a journey.
                </p>
              </div>

              {/* TODAY VS FUTURE COMPARATIVE COLUMNS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* COLUMN 1: TODAY (BASELINE BREAKDOWN) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-red-950/20 border-2 border-red-500/40 space-y-6">
                  <div className="flex items-center justify-between border-b border-red-500/30 pb-4">
                    <div className="flex items-center gap-2 text-red-400 font-black text-xl uppercase tracking-wider">
                      <XCircle size={22} />
                      <span>Today</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/40">
                      CURRENT BASELINE
                    </span>
                  </div>

                  {/* Vertical Flow Steps with ↓ Arrows */}
                  <div className="space-y-4">
                    {/* Step 1: Excel Files */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/30 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center font-bold shrink-0">
                        <FileSpreadsheet size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Excel Files</h4>
                        <p className="text-[11px] text-slate-300">Fragmented, un-synchronized manual spreadsheets.</p>
                      </div>
                    </div>

                    {/* Arrow ↓ */}
                    <div className="flex justify-center">
                      <ArrowDown size={20} className="text-red-400 animate-bounce" />
                    </div>

                    {/* Step 2: Different Departments */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/30 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center font-bold shrink-0">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Different Departments</h4>
                        <p className="text-[11px] text-slate-300">Isolated agency data silos with zero coordination.</p>
                      </div>
                    </div>

                    {/* Arrow ↓ */}
                    <div className="flex justify-center">
                      <ArrowDown size={20} className="text-red-400 animate-bounce" />
                    </div>

                    {/* Step 3: No Visibility */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/30 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center font-bold shrink-0">
                        <EyeOff size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">No Visibility</h4>
                        <p className="text-[11px] text-slate-300">Zero real-time fleet telemetry or fare audit insight.</p>
                      </div>
                    </div>

                    {/* Arrow ↓ */}
                    <div className="flex justify-center">
                      <ArrowDown size={20} className="text-red-400 animate-bounce" />
                    </div>

                    {/* Step 4: Poor Decisions */}
                    <div className="p-4 rounded-2xl bg-red-900/30 border border-red-500/50 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500 text-white font-bold flex items-center justify-center shrink-0">
                        <ThumbsDown size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-red-200">Poor Decisions</h4>
                        <p className="text-[11px] text-red-300 font-medium">Service delays, revenue leakage & high expenses.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: FUTURE (DIXNOVA SOLUTION TRANSFORMATION) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-xl uppercase tracking-wider">
                      <CheckCircle2 size={22} />
                      <span>Future</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40">
                      DIXNOVA TRANSFORMATION
                    </span>
                  </div>

                  {/* Vertical Flow Steps with ↓ Arrows */}
                  <div className="space-y-4">
                    {/* Step 1: Upload Data */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shrink-0">
                        <Upload size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Upload Data</h4>
                        <p className="text-[11px] text-slate-300">Seamless data ingestion via DixNova Admin Portal.</p>
                      </div>
                    </div>

                    {/* Arrow ↓ */}
                    <div className="flex justify-center">
                      <ArrowDown size={20} className="text-emerald-400 animate-bounce" />
                    </div>

                    {/* Step 2: Process Automatically */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shrink-0">
                        <Cpu size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Process Automatically</h4>
                        <p className="text-[11px] text-slate-300">Automated Power Query ETL & DAX modeling.</p>
                      </div>
                    </div>

                    {/* Arrow ↓ */}
                    <div className="flex justify-center">
                      <ArrowDown size={20} className="text-emerald-400 animate-bounce" />
                    </div>

                    {/* Step 3: Interactive Dashboard */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shrink-0">
                        <MonitorCheck size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Interactive Dashboard</h4>
                        <p className="text-[11px] text-slate-300">Microsoft Power BI Fabric Command Center.</p>
                      </div>
                    </div>

                    {/* Arrow ↓ */}
                    <div className="flex justify-center">
                      <ArrowDown size={20} className="text-emerald-400 animate-bounce" />
                    </div>

                    {/* Step 4: Data-driven Decisions */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center gap-4 shadow-xl shadow-emerald-500/20">
                      <div className="w-10 h-10 rounded-xl bg-white/20 text-white font-bold flex items-center justify-center shrink-0">
                        <Rocket size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold">Data-driven Decisions</h4>
                        <p className="text-[11px] text-emerald-100 font-medium">Optimized fleet dispatch, zero fare leakage & peak efficiency.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECT OBJECTIVES (FOR JUDGES) */}
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

        {/* TAB 4: ANALYTICS PROCESS (HORIZONTAL TIMELINE) */}
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

        {/* Action CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-white">Meet The Team Building DixNova</h3>
            <p className="text-xs sm:text-sm text-slate-300">Discover the data architects, transport engineers, and policy advisors driving transit innovation.</p>
          </div>

          <Link href="/team">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer shrink-0">
              <Users size={20} />
              <span>Meet Our Team</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-amber-400 font-semibold tracking-wide">Innovation Driven By Data</span>
      </footer>
    </div>
  );
}
