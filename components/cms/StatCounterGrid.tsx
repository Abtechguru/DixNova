import * as React from "react"

interface StatItem {
  value: string
  label: string
  description?: string
  trend?: string
}

interface StatCounterGridProps {
  stats: StatItem[]
}

export function StatCounterGrid({ stats }: StatCounterGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="rounded-2xl border border-surface bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all shadow-soft"
        >
          <div>
            <div className="text-4xl font-display font-bold tracking-tight text-primary">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-foreground mt-1">
              {stat.label}
            </div>
          </div>
          {stat.description && (
            <p className="text-xs text-foreground-secondary mt-3 pt-3 border-t border-surface">
              {stat.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
