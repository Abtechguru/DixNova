import * as React from "react"
import { Badge } from "@/components/ui/Badge"

interface ActionCard {
  title: string
  description: string
  priority: "HIGH" | "MEDIUM" | "LOW"
  impact?: string
  cost?: string
  timeline?: string
  department?: string
}

interface ActionCardGridProps {
  cards: ActionCard[]
}

export function ActionCardGrid({ cards }: ActionCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
      {cards.map((card, idx) => (
        <div key={idx} className="rounded-2xl border border-surface bg-card p-6 space-y-4 flex flex-col justify-between hover:border-primary/50 transition-all shadow-soft">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant={card.priority === "HIGH" ? "danger" : "warning"}>{card.priority} PRIORITY</Badge>
              {card.department && <span className="text-xs font-medium text-foreground-secondary">{card.department}</span>}
            </div>
            <h3 className="text-lg font-display font-bold text-foreground">{card.title}</h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">{card.description}</p>
          </div>

          <div className="pt-4 border-t border-surface grid grid-cols-3 gap-2 text-xs text-foreground-secondary">
            {card.impact && (
              <div>
                <span className="block text-foreground-secondary font-medium">Impact</span>
                <span className="font-semibold text-foreground">{card.impact}</span>
              </div>
            )}
            {card.cost && (
              <div>
                <span className="block text-foreground-secondary font-medium">Est. Cost</span>
                <span className="font-semibold text-foreground">{card.cost}</span>
              </div>
            )}
            {card.timeline && (
              <div>
                <span className="block text-foreground-secondary font-medium">Timeline</span>
                <span className="font-semibold text-foreground">{card.timeline}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
