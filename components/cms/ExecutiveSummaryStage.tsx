"use client"

import * as React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/lib/utils/icons"

export function ExecutiveSummaryStage() {
  const [activeCard, setActiveCard] = React.useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(true)
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null)

  // Auto-cycle through cards one after the other every 3.5 seconds
  React.useEffect(() => {
    if (!isAutoPlaying || hoveredCard !== null) return

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 5)
    }, 3500)

    return () => clearInterval(interval)
  }, [isAutoPlaying, hoveredCard])

  const currentHighlight = hoveredCard !== null ? hoveredCard : activeCard

  return (
    <div className="relative w-full h-[72vh] min-h-[460px] max-h-[700px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between p-4 sm:p-6 md:p-8 bg-black">
      {/* Background Image with Dark Backdrop Overlay */}
      <img
        src="/dix0.jpeg"
        alt="Executive Summary Backdrop"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.22] scale-105 transform-gpu -z-10 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 -z-10" />

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-4 flex-none z-10">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="bg-primary text-primary-foreground font-mono text-[10px] font-bold">
              GROUP 10 HACKATHON SUBMISSION
            </Badge>

            <Badge variant="outline" className="bg-black/60 backdrop-blur-md text-gray-300 border-white/20 text-[10px] font-mono">
              Jan 2022 – Dec 2024 Data
            </Badge>

            {/* Auto-Play Control Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 transition-all flex items-center gap-1"
            >
              <span>{isAutoPlaying ? "⏸ Auto-Glow Active" : "▶ Resume Auto-Glow"}</span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white tracking-tight drop-shadow-md">
            DIXNOVA Executive Summary
          </h2>
        </div>

        {/* Floating Active Card Counter Indicator */}
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[11px] font-mono text-gray-300 self-end sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
          <span>HIGHLIGHTING CARD {currentHighlight + 1} / 5</span>
        </div>
      </div>

      {/* Main Responsive Grid Filling Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 my-auto py-2 z-10 flex-1 flex flex-col justify-center">
        
        {/* CARD 0: PROJECT OVERVIEW */}
        <div
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`md:col-span-6 p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
            currentHighlight === 0
              ? "bg-black/85 border-amber-400 shadow-[0_0_30px_rgba(250,204,21,0.5)] scale-[1.02]"
              : "bg-black/60 border-white/15 hover:border-amber-400/60 opacity-90"
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                PROJECT OVERVIEW
              </span>
              <span className="text-[10px] font-mono text-gray-400">01</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed font-sans font-medium drop-shadow">
              This project analyzes 3 years of operational data across 5 linked datasets — daily trips, maintenance records, ticket transactions, bus routes and fleet — to give transport authorities a single, unified view of service performance. Cleans and validates over 11,500 records for Power BI modeling.
            </p>
          </div>
        </div>

        {/* CARD 1: BUSINESS CHALLENGE */}
        <div
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`md:col-span-6 p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
            currentHighlight === 1
              ? "bg-black/85 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.5)] scale-[1.02]"
              : "bg-black/60 border-white/15 hover:border-rose-500/60 opacity-90"
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                BUSINESS CHALLENGE
              </span>
              <span className="text-[10px] font-mono text-gray-400">02</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed font-sans font-medium drop-shadow">
              Transport information remains fragmented across separate systems. Planners lack visibility into overall service performance and cannot optimize fleet deployment or reduce operating costs. Traffic congestion, unpredictable demand, and vehicle breakdowns drive service delays.
            </p>
          </div>
        </div>

        {/* CARD 2: SOLUTION SUMMARY */}
        <div
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`md:col-span-12 p-4 sm:p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${
            currentHighlight === 2
              ? "bg-black/85 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.5)] scale-[1.01]"
              : "bg-black/60 border-white/15 hover:border-emerald-400/60 opacity-90"
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                SOLUTION SUMMARY
              </span>
              <span className="text-[10px] font-mono text-gray-400">03</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed font-sans font-medium drop-shadow">
              Delivers an end-to-end analytics solution: source data is profiled, cleaned, and modeled in Power BI. DAX measures translate raw records into KPIs of revenue, on-time rate, fleet utilization, and maintenance cost — powering our interactive control room dashboard and recommendations.
            </p>
          </div>
        </div>

        {/* CARD 3: WORKFLOW PIPELINE */}
        <div
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`md:col-span-12 p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${
            currentHighlight === 3
              ? "bg-black/85 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] scale-[1.01]"
              : "bg-black/60 border-white/15 hover:border-cyan-400/60 opacity-90"
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                WORKFLOW PIPELINE
              </span>
              <span className="text-[10px] font-mono text-gray-400">04</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-surface/30 border border-white/10 text-[11px] font-semibold text-gray-200">
                1. Data Ingestion (5 Tables)
              </div>
              <div className="p-2 rounded-lg bg-surface/30 border border-white/10 text-[11px] font-semibold text-gray-200">
                2. Clean & Profile (11.5K Records)
              </div>
              <div className="p-2 rounded-lg bg-surface/30 border border-white/10 text-[11px] font-semibold text-gray-200">
                3. Power BI & DAX Modeling
              </div>
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40">
                4. Decision Control Room
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 4: CALL TO ACTION FOOTER BANNER */}
      <div
        onMouseEnter={() => setHoveredCard(4)}
        onMouseLeave={() => setHoveredCard(null)}
        className={`z-10 p-3.5 sm:p-4 rounded-2xl border transition-all duration-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          currentHighlight === 4
            ? "bg-black/90 border-primary shadow-[0_0_30px_rgba(250,204,21,0.6)] scale-[1.01]"
            : "bg-black/60 border-white/15 hover:border-primary/60 opacity-90"
        }`}
      >
        <div className="space-y-1 text-left flex-1">
          <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest block">
            ★ CALL TO ACTION
          </span>
          <p className="text-xs text-gray-200 leading-tight">
            We invite transport authorities & partners to review the dashboard and support a pilot rollout across high-value Express corridors and Lagos Mainland LGA.
          </p>
        </div>

        <Button size="sm" asChild className="text-xs font-bold whitespace-nowrap self-end sm:self-auto">
          <Link href="/p/powerbi-dashboards">
            <Icons.powerbi className="mr-1.5 h-3.5 w-3.5" /> Power BI Control Room ↗
          </Link>
        </Button>
      </div>
    </div>
  )
}
