import * as React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { LagosTransitBackdrop } from "@/components/layout/LagosTransitBackdrop"

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#07111F] text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#FFFF00] selection:text-[#07111F]">
      {/* Lagos Urban Mobility Vector Backdrop */}
      <LagosTransitBackdrop />

      {/* Top Bar Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#FFFF00] text-[#07111F] font-black font-display text-base flex items-center justify-center shadow-[0_0_20px_rgba(255,255,0,0.4)]">
            SN
          </div>
          <div>
            <h1 className="text-base font-bold font-display text-white tracking-tight">SmartMove Nigeria</h1>
            <p className="text-xs font-mono text-[#FFFF00] font-semibold">Team DixNova • Group 10</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="text-xs border-white/20 hover:bg-white/10 text-white rounded-xl">
            <Link href="/admin">⚙️ Admin CMS</Link>
          </Button>
          <Button size="sm" asChild className="bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-extrabold text-xs rounded-xl shadow-md">
            <Link href="/presentation">🚀 Start Presentation ↗</Link>
          </Button>
        </div>
      </header>

      {/* Main Keynote Landing Hero */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#162133] border border-[#FFFF00]/40 text-xs font-mono text-[#FFFF00] shadow-2xl">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFFF00] animate-ping" />
          <span>TEAM DIXNOVA • HACKATHON EXECUTIVE SUBMISSION</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white leading-none">
            SmartMove Nigeria <br />
            <span className="text-[#FFFF00]">Analytics Platform</span>
          </h1>

          <p className="text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto font-sans leading-relaxed pt-2">
            An executive presentation deck for Lagos Public Transportation Analytics. Transforming telemetry, corridor routes, and Cowry revenue transactions into policy decision support.
          </p>
        </div>

        {/* Primary Start Presentation Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" asChild className="bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-black text-base px-10 py-7 rounded-2xl shadow-[0_0_50px_rgba(255,255,0,0.35)] hover:scale-105 transition-all">
            <Link href="/presentation">
              🚀 Start Presentation
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild className="text-sm px-8 py-7 rounded-2xl border-white/20 hover:bg-white/10 text-white font-bold">
            <Link href="/p/powerbi-dashboards">
              📊 Power BI Dashboards
            </Link>
          </Button>
        </div>

        {/* Executive Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 text-center">
          <div className="p-4 rounded-2xl bg-[#162133]/80 border border-white/10 backdrop-blur-md space-y-1 shadow-lg">
            <div className="text-2xl sm:text-3xl font-display font-black text-[#FFFF00]">11,500+</div>
            <div className="text-[11px] font-mono text-foreground-secondary">OPERATIONAL RECORDS</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#162133]/80 border border-white/10 backdrop-blur-md space-y-1 shadow-lg">
            <div className="text-2xl sm:text-3xl font-display font-black text-[#FFFF00]">5</div>
            <div className="text-[11px] font-mono text-foreground-secondary">LINKED DATASETS</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#162133]/80 border border-white/10 backdrop-blur-md space-y-1 shadow-lg">
            <div className="text-2xl sm:text-3xl font-display font-black text-[#FFFF00]">20</div>
            <div className="text-[11px] font-mono text-foreground-secondary">KEYNOTE STAGES</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#162133]/80 border border-white/10 backdrop-blur-md space-y-1 shadow-lg">
            <div className="text-2xl sm:text-3xl font-display font-black text-[#FFFF00]">8</div>
            <div className="text-[11px] font-mono text-foreground-secondary">TEAM DIXNOVA LEADS</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-t border-white/10 text-xs font-mono text-foreground-secondary">
        <span>© 2026 SmartMove Nigeria • Team DixNova</span>
        <Link href="/presentation" className="text-[#FFFF00] font-bold hover:underline">
          Launch Presentation ↗
        </Link>
      </footer>
    </div>
  )
}
