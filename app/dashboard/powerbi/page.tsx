"use client"
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { 
  Maximize2, 
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PowerBIPage() {
  const [selectedReport, setSelectedReport] = useState("Executive Mobility Summary");

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Power BI Service Showcase" />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Action Bar */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                BI
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">Power BI Embedded Workspace</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-semibold">AZURE FABRIC SYNCED</span>
                </div>
                <p className="text-xs text-slate-400">Interactive Microsoft Power BI Service report container with RLS security policies</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select 
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="Executive Mobility Summary">Report: Executive Mobility Summary</option>
                <option value="Passenger Origin-Destination Matrix">Report: Passenger Origin-Destination Matrix</option>
                <option value="Revenue & Fare Leakage Audit">Report: Revenue & Fare Leakage Audit</option>
                <option value="Fleet GPS Telemetry Telematics">Report: Fleet GPS Telemetry Telematics</option>
              </select>

              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <Maximize2 size={13} />
                <span>Full Screen</span>
              </Button>
            </div>
          </div>

          {/* Embedded Power BI Container Canvas */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-2xl space-y-4">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 rounded-xl border border-slate-800/80 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-slate-300">powerbi://fabric.microsoft.com/workspaces/dixnova-transit-analytics/{selectedReport.toLowerCase().replace(/ /g, '-')}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span>DAX Engine: Active</span>
                <span>DirectQuery Mode</span>
              </div>
            </div>

            {/* Interactive Embedded Container Mockup */}
            <div className="h-[600px] w-full rounded-2xl bg-navy-950 border border-slate-800/80 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.08),transparent_100%)] pointer-events-none" />
              
              <div className="text-center max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-4 z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 mx-auto flex items-center justify-center text-white font-black text-xl shadow-lg">
                  BI
                </div>
                <h3 className="text-xl font-bold text-white">{selectedReport}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Live Microsoft Power BI Embedded report container synced with DixNova Azure SQL Data Warehouse & Power Query M-models.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <Button variant="gradient" size="sm" className="gap-2 text-xs">
                    <ExternalLink size={14} />
                    <span>Open in Power BI Service</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
