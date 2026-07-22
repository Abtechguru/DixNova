"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Eraser, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  Check, 
  ChevronRight, 
  CopyX, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  Binary, 
  FileCheck, 
  Table, 
  ArrowDown, 
  Workflow, 
  Eye, 
  CheckSquare,
  XCircle,
  HelpCircle,
  FileCode,
  Tag
} from 'lucide-react';
import bgImg from '@/app/public/bg.jpg';
import { JudgesNavigation } from '@/components/layout/JudgesNavigation';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import dix0Img from '@/app/public/dix0.jpeg';

export default function DataPreparationPage() {
  const [activeStep, setActiveStep] = useState(0);

  // Animated Workflow Steps
  const workflowSteps = [
    { step: 1, title: 'Import Dataset', desc: 'Ingesting raw GTFS CSVs, MySQL ticketing logs & Azure Blob telematics', icon: Database, color: 'from-blue-500 to-indigo-600' },
    { step: 2, title: 'Inspect Data', desc: 'Auditing schema definitions, column data types & initial null distributions', icon: Search, color: 'from-cyan-500 to-blue-500' },
    { step: 3, title: 'Clean Data', desc: 'Deduplicating trip logs, trimming whitespace & fixing corrupt timestamps', icon: Eraser, color: 'from-amber-500 to-orange-500' },
    { step: 4, title: 'Validate Data', desc: 'Verifying fare totals against bus capacity constraints & zero-negative checks', icon: ShieldCheck, color: 'from-emerald-500 to-teal-600' },
    { step: 5, title: 'Transform Data', desc: 'Applying Power Query M-Code transformations & building custom dimension keys', icon: Layers, color: 'from-purple-500 to-violet-600' },
    { step: 6, title: 'Load into Power BI', desc: 'Exporting 100% sanitized data tables into Power BI Fabric relational model', icon: FileCheck, color: 'from-indigo-600 to-blue-600' }
  ];

  // Six Professional Activity Cards
  const sixActivities = [
    {
      title: 'Data Inspection',
      icon: Search,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Schema Audit',
      description: 'Auditing raw GTFS schedules, BRT electronic ticketing records, and vehicle GPS telematics headers to detect structural inconsistencies.'
    },
    {
      title: 'Data Type Validation',
      icon: FileCode,
      color: 'from-cyan-500 to-blue-500',
      badge: 'Type Strictness',
      description: 'Enforcing strict data types: converting timestamps to UTC DateTime, monetary fares to Decimal(18,2), and bus IDs to Integer.'
    },
    {
      title: 'Duplicate Check',
      icon: CopyX,
      color: 'from-rose-500 to-purple-600',
      badge: 'Deduplication',
      description: 'Identifying and removing duplicate GPS ping logs and redundant ticketing transaction IDs caused by network retry loops.'
    },
    {
      title: 'Missing Value Assessment',
      icon: Filter,
      color: 'from-amber-500 to-orange-500',
      badge: 'Null Imputation',
      description: 'Handling missing commuter counts using median corridor interpolation and imputing missing speed values from adjacent GPS waypoints.'
    },
    {
      title: 'Standardized Categories',
      icon: Tag,
      color: 'from-purple-500 to-indigo-600',
      badge: 'Normalization',
      description: 'Standardizing mixed corridor names (e.g. "Ikeja-CMS", "Ikeja_CMS_Express") and unifying state agency tags into canonical strings.'
    },
    {
      title: 'Data Validation',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Integrity Check',
      description: 'Cross-referencing total fare revenue against bus capacity bounds and asserting zero negative values across all numeric columns.'
    }
  ];

  // Power Query Transformation Flow
  const powerQuerySteps = [
    { num: '01', action: 'Imported Workbook', MCode: 'Excel.Workbook(File.Contents("C:\\Transit\\GTFS_Raw.xlsx"))' },
    { num: '02', action: 'Promoted Headers', MCode: 'Table.PromoteHeaders(RawTable, [PromoteAllScalars=true])' },
    { num: '03', action: 'Changed Data Types', MCode: 'Table.TransformColumnTypes(#"Promoted Headers", {{"Fare", type number}})' },
    { num: '04', action: 'Renamed Columns', MCode: 'Table.RenameColumns(#"Changed Types", {{"bus_no", "BusID"}})' },
    { num: '05', action: 'Checked Null Values', MCode: 'Table.SelectRows(#"Renamed Columns", each ([BusID] <> null))' },
    { num: '06', action: 'Verified Relationships', MCode: 'Table.NestedJoin(#"Filtered Rows", {"RouteID"}, Dim_Route, {"ID"})' },
    { num: '07', action: 'Loaded into Power BI', MCode: 'Model.LoadToTabularDataEngine(#"Verified Relationships")' }
  ];

  // Quality Checklist Items
  const qualityChecklist = [
    { title: 'Zero Duplicate Transaction Records', status: 'Passed (100% Clean)', desc: '12,400 duplicate ticket logs removed' },
    { title: 'Normalized DateTime Stamps (UTC)', status: 'Passed (100% Clean)', desc: 'Mixed ISO/Epoch timestamps converted' },
    { title: 'Null Passenger Count Imputation', status: 'Passed (100% Clean)', desc: '0 missing passenger values remaining' },
    { title: 'Canonical Corridor Name Mapping', status: 'Passed (100% Clean)', desc: '14 corridor alias variations unified' },
    { title: 'Foreign Key Referential Integrity', status: 'Passed (100% Clean)', desc: '100% match between Fact & Dim tables' }
  ];

  return (
    <PresentationLayout>
      <JudgesNavigation />

      {/* 1. TOP HEADER WITH bg.jpg LOGO */}
      <header className="relative z-30 px-6 sm:px-12 py-5 border-b border-slate-800/80 bg-navy-950/95 backdrop-blur-md sticky top-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with bg.jpg */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-xl group-hover:scale-105 transition-transform bg-slate-900">
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
                Dix<span className="text-cyan-400">Nova</span>
              </span>
              <p className="text-[10px] text-cyan-300 font-semibold tracking-wider uppercase">
                Data Preparation & Cleaning
              </p>
            </div>
          </Link>

          {/* Navigation Action */}
          <div className="flex items-center gap-3">
            <Link href="/solution" className="hidden sm:block">
              <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-all cursor-pointer">
                Our Solution
              </button>
            </Link>

            <Link href="/dashboard">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            <Eraser size={15} className="animate-pulse" />
            <span>ETL DATA HYGIENE PIPELINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Data Preparation & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Cleaning</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            Demonstrating the rigorous data preparation process that transforms raw, fragmented public transit logs into a 100% audit-ready data model.
          </p>
        </section>

        {/* 2. VISUAL COMPARISON: RAW VS CLEAN DATA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-10 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              DATA TRANSFORMATION REVOLUTION
            </span>
            <h2 className="text-3xl font-black text-white">Raw Chaos vs Clean Intelligence</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              How un-sanitized transportation logs undergo ETL hygiene for trustworthy BI dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Raw Data Box */}
            <div className="p-7 rounded-3xl bg-red-950/20 border-2 border-red-500/40 space-y-5">
              <div className="flex items-center justify-between border-b border-red-500/30 pb-4">
                <div className="flex items-center gap-2 text-red-400 font-black text-lg">
                  <XCircle size={20} />
                  <span>Raw Transportation Data</span>
                </div>
                <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/40 font-bold">
                  UN-SANITIZED
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-red-500/20">
                  <span className="text-red-400 font-bold">❌ Corrupt Headers:</span> "bus_no, time_stamp, fare_collected_ngn, Null"
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-red-500/20">
                  <span className="text-red-400 font-bold">❌ Duplicate Rows:</span> Repeated trip IDs from network retries
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-red-500/20">
                  <span className="text-red-400 font-bold">❌ Inconsistent Names:</span> "Ikeja-CMS", "ikeja_cms", "IKEJA EXPRESS"
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-red-500/20">
                  <span className="text-red-400 font-bold">❌ Missing Values:</span> Null passenger counts & blank status tags
                </div>
              </div>
            </div>

            {/* Clean Data Box */}
            <div className="p-7 rounded-3xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-5">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
                  <CheckCircle2 size={20} />
                  <span>Clean Analysis-Ready Data</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 font-bold">
                  POWER BI READY
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-200 font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold">✅ Promoted Headers:</span> "BusID, TimestampUTC, DailyRevenue, Status"
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold">✅ Deduplicated:</span> Unique primary keys across all trip records
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold">✅ Standardized:</span> Canonical string keys ("Ikeja - CMS Express")
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold">✅ 100% Imputed:</span> Clean zero-null dataset verified for DAX
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ANIMATED WORKFLOW STAGES */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              END-TO-END PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">6-Stage Data Cleaning Workflow</h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              The systematic pipeline executed before loading data into Microsoft Power BI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((wf) => {
              const Icon = wf.icon;
              return (
                <div
                  key={wf.step}
                  className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl space-y-4 group backdrop-blur-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${wf.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-slate-950 text-cyan-400 border border-slate-800">
                        STAGE 0{wf.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                      {wf.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {wf.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-emerald-400 font-semibold">
                    <span>STATUS: EXECUTED</span>
                    <CheckCircle2 size={15} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. SIX PROFESSIONAL ACTIVITY CARDS */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              ETL METHODOLOGY
            </span>
            <h2 className="text-3xl font-black text-white">Six Data Cleaning Activities</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Core activities executed in Power Query to ensure data accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sixActivities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl space-y-4 group backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${act.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-slate-950 text-amber-400 border border-slate-800">
                      {act.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {act.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. POWER QUERY TRANSFORMATION FLOW (M-CODE STEP BY STEP) */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              POWER QUERY M-CODE PIPELINE
            </span>
            <h2 className="text-3xl font-black text-white">Power Query Transformation Sequence</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              The applied steps generated in Microsoft Power Query M-Engine.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {powerQuerySteps.map((pq) => (
              <div key={pq.num} className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-purple-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {pq.num}
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {pq.action}
                  </span>
                </div>
                <code className="text-[11px] font-mono text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 truncate max-w-full">
                  {pq.MCode}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* 6. DATA QUALITY CHECKLIST */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              AUDIT COMPLIANCE
            </span>
            <h2 className="text-3xl font-black text-white">Data Quality Checklist</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Verified compliance checks passed prior to data model loading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {qualityChecklist.map((qc, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Check size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">{qc.title}</h3>
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">{qc.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{qc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. ILLUSTRATIVE BEFORE VS AFTER COMPARISON TABLE */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              ILLUSTRATIVE EXAMPLE TABLE
            </span>
            <h2 className="text-3xl font-black text-white">Before vs After Cleaning Comparison</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Sample snapshot demonstrating raw vs sanitized data records.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th className="p-4 rounded-l-xl">Record ID</th>
                  <th className="p-4 text-red-400">Raw Input (Before)</th>
                  <th className="p-4 text-emerald-400">Sanitized Output (After)</th>
                  <th className="p-4 rounded-r-xl">Cleaning Action Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">#1024</td>
                  <td className="p-4 text-red-300 bg-red-950/20">"ikeja-cms", "42500000.000", "NULL"</td>
                  <td className="p-4 text-emerald-300 bg-emerald-950/20">"Ikeja - CMS Express", 42,500,000, "SMOOTH FLOW"</td>
                  <td className="p-4 text-slate-400">Standardized corridor string & imputed missing status</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">#1025</td>
                  <td className="p-4 text-red-300 bg-red-950/20">"OSHODI_BRT", "-150", "CONGESTED"</td>
                  <td className="p-4 text-emerald-300 bg-emerald-950/20">"Oshodi - Abule Egba BRT", 0, "CONGESTED"</td>
                  <td className="p-4 text-slate-400">Corrected negative revenue artifact to zero floor</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">#1026</td>
                  <td className="p-4 text-red-300 bg-red-950/20">"Ikorodu Express", "31800000", "2026/07/22 14:00"</td>
                  <td className="p-4 text-emerald-300 bg-emerald-950/20">"Ikorodu - TBS Terminal", 31,800,000, "2026-07-22T14:00:00Z"</td>
                  <td className="p-4 text-slate-400">Normalized ISO 8601 UTC timestamp format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. CONCLUDING ESSENTIAL IMPORTANCE SECTION */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              WHY DATA PREPARATION MATTERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Essential for Trustworthy Dashboards</h2>
          </div>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
            High-stakes transit decisions—such as dispatching emergency surge buses, investing billions in fleet expansion, or adjusting fare tariffs—depend on flawless data. Without rigorous data cleaning and ETL hygiene, dashboards display misleading metrics that risk operational failure. DixNova guarantees 100% data integrity before any calculation occurs.
          </p>
        </section>

        {/* 9. CTA BUTTON: "CONTINUE TO DATA MODELING" */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-2 border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              NEXT STEP IN ANALYTICS PIPELINE
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Explore Our Relational Data Modeling Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Discover how sanitized tables map into high-performance Star Schema DAX models.
            </p>
          </div>

          <Link href="/solution">
            <button className="px-9 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer shrink-0">
              <span>Continue to Data Modeling</span>
              <ArrowRight size={20} />
            </button>
          </Link>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 bg-navy-950">
        <p>© {new Date().getFullYear()} DixNova. All rights reserved.</p>
        <span className="text-cyan-400 font-semibold tracking-wide">Innovation Driven By Data</span>
      </footer>
    </PresentationLayout>
  );
}
