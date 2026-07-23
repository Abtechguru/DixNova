"use client"

import * as React from "react"

interface BarData {
  label: string
  value: number
  category?: string
}

interface BarComparisonChartProps {
  title: string
  data: BarData[]
  unit?: string
}

export function BarComparisonChart({ title, data, unit = "" }: BarComparisonChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1)

  return (
    <div className="rounded-xl border border-surface bg-card p-6 space-y-4">
      <h3 className="text-lg font-display font-semibold">{title}</h3>
      <div className="space-y-3">
        {data.map((bar, idx) => {
          const pct = Math.round((bar.value / maxValue) * 100)
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{bar.label}</span>
                <span className="text-foreground-secondary">{bar.value.toLocaleString()} {unit}</span>
              </div>
              <div className="h-3 w-full bg-surface rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
