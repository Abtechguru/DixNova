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
      color: "#FF5B5B",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#FF5B5B]",
      textColor: "text-[#FF5B5B]",
      glowColor: "shadow-[0_0_25px_rgba(255,91,91,0.2)]"
    },
    {
      num: "02",
      title: "Duplicate Key Deduplication",
      desc: "Scanned transaction UUIDs and daily trip keys, purging duplicate ticket entries and double-tap fare records.",
      purgedCount: cleaningStats?.duplicatesPurged || "210 Duplicates Purged",
      color: "#FFC107",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#FFC107]",
      textColor: "text-[#FFC107]",
      glowColor: "shadow-[0_0_25px_rgba(255,193,7,0.2)]"
    },
    {
      num: "03",
      title: "GPS Spatial Drift Filter",
      desc: "Filtered out-of-bounds telemetry coordinates drifting outside Lagos State LGA boundaries (Ikorodu, Ikeja, Lekki).",
      purgedCount: cleaningStats?.driftFiltered || "180 Spikes Filtered",
      color: "#00D4FF",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#00D4FF]",
      textColor: "text-[#00D4FF]",
      glowColor: "shadow-[0_0_25px_rgba(0,212,255,0.2)]"
    },
    {
      num: "04",
      title: "Speed Outlier Validation",
      desc: "Flagged and capped unrealistic speed readings (>120 km/h) caused by telemetry sensor latency or signal loss.",
      purgedCount: cleaningStats?.speedOutliers || "110 Speed Artifacts Capped",
      color: "#2ED573",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#2ED573]",
      textColor: "text-[#2ED573]",
      glowColor: "shadow-[0_0_25px_rgba(46,213,115,0.2)]"
    },
    {
      num: "05",
      title: "Fare Anomaly Standardization",
      desc: "Reconciled negative fare amounts and mismatched currency codes across Cowry electronic payment gateways.",
      purgedCount: cleaningStats?.fareAnomalies || "95 Anomalies Fixed",
      color: "#FFFF00",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#FFFF00]",
      textColor: "text-[#FFFF00]",
      glowColor: "shadow-[0_0_25px_rgba(255,255,0,0.25)]"
    }
  ]

  // Auto-cycle through the 5 rules
  React.useEffect(() => {
    if (!isAutoCycling || hoveredRule !== null) return

    const interval = setInterval(() => {
      setActiveRule((prev) => (prev + 1) % 5)
    }, 3800)

    return () => clearInterval(interval)
  }, [isAutoCycling, hoveredRule])

  const currentHighlight = hoveredRule !== null ? hoveredRule : activeRule

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-[#162133]/90 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-[#FFFF00] text-[#07111F]">
              DATA CLEANING & ANOMALY SANITIZATION
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 08 • 5 Quality Governance Rules
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-white tracking-tight pt-1">
            Automated Data Cleansing & Noise Reduction
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

      {/* 2-COLUMN KEYNOTE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#07111F]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* LEFT COLUMN: 3D DATABASE ENGINE & HEALTH BANNER */}
        <div className="lg:col-span-5 relative z-10 flex flex-col justify-between items-center space-y-4 text-center">
          
          <div className="relative w-full p-6 rounded-3xl bg-[#162133] border border-cyan-500/30 shadow-2xl space-y-4">
            
            {/* Animated Broom Sweep Graphic */}
            <div className="absolute -top-4 -right-2 z-20">
              <div className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.4)] backdrop-blur-md flex items-center gap-2">
                <span className="text-xl">🧹</span>
                <div className="text-left">
                  <span className="text-[10px] font-mono font-black block text-[#FFFF00]">SWEEPING DATA</span>
                  <span className="text-[9px] font-bold text-white">Errors Purged</span>
                </div>
              </div>
            </div>

            {/* 3D Database Cylinder Layers */}
            <div className="w-full space-y-2.5 z-10 pt-2">
              <div className="h-14 w-full rounded-[100%] border-2 border-cyan-400/60 bg-[#07111F] shadow-xl flex items-center justify-center relative">
                <div className="flex gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FFFF00] animate-ping" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                </div>
              </div>

              <div className="h-14 w-full rounded-[100%] border-2 border-cyan-400/40 bg-[#07111F] shadow-lg flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-gray-200">VERIFIED DATASET ENGINE</span>
              </div>

              <div className="h-14 w-full rounded-[100%] border-2 border-cyan-400/30 bg-[#07111F] shadow-md flex items-center justify-center">
                <span className="text-[10px] font-mono text-[#FFFF00] font-bold uppercase">{cleaningStats?.totalPurged || "1,160 RECORDS PURGED"}</span>
              </div>
            </div>

          </div>

          {/* Data Health Scorecard Banner */}
          <div className="w-full p-4 rounded-2xl bg-[#162133] border border-emerald-400/40 text-center space-y-1 shadow-xl">
            <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest block">
              DATA HEALTH PASS RATE: {cleaningStats?.qualityScore || "98.4%"}
            </span>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Cleaned raw records ➔ <strong>verified production records</strong> ready for Power BI star-schema modeling.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: 5 DATA QUALITY PIPELINE RULES */}
        <div className="lg:col-span-7 space-y-3 relative z-10">
          {rules.map((rule, idx) => {
            const isHighlighted = currentHighlight === idx

            return (
              <div
                key={rule.num}
                onMouseEnter={() => setHoveredRule(idx)}
                onMouseLeave={() => setHoveredRule(null)}
                className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer space-y-1 ${
                  isHighlighted
                    ? `${rule.bgColor} ${rule.borderColor} ${rule.glowColor} scale-[1.01]`
                    : "bg-[#162133]/60 border-white/10 hover:border-white/30 opacity-85"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`font-mono text-xs font-black ${rule.textColor}`}>{rule.num}</span>
                    <h3 className={`text-sm font-display font-bold ${isHighlighted ? "text-white" : "text-gray-200"}`}>
                      {rule.title}
                    </h3>
                  </div>

                  <Badge variant="outline" className={`text-[9px] font-mono ${rule.textColor} border-current`}>
                    {rule.purgedCount}
                  </Badge>
                </div>

                <p className="text-xs text-foreground-secondary leading-relaxed font-sans pl-7">
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
