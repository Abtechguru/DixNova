import * as React from "react"

export interface ProblemStatement5WsProps {
  summary?: string
  who?: { subtitle?: string; details: string[] }
  what?: { subtitle?: string; details: string[] }
  when?: { subtitle?: string; details: string[] }
  where?: { subtitle?: string; details: string[] }
  why?: { subtitle?: string; details: string[] }
}

export function ProblemStatement5Ws({
  summary = "Enterprise Transportation Congestion & Farebox Leakage Challenge",
  who = {
    subtitle: "Who is the problem affecting?",
    details: [
      "Lagos State Commuters & Bus Passengers",
      "BRT Operators & Fleet Dispatchers",
      "State Ministry Transport Authorities"
    ]
  },
  what = {
    subtitle: "What is the unmet need?",
    details: [
      "Real-time fleet telemetry tracking",
      "Automated corridor congestion alerts",
      "Unified Cowry card farebox reconciliation"
    ]
  },
  when = {
    subtitle: "When is the problem happening?",
    details: [
      "Morning rush hours (07:00 - 09:30)",
      "Evening peak commutes (17:00 - 19:30)",
      "Rainy season traffic slowdowns"
    ]
  },
  where = {
    subtitle: "Where is the problem occurring?",
    details: [
      "Lekki-Epe Expressway Corridor",
      "Third Mainland Bridge Bottlenecks",
      "Ikorodu - CMS BRT Routes"
    ]
  },
  why = {
    subtitle: "Why is this worth solving?",
    details: [
      "Reduce 45+ min average commuter delays",
      "Recover estimated ₦1.4B in annual revenue leaks",
      "Boost public transit efficiency by 25%+"
    ]
  }
}: ProblemStatement5WsProps) {
  const columns = [
    {
      w: "WHO?",
      subtitle: who.subtitle || "Who is the problem affecting?",
      details: who.details,
      headerBg: "bg-[#f97316]", // Orange
      columnBg: "bg-orange-950/20 border-orange-500/30",
      textColor: "text-orange-400"
    },
    {
      w: "WHAT?",
      subtitle: what.subtitle || "What is the unmet need?",
      details: what.details,
      headerBg: "bg-[#eab308]", // Yellow
      columnBg: "bg-yellow-950/20 border-yellow-500/30",
      textColor: "text-yellow-400"
    },
    {
      w: "WHEN?",
      subtitle: when.subtitle || "When is the problem happening?",
      details: when.details,
      headerBg: "bg-[#22c55e]", // Green
      columnBg: "bg-emerald-950/20 border-emerald-500/30",
      textColor: "text-emerald-400"
    },
    {
      w: "WHERE?",
      subtitle: where.subtitle || "Where is the problem occurring?",
      details: where.details,
      headerBg: "bg-[#64748b]", // Slate / Grey
      columnBg: "bg-slate-900/40 border-slate-500/30",
      textColor: "text-slate-300"
    },
    {
      w: "WHY?",
      subtitle: why.subtitle || "Why is this worth solving?",
      details: why.details,
      headerBg: "bg-[#06b6d4]", // Cyan / Blue
      columnBg: "bg-cyan-950/20 border-cyan-500/30",
      textColor: "text-cyan-400"
    }
  ]

  return (
    <div className="w-full space-y-4 my-2">
      {/* Main Problem Statement Banner */}
      <div className="p-4 rounded-xl border border-surface bg-card flex flex-col items-center justify-center text-center shadow-soft">
        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-1">
          Problem Statement
        </span>
        <h2 className="text-base md:text-lg font-display font-extrabold text-foreground tracking-tight">
          {summary}
        </h2>
      </div>

      {/* 5 Ws Vertical Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {columns.map((col, idx) => (
          <div 
            key={idx} 
            className={`rounded-xl border ${col.columnBg} flex flex-col overflow-hidden shadow-md transition-all hover:scale-[1.02]`}
          >
            {/* Header Box */}
            <div className={`${col.headerBg} p-3 text-white text-center flex flex-col items-center justify-center`}>
              <span className="text-2xl font-display font-extrabold tracking-wider">{col.w}</span>
              <span className="text-[11px] font-medium opacity-90 leading-tight mt-1">
                {col.subtitle}
              </span>
            </div>

            {/* Column Details Content */}
            <div className="p-4 flex-1 space-y-2">
              <ul className="space-y-2 text-xs text-foreground-secondary list-disc list-inside">
                {col.details.map((detail, dIdx) => (
                  <li key={dIdx} className="leading-relaxed">
                    <span className="text-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
