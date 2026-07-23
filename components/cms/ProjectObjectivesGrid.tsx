import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export function ProjectObjectivesGrid() {
  const categories = [
    {
      title: "Business Objectives",
      badge: "COMMERCIAL & OPERATIONS",
      badgeVariant: "default" as const,
      color: "border-primary/40 bg-primary/5",
      iconColor: "text-primary",
      icon: Icons.revenue,
      items: [
        "Improve transportation decision-making.",
        "Enhance operational efficiency.",
        "Reduce unnecessary operational costs.",
        "Improve passenger satisfaction."
      ]
    },
    {
      title: "Analytics Objectives",
      badge: "INTELLIGENCE ENGINE",
      badgeVariant: "success" as const,
      color: "border-emerald-500/40 bg-emerald-500/5",
      iconColor: "text-emerald-400",
      icon: Icons.kpi,
      items: [
        "Analyze transportation data.",
        "Develop meaningful KPIs.",
        "Identify operational trends.",
        "Generate actionable insights."
      ]
    },
    {
      title: "Technical Objectives",
      badge: "PLATFORM ARCHITECTURE",
      badgeVariant: "default" as const,
      color: "border-cyan-500/40 bg-cyan-500/5",
      iconColor: "text-cyan-400",
      icon: Icons.dashboard,
      items: [
        "Develop interactive Power BI dashboards.",
        "Build an executive decision-support platform.",
        "Present analytics through an interactive web experience."
      ]
    },
    {
      title: "Strategic Objective",
      badge: "MISSION GOAL",
      badgeVariant: "warning" as const,
      color: "border-amber-500/40 bg-amber-500/5",
      iconColor: "text-amber-400",
      icon: Icons.brain,
      items: [
        "Transform transportation data into better decisions."
      ]
    }
  ]

  return (
    <div className="w-full space-y-4 my-2">
      {/* Top Introductory Banner */}
      <div className="p-4 rounded-xl border border-surface bg-card text-center shadow-soft space-y-1">
        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
          Project Objectives
        </span>
        <h2 className="text-base md:text-lg font-display font-extrabold text-foreground tracking-tight">
          To address these challenges, our project was guided by four key objectives.
        </h2>
      </div>

      {/* Objectives 4-Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon
          return (
            <div 
              key={idx} 
              className={`rounded-2xl border ${cat.color} p-5 space-y-3 shadow-md backdrop-blur-md transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl bg-background border border-surface ${cat.iconColor}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-foreground">{cat.title}</h3>
                </div>
                <Badge variant={cat.badgeVariant} className="text-[10px] uppercase font-mono tracking-wider">
                  {cat.badge}
                </Badge>
              </div>

              <ul className="space-y-2 text-xs text-foreground-secondary pt-1">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 leading-relaxed">
                    <span className={`text-sm ${cat.iconColor}`}>•</span>
                    <span className="text-foreground/90 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
