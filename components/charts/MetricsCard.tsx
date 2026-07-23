import * as React from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

interface MetricsCardProps {
  title: string
  value: string | number
  subtext?: string
  trendPct?: number
  trendDirection?: "up" | "down" | "neutral"
  icon?: React.ReactNode
}

export function MetricsCard({
  title,
  value,
  subtext,
  trendPct,
  trendDirection = "up",
  icon
}: MetricsCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground-secondary">{title}</span>
          {icon && <div className="text-primary p-2 bg-primary/10 rounded-lg">{icon}</div>}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-3xl font-display font-bold tracking-tight">{value}</span>
          {trendPct !== undefined && (
            <Badge variant={trendDirection === "up" ? "success" : trendDirection === "down" ? "danger" : "default"}>
              {trendDirection === "up" ? "↑" : trendDirection === "down" ? "↓" : "•"} {Math.abs(trendPct)}%
            </Badge>
          )}
        </div>

        {subtext && <p className="mt-2 text-xs text-foreground-secondary">{subtext}</p>}
      </CardContent>
    </Card>
  )
}
