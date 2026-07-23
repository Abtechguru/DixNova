"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

interface FunnelTier {
  num: string
  title: string
  subtitle: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  glowColor: string
  leftSpokes: string[]
  rightSpokes: string[]
}

export function DataModelingStage() {
  const [activeTier, setActiveTier] = React.useState<number>(0)
  const [hoveredTier, setHoveredTier] = React.useState<number | null>(null)
  const [isAutoCycling, setIsAutoCycling] = React.useState<boolean>(true)

  const tiers: FunnelTier[] = [
    {
      num: "01",
      title: "Data Model Core",
      subtitle: "Star-Schema Relational Foundation",
      color: "#1e40af", // Dark Blue Base
      bgColor: "bg-blue-950/70",
      borderColor: "border-blue-600",
      textColor: "text-blue-400",
      glowColor: "shadow-[0_0_30px_rgba(30,64,175,0.7)]",
      leftSpokes: ["Fact_Trips & Telemetry", "Fact_Revenue & Fares"],
      rightSpokes: ["Dim_Corridor Geometries", "Dim_Vehicle Fleet Registers"]
    },
    {
      num: "02",
      title: "Systems & Data Layer",
      subtitle: "Unified Integration & Minimum Redundancy",
      color: "#0284c7", // Medium Sky Blue
      bgColor: "bg-sky-950/70",
      borderColor: "border-sky-500",
      textColor: "text-sky-400",
      glowColor: "shadow-[0_0_30px_rgba(2,132,199,0.7)]",
      leftSpokes: ["Systems Integration (Power BI + Next.js)", "Simple REST Interfaces & API Hooks"],
      rightSpokes: ["Minimum Redundancy of Data", "100% Compatible Star-Schema (11.5K Records)"]
    },
    {
      num: "03",
      title: "Transportation Intelligence",
      subtitle: "DixNova Business Value Outcomes",
      color: "#3b82f6", // Electric Primary Blue
      bgColor: "bg-indigo-950/70",
      borderColor: "border-indigo-400",
      textColor: "text-indigo-300",
      glowColor: "shadow-[0_0_35px_rgba(59,130,246,0.8)]",
      leftSpokes: ["New Business Opportunities", "Increased Operational Effectiveness", "Responsive to Congestion Spikes"],
      rightSpokes: ["Reduced Operating Risk", "Reduced Maintenance Costs & Fare Leakage"]
    }
  ]

  // Auto-cycle through the 3 funnel tiers
  React.useEffect(() => {
    if (!isAutoCycling || hoveredTier !== null) return

    const timer = setInterval(() => {
      setActiveTier((prev) => (prev + 1) % 3)
    }, 3500)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredTier])

  const currentHighlight = hoveredTier !== null ? hoveredTier : activeTier
  const activeData = tiers[currentHighlight]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-card shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-primary text-primary-foreground">
              STAR-SCHEMA DIMENSIONAL ARCHITECTURE
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 10 • Data Modeling Funnel
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-foreground tracking-tight pt-1">
            Data Modeling Funnel & Business Value Outcomes
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

      {/* 3-TIER FUNNEL PYRAMID WITH RADIATING VALUE SPOKES (MATCHING TEMPLATE IMAGE) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 sm:p-6 rounded-3xl border border-white/20 bg-black/75 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Background Image Backdrop */}
        <img
          src="/dix0.jpeg"
          alt="Data Modeling Backdrop"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.2] scale-105 transform-gpu -z-10 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/40 -z-10" />

        {/* LEFT RADIATING SPOKES */}
        <div className="md:col-span-3 space-y-3 z-10">
          <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block text-left">
            ⬅ LEFT VALUE SPOKES
          </span>

          {activeData.leftSpokes.map((spoke, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all duration-500 bg-black/80 border-cyan-500/40 text-left shadow-lg ${activeData.glowColor}`}
            >
              <span className="text-xs font-sans font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">↖</span> {spoke}
              </span>
            </div>
          ))}
        </div>

        {/* CENTER 3-TIER UPWARD FUNNEL CONE (MATCHING TEMPLATE LAYOUT) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-2 z-10 space-y-3">
          
          {/* TIER 3 (TOP - TRANSPORTATION INTELLIGENCE) */}
          <div
            onMouseEnter={() => setHoveredTier(2)}
            onMouseLeave={() => setHoveredTier(null)}
            className={`w-full p-4 rounded-full border-4 transition-all duration-500 cursor-pointer text-center ${
              currentHighlight === 2
                ? `${tiers[2].bgColor} ${tiers[2].borderColor} ${tiers[2].glowColor} scale-[1.04]`
                : "bg-indigo-950/40 border-white/20 opacity-80 hover:opacity-100"
            }`}
          >
            <span className="text-[10px] font-mono font-black text-indigo-300 uppercase tracking-widest block">
              TOP TIER 03 • BUSINESS VALUE
            </span>
            <h3 className="text-sm sm:text-base font-display font-black text-white">
              Transportation Intelligence (Your Business)
            </h3>
          </div>

          {/* Upward Arrow Connector 2 */}
          <div className="text-sky-400 animate-bounce text-sm font-bold">▲</div>

          {/* TIER 2 (MIDDLE - SYSTEMS & DATA LAYER) */}
          <div
            onMouseEnter={() => setHoveredTier(1)}
            onMouseLeave={() => setHoveredTier(null)}
            className={`w-[82%] p-3.5 rounded-full border-4 transition-all duration-500 cursor-pointer text-center ${
              currentHighlight === 1
                ? `${tiers[1].bgColor} ${tiers[1].borderColor} ${tiers[1].glowColor} scale-[1.04]`
                : "bg-sky-950/40 border-white/20 opacity-80 hover:opacity-100"
            }`}
          >
            <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest block">
              MIDDLE TIER 02 • INTEGRATION
            </span>
            <h3 className="text-xs sm:text-sm font-display font-extrabold text-white">
              Systems & Data Layer
            </h3>
          </div>

          {/* Upward Arrow Connector 1 */}
          <div className="text-blue-400 animate-bounce text-sm font-bold">▲</div>

          {/* TIER 1 (BASE - DATA MODEL CORE) */}
          <div
            onMouseEnter={() => setHoveredTier(0)}
            onMouseLeave={() => setHoveredTier(null)}
            className={`w-[65%] p-3 rounded-full border-4 transition-all duration-500 cursor-pointer text-center ${
              currentHighlight === 0
                ? `${tiers[0].bgColor} ${tiers[0].borderColor} ${tiers[0].glowColor} scale-[1.04]`
                : "bg-blue-950/40 border-white/20 opacity-80 hover:opacity-100"
            }`}
          >
            <span className="text-[9px] font-mono font-black text-blue-400 uppercase tracking-widest block">
              BASE TIER 01 • STAR-SCHEMA CORE
            </span>
            <h3 className="text-xs font-display font-extrabold text-white">
              Data Model (Star-Schema)
            </h3>
          </div>

        </div>

        {/* RIGHT RADIATING SPOKES */}
        <div className="md:col-span-3 space-y-3 z-10">
          <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest block text-right">
            RIGHT VALUE SPOKES ➔
          </span>

          {activeData.rightSpokes.map((spoke, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all duration-500 bg-black/80 border-emerald-500/40 text-right shadow-lg ${activeData.glowColor}`}
            >
              <span className="text-xs font-sans font-bold text-white flex items-center justify-end gap-2">
                {spoke} <span className="text-emerald-400">↗</span>
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
