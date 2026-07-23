"use client"

import * as React from "react"

interface DataPoint {
  label: string
  value: number
}

interface AreaTrendChartProps {
  title: string
  data: DataPoint[]
  height?: number
  color?: string
}

export function AreaTrendChart({
  title,
  data,
  height = 200,
  color = "#FFFF00"
}: AreaTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-surface bg-card text-foreground-secondary text-sm">
        No telemetry trend data available
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.value), 1)
  const width = 600
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * width
    const y = height - (d.value / maxValue) * (height - 20)
    return `${x},${y}`
  }).join(" ")

  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <div className="rounded-xl border border-surface bg-card p-6 space-y-4">
      <h3 className="text-lg font-display font-semibold">{title}</h3>
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <polygon points={areaPoints} fill={`url(#gradient-${title.replace(/\s+/g, '-')})`} />

          {/* Stroke Line */}
          <polyline fill="none" stroke={color} strokeWidth="3" points={points} strokeLinecap="round" />
        </svg>

        {/* X Axis Labels */}
        <div className="flex justify-between mt-2 text-xs text-foreground-secondary">
          {data.map((d, idx) => (
            <span key={idx}>{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
