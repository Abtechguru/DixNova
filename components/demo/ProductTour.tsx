"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export function ProductTour() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary/15 border-b border-primary/20 px-4 py-2.5 text-xs text-foreground flex items-center justify-between">
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        <Badge variant="default" className="text-[10px]">DEMO MODE</Badge>
        <span>
          <strong>Judge Walkthrough Active:</strong> Explore Sprints 1–7 (Architecture, Design System, SaaS Core, CMS, Analytics, Public Story, AI Copilot).
        </span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-foreground-secondary hover:text-foreground p-1"
      >
        ✕
      </button>
    </div>
  )
}
