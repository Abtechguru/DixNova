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
  AlertCircle
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-emerald-950 border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider inline-block">
            Administrative Control Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Manage DixNova Transit Platform
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Upload real analysis data feeds, edit team members and pictures, add problem statement sections, and customize system settings.
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Team Members</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users size={18} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{loading ? '...' : stats.teamCount}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              Active Roster
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Profiles displayed on /team page</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Problem Sections</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileText size={18} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{loading ? '...' : stats.problemCount}</span>
            <span className="text-xs text-purple-400 font-semibold">Journey Steps</span>
          </div>
          <p className="text-[11px] text-slate-500">Sections on /problem-statement</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Custom Analysis Records</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database size={18} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{loading ? '...' : stats.dataRecordsCount}</span>
            <span className="text-xs text-emerald-400 font-semibold">Live Data</span>
          </div>
          <p className="text-[11px] text-slate-500">Corridors fed to public dashboards</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">System Telemetry</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Activity size={18} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> Operational
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Database JSON Store persistent</p>
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Feature Control Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/data"
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group shadow-xl space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Upload Analysis Data</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Feed real CSV/JSON corridor transit telemetry and passenger data into the platform.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/team"
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group shadow-xl space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>Team & Pictures</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Upload pictures, add new team members, edit roles, bios, and skill tags.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/problems"
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 group shadow-xl space-y-4"
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
                Add journey steps, edit problem challenges, and update solution descriptions.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group shadow-xl space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sliders size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>General Controls</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Toggle live feature flags, update system notices, and manage global settings.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity / Log Table */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Clock size={18} className="text-emerald-400" />
              <span>Recent Upload & Data Operations Log</span>
            </h3>
            <p className="text-xs text-slate-400">History of analysis files uploaded to the system.</p>
          </div>

          <Link href="/admin/data" className="text-xs text-emerald-400 font-semibold hover:underline">
            Upload New Batch →
          </Link>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl space-y-2">
            <AlertCircle size={24} className="mx-auto text-slate-500" />
            <p className="text-sm text-slate-400 font-medium">No recent uploads recorded yet</p>
            <p className="text-xs text-slate-600">Upload CSV analysis files on the Data Upload page to see logs here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Filename</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Records</th>
                  <th className="p-3.5">Uploaded By</th>
                  <th className="p-3.5 rounded-r-xl">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-emerald-400">{log.filename}</td>
                    <td className="p-3.5">{log.type}</td>
                    <td className="p-3.5 font-bold">{log.recordCount} records</td>
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
