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

  // Auto-cycle through cards
  React.useEffect(() => {
    if (!isAutoPlaying || hoveredCard !== null) return

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 5)
    }, 3800)

    return () => clearTimeout(interval)
  }, [isAutoPlaying, hoveredCard])

  const currentHighlight = hoveredCard !== null ? hoveredCard : activeCard

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-6 sm:p-8 bg-[#07111F]/90 backdrop-blur-xl my-2 space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 flex-none">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[10px] font-black tracking-wide">
              TEAM DIXNOVA • GROUP 10
            </Badge>

            <Badge variant="outline" className="bg-[#162133] text-cyan-300 border-cyan-500/30 text-[10px] font-mono">
              Jan 2022 – Dec 2024 Operations Data
            </Badge>

            {/* Auto-Cycle Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#162133] hover:bg-[#162133]/80 border border-white/15 text-foreground-secondary transition-all flex items-center gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-[#FFFF00] animate-ping" />
              <span>{isAutoPlaying ? "⏸ Keynote Auto-Cycle Active" : "▶ Resume Auto-Cycle"}</span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight pt-1">
            Executive Briefing Summary
          </h2>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 bg-[#162133] px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-mono text-foreground-secondary self-end sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-[#FFFF00]" />
          <span>KEYNOTE CARD {currentHighlight + 1} / 5</span>
        </div>
      </div>

      {/* 5 FLOATING KEYNOTE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
        
        {/* CARD 1: PROJECT OVERVIEW */}
        <div
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-5 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
            currentHighlight === 0
              ? "bg-[#162133] border-[#FFFF00] shadow-[0_0_30px_rgba(255,255,0,0.2)] scale-[1.02]"
              : "bg-[#162133]/70 border-white/10 hover:border-white/30"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono font-black text-[#FFFF00] uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FFFF00]" />
                OVERVIEW
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">01</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">Project Scope & Data</h3>
            
            <p className="text-xs text-foreground-secondary leading-relaxed font-sans font-normal">
              Analyzes 3 years of operational data across 5 linked datasets (daily trips, maintenance, ticket transactions, bus routes & fleet). Profiling over 11,500+ records for Power BI modeling.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-[#FFFF00] font-bold">
            Data Horizon: 2022–2024
          </div>
        </div>

        {/* CARD 2: BUSINESS CHALLENGE */}
        <div
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-5 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
            currentHighlight === 1
              ? "bg-[#162133] border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.2)] scale-[1.02]"
              : "bg-[#162133]/70 border-white/10 hover:border-white/30"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                CHALLENGE
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">02</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">System Bottlenecks</h3>

            <p className="text-xs text-foreground-secondary leading-relaxed font-sans font-normal">
              Transport information remains fragmented across legacy systems. Planners lack visibility into corridor performance and cannot optimize fleet deployment or lower operating costs.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-rose-400 font-bold">
            Fragmented Data Silos
          </div>
        </div>

        {/* CARD 3: SOLUTION SUMMARY */}
        <div
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-5 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
            currentHighlight === 2
              ? "bg-[#162133] border-emerald-400 shadow-[0_0_30px_rgba(46,213,115,0.2)] scale-[1.02]"
              : "bg-[#162133]/70 border-white/10 hover:border-white/30"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                SOLUTION
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">03</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">End-to-End Analytics</h3>

            <p className="text-xs text-foreground-secondary leading-relaxed font-sans font-normal">
              Source data is cleaned and structured into Power BI star schema. Governed DAX measures translate telemetry into KPIs for farebox recovery, speed drops, and fleet utilization.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-emerald-400 font-bold">
            Star Schema & DAX Metrics
          </div>
        </div>

        {/* CARD 4: WORKFLOW PIPELINE */}
        <div
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-5 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
            currentHighlight === 3
              ? "bg-[#162133] border-cyan-400 shadow-[0_0_30px_rgba(0,212,255,0.2)] scale-[1.02]"
              : "bg-[#162133]/70 border-white/10 hover:border-white/30"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                WORKFLOW
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">04</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">Pipeline Architecture</h3>

            <div className="space-y-1.5 text-[11px] font-sans text-foreground-secondary">
              <div className="p-1.5 rounded-xl bg-surface/50 border border-white/10">1. Data Ingestion</div>
              <div className="p-1.5 rounded-xl bg-surface/50 border border-white/10">2. Profile & Clean</div>
              <div className="p-1.5 rounded-xl bg-surface/50 border border-white/10">3. Power BI & DAX</div>
              <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40">4. Policy Decision</div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-cyan-400 font-bold">
            Governed 4-Stage Pipeline
          </div>
        </div>

        {/* CARD 5: CALL TO ACTION */}
        <div
          onMouseEnter={() => setHoveredCard(4)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`p-5 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
            currentHighlight === 4
              ? "bg-[#162133] border-[#FFFF00] shadow-[0_0_30px_rgba(255,255,0,0.25)] scale-[1.02]"
              : "bg-[#162133]/70 border-white/10 hover:border-white/30"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono font-black text-[#FFFF00] uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FFFF00]" />
                DECISION ACTION
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">05</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">Pilot Rollout Proposal</h3>

            <p className="text-xs text-foreground-secondary leading-relaxed font-sans font-normal">
              We invite transport authorities to evaluate the live Power BI workspace and support a pilot rollout across high-density Express corridors and Lagos Mainland hubs.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <Button size="sm" asChild className="w-full text-xs font-bold bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 shadow-soft">
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
