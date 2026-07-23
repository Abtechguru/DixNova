import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { LagosTransitBackdrop } from "@/components/layout/LagosTransitBackdrop"

export default function LandingPage() {
  return (
    <div className="h-screen w-screen max-h-screen max-w-full overflow-hidden bg-[#07111F] text-white flex flex-col justify-between items-center p-6 sm:p-10 relative selection:bg-[#FFFF00] selection:text-[#07111F]">
      {/* Lagos Urban Mobility Vector Backdrop */}
      <LagosTransitBackdrop />

      {/* Top Header Badge */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#FFFF00] text-[#07111F] font-black font-display text-base flex items-center justify-center shadow-[0_0_25px_rgba(255,255,0,0.4)]">
            SN
          </div>
          <div>
            <h1 className="text-base font-bold font-display text-white tracking-tight">SmartMove Nigeria</h1>
            <p className="text-xs font-mono text-[#FFFF00] font-semibold">Team DixNova</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="text-xs border-white/20 hover:bg-white/10 text-white rounded-xl">
            <Link href="/admin">⚙️ Admin CMS</Link>
          </Button>
        </div>
      </header>

      {/* Center Screen Fit Content: Title & Responsive Start Presentation Button */}
      <main className="relative z-10 w-full max-w-3xl text-center space-y-8 my-auto flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#162133]/90 border border-[#FFFF00]/40 text-xs font-mono text-[#FFFF00] shadow-2xl backdrop-blur-md">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFFF00] animate-ping" />
          <span>TEAM DIXNOVA • LAGOS TRANSPORTATION INTELLIGENCE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white leading-tight">
          SmartMove Nigeria <br />
          <span className="text-[#FFFF00]">Analytics Platform</span>
        </h1>

        {/* Responsive Large Start Presentation Button */}
        <div className="pt-2 w-full max-w-md">
          <Button
            size="lg"
            asChild
            className="w-full bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-black font-display text-base sm:text-lg py-7 sm:py-8 rounded-2xl shadow-[0_0_50px_rgba(255,255,0,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Link href="/presentation">
              <span>🚀 Start Presentation</span>
            </Link>
          </Button>
        </div>
      </main>

      {/* Clean Screen Bottom Footer */}
      <footer className="relative z-10 w-full max-w-5xl flex items-center justify-between text-xs font-mono text-foreground-secondary border-t border-white/10 pt-4">
        <span>© 2026 SmartMove Nigeria • Team DixNova</span>
        <span>Lagos Transportation Analytics</span>
      </footer>
    </div>
  )
}
