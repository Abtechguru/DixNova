"use client"

import * as React from "react"

interface TelemetryGaugeProps {
  title: string
  value: number // 0 to 100
  unit?: string
  status?: string
}

export function TelemetryGauge({ title, value, unit = "%", status = "Normal" }: TelemetryGaugeProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100)
  
  // Color based on gauge severity
  const getColor = (val: number) => {
    if (val > 80) return "#EF4444" // Danger / High Congestion
    if (val > 50) return "#F59E0B" // Warning
    return "#10B981" // Normal / Success
  }

  const gaugeColor = getColor(clampedValue)

  return (
    <div className="rounded-xl border border-surface bg-card p-6 text-center space-y-2">
      <span className="text-sm font-medium text-foreground-secondary">{title}</span>
      <div className="relative flex items-center justify-center my-4">
        <div className="text-4xl font-display font-bold tracking-tight" style={{ color: gaugeColor }}>
          {clampedValue}{unit}
        </div>
      </div>
      <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-surface">
        {status}
      </div>
    </div>
  )
}
