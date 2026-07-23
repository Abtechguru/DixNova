"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

interface PipelinePillar {
  num: string
  title: string
  subtitle: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  glowColor: string
  items: string[]
}

export function DataPreparationStage() {
  const [activePillar, setActivePillar] = React.useState<number>(0)
  const [hoveredPillar, setHoveredPillar] = React.useState<number | null>(null)
  const [isAutoCycling, setIsAutoCycling] = React.useState<boolean>(true)

  const pillars: PipelinePillar[] = [
    {
      num: "01",
      title: "Data Preparation",
      subtitle: "Raw Multimodal Feed Ingestion",
      color: "#10b981", // Emerald Green
      bgColor: "bg-emerald-950/60",
      borderColor: "border-emerald-500",
      textColor: "text-emerald-400",
      glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.6)]",
      items: [
        "GPS Trips Telemetry (4.2K Records)",
        "Cowry Card Fare Logs (3.8K Records)",
        "Fleet Maintenance Logs (1.5K Records)",
        "Route & Corridor GIS Definitions (800 Records)"
      ]
    },
    {
      num: "02",
      title: "Data Processing & Cube",
      subtitle: "Warehouse Staging & Dimensional Modeling",
      color: "#06b6d4", // Cyan / Blue
      bgColor: "bg-cyan-950/60",
      borderColor: "border-cyan-500",
      textColor: "text-cyan-400",
      glowColor: "shadow-[0_0_30px_rgba(6,182,212,0.6)]",
      items: [
        "Data Warehouse Staging in PostgreSQL / Prisma",
        "OLAP Cube Dimensional Model (Star-Schema)",
        "Fact Tables: Fact_Trips, Fact_Revenue, Fact_Repair",
        "Dim Tables: Dim_Corridor, Dim_Fleet, Dim_Date"
      ]
    },
    {
      num: "03",
      title: "Executive Reporting",
      subtitle: "Decision Support & SaaS Output Delivery",
      color: "#3b82f6", // Royal Blue
      bgColor: "bg-blue-950/60",
      borderColor: "border-blue-500",
      textColor: "text-blue-400",
      glowColor: "shadow-[0_0_30px_rgba(59,130,246,0.6)]",
      items: [
        "Executive Control Room for Transport Planners",
        "Corridor Analyst Stations for Speed & Cost Drilldowns",
        "Embedded Power BI Dashboards & SaaS Web Portal"
      ]
    }
  ]

  // Auto-cycle through the 3 pillars
  React.useEffect(() => {
    if (!isAutoCycling || hoveredPillar !== null) return

    const timer = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % 3)
    }, 3500)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredPillar])

  const currentHighlight = hoveredPillar !== null ? hoveredPillar : activePillar
  const activeData = pillars[currentHighlight]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-card shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-primary text-primary-foreground">
              WAREHOUSING, PROCESSING & REPORTING
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 09 • End-to-End Data Pipeline Architecture
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-foreground tracking-tight pt-1">
            Data Preparation & Warehousing Architecture
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

      {/* 3-PILLAR PIPELINE CONTAINER (DESKTOP & MOBILE RESPONSIVE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 sm:p-6 rounded-3xl border border-white/20 bg-black/75 backdrop-blur-md shadow-2xl relative overflow-hidden items-stretch">
        
        {/* Background Image Backdrop */}
        <img
          src="/dix0.jpeg"
          alt="Data Preparation Backdrop"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.2] scale-105 transform-gpu -z-10 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/40 -z-10" />

        {/* PILLAR 1: DATA PREPARATION & INGESTION (LEFT) */}
        <div
          onMouseEnter={() => setHoveredPillar(0)}
          onMouseLeave={() => setHoveredPillar(null)}
          className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full relative z-10 ${
            currentHighlight === 0
              ? `${pillars[0].bgColor} ${pillars[0].borderColor} ${pillars[0].glowColor} scale-[1.02]`
              : "bg-black/70 border-white/15 hover:border-emerald-400/60 opacity-85"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-400/30 pb-3">
              <span className="text-xs font-mono font-black text-emerald-400 tracking-wider">
                01 • DATA PREPARATION
              </span>
              <Badge variant="outline" className="text-[9px] font-mono text-emerald-400 border-emerald-400">
                INGESTION
              </Badge>
            </div>

            <h3 className="text-base font-display font-extrabold text-white">
              Raw Multimodal Feed Ingestion
            </h3>

            {/* Cylinder Data Stack Graphic */}
            <div className="space-y-2 pt-1">
              {pillars[0].items.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-sans font-medium text-gray-200">{item}</span>
                  </div>
                  <span className="text-emerald-400 text-xs">➔</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-emerald-400 font-bold">
            Channeling 5 Datasets to Warehouse
          </div>
        </div>

        {/* PILLAR 2: DATA PROCESSING & OLAP CUBE (CENTER) */}
        <div
          onMouseEnter={() => setHoveredPillar(1)}
          onMouseLeave={() => setHoveredPillar(null)}
          className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full relative z-10 ${
            currentHighlight === 1
              ? `${pillars[1].bgColor} ${pillars[1].borderColor} ${pillars[1].glowColor} scale-[1.02]`
              : "bg-black/70 border-white/15 hover:border-cyan-400/60 opacity-85"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-400/30 pb-3">
              <span className="text-xs font-mono font-black text-cyan-400 tracking-wider">
                02 • DATA PROCESSING
              </span>
              <Badge variant="outline" className="text-[9px] font-mono text-cyan-400 border-cyan-400">
                WAREHOUSE & CUBE
              </Badge>
            </div>

            <h3 className="text-base font-display font-extrabold text-white">
              OLAP Cube & Dimensional Model
            </h3>

            {/* 3D OLAP Cube Graphic (Inspired by Template Image) */}
            <div className="p-4 rounded-2xl bg-black/70 border border-cyan-500/40 text-center space-y-3 shadow-inner">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">🔄</span>
                <span className="text-xs font-mono font-bold text-cyan-300">STAR-SCHEMA OLAP CUBE</span>
              </div>

              {/* 3x3 Grid Cube Matrix Blocks (Green & Blue) */}
              <div className="grid grid-cols-3 gap-1.5 w-28 mx-auto p-2 bg-slate-900 rounded-xl border border-white/20">
                <div className="h-6 bg-cyan-500 rounded" />
                <div className="h-6 bg-emerald-500 rounded" />
                <div className="h-6 bg-cyan-500 rounded" />
                <div className="h-6 bg-emerald-500 rounded" />
                <div className="h-6 bg-cyan-600 rounded" />
                <div className="h-6 bg-emerald-500 rounded" />
                <div className="h-6 bg-cyan-500 rounded" />
                <div className="h-6 bg-emerald-500 rounded" />
                <div className="h-6 bg-cyan-500 rounded" />
              </div>
            </div>

            <ul className="space-y-1 text-xs text-gray-300 font-sans">
              <li className="flex items-center gap-1.5">
                <span className="text-cyan-400">•</span>
                <span>Fact Tables: Fact_Trips, Fact_Revenue</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-cyan-400">•</span>
                <span>Dim Tables: Dim_Corridor, Dim_Fleet</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-cyan-400 font-bold">
            Transformed into Power BI DAX Models
          </div>
        </div>

        {/* PILLAR 3: REPORTING & OUTPUT DELIVERY (RIGHT) */}
        <div
          onMouseEnter={() => setHoveredPillar(2)}
          onMouseLeave={() => setHoveredPillar(null)}
          className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full relative z-10 ${
            currentHighlight === 2
              ? `${pillars[2].bgColor} ${pillars[2].borderColor} ${pillars[2].glowColor} scale-[1.02]`
              : "bg-black/70 border-white/15 hover:border-blue-400/60 opacity-85"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-blue-400/30 pb-3">
              <span className="text-xs font-mono font-black text-blue-400 tracking-wider">
                03 • REPORTING
              </span>
              <Badge variant="outline" className="text-[9px] font-mono text-blue-400 border-blue-400">
                DELIVERY
              </Badge>
            </div>

            <h3 className="text-base font-display font-extrabold text-white">
              Multi-Device Output Delivery
            </h3>

            {/* Reporting Endpoints (Avatars with Charts) */}
            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-xl bg-black/60 border border-blue-500/30 flex items-center gap-3">
                <span className="text-xl">📊</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Executive Control Room</h4>
                  <p className="text-[10px] text-gray-300 font-mono">For Transport Authorities</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/60 border border-blue-500/30 flex items-center gap-3">
                <span className="text-xl">🖥️</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Corridor Analyst Workstations</h4>
                  <p className="text-[10px] text-gray-300 font-mono">Speed & Delay Drilldowns</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/60 border border-blue-500/30 flex items-center gap-3">
                <span className="text-xl">📱</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Mobile & Web SaaS Experience</h4>
                  <p className="text-[10px] text-gray-300 font-mono">Responsive Live Portal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-blue-400 font-bold">
            Live Presentation & Power BI Sync
          </div>
        </div>

      </div>
    </div>
  )
}
