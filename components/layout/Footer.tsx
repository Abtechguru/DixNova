import React from 'react';
import Link from 'next/link';
import { Activity, Github, Twitter, Linkedin, Mail, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white">
                <Activity size={20} />
              </div>
              <span className="text-xl font-extrabold text-white">Dix<span className="text-emerald-400">Nova</span></span>
            </div>
            <p className="text-emerald-400 font-medium text-xs tracking-wider uppercase">Innovation driven by data</p>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Enterprise public transportation intelligence platform delivering real-time analytics, route optimization, passenger demand forecasting, and fleet telemetry for government transport authorities.
            </p>
            <div className="flex items-center gap-4 pt-2 text-slate-400">
              <Link href="#" className="hover:text-emerald-400 transition-colors"><Github size={18} /></Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors"><Twitter size={18} /></Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors"><Linkedin size={18} /></Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors"><Mail size={18} /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Platform Modules</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Executive Command Center</Link></li>
              <li><Link href="#analytics" className="hover:text-white transition-colors">Passenger Analytics</Link></li>
              <li><Link href="#analytics" className="hover:text-white transition-colors">Revenue Intelligence</Link></li>
              <li><Link href="#fleet" className="hover:text-white transition-colors">Fleet Telemetry</Link></li>
              <li><Link href="#fleet" className="hover:text-white transition-colors">Maintenance Predictor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Integrations</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-slate-300">Microsoft Power BI Service</span></li>
              <li><span className="text-slate-300">Power Query & SQL Server</span></li>
              <li><span className="text-slate-300">Azure Data Lake</span></li>
              <li><span className="text-slate-300">GTFS Realtime Feeds</span></li>
              <li><span className="text-slate-300">IoT Telematics</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Hackathon Showcase</h4>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Globe size={14} />
                <span>Nigeria Mobility 2026</span>
              </div>
              <p className="text-[11px] text-slate-400">Deployed for Federal & State Transit Authorities.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} DixNova. All rights reserved. Innovation driven by data.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              All Systems Operational
            </span>
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
