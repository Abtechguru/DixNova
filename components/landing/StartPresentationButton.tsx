"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/lib/utils/icons"

export function StartPresentationButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = React.useState(false)
  const [isExpanding, setIsExpanding] = React.useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsExpanding(true)
    setTimeout(() => {
      router.push("/presentation")
    }, 450)
  }

  return (
    <div className="relative flex items-center justify-center py-4">
      {/* Background Animated Floating Bubbles on Hover */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute h-36 w-36 rounded-full bg-primary/20 animate-ping" />
        <div className="absolute h-48 w-48 rounded-full bg-primary/10 blur-xl animate-pulse" />
        
        {/* Floating Bubble Particles */}
        <span className="absolute -top-6 -left-6 h-4 w-4 rounded-full bg-primary/60 animate-bounce" style={{ animationDuration: "1.2s" }} />
        <span className="absolute -bottom-4 -right-6 h-5 w-5 rounded-full bg-primary/50 animate-bounce" style={{ animationDuration: "1.6s" }} />
        <span className="absolute -top-4 -right-8 h-3 w-3 rounded-full bg-primary/40 animate-bounce" style={{ animationDuration: "1.4s" }} />
        <span className="absolute -bottom-6 -left-4 h-4 w-4 rounded-full bg-primary/70 animate-bounce" style={{ animationDuration: "1.8s" }} />
      </div>

      {/* Expanding Transition Bubble Effect on Click */}
      {isExpanding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="h-20 w-20 rounded-full bg-primary animate-[expand_0.5s_ease-out_forwards]" />
        </div>
      )}

      {/* Main Interactive Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 px-12 py-6 text-xl font-bold rounded-full shadow-2xl bg-primary text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_50px_rgba(250,204,21,0.6)] flex items-center gap-3 cursor-pointer group"
      >
        <span>Start Presentation</span>
        <Icons.chevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
      </button>

      <style jsx global>{`
        @keyframes expand {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(50);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
