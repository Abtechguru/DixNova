"use client"

import * as React from "react"

interface Slice {
  label: string
  value: number
  color: string
}

interface DonutBreakdownChartProps {
  title: string
  slices: Slice[]
}

export function DonutBreakdownChart({ title, slices }: DonutBreakdownChartProps) {
  const total = slices.reduce((acc, s) => acc + s.value, 0) || 1

  return (
    <div className="rounded-xl border border-surface bg-card p-6 space-y-4">
      <h3 className="text-lg font-display font-semibold">{title}</h3>
      <div className="flex items-center gap-6">
        {/* Progress Bar Stacked Representation for clean SVG alternative */}
        <div className="flex-1 space-y-3">
          <div className="flex h-4 w-full rounded-full overflow-hidden bg-surface">
            {slices.map((slice, i) => {
              const widthPct = (slice.value / total) * 100
              return (
                <div 
                  key={i} 
                  style={{ width: `${widthPct}%`, backgroundColor: slice.color }} 
                  className="h-full transition-all duration-500"
                  title={`${slice.label}: ${slice.value}`}
                />
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {slices.map((slice, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                <span className="text-foreground-secondary truncate">{slice.label}</span>
                <span className="font-semibold ml-auto">{Math.round((slice.value / total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
