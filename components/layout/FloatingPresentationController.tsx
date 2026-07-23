"use client"

import * as React from "react"
import Link from "next/link"
import { Icons } from "@/lib/utils/icons"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

export interface FloatingPresentationControllerProps {
  currentSlide: number
  totalSlides: number
  stageTitle: string
  stageNumber: string
  onPrev: () => void
  onNext: () => void
  onSelectSlide: (idx: number) => void
}

export function FloatingPresentationController({
  currentSlide,
  totalSlides,
  stageTitle,
  stageNumber,
  onPrev,
  onNext,
  onSelectSlide
}: FloatingPresentationControllerProps) {
  const [seconds, setSeconds] = React.useState<number>(0)
  const [isPaused, setIsPaused] = React.useState<boolean>(false)

  // Presentation Timer
  React.useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isPaused])

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-auto">
      <div className="w-full h-14 rounded-2xl bg-[#162133]/90 backdrop-blur-xl border border-[#FFFF00]/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] px-4 flex items-center justify-between gap-3 text-white">
        
        {/* Left: Branding & Timer */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-[#FFFF00] text-[#07111F] font-black font-display text-xs flex items-center justify-center shadow-md shrink-0">
            SN
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-mono text-foreground-secondary uppercase tracking-wider">
              SmartMove • Group 10
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">
                {formatTimer(seconds)}
              </span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="text-[10px] text-foreground-secondary hover:text-white ml-1 font-mono"
                title={isPaused ? "Resume Timer" : "Pause Timer"}
              >
                {isPaused ? "▶" : "⏸"}
              </button>
            </div>
          </div>
        </div>

        {/* Center: Stage Title & Progress Dots */}
        <div className="flex flex-col items-center justify-center max-w-xs md:max-w-md mx-auto truncate">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[9px] font-mono bg-[#FFFF00] text-[#07111F] px-1.5 py-0 font-extrabold">
              {stageNumber}
            </Badge>
            <span className="text-xs font-bold font-display text-white truncate max-w-[140px] sm:max-w-[200px] md:max-w-[280px]">
              {stageTitle}
            </span>
          </div>

          {/* Slide Progress Dots */}
          <div className="flex items-center gap-1 mt-1 overflow-x-auto scrollbar-none max-w-[180px] md:max-w-[260px] px-1">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSlide(idx)}
                title={`Jump to Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentSlide
                    ? "w-5 bg-[#FFFF00] shadow-[0_0_8px_#FFFF00]"
                    : "w-1.5 bg-white/20 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Previous / Next & Exit Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            disabled={currentSlide === 0}
            onClick={onPrev}
            className="h-8 px-2.5 text-xs border-surface hover:bg-white/10 hover:text-white"
          >
            ‹ Prev
          </Button>

          <span className="text-[10px] font-mono text-foreground-secondary hidden md:inline">
            {currentSlide + 1}/{totalSlides}
          </span>

          <Button
            variant="default"
            size="sm"
            disabled={currentSlide === totalSlides - 1}
            onClick={onNext}
            className="h-8 px-3 text-xs bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-bold shadow-soft"
          >
            Next ›
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 px-2 text-xs text-foreground-secondary hover:text-white"
            title="Exit Presentation"
          >
            <Link href="/">✕</Link>
          </Button>
        </div>

      </div>
    </div>
  )
}
