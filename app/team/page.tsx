"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  Cpu, 
  BarChart3, 
  Clock, 
  Linkedin, 
  Github, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Database, 
  Layers, 
  PieChart, 
  MonitorCheck, 
  Rocket, 
  Quote,
  ShieldCheck,
  Zap,
  Activity,
  Code2,
  Bus,
  DollarSign,
  Compass
} from 'lucide-react';
import bgImg from '@/app/public/bg.jpg';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  responsibilities: string;
  skills: string[];
  linkedin: string;
  github: string;
  image?: any;
  photoUrl?: string;
  badge?: string;
}

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Roster of Team Members
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Oliver Joshua',
      role: 'Team Lead & Lead Data Architect',
      responsibilities: 'Oversees project vision, star-schema data modeling, Power BI Fabric architecture, and API telemetry integration.',
      skills: ['Power BI', 'DAX', 'Data Architecture', 'React / Next.js', 'TypeScript', 'MongoDB'],
      github: 'https://github.com/Abtechguru',
      linkedin: 'https://linkedin.com',
      image: bgImg,
      badge: 'Core Lead'
    },
    {
      id: '2',
      name: 'Data Engineering Specialist',
      role: 'ETL Pipeline & Data Cleaning Expert',
      responsibilities: 'Engineered Power Query M-code scripts, GTFS data cleaning workflows, and null imputation algorithms.',
      skills: ['Power Query', 'Python', 'Pandas', 'SQL', 'Data Hygiene'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      image: bgImg,
      badge: 'ETL Lead'
    },
    {
      id: '3',
      name: 'Business Intelligence Analyst',
      role: 'DAX & Telemetry Analytics Engineer',
      responsibilities: 'Calculated complex Time Intelligence measures, on-time performance %, and fare revenue variance formulas.',
      skills: ['DAX', 'Power BI', 'Financial Modeling', 'KPI Frameworks'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      image: bgImg,
      badge: 'BI Architect'
    },
    {
      id: '4',
      name: 'Frontend UI/UX Architect',
      role: 'SaaS Platform Developer',
      responsibilities: 'Designed modern glassmorphic interface, interactive charts, and responsive executive dashboard portal.',
      skills: ['Next.js 14', 'Tailwind CSS', 'Recharts', 'TypeScript', 'UI/UX Design'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      image: bgImg,
      badge: 'UI Specialist'
    },
    {
      id: '5',
      name: 'Backend & Database Engineer',
      role: 'REST API & Cloud Data Developer',
      responsibilities: 'Built live `/api/analytics` REST endpoints, MongoDB database schemas, and admin data upload engine.',
      skills: ['Node.js', 'Express', 'MongoDB', 'Next.js API', 'REST Services'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      image: bgImg,
      badge: 'Backend Eng'
    },
    {
      id: '6',
      name: 'Transportation Domain Specialist',
      role: 'Urban Mobility & Fleet Strategist',
      responsibilities: 'Defined Lagos BRT corridor metrics, maintenance breakdown categories, and passenger surge models.',
      skills: ['Urban Planning', 'GTFS Standards', 'Fleet Management', 'Operations Research'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      image: bgImg,
      badge: 'Domain Lead'
    },
    {
      id: '7',
      name: 'Quality Assurance & Documentation Lead',
      role: 'Verification & Presentation Coordinator',
      responsibilities: 'Validated data quality checklists, benchmarked KPI target thresholds, and curated project documentation.',
      skills: ['QA Testing', 'Technical Writing', 'Data Validation', 'Presentation Strategy'],
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      image: bgImg,
      badge: 'QA Lead'
    }
  ];

  // Combined Team Skills Matrix
  const combinedSkills = [
    { name: 'Data Analytics & DAX Modeling', level: '98%', color: 'from-blue-500 to-indigo-600' },
    { name: 'Full-Stack Web & Next.js Engine', level: '95%', color: 'from-emerald-500 to-teal-600' },
    { name: 'GTFS Public Transit & Telematics', level: '92%', color: 'from-cyan-500 to-blue-500' },
    { name: 'UI/UX Glassmorphism & Design Systems', level: '94%', color: 'from-purple-500 to-violet-600' },
    { name: 'Financial Auditing & Revenue Control', level: '90%', color: 'from-amber-500 to-orange-500' }
  ];

  // Animated Statistics Cards
  const stats = [
    { label: 'Team Members', value: '7', icon: Users, desc: 'Specialized Analysts & Engineers', color: 'from-blue-500 to-indigo-600' },
    { label: 'Technologies Used', value: '10+', icon: Cpu, desc: 'Power BI, DAX, Next.js, MongoDB', color: 'from-emerald-500 to-teal-600' },
    { label: 'Dashboards Built', value: '6', icon: BarChart3, desc: 'Interactive BI Modules', color: 'from-purple-500 to-violet-600' },
    { label: 'Hackathon Duration', value: '48 Hours', icon: Clock, desc: 'Sprint Delivery Timeframe', color: 'from-amber-500 to-orange-600' }
  ];

  // Collaboration Visual Workflow Steps
  const workflowSteps = [
    {
      step: '01',
      title: 'Problem Analysis',
      icon: Search,
      color: 'from-blue-500 to-indigo-600',
      description: 'Deconstructing Nigerian public transit delays, 25% fare leakage, and fleet availability bottlenecks.'
    },
    {
      step: '02',
      title: 'Data Ingestion & Cleaning',
      icon: Database,
      color: 'from-cyan-500 to-blue-500',
      description: 'Ingesting GTFS transit CSVs, GPS telematics logs, and performing automated Power Query hygiene.'
    },
    {
      step: '03',
      title: 'Star-Schema Modeling',
      icon: Layers,
      color: 'from-purple-500 to-indigo-600',
      description: 'Architecting Fact_Trips, Fact_Ticketing & Dim_Routes tables in Power BI Fabric.'
    },
    {
      step: '04',
      title: 'DAX & Telemetry Calculation',
      icon: PieChart,
      color: 'from-pink-500 to-rose-600',
      description: 'Formulating on-time performance %, fare revenue variance, and fleet utilization KPIs.'
    },
    {
      step: '05',
      title: 'Command Center Development',
      icon: MonitorCheck,
      color: 'from-emerald-500 to-teal-600',
      description: 'Building glassmorphic Next.js portal with live Recharts visualizations and REST API integration.'
    },
    {
      step: '06',
      title: 'Presentation & Deployment',
      icon: Rocket,
      color: 'from-amber-500 to-orange-600',
      description: 'Delivering end-to-end production solution for SmartMove Nigeria executive presentation.'
    }
  ];

  // Project Timeline Milestones
  const timelineMilestones = [
    {
      day: 'DAY 1 • FOCUS: DATA ARCHITECTURE & ETL PIPELINE',
      events: [
        { time: '09:00 AM', title: 'Problem Brief & Requirements Alignment', desc: 'Synthesized municipal transportation challenges and defined target KPIs.' },
        { time: '01:00 PM', title: 'GTFS Data Ingestion & Sanitization', desc: 'Normalized 50,000+ trip records and passenger ticketing logs.' },
        { time: '06:00 PM', title: 'Star-Schema & DAX Architecture', desc: 'Engineered relational model and calculated key operational metrics.' },
        { time: '11:00 PM', title: 'Web App & MongoDB Pipeline Setup', desc: 'Deployed Next.js App Router structure and MongoDB Atlas cluster.' }
      ]
    },
    {
      day: 'DAY 2 • FOCUS: INTEGRATION & PRESENTATION',
      events: [
        { time: '08:00 AM', title: 'Power BI Dashboard Embedding', desc: 'Integrated interactive BI iframe views into Command Center UI.' },
        { time: '01:00 PM', title: 'Realtime Data Validation & Testing', desc: 'End-to-end testing of Admin upload portal and report rendering.' },
        { time: '05:00 PM', title: 'Executive Pitch Deck Finalization', desc: 'Synthesized insights, revenue recommendations, and live demonstration.' }
      ]
    }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      {/* 1. TOP HEADER WITH BRAND LOGO & LINKS */}
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
                Meet Team DixNova
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
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
                <span>Command Center</span>
                <ChevronRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 space-y-20 flex-1">
        
        {/* 2. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles size={15} className="animate-pulse" />
            <span>STEP 2 OF 17 • HACKATHON INNOVATION TEAM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Meet Team <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">DixNova</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            An agile team of data engineers, BI architects, and software specialists dedicated to transforming raw public transportation data into actionable business intelligence for SmartMove Nigeria.
          </p>
        </section>

        {/* 3. FOUR ANIMATED STATISTIC CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/80 shadow-2xl space-y-4 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-md group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{stat.label}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* 4. TEAM MEMBERS GRID */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Our Specialists Roster</h2>
              <p className="text-xs text-slate-400">7 experts driving end-to-end transportation intelligence.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
              100% Production Dedicated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-xl backdrop-blur-md group"
              >
                <div className="space-y-4">
                  {/* Avatar Header */}
                  <div className="flex items-center justify-between">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-lg bg-slate-800 group-hover:scale-105 transition-transform">
                      <Image
                        src={member.image || bgImg}
                        alt={member.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    {member.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold uppercase">
                        {member.badge}
                      </span>
                    )}
                  </div>

                  {/* Name & Role */}
                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">{member.name}</h3>
                    <p className="text-xs font-semibold text-amber-300/90 mt-0.5">{member.role}</p>
                  </div>

                  {/* Responsibilities */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {member.responsibilities}
                  </p>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {member.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-mono text-slate-500">DixNova Core</span>
                  <div className="flex items-center gap-3">
                    <a href={member.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      <Github size={16} />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. VISUAL WORKFLOW SECTION */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800/80 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Collaboration Workflow</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              From raw transportation data ingestion to executive Power BI presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((ws, idx) => {
              const Icon = ws.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-600 group-hover:text-amber-400 transition-colors font-mono">{ws.step}</span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ws.color} flex items-center justify-center text-white font-bold shadow-md`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white">{ws.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{ws.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. PROJECT TIMELINE */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              SPRINT MILESTONES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">48-Hour Project Timeline</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Key engineering milestones accomplished across the two hackathon days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {timelineMilestones.map((milestone, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl backdrop-blur-md">
                <div className="pb-4 border-b border-slate-800 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                  <h3 className="text-sm font-black text-amber-400 font-mono tracking-wider">{milestone.day}</h3>
                </div>

                <div className="space-y-4">
                  {milestone.events.map((ev, eIdx) => (
                    <div key={eIdx} className="flex gap-4 items-start group">
                      <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 pt-0.5">{ev.time}</span>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{ev.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. COMBINED TECHNICAL SKILLS BREAKDOWN */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              CAPABILITY MATRIX
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Combined Team Expertise</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              High-impact proficiency across data engineering, full-stack development, and transit policy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-5">
            {combinedSkills.map((sk, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-white">{sk.name}</span>
                  <span className="text-emerald-400">{sk.level}</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${sk.color} transition-all duration-1000`}
                    style={{ width: sk.level }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. MOTIVATIONAL TEAM MOTTO */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-amber-950/80 border-2 border-amber-500/40 text-center space-y-4 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <Quote size={48} className="mx-auto text-amber-400/30" />
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug max-w-3xl mx-auto">
            "Transforming Transit Friction Into Fluid Motion Through Data Architecture."
          </h2>
          <p className="text-xs font-mono text-amber-300 tracking-wider uppercase font-bold">
            — Team DixNova Motto
          </p>
        </section>

        {/* NEXT STEP CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">NEXT EVALUATION STEP</span>
            <h3 className="text-2xl font-black text-white">Step 3: About SmartMove Nigeria</h3>
            <p className="text-xs text-slate-300">Discover the transit authority client profile and fleet scope.</p>
          </div>

          <Link href="/about-smartmove">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Continue to About SmartMove</span>
              <ArrowRight size={18} />
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
