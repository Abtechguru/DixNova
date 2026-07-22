"use client"
import React from 'react';
import { Search, Bell, RefreshCw, Download, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardHeaderProps {
  title?: string;
  selectedState?: string;
  onStateChange?: (state: string) => void;
  onRefresh?: () => void;
}

export function DashboardHeader({ 
  title = "Executive Command Center",
  selectedState = "Lagos State (LAMATA)",
  onStateChange,
  onRefresh
}: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">{title}</h1>
          <p className="text-[10px] text-emerald-400 font-medium tracking-wide">DixNova • Innovation driven by data</p>
        </div>

        {/* State Filter Selector */}
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800">
          <MapPin size={14} className="text-slate-400" />
          <select 
            value={selectedState} 
            onChange={(e) => onStateChange?.(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500 font-semibold cursor-pointer hover:border-slate-700 transition-all"
          >
            <option value="Lagos State (LAMATA)">Lagos State (LAMATA)</option>
            <option value="Abuja FCT (Central Transit)">Abuja FCT (Central Transit)</option>
            <option value="Rivers State Transit Authority">Rivers State Transit Authority</option>
            <option value="Kano Line Metro">Kano Line Metro</option>
            <option value="All Nigeria Federal Corridors">All Nigeria Federal Corridors</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search corridors, buses, telemetry..." 
            className="w-56 bg-slate-900/80 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <Button onClick={onRefresh} variant="outline" size="sm" className="hidden sm:flex gap-1.5 text-xs">
          <RefreshCw size={13} className="text-emerald-400" />
          <span>Refresh API</span>
        </Button>

        <Button variant="outline" size="sm" className="hidden sm:flex gap-1.5 text-xs">
          <Download size={13} />
          <span>Export Data</span>
        </Button>

        <div className="relative">
          <button className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white relative">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
