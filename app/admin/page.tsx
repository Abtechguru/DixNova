"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  UploadCloud, 
  Sliders, 
  Activity, 
  ArrowUpRight, 
  Clock, 
  Database,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  Layers,
  Eraser,
  BarChart3,
  Building2,
  ChevronRight
} from 'lucide-react';

interface Stats {
  teamCount: number;
  problemCount: number;
  dataRecordsCount: number;
  lastUpload: string | null;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    teamCount: 0,
    problemCount: 0,
    dataRecordsCount: 0,
    lastUpload: null
  });
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [teamRes, probRes, dataRes] = await Promise.all([
          fetch('/api/admin/team').then(r => r.json()),
          fetch('/api/admin/problems').then(r => r.json()),
          fetch('/api/admin/data').then(r => r.json())
        ]);

        const team = teamRes.data || [];
        const problems = probRes.data || [];
        const dataRecords = dataRes.data || [];
        const uploadLogs = dataRes.logs || [];

        setStats({
          teamCount: team.length,
          problemCount: problems.length,
          dataRecordsCount: dataRecords.length,
          lastUpload: uploadLogs.length > 0 ? uploadLogs[0].timestamp : null
        });
        setLogs(uploadLogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      
      {/* 1. HERO BANNER: DixNova Platform Operations */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-amber-950/80 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400" />
              <span>DixNova • Driven by Data</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Administrative Control Center
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Manage transit datasets, Power BI embedded dashboards, team members, problem statements, and system telemetry settings.
          </p>
        </div>
      </div>

      {/* 2. SIX REALTIME OVERVIEW KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Card 1: Team Members */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Team Roster</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-white">{loading ? '...' : stats.teamCount}</span>
            <p className="text-[10px] text-slate-500">Specialists Active</p>
          </div>
        </div>

        {/* Card 2: Custom Data Records */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Dataset Records</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-white">{loading ? '...' : stats.dataRecordsCount}</span>
            <p className="text-[10px] text-emerald-400 font-semibold">Live Database Stream</p>
          </div>
        </div>

        {/* Card 3: Data Preparation ETL */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">ETL Hygiene</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Eraser size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-cyan-400">100% Clean</span>
            <p className="text-[10px] text-slate-500">Zero Null Imputed</p>
          </div>
        </div>

        {/* Card 4: Project Objectives */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Core Objectives</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Target size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-amber-400">6 Delivered</span>
            <p className="text-[10px] text-slate-500">Hackathon Roadmap</p>
          </div>
        </div>

        {/* Card 5: Solution Modules */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">BI Modules</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BarChart3 size={16} />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-purple-400">6 Active</span>
            <p className="text-[10px] text-slate-500">Power BI Embedded</p>
          </div>
        </div>

        {/* Card 6: Telemetry Engine Status */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Engine Telemetry</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity size={16} />
            </div>
          </div>
          <div>
            <span className="text-lg font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={15} /> ONLINE
            </span>
            <p className="text-[10px] text-slate-500">MongoDB Persistent</p>
          </div>
        </div>

      </div>

      {/* 3. EIGHT FEATURE CONTROL MODULES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Building2 size={18} className="text-amber-400" />
            <span>DixNova Platform Modules</span>
          </h3>
          <span className="text-xs text-slate-400">Select module to manage</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Module 1: Dataset Management */}
          <Link
            href="/admin/data"
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Dataset Management</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Import CSV files, manage corridor feeds, and clear custom datasets.
              </p>
            </div>
          </Link>

          {/* Module 2: Data Preparation */}
          <Link
            href="/data-preparation"
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eraser size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                <span>Data Preparation</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Inspect 6-stage ETL workflow, Power Query M-Code, and data quality checks.
              </p>
            </div>
          </Link>

          {/* Module 3: Project Objectives */}
          <Link
            href="/objectives"
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>Project Objectives</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Review hackathon deliverables, scope boundaries, and target KPI metrics.
              </p>
            </div>
          </Link>

          {/* Module 4: Solution Architecture */}
          <Link
            href="/solution"
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>Solution Architecture</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Inspect end-to-end data flow, device mockups, and module features.
              </p>
            </div>
          </Link>

          {/* Module 5: Team Management */}
          <Link
            href="/admin/team"
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 group shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                <span>Team & Roster</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Add team members, upload profile pictures, update roles, bios, and skills.
              </p>
            </div>
          </Link>

          {/* Module 6: Problem Statement */}
          <Link
            href="/admin/problems"
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 group shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors flex items-center justify-between">
                <span>Problem Statement</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Edit official challenge text, transformation flow steps, and project brief.
              </p>
            </div>
          </Link>

          {/* Module 7: Command Center Preview */}
          <Link
            href="/dashboard"
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>Command Center</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Launch live Command Center with real KPI cards, charts, and corridor feeds.
              </p>
            </div>
          </Link>

          {/* Module 8: Settings & Controls */}
          <Link
            href="/admin/settings"
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 group shadow-xl space-y-4 backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sliders size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-slate-300 transition-colors flex items-center justify-between">
                <span>Settings & Controls</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Configure live telemetry feature flags, system notices, and database controls.
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* 4. RECENT OPERATIONS LOG TABLE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Clock size={18} className="text-emerald-400" />
              <span>Recent Dataset Ingestion Logs</span>
            </h3>
            <p className="text-xs text-slate-400">History of dataset files uploaded to DixNova database.</p>
          </div>

          <Link href="/admin/data" className="text-xs text-emerald-400 font-semibold hover:underline flex items-center gap-1">
            <span>Upload New Batch</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl space-y-2">
            <AlertCircle size={24} className="mx-auto text-slate-500" />
            <p className="text-sm text-slate-400 font-medium">No recent dataset uploads recorded</p>
            <p className="text-xs text-slate-600">Upload CSV analysis files on the Dataset Management page to see logs here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Filename</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Record Count</th>
                  <th className="p-3.5">Uploaded By</th>
                  <th className="p-3.5 rounded-r-xl">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-emerald-400">{log.filename}</td>
                    <td className="p-3.5">{log.type}</td>
                    <td className="p-3.5 font-bold text-white">{log.recordCount} records</td>
                    <td className="p-3.5 text-slate-400">{log.uploadedBy}</td>
                    <td className="p-3.5 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
