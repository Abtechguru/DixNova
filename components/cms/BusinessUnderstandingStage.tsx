"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

interface BusinessModelNode {
  num: string
  title: string
  subtitle: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  glowColor: string
  icon: any
  details: string
}

export function BusinessUnderstandingStage() {
  const [activeNode, setActiveNode] = React.useState<number>(0)
  const [hoveredNode, setHoveredNode] = React.useState<number | null>(null)
  const [isAutoCycling, setIsAutoCycling] = React.useState<boolean>(true)

  const nodes: BusinessModelNode[] = [
    {
      num: "01",
      title: "Commuter Demand Model",
      subtitle: "Passenger Flow & Surge Analytics",
      color: "#00D4FF",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#00D4FF]",
      textColor: "text-[#00D4FF]",
      glowColor: "shadow-[0_0_25px_rgba(0,212,255,0.2)]",
      icon: Icons.users,
      details: "Domain research mapping passenger surges across high-density origin-destination corridors during morning (06:00–09:30) and evening peak hours."
    },
    {
      num: "02",
      title: "BRT Fleet Logistics Model",
      subtitle: "Vehicle Allocation & Route Deployment",
      color: "#FFFF00",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#FFFF00]",
      textColor: "text-[#FFFF00]",
      glowColor: "shadow-[0_0_25px_rgba(255,255,0,0.2)]",
      icon: Icons.fleet,
      details: "Assessing vehicle deployment efficiency across 5 core bus routes to balance fleet availability against passenger queue build-ups."
    },
    {
      num: "03",
      title: "Digital Cowry Farebox Model",
      subtitle: "Ticket Revenue & Electronic Fare Recovery",
      color: "#2ED573",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#2ED573]",
      textColor: "text-[#2ED573]",
      glowColor: "shadow-[0_0_25px_rgba(46,213,115,0.2)]",
      icon: Icons.revenue,
      details: "Analyzing digital payment penetration, ticket transaction logs, and fare recovery yield across urban transport nodes."
    },
    {
      num: "04",
      title: "Dynamic Dispatch & Repair Model",
      subtitle: "Breakdown Logs & Maintenance Schedule",
      color: "#FFC107",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#FFC107]",
      textColor: "text-[#FFC107]",
      glowColor: "shadow-[0_0_25px_rgba(255,193,7,0.2)]",
      icon: Icons.dashboard,
      details: "Tracking vehicle breakdown logs and repair lead times to minimize operational downtime and reduce fleet maintenance costs."
    },
    {
      num: "05",
      title: "Arterial Congestion Model",
      subtitle: "Corridor Speed & Travel Time Fixes",
      color: "#FF5B5B",
      bgColor: "bg-[#162133]",
      borderColor: "border-[#FF5B5B]",
      textColor: "text-[#FF5B5B]",
      glowColor: "shadow-[0_0_25px_rgba(255,91,91,0.2)]",
      icon: Icons.corridors,
      details: "Measuring road speed telemetry, bottleneck locations, and travel delays across Ikeja, Lekki-Epe, and Ikorodu corridors."
    }
  ]

  // Auto-cycle through the 5 nodes
  React.useEffect(() => {
    if (!isAutoCycling || hoveredNode !== null) return

    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 5)
    }, 3800)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredNode])

  const currentHighlight = hoveredNode !== null ? hoveredNode : activeNode
  const activeData = nodes[currentHighlight]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-[#162133]/90 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-[#FFFF00] text-[#07111F]">
              BUSINESS UNDERSTANDING & DOMAIN MODELING
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 06 • 5 Domain Focus Areas
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-white tracking-tight pt-1">
            Urban Transportation Operating Framework
          </h2>
        </div>

        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className="text-xs font-mono px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-surface text-foreground-secondary transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-[#FFFF00] animate-ping" />
          <span>{isAutoCycling ? "⏸ Auto-Cycle Active" : "▶ Resume Auto-Cycle"}</span>
        </button>
      </div>

      {/* 2-COLUMN KEYNOTE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#07111F]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* LEFT COLUMN: 5 DOMAIN NODES */}
        <div className="lg:col-span-7 space-y-3 relative z-10">
          {nodes.map((node, idx) => {
            const IconComp = node.icon
            const isHighlighted = currentHighlight === idx

            return (
              <div
                key={node.num}
                onMouseEnter={() => setHoveredNode(idx)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex items-center justify-between gap-3 ${
                  isHighlighted
                    ? `${node.bgColor} ${node.borderColor} ${node.glowColor} scale-[1.01]`
                    : "bg-[#162133]/60 border-white/10 hover:border-white/30 opacity-85"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-black ${node.textColor}`}>
                    {node.num}
                  </span>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-display font-bold text-white">
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-foreground-secondary font-mono">{node.subtitle}</p>
                  </div>
                </div>

                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${isHighlighted ? "bg-[#FFFF00] text-[#07111F] font-bold shadow-soft" : "bg-surface text-foreground-secondary"}`}>
                  <IconComp className="h-4 w-4" />
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT COLUMN: ACTIVE MODEL DETAILS INSPECTOR */}
        <div className="lg:col-span-5 relative z-10 flex flex-col justify-between">
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 shadow-2xl flex flex-col justify-between h-full ${activeData.bgColor} ${activeData.borderColor} ${activeData.glowColor}`}>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className={`font-mono text-xs font-bold ${activeData.textColor}`}>
                  FOCUS AREA {activeData.num} / 05
                </span>
                <Badge variant="default" className="text-[10px] font-mono bg-[#FFFF00] text-[#07111F] font-bold">
                  DIXNOVA DOMAIN
                </Badge>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
                  {activeData.title}
                </h3>
                <p className={`text-xs font-mono font-semibold ${activeData.textColor}`}>
                  {activeData.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed font-sans pt-2">
                {activeData.details}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-foreground-secondary">
                Interactive Domain Selector
              </span>
              <div className="flex gap-1.5">
                {nodes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveNode(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentHighlight ? "w-5 bg-[#FFFF00]" : "w-2 bg-surface hover:bg-foreground-secondary"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
