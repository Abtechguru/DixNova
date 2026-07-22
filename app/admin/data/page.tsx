"use client"
import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Database, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Plus, 
  Download,
  Activity,
  FileText
} from 'lucide-react';

interface AnalysisRecord {
  id: string;
  name: string;
  activeBuses: number;
  occupancyRate: number;
  revenueToday: number;
  status: string;
  avgSpeedKmh: number;
  state: string;
  importedAt: string;
}

export default function AdminDataUploadPage() {
  const [records, setRecords] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');

  // Manual entry fields
  const [name, setName] = useState('');
  const [activeBuses, setActiveBuses] = useState('85');
  const [occupancyRate, setOccupancyRate] = useState('90');
  const [revenueToday, setRevenueToday] = useState('25000000');
  const [status, setStatus] = useState('SMOOTH FLOW');
  const [avgSpeedKmh, setAvgSpeedKmh] = useState('45');
  const [state, setState] = useState('Lagos State (LAMATA)');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      if (data.success) {
        setRecords(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const text = await file.text();

      // Simple CSV Parser
      const lines = text.split(/\r?\n/).filter(line => line.trim());
      if (lines.length < 2) {
        alert('File is empty or missing headers');
        return;
      }

      // Parse headers
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const parsedRecords: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
        if (cols.length >= 2) {
          parsedRecords.push({
            name: cols[0] || `Corridor #${i}`,
            activeBuses: Number(cols[1]) || 50,
            occupancyRate: Number(cols[2]) || 85,
            revenueToday: Number(cols[3]) || 15000000,
            status: cols[4] || 'NORMAL',
            avgSpeedKmh: Number(cols[5]) || 40,
            state: cols[6] || 'Lagos State (LAMATA)'
          });
        }
      }

      if (parsedRecords.length === 0) {
        alert('Could not parse valid records from CSV');
        return;
      }

      // Submit parsed records to API
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          records: parsedRecords,
          filename: file.name
        })
      });

      const data = await res.json();
      if (data.success) {
        alert(`Successfully uploaded ${data.count} analysis records!`);
        fetchData();
      } else {
        alert(data.error || 'Failed to process data import');
      }
    } catch (err: any) {
      console.error(err);
      alert('Error parsing CSV file: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Corridor name is required');
      return;
    }

    const newRecord = {
      name,
      activeBuses: Number(activeBuses) || 0,
      occupancyRate: Number(occupancyRate) || 0,
      revenueToday: Number(revenueToday) || 0,
      status,
      avgSpeedKmh: Number(avgSpeedKmh) || 0,
      state
    };

    try {
      setUploading(true);
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          records: [newRecord],
          filename: 'Manual Admin Entry'
        })
      });

      const data = await res.json();
      if (data.success) {
        setName('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear all custom uploaded analysis records?')) return;
    try {
      const res = await fetch('/api/admin/data', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Corridor Name,Active Buses,Occupancy Rate %,Revenue Today NGN,Status,Avg Speed Kmh,State\n" +
      "Lecki Toll Plaza - Ajah BRT,110,95,34000000,HIGH DEMAND,38,Lagos State (LAMATA)\n" +
      "Maitama Expressway Express,75,88,21500000,SMOOTH FLOW,55,Abuja FCT (Central Transit)";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dixnova_sample_analysis_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <UploadCloud className="text-emerald-400" />
            <span>Upload Real Analysis Data Feeds</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Import CSV files or manually submit live corridor telemetry into the DixNova database engine.
          </p>
        </div>

        <button
          onClick={downloadSampleCSV}
          className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer shadow"
        >
          <Download size={15} />
          <span>Download Sample CSV Template</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileSpreadsheet size={16} />
          <span>CSV / File Upload</span>
        </button>

        <button
          onClick={() => setActiveTab('manual')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'manual'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Plus size={16} />
          <span>Manual Entry Form</span>
        </button>
      </div>

      {/* Tab 1: CSV Upload Box */}
      {activeTab === 'upload' && (
        <div className="p-8 rounded-3xl bg-slate-900/90 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 transition-all text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <UploadCloud size={32} />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-white">Drag & Drop Analysis CSV File</h3>
            <p className="text-xs text-slate-400">
              Upload transit telemetry reports containing corridor speeds, passenger volumes, and revenue metrics.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-xl shadow-emerald-500/20 cursor-pointer active:scale-95 transition-all">
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Processing & Importing Data...</span>
              </>
            ) : (
              <>
                <FileSpreadsheet size={16} />
                <span>Browse CSV File</span>
              </>
            )}
            <input
              type="file"
              accept=".csv, .txt"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>

          <p className="text-[11px] text-slate-500">
            Supported columns: Corridor Name, Active Buses, Occupancy Rate, Revenue Today, Status, Avg Speed, State
          </p>
        </div>
      )}

      {/* Tab 2: Manual Form */}
      {activeTab === 'manual' && (
        <form onSubmit={handleManualSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white">Add Single Corridor Analysis Record</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Corridor Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Lekki Phase 1 Express"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">State / Region</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Lagos State (LAMATA)">Lagos State (LAMATA)</option>
                <option value="Abuja FCT (Central Transit)">Abuja FCT (Central Transit)</option>
                <option value="Rivers State Transit Authority">Rivers State Transit Authority</option>
                <option value="Kano Line Metro">Kano Line Metro</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Active Buses</label>
              <input
                type="number"
                value={activeBuses}
                onChange={(e) => setActiveBuses(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Occupancy Rate (%)</label>
              <input
                type="number"
                value={occupancyRate}
                onChange={(e) => setOccupancyRate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Revenue Today (NGN ₦)</label>
              <input
                type="number"
                value={revenueToday}
                onChange={(e) => setRevenueToday(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Traffic Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="SMOOTH FLOW">SMOOTH FLOW</option>
                <option value="CONGESTED">CONGESTED</option>
                <option value="NORMAL">NORMAL</option>
                <option value="HIGH DEMAND">HIGH DEMAND</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
              <span>Save & Publish Data Record</span>
            </button>
          </div>
        </form>
      )}

      {/* Analysis Records Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Database size={18} className="text-emerald-400" />
              <span>Current Analysis Data Records ({records.length})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Live corridor records stored in system database.
            </p>
          </div>

          {records.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Clear Custom Uploads</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">
            <Loader2 size={24} className="animate-spin mx-auto text-emerald-400" />
          </div>
        ) : records.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl space-y-1">
            <AlertCircle size={24} className="mx-auto text-slate-500" />
            <p className="text-sm text-slate-300 font-semibold">No Custom Analysis Records Loaded</p>
            <p className="text-xs text-slate-500">Upload a CSV file or add a record manually above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Corridor Name</th>
                  <th className="p-3.5">State</th>
                  <th className="p-3.5">Active Buses</th>
                  <th className="p-3.5">Occupancy</th>
                  <th className="p-3.5">Daily Revenue</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl">Imported</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-emerald-400">{r.name}</td>
                    <td className="p-3.5 text-slate-400">{r.state}</td>
                    <td className="p-3.5 font-bold">{r.activeBuses} buses</td>
                    <td className="p-3.5 text-emerald-400 font-bold">{r.occupancyRate}%</td>
                    <td className="p-3.5 text-amber-400 font-bold">₦{(r.revenueToday / 1000000).toFixed(1)}M</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500">{new Date(r.importedAt).toLocaleDateString()}</td>
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
