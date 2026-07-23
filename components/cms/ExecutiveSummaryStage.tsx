"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"

export function ExecutiveSummaryStage() {
  const [activeCard, setActiveCard] = React.useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(true)
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null)

  // Auto-cycle through 4 keynote cards
  React.useEffect(() => {
    if (!isAutoPlaying || hoveredCard !== null) return

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4)
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
              2022–2024 Verified Power BI Audit
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
            Executive Audit & Operations Briefing
          </h2>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 bg-[#162133] px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-mono text-foreground-secondary self-end sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-[#FFFF00]" />
          <span>KEYNOTE CARD {currentHighlight + 1} / 4</span>
        </div>
      </div>

      {/* 4 FLOATING KEYNOTE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        
        {/* CARD 1: OVERVIEW */}
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
                FLEET OVERVIEW
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">01</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">400 Bus Fleet & Passenger Volume</h3>
            
            <p className="text-xs text-foreground-secondary leading-relaxed font-sans font-normal">
              Operates 400 buses carrying over 131,000 passengers (2022–2024). 323 active (81% availability), 52 in maintenance, 25 out of service.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-[#FFFF00] font-bold">
            131,000+ Passengers Carried
          </div>
        </div>

        {/* CARD 2: PROFIT LEAK */}
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
                PROFIT LEAK
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">02</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">₦70.6M Rev vs ₦159.8M Maint</h3>

            <p className="text-xs text-foreground-secondary leading-relaxed font-sans font-normal">
              Ticket revenue peaked in 2022 and has declined since. Maintenance cost (₦159.8M) exceeds ticket revenue (₦70.6M). Top 5 busiest routes run negative operating margin.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-rose-400 font-bold">
            Net Loss: ₦89.2 Million
          </div>
        </div>

        {/* CARD 3: STAGGERED REALLOCATION */}
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
                REALLOCATION
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">03</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">Staggered Fleet Deployment</h3>

            <p className="text-xs text-foreground-secondary leading-relaxed font-sans font-normal">
              Surulere & Apapa peak at 7am while Yaba-Epe peaks at 9pm — buses can serve both on staggered schedules. Agege-Mile 12 highest volume; Oshodi Depot runs 88 buses.
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-emerald-400 font-bold">
            Smarter Deployment Strategy
          </div>
        </div>

        {/* CARD 4: DELAY PERFORMANCE */}
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
                DELAY DIAGNOSIS
              </span>
              <span className="text-[10px] font-mono text-foreground-secondary">04</span>
            </div>

            <h3 className="text-base font-display font-bold text-white">19m Dispatch & Traffic Delay</h3>

            <p className="text-xs text-foreground-secondary leading-relaxed font-sans font-normal">
              Epe-Berger worst dispatch delay (19 mins late leaving depot). Ikorodu-Berger loses 15+ mins to transit traffic (needs timetable rebuild). Surulere-Festac has both.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-cyan-400 font-bold">
            Fixable Depot & Timetable Action
          </div>
        </div>

      </div>
    </div>
  )
}
