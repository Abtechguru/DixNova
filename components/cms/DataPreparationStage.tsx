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
      color: "#2ED573",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#2ED573]",
      textColor: "text-[#2ED573]",
      glowColor: "shadow-[0_0_25px_rgba(46,213,115,0.2)]",
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
      color: "#00D4FF",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#00D4FF]",
      textColor: "text-[#00D4FF]",
      glowColor: "shadow-[0_0_25px_rgba(0,212,255,0.2)]",
      items: [
        "Data Warehouse Staging in PostgreSQL / Prisma",
        "OLAP Cube Dimensional Model (Star-Schema)",
        "Fact Tables: Fact_Telemetry, Fact_Revenue",
        "Dim Tables: Dim_Corridor, Dim_Vehicle, Dim_Payment"
      ]
    },
    {
      num: "03",
      title: "Executive Reporting",
      subtitle: "Decision Support & Output Delivery",
      color: "#FFFF00",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#FFFF00]",
      textColor: "text-[#FFFF00]",
      glowColor: "shadow-[0_0_25px_rgba(255,255,0,0.25)]",
      items: [
        "Executive Control Room for Transport Planners",
        "Corridor Analyst Stations for Speed & Cost Drilldowns",
        "Embedded Power BI Dashboards & Presentation Platform"
      ]
    }
  ]

  // Auto-cycle through the 3 pillars
  React.useEffect(() => {
    if (!isAutoCycling || hoveredPillar !== null) return

    const timer = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % 3)
    }, 3800)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredPillar])

  const currentHighlight = hoveredPillar !== null ? hoveredPillar : activePillar

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-[#162133]/90 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-[#FFFF00] text-[#07111F]">
              WAREHOUSING, PROCESSING & REPORTING
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 09 • End-to-End Data Architecture
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-white tracking-tight pt-1">
            Data Warehousing & Processing Architecture
          </h2>
        </div>

        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className="text-xs font-mono px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-surface text-foreground-secondary transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-[#FFFF00] animate-ping" />
          <span>{isAutoCycling ? "⏸ Auto-Cycle Active" : "▶ Resume Auto-Cycle"}</span>
        </button>
      </div>

      {/* 3-PILLAR PIPELINE CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#07111F]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden items-stretch">
        
        {/* PILLAR 1: DATA PREPARATION & INGESTION (LEFT) */}
        <div
          onMouseEnter={() => setHoveredPillar(0)}
          onMouseLeave={() => setHoveredPillar(null)}
          className={`p-6 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
            currentHighlight === 0
              ? `${pillars[0].bgColor} ${pillars[0].borderColor} ${pillars[0].glowColor} scale-[1.02]`
              : "bg-[#162133]/60 border-white/10 hover:border-white/30 opacity-85"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-black text-[#2ED573] tracking-wider">
                01 • INGESTION
              </span>
              <Badge variant="outline" className="text-[9px] font-mono text-[#2ED573] border-[#2ED573]">
                MULTIMODAL FEEDS
              </Badge>
            </div>

            <h3 className="text-base font-display font-bold text-white">
              Raw Multimodal Feed Ingestion
            </h3>

            <div className="space-y-2 pt-1">
              {pillars[0].items.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-surface/50 border border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#2ED573] animate-pulse" />
                    <span className="text-xs font-sans font-medium text-gray-200">{item}</span>
                  </div>
                  <span className="text-[#2ED573] text-xs">➔</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-[#2ED573] font-bold">
            Channeling 5 Linked Datasets
          </div>
        </div>

        {/* PILLAR 2: DATA PROCESSING & OLAP CUBE (CENTER) */}
        <div
          onMouseEnter={() => setHoveredPillar(1)}
          onMouseLeave={() => setHoveredPillar(null)}
          className={`p-6 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
            currentHighlight === 1
              ? `${pillars[1].bgColor} ${pillars[1].borderColor} ${pillars[1].glowColor} scale-[1.02]`
              : "bg-[#162133]/60 border-white/10 hover:border-white/30 opacity-85"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-black text-[#00D4FF] tracking-wider">
                02 • PROCESSING
              </span>
              <Badge variant="outline" className="text-[9px] font-mono text-[#00D4FF] border-[#00D4FF]">
                DIMENSIONAL CUBE
              </Badge>
            </div>

            <h3 className="text-base font-display font-bold text-white">
              OLAP Cube & Dimensional Model
            </h3>

            <div className="p-4 rounded-2xl bg-surface/50 border border-[#00D4FF]/30 text-center space-y-3 shadow-inner">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">🔄</span>
                <span className="text-xs font-mono font-bold text-[#00D4FF]">STAR-SCHEMA CUBE</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 w-28 mx-auto p-2 bg-[#07111F] rounded-xl border border-white/20">
                <div className="h-6 bg-[#00D4FF] rounded" />
                <div className="h-6 bg-[#2ED573] rounded" />
                <div className="h-6 bg-[#00D4FF] rounded" />
                <div className="h-6 bg-[#2ED573] rounded" />
                <div className="h-6 bg-[#FFFF00] rounded" />
                <div className="h-6 bg-[#2ED573] rounded" />
                <div className="h-6 bg-[#00D4FF] rounded" />
                <div className="h-6 bg-[#2ED573] rounded" />
                <div className="h-6 bg-[#00D4FF] rounded" />
              </div>
            </div>

            <ul className="space-y-1 text-xs text-foreground-secondary font-sans">
              <li className="flex items-center gap-1.5">
                <span className="text-[#00D4FF]">•</span>
                <span>Fact Tables: Fact_Telemetry, Fact_Revenue</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#00D4FF]">•</span>
                <span>Dim Tables: Dim_Corridor, Dim_Vehicle, Dim_Payment</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-[#00D4FF] font-bold">
            Power BI In-Memory Tabular Model
          </div>
        </div>

        {/* PILLAR 3: REPORTING & OUTPUT DELIVERY (RIGHT) */}
        <div
          onMouseEnter={() => setHoveredPillar(2)}
          onMouseLeave={() => setHoveredPillar(null)}
          className={`p-6 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
            currentHighlight === 2
              ? `${pillars[2].bgColor} ${pillars[2].borderColor} ${pillars[2].glowColor} scale-[1.02]`
              : "bg-[#162133]/60 border-white/10 hover:border-white/30 opacity-85"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-black text-[#FFFF00] tracking-wider">
                03 • DELIVERY
              </span>
              <Badge variant="outline" className="text-[9px] font-mono text-[#FFFF00] border-[#FFFF00]">
                EXECUTIVE OUTPUT
              </Badge>
            </div>

            <h3 className="text-base font-display font-bold text-white">
              Multi-Device Output Delivery
            </h3>

            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-xl bg-surface/50 border border-[#FFFF00]/30 flex items-center gap-3">
                <span className="text-xl">📊</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Executive Control Room</h4>
                  <p className="text-[10px] text-foreground-secondary font-mono">LAMATA Policy Decisions</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-surface/50 border border-[#FFFF00]/30 flex items-center gap-3">
                <span className="text-xl">🖥️</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Corridor Analyst Workstations</h4>
                  <p className="text-[10px] text-foreground-secondary font-mono">Speed & Delay Drilldowns</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-surface/50 border border-[#FFFF00]/30 flex items-center gap-3">
                <span className="text-xl">📱</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Presentation Platform</h4>
                  <p className="text-[10px] text-foreground-secondary font-mono">Responsive Keynote Deck</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-[#FFFF00] font-bold">
            Live Presentation & Power BI Sync
          </div>
        </div>

      </div>
    </div>
  )
}
