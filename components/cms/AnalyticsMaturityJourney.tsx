"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

interface RoadmapStep {
  num: string
  title: string
  desc: string
  badge: string
  color: string
  pinColor: string
  textColor: string
  x: number // SVG X coordinate %
  y: number // SVG Y coordinate %
}

export function AnalyticsMaturityJourney() {
  const [activeStep, setActiveStep] = React.useState<number>(0)
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null)
  const [isAutoCycling, setIsAutoCycling] = React.useState<boolean>(true)

  const steps: RoadmapStep[] = [
    { num: "01", title: "Business Understanding", desc: "Domain research & stakeholder alignment across transport authorities, BRT operators & commuters.", badge: "FOUNDATION", color: "border-rose-500/40 bg-rose-950/30", pinColor: "bg-rose-500 text-white", textColor: "text-rose-400", x: 6, y: 35 },
    { num: "02", title: "Data Understanding", desc: "Assessing telemetry feeds, Cowry card transaction logs & GPS spatial coordinates.", badge: "INGESTION", color: "border-orange-500/40 bg-orange-950/30", pinColor: "bg-orange-500 text-white", textColor: "text-orange-400", x: 16, y: 75 },
    { num: "03", title: "Data Cleaning", desc: "Automated 6-dimension data quality scorecards filtering nulls, duplicates & GPS drift.", badge: "QUALITY PIPELINE", color: "border-yellow-500/40 bg-yellow-950/30", pinColor: "bg-yellow-500 text-black font-bold", textColor: "text-yellow-400", x: 26, y: 25 },
    { num: "04", title: "Data Preparation", desc: "Normalizing transaction records, feature engineering & trip duration metrics.", badge: "TRANSFORMATION", color: "border-emerald-500/40 bg-emerald-950/30", pinColor: "bg-emerald-500 text-white", textColor: "text-emerald-400", x: 36, y: 65 },
    { num: "05", title: "Data Modeling", desc: "Star-schema dimensional modeling (Fact_Revenue, Fact_Telemetry, Dim_Corridor).", badge: "ARCHITECTURE", color: "border-teal-500/40 bg-teal-950/30", pinColor: "bg-teal-500 text-white", textColor: "text-teal-400", x: 46, y: 30 },
    { num: "06", title: "Power BI Dashboards", desc: "Embedded interactive control rooms with DAX measures & role-based security.", badge: "INTELLIGENCE", color: "border-cyan-500/40 bg-cyan-950/30", pinColor: "bg-cyan-500 text-white", textColor: "text-cyan-400", x: 56, y: 70 },
    { num: "07", title: "Governed KPIs", desc: "Reference speed, delay, passenger volume & digital farebox recovery metrics.", badge: "BENCHMARKS", color: "border-sky-500/40 bg-sky-950/30", pinColor: "bg-sky-500 text-white", textColor: "text-sky-400", x: 66, y: 30 },
    { num: "08", title: "Business Insights", desc: "Synthesized analyst findings linking arterial congestion spikes with commuter demand.", badge: "SYNTHESIS", color: "border-indigo-500/40 bg-indigo-950/30", pinColor: "bg-indigo-500 text-white", textColor: "text-indigo-400", x: 76, y: 65 },
    { num: "09", title: "Recommendations", desc: "Actionable strategic proposals detailing fleet dispatch fixes, ROI & implementation costs.", badge: "ACTION PLAN", color: "border-purple-500/40 bg-purple-950/30", pinColor: "bg-purple-500 text-white", textColor: "text-purple-400", x: 86, y: 25 },
    { num: "10", title: "Business Impact", desc: "Quantifiable delay reduction, digital fare recovery & state-wide commuter relief.", badge: "RESULTS", color: "border-pink-500/40 bg-pink-950/30", pinColor: "bg-pink-500 text-white", textColor: "text-pink-400", x: 94, y: 60 }
  ]

  // Auto-cycle through the 10 steps along the road
  React.useEffect(() => {
    if (!isAutoCycling || hoveredStep !== null) return

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 10)
    }, 3500)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredStep])

  const currentHighlight = hoveredStep !== null ? hoveredStep : activeStep
  const activeStepData = steps[currentHighlight]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-3 my-1">
      
      {/* HEADER CONTROL BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-2xl border border-surface bg-card shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-primary text-primary-foreground">
              END-TO-END WORKFLOW ROADMAP
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              10-Stage Transportation Analytics Lifecycle
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-display font-extrabold text-foreground tracking-tight pt-0.5 flex items-center gap-2">
            <span>Analytics Maturity Journey</span>
          </h2>
        </div>

        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className="text-xs font-mono px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-surface text-foreground-secondary transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
          <span>{isAutoCycling ? "⏸ Auto-Roadmap Active" : "▶ Resume Roadmap"}</span>
        </button>
      </div>

      {/* ROADMAP GRAPHIC CANVAS (DESKTOP / TABLET CURVING HIGHWAY) */}
      <div className="relative w-full rounded-3xl border border-surface bg-card p-3 sm:p-4 shadow-2xl overflow-hidden space-y-4">
        
        {/* Background Road Graphics (Hidden on very narrow screens, rendered on sm+) */}
        <div className="relative w-full min-h-[250px] md:min-h-[300px] flex items-center justify-center bg-slate-950/80 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
          
          {/* SVG Winding Road Path with Asphalt Gradient & Dashed Lane Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>

            {/* Road Base (Outer Shadow & Border) */}
            <path
              d="M 20 140 C 100 280, 160 320, 260 100 C 360 -50, 460 350, 560 120 C 660 -40, 760 320, 860 100 C 920 20, 960 220, 980 240"
              fill="none"
              stroke="#475569"
              strokeWidth="54"
              strokeLinecap="round"
            />
            {/* Dark Asphalt Road Surface */}
            <path
              d="M 20 140 C 100 280, 160 320, 260 100 C 360 -50, 460 350, 560 120 C 660 -40, 760 320, 860 100 C 920 20, 960 220, 980 240"
              fill="none"
              stroke="url(#roadGrad)"
              strokeWidth="46"
              strokeLinecap="round"
            />
            {/* White Dashed Center Lane Line */}
            <path
              d="M 20 140 C 100 280, 160 320, 260 100 C 360 -50, 460 350, 560 120 C 660 -40, 760 320, 860 100 C 920 20, 960 220, 980 240"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeDasharray="14 14"
              strokeLinecap="round"
              className="opacity-70 animate-pulse"
            />
          </svg>

          {/* Interactive Milestone Location Pins along the Road */}
          {steps.map((step, idx) => {
            const isHighlighted = currentHighlight === idx
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{ left: `${step.x}%`, top: `${step.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-all duration-500 group flex flex-col items-center`}
              >
                {/* Location Pin Shape (Inspired by Reference Template) */}
                <div
                  className={`relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-500 ${step.pinColor} ${
                    isHighlighted ? "h-10 w-10 scale-125 ring-4 ring-white shadow-[0_0_25px_rgba(250,204,21,0.8)]" : "h-7 w-7 opacity-80 hover:opacity-100 hover:scale-110"
                  }`}
                >
                  <span className="text-[11px] font-mono font-black">{step.num}</span>

                  {/* Pin Pointer Tail */}
                  <div className="absolute -bottom-1.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-current text-inherit" />
                </div>

                {/* Pin Label Tooltip */}
                <div className={`mt-2 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border text-center transition-all whitespace-nowrap hidden sm:block ${
                  isHighlighted ? "border-primary text-white shadow-lg scale-105" : "border-white/10 text-gray-300 opacity-60"
                }`}>
                  <span className="text-[10px] font-mono font-bold block">{step.num}. {step.title}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ACTIVE MILESTONE DETAIL CARD DISPLAY */}
        <div className={`rounded-2xl border p-5 sm:p-6 transition-all duration-500 shadow-xl ${activeStepData.color} bg-black/80 backdrop-blur-md`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-mono font-black shadow-md ${activeStepData.pinColor}`}>
                {activeStepData.num}
              </div>
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${activeStepData.textColor}`}>
                  STAGE {activeStepData.num} OF 10 • {activeStepData.badge}
                </span>
                <h3 className="text-base sm:text-lg font-display font-extrabold text-white">
                  {activeStepData.title}
                </h3>
              </div>
            </div>

            {/* Navigation Dots for Quick Jump */}
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentHighlight ? "w-6 bg-primary" : "w-2 bg-white/20 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans pt-3">
            {activeStepData.desc}
          </p>
        </div>

      </div>
    </div>
  )
}
