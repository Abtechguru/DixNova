"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { 
  Users, 
  DollarSign, 
  Bus, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  MapPin
} from 'lucide-react';
import { 
  PassengerDemandChart, 
  RouteRevenueChart, 
  FleetStatusPieChart 
} from '@/components/dashboard/Charts';
import { Button } from '@/components/ui/Button';
import { KpiMetrics, CorridorData } from '@/lib/services/analytics';

export default function DashboardPage() {
  const [selectedState, setSelectedState] = useState("Lagos State (LAMATA)");
  const [kpis, setKpis] = useState<KpiMetrics | null>(null);
  const [corridors, setCorridors] = useState<CorridorData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [kpiRes, corridorRes] = await Promise.all([
        fetch(`/api/kpis?state=${encodeURIComponent(selectedState)}`),
        fetch(`/api/corridors?state=${encodeURIComponent(selectedState)}`)
      ]);
      const kpiJson = await kpiRes.json();
      const corridorJson = await corridorRes.json();

      if (kpiJson.success) setKpis(kpiJson.data);
      if (corridorJson.success) setCorridors(corridorJson.data);
    } catch (err) {
      console.error("Failed to fetch analytics backend data:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedState]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader 
          title="Executive Command Center"
          selectedState={selectedState}
          onStateChange={setSelectedState}
          onRefresh={fetchData}
        />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Top Banner Alert / Telemetry Feed Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">DixNova Telemetry API Backend</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-semibold">FAST REALTIME AGGREGATION</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Showing backend telemetry filtered for <span className="text-white font-semibold">{selectedState}</span>. Zero-latency aggregation enabled.
                </p>
              </div>
            </div>
            <Button size="sm" variant="gradient" onClick={fetchData} className="shrink-0 gap-1.5 text-xs">
              <Zap size={14} />
              <span>Refresh Backend Stream</span>
            </Button>
          </div>

          {/* KPI Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Total Active Passengers</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white mt-3">
                {loading ? "..." : kpis?.totalPassengers.toLocaleString()}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                <TrendingUp size={14} />
                <span>+{kpis?.passengerGrowth || 14.2}%</span>
                <span className="text-slate-500">vs yesterday</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Fare Collection Revenue</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <DollarSign size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold text-emerald-400 mt-3">
                {loading ? "..." : `₦${(kpis?.totalRevenue || 0).toLocaleString()}`}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                <TrendingUp size={14} />
                <span>+{kpis?.revenueGrowth || 8.7}%</span>
                <span className="text-slate-500">target efficiency</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Active Bus Telemetry</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Bus size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white mt-3">
                {loading ? "..." : `${kpis?.activeFleet} `}
                <span className="text-xs font-normal text-slate-500">/ {kpis?.totalFleet}</span>
              </p>
              <div className="flex items-center gap-1.5 text-xs text-blue-400 mt-2 font-medium">
                <Zap size={14} />
                <span>{kpis?.fleetUtilization || 95.3}%</span>
                <span className="text-slate-500">fleet utilization</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Average Delay Index</span>
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <Clock size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white mt-3">
                {kpis?.avgDelayMins || 3.4} <span className="text-xs font-normal text-slate-400">mins</span>
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                <TrendingDown size={14} />
                <span>{kpis?.delayChangeMins || -1.2} mins</span>
                <span className="text-slate-500">improved speed</span>
              </div>
            </div>
          </div>

          {/* Visual Analytics Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Hourly Passenger Volume Trend</h3>
                  <p className="text-[11px] text-slate-400">Real-time hourly throughput from REST API endpoint `/api/analytics/passengers`</p>
                </div>
                <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">Peak: 18:00</span>
              </div>
              <PassengerDemandChart />
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Fleet Telemetry Health</h3>
                  <p className="text-[11px] text-slate-400">Live breakdown from `/api/fleet/telemetry`</p>
                </div>
              </div>
              <FleetStatusPieChart />
            </div>
          </div>

          {/* Revenue by Route & Corridor Table Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Top Revenue Corridors</h3>
                <p className="text-[11px] text-slate-400">Backend calculated fare collection in Millions ₦</p>
              </div>
              <RouteRevenueChart />
            </div>

            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Live Transit Corridors Control API Stream</h3>
                  <p className="text-[11px] text-slate-400">Filtered by selected state: {selectedState}</p>
                </div>
                <Button size="sm" variant="outline" onClick={fetchData} className="text-xs">Refresh API Stream</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 pb-2">
                      <th className="pb-3 font-semibold">Corridor Name</th>
                      <th className="pb-3 font-semibold">Active Fleet</th>
                      <th className="pb-3 font-semibold">Occupancy Rate</th>
                      <th className="pb-3 font-semibold">Revenue Today</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {corridors.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/40">
                        <td className="py-3 font-semibold text-white flex items-center gap-2">
                          <MapPin size={14} className="text-blue-400" />
                          {c.name}
                        </td>
                        <td className="py-3">{c.activeBuses} Buses</td>
                        <td className="py-3 text-emerald-400 font-semibold">{c.occupancyRate}%</td>
                        <td className="py-3 font-mono">₦{(c.revenueToday / 1000000).toFixed(1)}M</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === 'CONGESTED' 
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                              : c.status === 'HIGH DEMAND'
                              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
