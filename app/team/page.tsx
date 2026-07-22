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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  responsibilities: string;
  photoUrl: string;
  skills: string[];
  linkedin: string;
  github: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Vanessa Kirby',
    role: 'Lead Data Scientist & DAX Architect',
    responsibilities: 'Architect of GTFS data modeling, Power Query M-Code transformations, star-schema relationships, and predictive passenger demand measures.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    skills: ['Power BI', 'DAX', 'Python', 'SQL Server', 'Star Schema'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: '2',
    name: 'Olumide Adebayo',
    role: 'Senior Full-Stack & Telemetry Architect',
    responsibilities: 'Full-stack web architect designing Next.js 14 serverless route handlers, MongoDB Atlas cluster pipelines, and glassmorphic UI controls.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: '3',
    name: 'Chidi Okafor',
    role: 'Transport Operations Lead',
    responsibilities: 'Municipal transit analytics & corridor optimization director focusing on Lagos BRT fleet dispatch efficiency and bottleneck removal.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    skills: ['Transit Analytics', 'Fleet Telemetry', 'LAMATA Systems', 'GIS Mapping'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: '4',
    name: 'Fatima Bello',
    role: 'Product Strategy & UX Lead',
    responsibilities: 'Public transportation design systems & user experience architect creating accessible executive BI dashboards for transit planners.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    skills: ['Figma', 'UX Research', 'Design Systems', 'Data Visualization'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: '5',
    name: 'Dr. Amina Yusuf',
    role: 'Senior Transit Policy Advisor',
    responsibilities: 'Federal Ministry Transport Policy & Smart City Infrastructure Advisor overseeing national transit corridors and compliance.',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80',
    skills: ['Policy Strategy', 'Municipal Transit', 'Governance', 'Federal Standards'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: '6',
    name: 'Prof. Tunde Bakare',
    role: 'Data Infrastructure Advisor',
    responsibilities: 'Big Data Architecture & Azure Cloud Integration Specialist providing high-capacity data lake frameworks for real-time telemetry.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
    skills: ['Azure Data Lake', 'Fabric BI', 'Big Data', 'ETL Pipelines'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  },
  {
    id: '7',
    name: 'Kemi Balogun',
    role: 'Financial Systems Advisor',
    responsibilities: 'Automated Fare Collection & Revenue Audit Compliance Expert for digital ticketing systems to prevent cash leakage.',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80',
    skills: ['Fare Auditing', 'Digital Payments', 'Financial Control', 'Risk Mitigation'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  }
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const stats = [
    { label: 'Team Members', value: '7', subtitle: 'Cross-functional Specialists', icon: Users, color: 'from-blue-500 to-indigo-600' },
    { label: 'Technologies Used', value: '10+', subtitle: 'Modern Stack & BI Tools', icon: Cpu, color: 'from-cyan-500 to-blue-500' },
    { label: 'Dashboards Built', value: '6', subtitle: 'Interactive Command Center Visuals', icon: BarChart3, color: 'from-amber-500 to-orange-500' },
    { label: 'Hackathon Duration', value: '48 Hrs', subtitle: 'Sprint Execution Time', icon: Clock, color: 'from-emerald-500 to-teal-600' }
  ];

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
      description: 'Designing high-performance relational data models linking Fact_Trips, Dim_Routes, and Dim_Fleet.'
    },
    {
      step: '04',
      title: 'Power BI DAX & Visuals',
      icon: PieChart,
      color: 'from-amber-500 to-orange-500',
      description: 'Writing custom DAX time-intelligence measures for peak surge hours and revenue auditing.'
    },
    {
      step: '05',
      title: 'Web & Command Center Integration',
      icon: MonitorCheck,
      color: 'from-emerald-500 to-teal-600',
      description: 'Building Next.js 14 web application portal with embedded Power BI telemetry dashboards.'
    },
    {
      step: '06',
      title: 'Pitch & Recommendations',
      icon: Rocket,
      color: 'from-rose-500 to-purple-600',
      description: 'Delivering data-driven policy recommendations for municipal transport decision-makers.'
    }
  ];

  const timelineEvents = [
    {
      day: 'DAY 1 • FOCUS: DATA & INFRASTRUCTURE',
      events: [
        { time: '08:00 AM', title: 'Problem Briefing & Role Alignment', desc: 'Deconstructed LAMATA transit brief & defined 7 specialization tracks.' },
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

  const combinedSkills = [
    { name: 'Data Analytics & DAX Modeling', level: '98%', color: 'from-blue-500 to-indigo-600' },
    { name: 'Full-Stack Web & Next.js Engine', level: '95%', color: 'from-emerald-500 to-teal-600' },
    { name: 'GTFS Public Transit & Telematics', level: '92%', color: 'from-cyan-500 to-blue-500' },
    { name: 'UI/UX Glassmorphism & Design Systems', level: '94%', color: 'from-purple-500 to-violet-600' },
    { name: 'Financial Auditing & Revenue Control', level: '90%', color: 'from-amber-500 to-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-white font-sans">
      
      {/* 1. TOP HEADER WITH BRAND LOGO & LINKS */}
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
                Transportation Analytics
              </p>
            </div>
          </Link>

          {/* Header Navigation Actions */}
          <div className="flex items-center gap-3">
            <Link href="/problem-statement" className="hidden sm:block">
              <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-all cursor-pointer">
                Problem Statement
              </button>
            </Link>

            <Link href="/dashboard">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
                <span>Command Center</span>
                <ChevronRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-20">
        
        {/* 2. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-400 uppercase tracking-widest">
            <Sparkles size={15} className="animate-pulse" />
            <span>Hackathon Innovation Team</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Meet the <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">DixNova Team</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Building an enterprise-grade transportation analytics platform using data analytics, predictive modeling, and Microsoft Power BI Fabric to revolutionize municipal transit across Nigeria.
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-emerald-400">
              ⚡ 48-HOUR SPRINT INITIATIVE
            </span>
            <span className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-amber-400">
              👥 7 CROSS-FUNCTIONAL SPECIALISTS
            </span>
            <span className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-cyan-400">
              📊 POWER BI FABRIC ARCHITECTURE
            </span>
          </div>
        </section>

        {/* 3. FOUR ANIMATED STATISTIC CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 shadow-xl space-y-4 backdrop-blur-md group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${st.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                    {st.value}
                  </h3>
                  <h4 className="text-sm font-bold text-slate-200">{st.label}</h4>
                  <p className="text-xs text-slate-400">{st.subtitle}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* 4. RESPONSIVE GRID OF SEVEN TEAM MEMBER CARDS */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              THE TALENT BEHIND DIXNOVA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Cross-Functional Team</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Data architects, transport engineers, and policy advisors driving transit innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 hover:border-amber-400/50 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6 group relative overflow-hidden backdrop-blur-md"
              >
                <div className="space-y-4">
                  {/* Circular Profile Image with Animated Glowing Border */}
                  <div className="flex justify-center pt-2">
                    <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-emerald-400 to-amber-400 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-emerald-400">
                      {member.role}
                    </p>
                  </div>

                  {/* Responsibilities */}
                  <p className="text-xs text-slate-300 leading-relaxed font-normal bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                    "{member.responsibilities}"
                  </p>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono font-medium text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">DIXNOVA TEAM</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-800"
                    >
                      <Linkedin size={14} />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-800"
                    >
                      <Github size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TEAM COLLABORATION VISUAL WORKFLOW */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              COLLABORATION PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">How We Collaborated</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              From problem analysis to executive policy presentation across 6 distinct stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((wf) => {
              const Icon = wf.icon;
              return (
                <div
                  key={wf.step}
                  className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${wf.color} flex items-center justify-center text-white font-bold shadow-md`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400">STAGE {wf.step}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-black text-white group-hover:text-blue-300 transition-colors">
                      {wf.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {wf.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. PROJECT TIMELINE (48-HOUR HACKATHON MILESTONES) */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              SPRINT CHRONOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">48-Hour Hackathon Timeline</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Key milestones achieved across Day 1 and Day 2 of intense development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {timelineEvents.map((col, idx) => (
              <div key={idx} className="space-y-6">
                <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-amber-400 tracking-wider text-center">
                  {col.day}
                </div>

                <div className="space-y-4 relative pl-4 border-l-2 border-slate-800">
                  {col.events.map((ev, eIdx) => (
                    <div key={eIdx} className="space-y-1 relative">
                      <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-slate-950" />
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{ev.time}</span>
                        <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                      </div>
                      <p className="text-xs text-slate-300 pl-1">{ev.desc}</p>
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

        {/* 8. MOTIVATIONAL TEAM MOTTO CARD */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden backdrop-blur-md">
          <Quote size={80} className="absolute -top-6 -left-6 opacity-10 text-emerald-400 pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase border border-emerald-500/40">
            ⚡ DIXNOVA MISSION MOTTO
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-relaxed max-w-3xl mx-auto">
            "Transforming raw transit data into actionable urban mobility decisions — empowering cities, optimizing fleets, and improving lives."
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-semibold tracking-wider uppercase">
            — THE DIXNOVA HACKATHON TEAM
          </p>
        </section>

        {/* 9. NAVIGATION BUTTONS (BACK & FORWARD) */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-800/80">
          <Link href="/problem-statement">
            <button className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer shadow-lg w-full sm:w-auto justify-center">
              <ArrowLeft size={16} />
              <span>Back to Problem Statement</span>
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="px-9 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-3 shadow-xl shadow-blue-600/30 hover:scale-105 transition-all cursor-pointer w-full sm:w-auto justify-center">
              <span>Launch Command Center</span>
              <ArrowRight size={16} />
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
