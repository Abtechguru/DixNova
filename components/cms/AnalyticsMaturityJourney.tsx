import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export function AnalyticsMaturityJourney() {
  const steps = [
    { num: "01", title: "Business Understanding", desc: "Domain research & stakeholder alignment across ministries, BRT operators & commuters.", badge: "FOUNDATION", color: "border-purple-500/30 bg-purple-950/20 text-purple-400" },
    { num: "02", title: "Data Understanding", desc: "Assessing telemetry feeds, Cowry card logs & GPS spatial coordinates.", badge: "INGESTION", color: "border-indigo-500/30 bg-indigo-950/20 text-indigo-400" },
    { num: "03", title: "Data Cleaning", desc: "Automated 6-dimension data quality scorecards filtering nulls & GPS drift.", badge: "QUALITY PIPELINE", color: "border-blue-500/30 bg-blue-950/20 text-blue-400" },
    { num: "04", title: "Data Preparation", desc: "Normalizing transaction records, feature engineering & trip duration metrics.", badge: "TRANSFORMATION", color: "border-cyan-500/30 bg-cyan-950/20 text-cyan-400" },
    { num: "05", title: "Data Modeling", desc: "Star-schema dimensional modeling (Fact_Revenue, Fact_Telemetry, Dim_Corridor).", badge: "ARCHITECTURE", color: "border-teal-500/30 bg-teal-950/20 text-teal-400" },
    { num: "06", title: "Power BI Dashboards", desc: "Embedded interactive control rooms with DAX measures & RLS security.", badge: "INTELLIGENCE", color: "border-emerald-500/30 bg-emerald-950/20 text-emerald-400" },
    { num: "07", title: "Governed KPIs", desc: "Reference speed, delay, passenger volume & digital farebox metrics.", badge: "BENCHMARKS", color: "border-yellow-500/30 bg-yellow-950/20 text-yellow-400" },
    { num: "08", title: "Business Insights", desc: "Synthesized analyst findings linking congestion spikes with commuter flow.", badge: "SYNTHESIS", color: "border-amber-500/30 bg-amber-950/20 text-amber-400" },
    { num: "09", title: "Recommendations", desc: "Actionable strategic proposals detailing dispatch fixes, ROI & implementation costs.", badge: "ACTION PLAN", color: "border-orange-500/30 bg-orange-950/20 text-orange-400" },
    { num: "10", title: "Business Impact", desc: "Quantifiable delay reduction, digital fare recovery & commuter relief.", badge: "RESULTS", color: "border-rose-500/30 bg-rose-950/20 text-rose-400" }
  ]

  return (
    <div className="w-full space-y-4 my-2">
      {/* Header Banner */}
      <div className="p-4 rounded-xl border border-surface bg-card text-center shadow-soft space-y-1">
        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
          End-to-End Analytics Workflow
        </span>
        <h2 className="text-base md:text-lg font-display font-extrabold text-foreground tracking-tight">
          ⭐ Analytics Maturity Journey ⭐
        </h2>
      </div>

      {/* 10-Step Timeline Milestone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((s, idx) => (
          <div 
            key={idx} 
            className={`rounded-2xl border ${s.color} p-4 space-y-2 flex flex-col justify-between backdrop-blur-md shadow-md transition-all hover:scale-[1.02]`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black opacity-80">{s.num}</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-background/50 border border-surface">
                  {s.badge}
                </span>
              </div>
              <h3 className="text-xs font-bold font-display text-foreground leading-snug pt-1">{s.title}</h3>
              <p className="text-[11px] text-foreground-secondary leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
