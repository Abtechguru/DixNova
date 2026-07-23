import * as React from "react"
import { Badge } from "@/components/ui/Badge"

interface Step {
  stage: string
  title: string
  description: string
  deliverables?: string[]
}

interface TimelineJourneyProps {
  steps: Step[]
}

export function TimelineJourney({ steps }: TimelineJourneyProps) {
  return (
    <div className="relative py-8 space-y-8 max-w-4xl mx-auto">
      {/* Vertical Connecting Line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-surface hidden sm:block" />

      {steps.map((step, idx) => (
        <div key={idx} className="relative flex flex-col sm:flex-row items-start gap-6 group">
          {/* Stage Node */}
          <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground font-display font-bold flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
            {idx + 1}
          </div>

          {/* Content Card */}
          <div className="flex-1 rounded-2xl border border-surface bg-card p-6 space-y-3 hover:border-primary/50 transition-colors shadow-soft">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-mono text-xs">{step.stage}</Badge>
              <span className="text-xs text-foreground-secondary font-medium">Phase {idx + 1}</span>
            </div>
            <h3 className="text-xl font-display font-bold">{step.title}</h3>
            <p className="text-sm text-foreground-secondary leading-relaxed">{step.description}</p>

            {step.deliverables && (
              <div className="pt-3 border-t border-surface flex flex-wrap gap-2">
                {step.deliverables.map((item, dIdx) => (
                  <Badge key={dIdx} variant="secondary" className="text-xs">{item}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
