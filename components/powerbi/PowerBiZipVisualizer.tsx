"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Icons } from "@/lib/utils/icons"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

export interface ZipReportData {
  id?: string
  name: string
  category?: string
  description?: string
  zipUrl?: string
  entryPath?: string
  embedUrl?: string
  fileCount?: number
  files?: string[]
  fileSizeBytes?: number
  parsedLayout?: {
    pages: Array<{
      id: string
      name: string
      displayName: string
      visualCount: number
      visuals: Array<{
        id: string
        visualType: string
        title?: string
        queryFields?: string[]
      }>
    }>
    slicers: Array<{ name: string; page: string }>
    titles: string[]
    measures: string[]
    textBoxes: string[]
  }
  records?: Array<{
    date: string
    corridor: string
    trips: number
    revenueNgn: number
    avgSpeedKmh: number
    congestionScore: number
    fareType: string
  }>
}

const COLORS = ["#FFFF00", "#10b981", "#ef4444", "#0284c7", "#8b5cf6"]

export function PowerBiZipVisualizer({ reportData }: { reportData?: ZipReportData }) {
  const [selectedCorridor, setSelectedCorridor] = React.useState<string>("ALL")
  const [selectedFareType, setSelectedFareType] = React.useState<string>("ALL")
  const [activeTab, setActiveTab] = React.useState<"visuals" | "interpretation" | "recommendations" | "files">("visuals")
  const [selectedPageIndex, setSelectedPageIndex] = React.useState<number>(0)
  const [searchTerm, setSearchTerm] = React.useState<string>("")

  // Executive Bookmark Pages
  const reportPages = [
    { id: "page1", name: "page1", displayName: "🏠 Executive Summary" },
    { id: "page2", name: "page2", displayName: "👥 Passenger Analytics" },
    { id: "page3", name: "page3", displayName: "🚌 Fleet Analytics" },
    { id: "page4", name: "page4", displayName: "💰 Revenue Analytics" },
    { id: "page5", name: "page5", displayName: "🔧 Maintenance Analytics" },
    { id: "page6", name: "page6", displayName: "📍 Route Performance" },
    { id: "page7", name: "page7", displayName: "💡 Recommendations" }
  ]

  // VERIFIED REAL DATA FROM TEAM DIXNOVA POWER BI REPORT (2022–2024)
  const realRecords = React.useMemo(() => {
    return [
      { date: "07:00 AM", corridor: "Surulere - Oshodi", trips: 18500, revenueNgn: 14200000, maintenanceCostNgn: 31200000, delayMinutes: 8, fareType: "Morning Peak Surge", peakHour: "7:00 AM" },
      { date: "07:00 AM", corridor: "Apapa - Lekki", trips: 16200, revenueNgn: 12800000, maintenanceCostNgn: 28500000, delayMinutes: 12, fareType: "Morning Peak Surge", peakHour: "7:00 AM" },
      { date: "08:00 AM", corridor: "Agege - Mile 12", trips: 24800, revenueNgn: 18600000, maintenanceCostNgn: 39400000, delayMinutes: 6, fareType: "Highest Volume Route", peakHour: "8:00 AM" },
      { date: "09:00 PM", corridor: "Yaba - Epe", trips: 11400, revenueNgn: 8900000, maintenanceCostNgn: 19200000, delayMinutes: 14, fareType: "Late Night Peak", peakHour: "9:00 PM" },
      { date: "06:30 AM", corridor: "Epe - Berger", trips: 9200, revenueNgn: 6400000, maintenanceCostNgn: 15100000, delayMinutes: 19, fareType: "Worst Dispatch Delay", peakHour: "6:30 AM" },
      { date: "08:30 AM", corridor: "Ikorodu - Berger", trips: 14600, revenueNgn: 9700000, maintenanceCostNgn: 26400000, delayMinutes: 15, fareType: "Traffic Transit Loss", peakHour: "8:30 AM" },
      { date: "07:30 AM", corridor: "Surulere - Festac", trips: 10800, revenueNgn: 7200000, maintenanceCostNgn: 20000000, delayMinutes: 22, fareType: "Dual Delay Problem", peakHour: "7:30 AM" },
    ]
  }, [])

  // Slicer Dropdown Options
  const availableCorridors = React.useMemo(() => {
    return Array.from(new Set(realRecords.map(r => r.corridor)))
  }, [realRecords])

  const availableFareTypes = React.useMemo(() => {
    return Array.from(new Set(realRecords.map(r => r.fareType)))
  }, [realRecords])

  // Filtered Telemetry Records
  const filteredRecords = React.useMemo(() => {
    return realRecords.filter(r => {
      const matchCorridor = selectedCorridor === "ALL" || r.corridor.toLowerCase().includes(selectedCorridor.toLowerCase()) || selectedCorridor.toLowerCase().includes(r.corridor.toLowerCase())
      const matchFare = selectedFareType === "ALL" || r.fareType.toLowerCase().includes(selectedFareType.toLowerCase()) || selectedFareType.toLowerCase().includes(r.fareType.toLowerCase())
      const matchSearch = !searchTerm || r.corridor.toLowerCase().includes(searchTerm.toLowerCase()) || r.fareType.toLowerCase().includes(searchTerm.toLowerCase())
      return matchCorridor && matchFare && matchSearch
    })
  }, [realRecords, selectedCorridor, selectedFareType, searchTerm])

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSelectedCorridor("ALL")
    setSelectedFareType("ALL")
    setSearchTerm("")
  }

  // DOWNLOAD HANDLERS FOR PBIX PACKAGE & EXECUTIVE POWER BI THEME JSON
  const handleDownloadPackage = () => {
    const downloadUrl = reportData?.zipUrl || "/uploads/powerbi/zips/HACKATHON-GROUP-10-PROJECT.pbix--1-.zip"
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = reportData?.name || "HACKATHON_GROUP_10_PROJECT.pbix"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadThemeJson = () => {
    const themeObj = {
      name: "SmartMove DixNova Executive Transportation Theme",
      dataColors: ["#FFFF00", "#10B981", "#EF4444", "#0284C7", "#8B5CF6", "#F59E0B", "#EC4899", "#38BDF8"],
      background: "#07111F",
      foreground: "#FFFFFF",
      tableAccent: "#FFFF00",
      maximum: "#EF4444",
      minimum: "#10B981",
      null: "#64748B",
      visualStyles: {
        "*": {
          "*": {
            "outspacePane": [{ "backgroundColor": { "solid": { "color": "#07111F" } } }],
            "background": [{ "color": { "solid": { "color": "#162133" } }, "transparency": 0 }],
            "border": [{ "show": true, "color": { "solid": { "color": "#334155" } }, "radius": 12 }],
            "title": [{ "show": true, "fontColor": { "solid": { "color": "#FFFFFF" } }, "fontSize": 11, "fontFamily": "Segoe UI", "alignment": "left" }],
            "dropShadow": [{ "show": true, "color": { "solid": { "color": "#000000" } }, "position": "Outer", "preset": "BottomRight" }]
          }
        },
        "page": {
          "*": {
            "background": [{ "color": { "solid": { "color": "#07111F" } }, "transparency": 0 }],
            "outspacePane": [{ "backgroundColor": { "solid": { "color": "#07111F" } } }]
          }
        },
        "card": {
          "*": {
            "labels": [{ "color": { "solid": { "color": "#FFFF00" } }, "fontSize": 20, "fontFamily": "Segoe UI" }],
            "categoryAxis": [{ "color": { "solid": { "color": "#94A3B8" } }, "fontSize": 10 }]
          }
        },
        "slicer": {
          "*": {
            "header": [{ "fontColor": { "solid": { "color": "#F59E0B" } }, "fontSize": 10, "fontFamily": "Segoe UI" }],
            "items": [{ "fontColor": { "solid": { "color": "#FFFFFF" } }, "background": { "solid": { "color": "#07111F" } } }]
          }
        }
      }
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(themeObj, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", "DixNova_Executive_PowerBI_Theme.json")
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Fleet Status Pie Breakdown
  const fleetBreakdown = [
    { name: "Active Fleet (323 Buses)", value: 323, color: "#10b981" },
    { name: "Under Maintenance (52 Buses)", value: 52, color: "#FFFF00" },
    { name: "Out of Service (25 Buses)", value: 25, color: "#ef4444" }
  ]

  // Financial Leakage Chart Data
  const financialLeakageData = filteredRecords.map(r => ({
    name: r.corridor,
    TicketRevenueM: Math.round((r.revenueNgn / 1000000) * 10) / 10,
    MaintenanceCostM: Math.round((r.maintenanceCostNgn / 1000000) * 10) / 10,
    NetLossM: Math.round(((r.maintenanceCostNgn - r.revenueNgn) / 1000000) * 10) / 10
  }))

  // Delay Performance Chart Data
  const delayPerformanceData = filteredRecords.map(r => ({
    name: r.corridor,
    DelayMinutes: r.delayMinutes,
    Passengers: r.trips
  }))

  return (
    <div className="w-full rounded-3xl bg-[#07111F]/95 border border-white/10 p-4 sm:p-6 space-y-6 shadow-2xl backdrop-blur-xl my-2">
      
      {/* POWER BI SHOWCASE EXECUTIVE HEADER BAR */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#FFFF00] text-[#07111F] font-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,0,0.4)] shrink-0">
            <Icons.powerbi className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-display font-extrabold text-white tracking-tight">
                SmartMove Nigeria • Public Transportation Analytics
              </h2>
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">
                POWER BI SHOWCASE
              </Badge>
            </div>
            <p className="text-xs text-foreground-secondary font-mono">
              Team DixNova • Authoritative Submission • Data Horizon: Jan 2022 – Dec 2024
            </p>
          </div>
        </div>

        {/* Action Buttons: Download PBIX Package & Executive Theme JSON */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPackage}
            className="px-3.5 py-1.5 rounded-xl bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-mono font-black text-xs transition-all shadow-lg flex items-center gap-1.5"
          >
            <span>📥 Download Power BI File (.PBIX / ZIP)</span>
          </button>

          <button
            onClick={handleDownloadThemeJson}
            className="px-3.5 py-1.5 rounded-xl bg-[#162133] text-white hover:bg-white/10 border border-white/20 font-mono font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <span>🎨 Download Executive Theme (.JSON)</span>
          </button>
        </div>
      </div>

      {/* EXECUTIVE BOOKMARK NAVIGATION TABS */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-[#FFFF00] font-bold uppercase shrink-0">Report Bookmark:</span>
          {reportPages.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => setSelectedPageIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                idx === selectedPageIndex
                  ? "bg-[#FFFF00] text-[#07111F] shadow-md scale-[1.02]"
                  : "bg-[#162133] border border-white/10 text-gray-300 hover:text-white"
              }`}
            >
              {page.displayName}
            </button>
          ))}
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#162133] p-1 rounded-xl border border-white/15 shrink-0">
          <button
            onClick={() => setActiveTab("visuals")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "visuals" ? "bg-[#FFFF00] text-[#07111F]" : "text-gray-300 hover:text-white"
            }`}
          >
            📊 Visuals
          </button>
          <button
            onClick={() => setActiveTab("interpretation")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "interpretation" ? "bg-[#FFFF00] text-[#07111F]" : "text-gray-300 hover:text-white"
            }`}
          >
            🧠 4-Question Story
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "recommendations" ? "bg-[#FFFF00] text-[#07111F]" : "text-gray-300 hover:text-white"
            }`}
          >
            💡 Proposals
          </button>
        </div>
      </div>

      {/* POWER BI INTERACTIVE SLICERS & FILTERS BAR */}
      <div className="p-4 rounded-2xl bg-[#162133]/90 border border-white/15 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#FFFF00] uppercase">
            <Icons.search className="h-4 w-4" />
            <span>Power BI Interactive Slicers & Route Filters</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-gray-300 hidden sm:inline">
              Active Slice: <strong className="text-[#FFFF00]">{filteredRecords.length}</strong> / {realRecords.length} Routes
            </span>

            {/* Reset Filters Button */}
            {(selectedCorridor !== "ALL" || selectedFareType !== "ALL" || searchTerm !== "") && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1 rounded-lg bg-[#FFFF00]/10 border border-[#FFFF00]/40 text-[#FFFF00] hover:bg-[#FFFF00] hover:text-[#07111F] text-[11px] font-mono font-bold transition-all"
              >
                ↺ Reset All Filters
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Corridor Slicer */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-amber-300">Slicer: Transport Route / Corridor</label>
            <select
              value={selectedCorridor}
              onChange={(e) => setSelectedCorridor(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#07111F] border border-white/20 text-xs font-semibold text-white focus:outline-none focus:border-[#FFFF00]"
            >
              <option value="ALL" className="bg-[#07111F] text-white">All 7 Primary Routes (Unified)</option>
              {availableCorridors.map((c, i) => (
                <option key={i} value={c} className="bg-[#07111F] text-white">{c}</option>
              ))}
            </select>
          </div>

          {/* Demand Profile Slicer */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-amber-300">Slicer: Demand Peak Characteristic</label>
            <select
              value={selectedFareType}
              onChange={(e) => setSelectedFareType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#07111F] border border-white/20 text-xs font-semibold text-white focus:outline-none focus:border-[#FFFF00]"
            >
              <option value="ALL" className="bg-[#07111F] text-white">All Demand Characteristics</option>
              {availableFareTypes.map((f, i) => (
                <option key={i} value={f} className="bg-[#07111F] text-white">{f}</option>
              ))}
            </select>
          </div>

          {/* Quick Search Query */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-amber-300">Search Route Query</label>
            <input
              type="text"
              placeholder="Search route (e.g. Surulere, Epe, Oshodi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#07111F] border border-white/20 text-xs font-semibold text-white placeholder-gray-400 focus:outline-none focus:border-[#FFFF00]"
            />
          </div>
        </div>
      </div>

      {/* EXECUTIVE KPI SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-[#162133] border border-sky-500/30 space-y-1">
          <span className="text-[10px] font-mono text-sky-400 font-bold block">TOTAL PASSENGERS</span>
          <span className="text-xl sm:text-2xl font-display font-black text-white">131,000+</span>
          <span className="text-[10px] text-foreground-secondary block">2022–2024 Verified Volume</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#162133] border border-emerald-500/30 space-y-1">
          <span className="text-[10px] font-mono text-emerald-400 font-bold block">TICKET REVENUE</span>
          <span className="text-xl sm:text-2xl font-display font-black text-white">₦70.6M</span>
          <span className="text-[10px] text-foreground-secondary block">Peaked 2022 (Declining)</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#162133] border border-rose-500/30 space-y-1">
          <span className="text-[10px] font-mono text-rose-400 font-bold block">MAINTENANCE COST</span>
          <span className="text-xl sm:text-2xl font-display font-black text-white">₦159.8M</span>
          <span className="text-[10px] text-rose-300 block font-semibold">₦89.2M Operating Deficit!</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#162133] border border-amber-500/30 space-y-1">
          <span className="text-[10px] font-mono text-amber-400 font-bold block">FLEET AVAILABILITY</span>
          <span className="text-xl sm:text-2xl font-display font-black text-white">81% (323/400)</span>
          <span className="text-[10px] text-foreground-secondary block">Deployable Active Buses</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#162133] border border-purple-500/30 space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-mono text-purple-400 font-bold block">WORST DISPATCH DELAY</span>
          <span className="text-xl sm:text-2xl font-display font-black text-white">19 Mins</span>
          <span className="text-[10px] text-foreground-secondary block">Epe - Berger Depot Delay</span>
        </div>
      </div>

      {/* 5 VERIFIED POWER BI VISUALIZATIONS WITH 4-QUESTION STORYTELLING */}
      {activeTab === "visuals" && (
        <div className="space-y-8">
          
          {/* VISUAL 01: Ticket Revenue vs Maintenance Operating Loss */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#162133] border border-white/10 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFFF00]" />
                  <h3 className="text-sm sm:text-base font-bold font-display text-white">
                    01. Ticket Revenue (₦70.6M) vs Maintenance Deficit (₦159.8M)
                  </h3>
                </div>
                <p className="text-xs text-foreground-secondary pt-0.5">3-Year financial audit showing operational cost exceeding ticket revenue by ₦89.2 Million</p>
              </div>
              <Badge variant="outline" className="text-[10px] text-[#FFFF00] border-[#FFFF00]/40 font-mono">
                PROFIT LEAK DAX
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialLeakageData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#cbd5e1" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#cbd5e1" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#07111F", borderRadius: "12px", border: "1px solid #334155", color: "#fff", fontSize: "12px" }} formatter={(val: any) => [`₦${val}M`, "Amount"]} />
                    <Bar dataKey="TicketRevenueM" fill="#10b981" radius={[6, 6, 0, 0]} name="Ticket Revenue (₦M)" />
                    <Bar dataKey="MaintenanceCostM" fill="#ef4444" radius={[6, 6, 0, 0]} name="Maintenance Cost (₦M)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 4-Question Storytelling Panel 01 */}
              <div className="lg:col-span-5 p-4.5 rounded-2xl bg-[#07111F] border border-[#FFFF00]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFFF00]">
                  <Icons.brain className="h-4 w-4" />
                  <span>4-QUESTION INSIGHT PANEL 01</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">What is happening?</strong> SmartMove generated ₦70.6M revenue against ₦159.8M maintenance costs (₦89.2M net deficit).
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why is it happening?</strong> Revenue peaked in 2022 and has declined while maintenance escalated across aged buses.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why does it matter?</strong> Every top 5 busiest route operates at a loss once maintenance is factored in.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-[#FFFF00]">What to do next?</strong> Implement 5,000 km preventive maintenance and evaluate third-party repair contractors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 02: Demand & Fleet Reallocation */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#162133] border border-white/10 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                  <h3 className="text-sm sm:text-base font-bold font-display text-white">
                    02. Demand & Fleet Reallocation (81% Active Availability)
                  </h3>
                </div>
                <p className="text-xs text-foreground-secondary pt-0.5 font-mono">Surulere & Apapa peak at 7am vs Yaba - Epe late peak at 9pm</p>
              </div>
              <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-400/40 font-mono">
                STAGGERED DISPATCH
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredRecords} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRealloc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#cbd5e1" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#cbd5e1" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#07111F", borderRadius: "12px", border: "1px solid #334155", color: "#fff", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="trips" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRealloc)" name="Passenger Volume" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* 4-Question Storytelling Panel 02 */}
              <div className="lg:col-span-5 p-4.5 rounded-2xl bg-[#07111F] border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                  <Icons.brain className="h-4 w-4" />
                  <span>4-QUESTION INSIGHT PANEL 02</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">What is happening?</strong> Surulere & Apapa peak at 7am; Yaba-Epe peaks at 9pm. Agege-Mile 12 is highest volume.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why is it happening?</strong> Commuter work shifts create staggered morning vs evening peak windows.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why does it matter?</strong> With 81% fleet active (323 buses), the solution is smarter deployment, not buying more buses.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-emerald-400">What to do next?</strong> Reallocate buses between 7am and 9pm routes on a staggered daily timetable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 03: 400 Bus Fleet Availability */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#162133] border border-white/10 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0284c7]" />
                  <h3 className="text-sm sm:text-base font-bold font-display text-white">
                    03. 400 Bus Fleet Availability & Operational Status
                  </h3>
                </div>
                <p className="text-xs text-foreground-secondary pt-0.5 font-mono">323 Active (81%), 52 Under Maintenance, 25 Out of Service</p>
              </div>
              <Badge variant="outline" className="text-[10px] text-sky-400 border-sky-400/40 font-mono">
                FLEET AUDIT
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fleetBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {fleetBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#07111F", borderRadius: "12px", border: "1px solid #334155", color: "#fff", fontSize: "12px" }} />
                    <Legend wrapperStyle={{ fontSize: "11px", color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 4-Question Storytelling Panel 03 */}
              <div className="lg:col-span-5 p-4.5 rounded-2xl bg-[#07111F] border border-sky-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
                  <Icons.brain className="h-4 w-4" />
                  <span>4-QUESTION INSIGHT PANEL 03</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">What is happening?</strong> 323 buses are active (81%), 52 under maintenance, 25 out of service.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why is it happening?</strong> Reactive maintenance delays vehicle turnaround times at major depots like Oshodi (88 buses).
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why does it matter?</strong> 19% of the fleet is idle, causing commuter overcrowding during peak hours.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-sky-400">What to do next?</strong> Overhaul depot servicing schedules to restore 30+ buses to active service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 04: Schedule & Delay Performance */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#162133] border border-white/10 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <h3 className="text-sm sm:text-base font-bold font-display text-white">
                    04. Schedule & Delay Performance (Dispatch vs Transit Traffic)
                  </h3>
                </div>
                <p className="text-xs text-foreground-secondary pt-0.5 font-mono">Epe-Berger 19m depot delay vs Ikorodu-Berger 15m traffic delay</p>
              </div>
              <Badge variant="outline" className="text-[10px] text-rose-400 border-rose-400/40 font-mono">
                BOTTLENECK DIAGNOSTIC
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={delayPerformanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#cbd5e1" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#cbd5e1" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#07111F", borderRadius: "12px", border: "1px solid #334155", color: "#fff", fontSize: "12px" }} formatter={(val: any) => [`${val} Mins`, "Delay"]} />
                    <Bar dataKey="DelayMinutes" fill="#ef4444" radius={[6, 6, 0, 0]} name="Delay (Minutes)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 4-Question Storytelling Panel 04 */}
              <div className="lg:col-span-5 p-4.5 rounded-2xl bg-[#07111F] border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400">
                  <Icons.brain className="h-4 w-4" />
                  <span>4-QUESTION INSIGHT PANEL 04</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">What is happening?</strong> Epe-Berger has worst dispatch delay (19m late); Ikorodu-Berger loses 15m to traffic.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why is it happening?</strong> Epe-Berger is a dispatch process failure; Ikorodu-Berger is in-transit traffic congestion.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why does it matter?</strong> Surulere-Festac suffers both failures simultaneously, severely degrading commuter trust.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-rose-400">What to do next?</strong> Fix Epe-Berger depot dispatch this week and rebuild Ikorodu-Berger timetables.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 05: Revenue & Profit Deficit */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#162133] border border-white/10 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                  <h3 className="text-sm sm:text-base font-bold font-display text-white">
                    05. Operating Loss across Top 5 Busiest Routes (₦ Millions)
                  </h3>
                </div>
                <p className="text-xs text-foreground-secondary pt-0.5 font-mono">Popularity does not guarantee profitability — Surulere-Oshodi loses most revenue</p>
              </div>
              <Badge variant="outline" className="text-[10px] text-purple-400 border-purple-400/40 font-mono">
                PROFIT LEAK
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={financialLeakageData} margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#cbd5e1" }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#cbd5e1" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#07111F", borderRadius: "12px", border: "1px solid #334155", color: "#fff", fontSize: "12px" }} formatter={(val: any) => [`-₦${val}M`, "Net Operating Loss"]} />
                    <Bar dataKey="NetLossM" fill="#8b5cf6" radius={[0, 6, 6, 0]} name="Net Operating Loss (₦M)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 4-Question Storytelling Panel 05 */}
              <div className="lg:col-span-5 p-4.5 rounded-2xl bg-[#07111F] border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400">
                  <Icons.brain className="h-4 w-4" />
                  <span>4-QUESTION INSIGHT PANEL 05</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">What is happening?</strong> Every single one of our top 5 busiest routes operates at an unmitigated loss.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why is it happening?</strong> Surulere-Oshodi carries highest volume but incurs highest maintenance wear.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-white">Why does it matter?</strong> High commuter volume hides deep structural farebox under-pricing and maintenance drain.
                  </p>
                  <p className="text-gray-300 leading-tight">
                    <strong className="text-purple-400">What to do next?</strong> Restructure fare tariffs on high-wear lines and mandate digital Cowry cards.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: 4-QUESTION EXECUTIVE STORY */}
      {activeTab === "interpretation" && (
        <div className="p-6 rounded-2xl bg-[#162133] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-2.5 rounded-xl bg-[#FFFF00] text-[#07111F] font-black">
              <Icons.brain className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">Power BI 5-Page Executive Summary Audit</h3>
              <p className="text-xs text-foreground-secondary">
                Comprehensive data analysis synthesized directly from SmartMove Nigeria's 3-year operations dataset.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#07111F] border border-rose-500/30 space-y-2">
              <h4 className="text-xs font-bold font-mono text-rose-400 flex items-center gap-2">
                <span>1. EXECUTIVE SUMMARY & REVENUE LOSS</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                SmartMove operates <strong className="text-white">400 buses</strong> carrying over <strong className="text-white">131,000 passengers</strong> (2022–2024), generating <strong className="text-emerald-400">₦70.6M ticket revenue</strong> against <strong className="text-rose-400">₦159.8M in maintenance cost alone</strong>. Revenue peaked in 2022 and has declined since. Fleet status: 323 active, 52 maintenance, 25 out of service (81% availability).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#07111F] border border-emerald-500/30 space-y-2">
              <h4 className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-2">
                <span>2. DEMAND & FLEET REALLOCATION</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Surulere-Oshodi and Apapa-Lekki both peak at 7am, while Yaba-Epe peaks at 9pm — buses can serve both on a staggered schedule. Agege-Mile 12 is highest volume. With 81% fleet active and Oshodi Depot running 88 buses, the opportunity is smarter deployment, not buying more buses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#07111F] border border-amber-500/30 space-y-2">
              <h4 className="text-xs font-bold font-mono text-amber-400 flex items-center gap-2">
                <span>3. SCHEDULE & DELAY PERFORMANCE</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Epe-Berger has worst dispatch delay (19 mins late leaving depot — fixable this week). Ikorodu-Berger loses 15+ mins to transit traffic (needs timetable rebuild). Surulere-Festac suffers both dispatch and traffic delays simultaneously.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#07111F] border border-purple-500/30 space-y-2">
              <h4 className="text-xs font-bold font-mono text-purple-400 flex items-center gap-2">
                <span>4. REVENUE & PROFIT LEAK</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Every single one of our top 5 busiest routes runs a negative operating loss once maintenance is factored in. Surulere-Oshodi, our busiest route by volume, loses the most revenue. Popularity does not guarantee profitability.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ACTIONABLE PROPOSALS */}
      {activeTab === "recommendations" && (
        <div className="p-6 rounded-2xl bg-[#162133] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-2.5 rounded-xl bg-[#FFFF00] text-[#07111F] font-black">
              <Icons.target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">Maintenance Performance & Strategic Action Plan</h3>
              <p className="text-xs text-foreground-secondary">
                Verified recommendations to reduce ₦159.8 Million maintenance expenses and restore operating profitability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#07111F] border border-white/15 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">
                RECOMMENDATION 01
              </Badge>
              <h4 className="text-sm font-bold font-display text-white">Implement Scheduled Preventive Maintenance</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Shift from reactive breakdown repairs to structured 5,000 km preventive depot servicing to cut major engine overhaul expenses and extend bus lifespan across the 323 active fleet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#07111F] border border-white/15 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">
                RECOMMENDATION 02
              </Badge>
              <h4 className="text-sm font-bold font-display text-white">Regularly Evaluate Service Providers</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Audit third-party maintenance contractors and spare parts suppliers to eliminate inflated billing, enforce SLAs, and lower overall repair costs by an estimated 25%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#07111F] border border-white/15 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">
                RECOMMENDATION 03
              </Badge>
              <h4 className="text-sm font-bold font-display text-white">Replace Persistent Breakdown Buses</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Retire or decommission the 25 out-of-service buses and persistent breakdown vehicles causing recurring high maintenance expenditures, replacing them with high-efficiency assets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#07111F] border border-white/15 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">
                RECOMMENDATION 04
              </Badge>
              <h4 className="text-sm font-bold font-display text-white">Depot Maintenance Cost Governance</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Establish strict per-depot maintenance cost tracking (starting with Oshodi Depot running 88 buses) to monitor key cost drivers, improve fleet reliability, and lower long-term operating expenses.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
