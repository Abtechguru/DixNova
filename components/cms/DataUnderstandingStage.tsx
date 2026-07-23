"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

interface DatasetNode {
  num: string
  title: string
  records: string
  fields: string[]
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  glowColor: string
  icon: any
  desc: string
}

export function DataUnderstandingStage() {
  const [activeDataset, setActiveDataset] = React.useState<number>(0)
  const [hoveredDataset, setHoveredDataset] = React.useState<number | null>(null)
  const [isAutoCycling, setIsAutoCycling] = React.useState<boolean>(true)
  const [serverStats, setServerStats] = React.useState<{
    totalRecords: string
    linkedTables: string
  } | null>(null)
  const [dynamicDatasets, setDynamicDatasets] = React.useState<DatasetNode[]>([])

  React.useEffect(() => {
    fetch("/api/cms/datasets")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServerStats({
            totalRecords: data.totalRecords,
            linkedTables: data.linkedTables
          })
          if (Array.isArray(data.datasets) && data.datasets.length > 0) {
            const mappedNodes: DatasetNode[] = data.datasets.map((d: any) => ({
              num: d.num,
              title: d.title,
              records: d.records,
              fields: Array.isArray(d.fields) ? d.fields : ["Record ID", "Attributes"],
              color: d.color || "#06b6d4",
              bgColor: d.bgColor || "bg-cyan-950/60",
              borderColor: d.borderColor || "border-cyan-500",
              textColor: d.textColor || "text-cyan-400",
              glowColor: d.glowColor || "shadow-[0_0_30px_rgba(6,182,212,0.6)]",
              icon: Icons.datasets,
              desc: d.desc || "Uploaded dataset telemetry feed."
            }))
            setDynamicDatasets(mappedNodes)
          }
        }
      })
      .catch(() => {})
  }, [])

  const defaultDatasets: DatasetNode[] = [
    {
      num: "01",
      title: "Daily Trips Telemetry",
      records: "4,200 Records",
      fields: ["Vehicle ID", "GPS Latitude/Longitude", "Speed (km/h)", "Passenger Count"],
      color: "#8b5cf6", // Purple
      bgColor: "bg-purple-950/60",
      borderColor: "border-purple-500",
      textColor: "text-purple-400",
      glowColor: "shadow-[0_0_30px_rgba(139,92,246,0.6)]",
      icon: Icons.fleet,
      desc: "Assessed real-time GPS vehicle telemetry feeds tracking arterial corridor speeds and trip frequencies."
    },
    {
      num: "02",
      title: "Ticket Transactions",
      records: "3,800 Records",
      fields: ["Card Tap-In/Out", "Fare Type", "Amount (NGN)", "Corridor ID"],
      color: "#10b981", // Emerald
      bgColor: "bg-emerald-950/60",
      borderColor: "border-emerald-500",
      textColor: "text-emerald-400",
      glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.6)]",
      icon: Icons.revenue,
      desc: "Analyzed Cowry digital payment logs to measure commuter volume spikes and digital fare recovery rate."
    },
    {
      num: "03",
      title: "Fleet Maintenance Logs",
      records: "1,500 Records",
      fields: ["Bus ID", "Repair Date", "Breakdown Cause", "Maintenance Cost"],
      color: "#f59e0b", // Amber
      bgColor: "bg-amber-950/60",
      borderColor: "border-amber-500",
      textColor: "text-amber-400",
      glowColor: "shadow-[0_0_30px_rgba(245,158,11,0.6)]",
      icon: Icons.dashboard,
      desc: "Evaluated vehicle maintenance history logs to identify recurring mechanical failures and downtime costs."
    },
    {
      num: "04",
      title: "Bus Routes & Corridors",
      records: "800 Records",
      fields: ["Origin - Destination", "Distance (km)", "Peak Travel Time", "Corridor Status"],
      color: "#06b6d4", // Cyan
      bgColor: "bg-cyan-950/60",
      borderColor: "border-cyan-500",
      textColor: "text-cyan-400",
      glowColor: "shadow-[0_0_30px_rgba(6,182,212,0.6)]",
      icon: Icons.corridors,
      desc: "Mapped arterial transit corridors (Ikorodu, Lekki-Epe, Ikeja) to measure congestion indexes."
    },
    {
      num: "05",
      title: "Vehicle Fleet Register",
      records: "1,200 Records",
      fields: ["Vehicle Class", "Seating Capacity", "Fuel Consumption", "Operational Status"],
      color: "#f43f5e", // Rose
      bgColor: "bg-rose-950/60",
      borderColor: "border-rose-500",
      textColor: "text-rose-400",
      glowColor: "shadow-[0_0_30px_rgba(244,63,94,0.6)]",
      icon: Icons.datasets,
      desc: "Profiled bus fleet inventory attributes to assess seating capacity vs active peak deployment."
    }
  ]

  const datasets = dynamicDatasets.length > 0 ? dynamicDatasets : defaultDatasets

  // Auto-cycle through the 5 datasets
  React.useEffect(() => {
    if (!isAutoCycling || hoveredDataset !== null) return

    const timer = setInterval(() => {
      setActiveDataset((prev) => (prev + 1) % 5)
    }, 3500)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredDataset])

  const currentHighlight = hoveredDataset !== null ? hoveredDataset : activeDataset
  const activeData = datasets[currentHighlight]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-card shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-primary text-primary-foreground">
              EXPLORATORY DATA ASSESSMENT
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 07 • {serverStats?.linkedTables || "5 LINKED TABLES"}
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-foreground tracking-tight pt-1">
            Multimodal Data Feeds & Schema Profiling
          </h2>
        </div>

        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className="text-xs font-mono px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-surface text-foreground-secondary transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
          <span>{isAutoCycling ? "⏸ Auto-Cycle Active" : "▶ Resume Auto-Cycle"}</span>
        </button>
      </div>

      {/* CENTRAL CIRCLE LENS DASHBOARD MATRIX CONTAINER */}
      <div className="relative w-full rounded-3xl border border-white/20 bg-black/70 backdrop-blur-md shadow-2xl p-4 sm:p-6 overflow-hidden space-y-6">
        
        {/* Background Image Backdrop */}
        <img
          src="/dix0.jpeg"
          alt="Data Understanding Backdrop"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.22] scale-105 transform-gpu -z-10 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 -z-10" />

        {/* TOP / CENTER MATRIX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative z-10">
          
          {/* LEFT COLUMN DATASETS */}
          <div className="md:col-span-4 space-y-3">
            {datasets.slice(0, Math.ceil(datasets.length / 2)).map((ds, idx) => {
              const isHighlighted = currentHighlight === idx

              return (
                <div
                  key={ds.num || idx}
                  onMouseEnter={() => setHoveredDataset(idx)}
                  onMouseLeave={() => setHoveredDataset(null)}
                  className={`p-3.5 rounded-2xl border transition-all duration-500 cursor-pointer space-y-1.5 ${
                    isHighlighted
                      ? `${ds.bgColor} ${ds.borderColor} ${ds.glowColor} scale-[1.02]`
                      : "bg-black/60 border-white/15 hover:border-white/40 opacity-85"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-black ${ds.textColor}`}>{ds.num}</span>
                      <h4 className="text-xs font-bold font-display text-white">{ds.title}</h4>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-mono ${ds.textColor} border-current`}>
                      {ds.records}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-snug font-sans">{ds.desc}</p>
                </div>
              )
            })}
          </div>

          {/* CENTER FEATURED CIRCLE LENS HUB (Inspired by Template Image) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-8 border-gradient-to-tr from-purple-500 via-rose-500 to-amber-500 p-2 shadow-[0_0_50px_rgba(236,72,153,0.5)] flex items-center justify-center bg-black/90 text-center animate-pulse">
              
              {/* Inner Circle Content */}
              <div className="w-full h-full rounded-full border-2 border-white/20 bg-surface/30 backdrop-blur-md flex flex-col items-center justify-center p-4 space-y-1.5 text-center">
                <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">
                  EXPLORATORY MATRIX
                </span>
                <span className="text-xl sm:text-2xl font-display font-black text-white tracking-tight">
                  {serverStats?.totalRecords || "11,500+"}
                </span>
                <span className="text-[11px] font-semibold text-gray-200">Operational Records</span>
                <span className="text-[9px] font-mono text-amber-400 font-bold bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  {serverStats?.linkedTables || `${datasets.length} LINKED TABLES`}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN DATASETS */}
          <div className="md:col-span-4 space-y-3">
            {datasets.slice(Math.ceil(datasets.length / 2)).map((ds, idxOffset) => {
              const idx = idxOffset + Math.ceil(datasets.length / 2)
              const isHighlighted = currentHighlight === idx

              return (
                <div
                  key={ds.num || idx}
                  onMouseEnter={() => setHoveredDataset(idx)}
                  onMouseLeave={() => setHoveredDataset(null)}
                  className={`p-3.5 rounded-2xl border transition-all duration-500 cursor-pointer space-y-1.5 ${
                    isHighlighted
                      ? `${ds.bgColor} ${ds.borderColor} ${ds.glowColor} scale-[1.02]`
                      : "bg-black/60 border-white/15 hover:border-white/40 opacity-85"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-black ${ds.textColor}`}>{ds.num}</span>
                      <h4 className="text-xs font-bold font-display text-white">{ds.title}</h4>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-mono ${ds.textColor} border-current`}>
                      {ds.records}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-snug font-sans">{ds.desc}</p>
                </div>
              )
            })}
          </div>

        </div>

        {/* BOTTOM ACTIVE SCHEMA BREAKDOWN BAR */}
        <div className={`p-4 rounded-2xl border transition-all duration-500 shadow-xl ${activeData.bgColor} ${activeData.borderColor} ${activeData.glowColor} relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold ${activeData.textColor}`}>
                ACTIVE DATASET SCHEMA: {activeData.title} ({activeData.records})
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeData.fields.map((f, i) => (
                <span key={i} className="text-[11px] font-mono bg-black/60 text-gray-200 px-2.5 py-0.5 rounded-md border border-white/10">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 self-end sm:self-auto">
            {datasets.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveDataset(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentHighlight ? "w-5 bg-primary" : "w-2 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
