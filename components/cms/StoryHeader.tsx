import * as React from "react"
import { Badge } from "@/components/ui/Badge"

interface StoryHeaderProps {
  chapterNumber: number
  title: string
  subtitle: string
  category?: string
}

export function StoryHeader({ chapterNumber, title, subtitle, category = "EXECUTIVE BRIEF" }: StoryHeaderProps) {
  return (
    <div className="space-y-4 text-center max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-center gap-2">
        <Badge variant="outline" className="font-mono text-xs tracking-wider uppercase">
          Chapter {chapterNumber.toString().padStart(2, "0")}
        </Badge>
        <span className="text-foreground-secondary text-xs">•</span>
        <Badge variant="default" className="text-xs uppercase">{category}</Badge>
      </div>

      <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground leading-tight">
        {title}
      </h1>

      <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
        {subtitle}
      </p>

      <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
    </div>
  )
}
