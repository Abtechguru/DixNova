"use client"

import * as React from "react"
import Link from "next/link"
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
    <div className="fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[95%] sm:w-full max-w-4xl px-2 sm:px-4 pointer-events-auto">
      <div className="w-full h-12 sm:h-14 rounded-2xl bg-[#162133]/95 backdrop-blur-2xl border-2 border-[#FFFF00]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] px-3 sm:px-4 flex items-center justify-between gap-2 text-white">
        
        {/* Left: Branding & Timer */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-[#FFFF00] text-[#07111F] font-black font-display text-xs flex items-center justify-center shadow-md shrink-0">
            DX
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[11px] font-mono text-[#FFFF00] font-bold tracking-wide">
              DixNova (Driven by Data)
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
        <div className="flex flex-col items-center justify-center max-w-[140px] xs:max-w-[180px] sm:max-w-md mx-auto truncate">
          <div className="flex items-center gap-1.5">
            <Badge variant="default" className="text-[9px] font-mono bg-[#FFFF00] text-[#07111F] px-1.5 py-0 font-extrabold shrink-0">
              {stageNumber}
            </Badge>
            <span className="text-xs font-bold font-display text-white truncate max-w-[100px] xs:max-w-[140px] sm:max-w-[260px]">
              {stageTitle}
            </span>
          </div>

          {/* Slide Progress Dots (hidden on tiny screens for maximum space) */}
          <div className="hidden sm:flex items-center gap-1 mt-1 overflow-x-auto scrollbar-none max-w-[260px] px-1">
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

        {/* Right: Responsive Navigation Controls (Always Visible & Unobscured) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            disabled={currentSlide === 0}
            onClick={onPrev}
            className="h-8 px-2 sm:px-3 text-xs border-white/20 hover:bg-white/10 hover:text-white text-white"
          >
            ‹ Prev
          </Button>

          <span className="text-[10px] font-mono text-[#FFFF00] font-bold">
            {currentSlide + 1}/{totalSlides}
          </span>

          <Button
            variant="default"
            size="sm"
            disabled={currentSlide === totalSlides - 1}
            onClick={onNext}
            className="h-8 px-3 sm:px-4 text-xs bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-extrabold shadow-[0_0_20px_rgba(255,255,0,0.4)]"
          >
            Next ›
          </Button>
        </div>

      </div>
    </div>
  )
}
