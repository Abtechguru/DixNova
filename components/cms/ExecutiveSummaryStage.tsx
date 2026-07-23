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

  // Auto-cycle through the 5 portrait cards every 3.5 seconds
  React.useEffect(() => {
    if (!isAutoPlaying || hoveredCard !== null) return

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 5)
    }, 3500)

    return () => clearTimeout(interval)
  }, [isAutoPlaying, hoveredCard])

  const currentHighlight = hoveredCard !== null ? hoveredCard : activeCard

  return (
    <div className="relative w-full h-[76vh] min-h-[500px] max-h-[750px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between p-4 sm:p-6 bg-black">
      {/* Background Image with Backdrop Overlay */}
      <img
        src="/dix0.jpeg"
        alt="Executive Summary Backdrop"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.2] scale-105 transform-gpu -z-10 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/50 -z-10" />

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-3 flex-none z-10">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="bg-primary text-primary-foreground font-mono text-[10px] font-bold">
              GROUP 10 HACKATHON SUBMISSION
            </Badge>

            <Badge variant="outline" className="bg-black/60 backdrop-blur-md text-gray-300 border-white/20 text-[10px] font-mono">
              Jan 2022 – Dec 2024 Data
            </Badge>

            {/* Auto-Glow Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 transition-all flex items-center gap-1"
            >
              <span>{isAutoPlaying ? "⏸ Auto-Glow Active" : "▶ Resume Auto-Glow"}</span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight drop-shadow-md">
            DIXNOVA Executive Summary
          </h2>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-mono text-gray-200 self-end sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
          <span>HIGHLIGHTING CARD {currentHighlight + 1} / 5</span>
        </div>
      </div>

      {/* 5 PORTRAIT CARDS GRID (100% VISIBLE ON SCREEN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 my-auto py-2 z-10 flex-1 h-full items-stretch">
        
        {/* PORTRAIT CARD 1: PROJECT OVERVIEW */}
        <div
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
            currentHighlight === 0
              ? "bg-black/90 border-amber-400 shadow-[0_0_30px_rgba(250,204,21,0.6)] scale-[1.03]"
              : "bg-black/70 border-white/15 hover:border-amber-400/60 opacity-90"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-amber-400/30 pb-2">
              <span className="text-[11px] font-mono font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                OVERVIEW
              </span>
              <span className="text-[10px] font-mono text-gray-400">01</span>
            </div>

            <h3 className="text-sm font-display font-extrabold text-white">Project Scope & Data</h3>
            
            <p className="text-xs text-gray-200 leading-relaxed font-sans font-medium drop-shadow">
              Analyzes 3 years of operational data across 5 linked datasets (daily trips, maintenance records, ticket transactions, bus routes & fleet). Cleans over 11,500 records for Power BI modeling.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-amber-400 font-bold">
            Data Coverage: 2022–2024
          </div>
        </div>

        {/* PORTRAIT CARD 2: BUSINESS CHALLENGE */}
        <div
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
            currentHighlight === 1
              ? "bg-black/90 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.6)] scale-[1.03]"
              : "bg-black/70 border-white/15 hover:border-rose-500/60 opacity-90"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-rose-500/30 pb-2">
              <span className="text-[11px] font-mono font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                CHALLENGE
              </span>
              <span className="text-[10px] font-mono text-gray-400">02</span>
            </div>

            <h3 className="text-sm font-display font-extrabold text-white">System Bottlenecks</h3>

            <p className="text-xs text-gray-200 leading-relaxed font-sans font-medium drop-shadow">
              Transport information remains fragmented across separate systems. Planners lack visibility into overall service performance and cannot optimize fleet deployment or reduce operating costs effectively.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-rose-400 font-bold">
            High Congestion & Breakdowns
          </div>
        </div>

        {/* PORTRAIT CARD 3: SOLUTION SUMMARY */}
        <div
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
            currentHighlight === 2
              ? "bg-black/90 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.6)] scale-[1.03]"
              : "bg-black/70 border-white/15 hover:border-emerald-400/60 opacity-90"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-400/30 pb-2">
              <span className="text-[11px] font-mono font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                SOLUTION
              </span>
              <span className="text-[10px] font-mono text-gray-400">03</span>
            </div>

            <h3 className="text-sm font-display font-extrabold text-white">End-to-End Analytics</h3>

            <p className="text-xs text-gray-200 leading-relaxed font-sans font-medium drop-shadow">
              Source data is profiled, cleaned, and modeled in Power BI. DAX measures translate raw records into KPIs of revenue, on-time rate, fleet utilization, and maintenance cost — powering decision-making.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-emerald-400 font-bold">
            Star-Schema & DAX Metrics
          </div>
        </div>

        {/* PORTRAIT CARD 4: WORKFLOW PIPELINE */}
        <div
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
            currentHighlight === 3
              ? "bg-black/90 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.6)] scale-[1.03]"
              : "bg-black/70 border-white/15 hover:border-cyan-400/60 opacity-90"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-400/30 pb-2">
              <span className="text-[11px] font-mono font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                WORKFLOW
              </span>
              <span className="text-[10px] font-mono text-gray-400">04</span>
            </div>

            <h3 className="text-sm font-display font-extrabold text-white">Pipeline Architecture</h3>

            <div className="space-y-1.5 text-[11px] font-sans text-gray-200">
              <div className="p-1.5 rounded-lg bg-surface/30 border border-white/10">1. Data Ingestion</div>
              <div className="p-1.5 rounded-lg bg-surface/30 border border-white/10">2. Profile & Clean</div>
              <div className="p-1.5 rounded-lg bg-surface/30 border border-white/10">3. Power BI & DAX</div>
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40">4. Decision Control</div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-cyan-400 font-bold">
            4-Stage Data Pipeline
          </div>
        </div>

        {/* PORTRAIT CARD 5: CALL TO ACTION */}
        <div
          onMouseEnter={() => setHoveredCard(4)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full ${
            currentHighlight === 4
              ? "bg-black/95 border-primary shadow-[0_0_30px_rgba(250,204,21,0.7)] scale-[1.03]"
              : "bg-black/70 border-white/15 hover:border-primary/60 opacity-90"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-primary/30 pb-2">
              <span className="text-[11px] font-mono font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                CALL TO ACTION
              </span>
              <span className="text-[10px] font-mono text-gray-400">05</span>
            </div>

            <h3 className="text-sm font-display font-extrabold text-white">Pilot Rollout Proposal</h3>

            <p className="text-xs text-gray-200 leading-relaxed font-sans font-medium drop-shadow">
              We invite transport authorities to review the dashboard and support a pilot rollout across high-value Express corridors and Lagos Mainland LGA.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <Button size="sm" asChild className="w-full text-xs font-bold shadow-md">
              <Link href="/p/powerbi-dashboards">
                <Icons.powerbi className="mr-1 h-3.5 w-3.5" /> Power BI Portal ↗
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
