"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

interface CleaningRule {
  num: string
  title: string
  desc: string
  purgedCount: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  glowColor: string
}

export function DataCleaningStage() {
  const [activeRule, setActiveRule] = React.useState<number>(0)
  const [hoveredRule, setHoveredRule] = React.useState<number | null>(null)
  const [isAutoCycling, setIsAutoCycling] = React.useState<boolean>(true)
  const [cleaningStats, setCleaningStats] = React.useState<{
    qualityScore: string
    totalPurged: string
    nullsCleared: string
    duplicatesPurged: string
    driftFiltered: string
    speedOutliers: string
    fareAnomalies: string
  } | null>(null)

  React.useEffect(() => {
    fetch("/api/cms/datasets")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCleaningStats({
            qualityScore: data.qualityScore || "98.4%",
            totalPurged: data.totalPurged || "1,160 Records Purged",
            nullsCleared: data.nullsCleared || "320 Nulls Cleared",
            duplicatesPurged: data.duplicatesPurged || "210 Duplicates Purged",
            driftFiltered: data.driftFiltered || "180 Spikes Filtered",
            speedOutliers: data.speedOutliers || "110 Speed Artifacts Capped",
            fareAnomalies: data.fareAnomalies || "95 Anomalies Fixed"
          })
        }
      })
      .catch(() => {})
  }, [])

  const rules: CleaningRule[] = [
    {
      num: "01",
      title: "Null Value Elimination",
      desc: "Identified and removed incomplete records with missing Bus IDs, blank Cowry card hashes, or empty corridor tags.",
      purgedCount: cleaningStats?.nullsCleared || "320 Nulls Cleared",
      color: "#f43f5e", // Rose
      bgColor: "bg-rose-950/60",
      borderColor: "border-rose-500",
      textColor: "text-rose-400",
      glowColor: "shadow-[0_0_25px_rgba(244,63,94,0.6)]"
    },
    {
      num: "02",
      title: "Duplicate Key Deduplication",
      desc: "Scanned transaction UUIDs and daily trip keys, purging duplicate ticket entries and double-tap fare records.",
      purgedCount: cleaningStats?.duplicatesPurged || "210 Duplicates Purged",
      color: "#f59e0b", // Amber
      bgColor: "bg-amber-950/60",
      borderColor: "border-amber-500",
      textColor: "text-amber-400",
      glowColor: "shadow-[0_0_25px_rgba(245,158,11,0.6)]"
    },
    {
      num: "03",
      title: "GPS Spatial Drift Filter",
      desc: "Filtered out-of-bounds telemetry coordinates drifting outside Lagos State LGA boundaries (Ikorodu, Ikeja, Lekki).",
      purgedCount: cleaningStats?.driftFiltered || "180 Spikes Filtered",
      color: "#06b6d4", // Cyan
      bgColor: "bg-cyan-950/60",
      borderColor: "border-cyan-500",
      textColor: "text-cyan-400",
      glowColor: "shadow-[0_0_25px_rgba(6,182,212,0.6)]"
    },
    {
      num: "04",
      title: "Speed Outlier Validation",
      desc: "Flagged and capped unrealistic speed readings (>120 km/h) caused by telemetry sensor latency or signal loss.",
      purgedCount: cleaningStats?.speedOutliers || "110 Speed Artifacts Capped",
      color: "#10b981", // Emerald
      bgColor: "bg-emerald-950/60",
      borderColor: "border-emerald-500",
      textColor: "text-emerald-400",
      glowColor: "shadow-[0_0_25px_rgba(16,185,129,0.6)]"
    },
    {
      num: "05",
      title: "Fare Anomaly Standardization",
      desc: "Reconciled negative fare amounts and mismatched currency codes across Cowry electronic payment gateways.",
      purgedCount: cleaningStats?.fareAnomalies || "95 Anomalies Fixed",
      color: "#8b5cf6", // Purple
      bgColor: "bg-purple-950/60",
      borderColor: "border-purple-500",
      textColor: "text-purple-400",
      glowColor: "shadow-[0_0_25px_rgba(139,92,246,0.6)]"
    },
    {
      num: "06",
      title: "Foreign Key Integrity",
      desc: "Enforced relational constraints linking maintenance logs, route definitions, and ticket transactions cleanly to master fleet records.",
      purgedCount: "130 Unmatched Keys Resolved",
      color: "#3b82f6", // Blue
      bgColor: "bg-blue-950/60",
      borderColor: "border-blue-500",
      textColor: "text-blue-400",
      glowColor: "shadow-[0_0_25px_rgba(59,130,246,0.6)]"
    }
  ]

  // Auto-cycle through the 6 rules
  React.useEffect(() => {
    if (!isAutoCycling || hoveredRule !== null) return

    const timer = setInterval(() => {
      setActiveRule((prev) => (prev + 1) % 6)
    }, 3500)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredRule])

  const currentHighlight = hoveredRule !== null ? hoveredRule : activeRule
  const activeData = rules[currentHighlight]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-card shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-primary text-primary-foreground">
              DATA REMOVAL & CLEANING PROCESS
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 08 • 6-Dimension Quality Pipeline
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-foreground tracking-tight pt-1">
            Data Quality Scorecard & Cleansing Pipeline
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

      {/* MAIN CONTAINER: 3D DATABASE SWEEP GRAPHIC (LEFT) + 6 PIPELINE RULES (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-4 sm:p-6 rounded-3xl border border-white/20 bg-black/75 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Background Image Backdrop */}
        <img
          src="/dix0.jpeg"
          alt="Data Cleaning Backdrop"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.2] scale-105 transform-gpu -z-10 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/40 -z-10" />

        {/* LEFT COLUMN: 3D DATABASE CYLINDER STACK WITH SWEEPING BROOM GRAPHIC */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-4 space-y-4">
          
          {/* 3D Database Cylinder & Broom Graphic Container */}
          <div className="relative w-full max-w-[280px] aspect-[4/3] flex flex-col items-center justify-center">
            
            {/* Animated Broom Sweep Graphic */}
            <div className="absolute -top-6 -right-2 z-20 animate-bounce transition-transform">
              <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.8)] backdrop-blur-md flex items-center gap-2">
                <span className="text-2xl">🧹</span>
                <div className="text-left">
                  <span className="text-[10px] font-mono font-black block text-cyan-300">SWEEPING DATA</span>
                  <span className="text-[9px] font-bold text-white">950 Errors Purged</span>
                </div>
              </div>
            </div>

            {/* 3D Database Cylinder Layers */}
            <div className="w-full space-y-2 z-10">
              {/* Cylinder Top Layer */}
              <div className="h-16 w-full rounded-[100%] border-4 border-cyan-400/60 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 shadow-2xl flex items-center justify-center relative">
                <div className="flex gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                </div>
              </div>

              {/* Cylinder Middle Layer */}
              <div className="h-16 w-full rounded-[100%] border-4 border-cyan-400/40 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 shadow-xl flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-gray-300">VERIFIED DATASET ENGINE</span>
              </div>

              {/* Cylinder Bottom Layer */}
              <div className="h-16 w-full rounded-[100%] border-4 border-cyan-400/30 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 shadow-lg flex items-center justify-center">
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">{cleaningStats?.totalPurged || "1,160 RECORDS PURGED"}</span>
              </div>
            </div>

          </div>

          {/* Data Health Scorecard Banner */}
          <div className="w-full p-4 rounded-2xl bg-black/80 border border-emerald-400/40 text-center space-y-1 shadow-xl">
            <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest block">
              DATA HEALTH PASS RATE: {cleaningStats?.qualityScore || "98.4%"}
            </span>
            <p className="text-xs text-gray-200">
              Cleaned & validated raw records ➔ <strong>verified production records</strong> ready for Power BI star-schema modeling.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: 6 DATA QUALITY PIPELINE RULES */}
        <div className="lg:col-span-7 space-y-2.5 relative z-10">
          {rules.map((rule, idx) => {
            const isHighlighted = currentHighlight === idx

            return (
              <div
                key={rule.num}
                onMouseEnter={() => setHoveredRule(idx)}
                onMouseLeave={() => setHoveredRule(null)}
                className={`p-3.5 rounded-2xl border transition-all duration-500 cursor-pointer space-y-1 ${
                  isHighlighted
                    ? `${rule.bgColor} ${rule.borderColor} ${rule.glowColor} scale-[1.01]`
                    : "bg-black/60 border-white/15 hover:border-white/40 opacity-85"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-black ${rule.textColor}`}>{rule.num}</span>
                    <h3 className={`text-xs sm:text-sm font-display font-extrabold ${isHighlighted ? "text-white" : "text-gray-200"}`}>
                      {rule.title}
                    </h3>
                  </div>

                  <Badge variant="outline" className={`text-[9px] font-mono ${rule.textColor} border-current`}>
                    {rule.purgedCount}
                  </Badge>
                </div>

                <p className="text-[11px] text-gray-300 leading-snug font-sans pl-6">
                  {rule.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
