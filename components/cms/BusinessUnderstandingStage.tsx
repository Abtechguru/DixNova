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
  align: "left" | "right"
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
      color: "#2563eb", // Navy Blue
      bgColor: "bg-blue-950/60",
      borderColor: "border-blue-500",
      textColor: "text-blue-400",
      glowColor: "shadow-[0_0_30px_rgba(37,99,235,0.6)]",
      icon: Icons.users,
      details: "Domain research mapping passenger surges across high-density origin-destination corridors during morning (06:00–09:30) and evening peak hours.",
      align: "left"
    },
    {
      num: "02",
      title: "BRT Fleet Logistics Model",
      subtitle: "Vehicle Allocation & Route Deployment",
      color: "#0284c7", // Sky Blue
      bgColor: "bg-sky-950/60",
      borderColor: "border-sky-500",
      textColor: "text-sky-400",
      glowColor: "shadow-[0_0_30px_rgba(2,132,199,0.6)]",
      icon: Icons.fleet,
      details: "Assessing vehicle deployment efficiency across 5 core bus routes to balance fleet availability against passenger queue build-ups.",
      align: "right"
    },
    {
      num: "03",
      title: "Digital Cowry Farebox Model",
      subtitle: "Ticket Revenue & Electronic Fare Recovery",
      color: "#0d9488", // Teal
      bgColor: "bg-teal-950/60",
      borderColor: "border-teal-500",
      textColor: "text-teal-400",
      glowColor: "shadow-[0_0_30px_rgba(13,148,136,0.6)]",
      icon: Icons.revenue,
      details: "Analyzing digital payment penetration, ticket transaction logs, and fare recovery yield across urban transport nodes.",
      align: "left"
    },
    {
      num: "04",
      title: "Dynamic Dispatch & Repair Model",
      subtitle: "Breakdown Logs & Maintenance Schedule",
      color: "#d97706", // Amber / Gold
      bgColor: "bg-amber-950/60",
      borderColor: "border-amber-500",
      textColor: "text-amber-400",
      glowColor: "shadow-[0_0_30px_rgba(217,119,6,0.6)]",
      icon: Icons.dashboard,
      details: "Tracking vehicle breakdown logs and repair lead times to minimize operational downtime and reduce fleet maintenance costs.",
      align: "right"
    },
    {
      num: "05",
      title: "Arterial Congestion Model",
      subtitle: "Corridor Speed & Travel Time Fixes",
      color: "#dc2626", // Crimson Red
      bgColor: "bg-rose-950/60",
      borderColor: "border-rose-500",
      textColor: "text-rose-400",
      glowColor: "shadow-[0_0_30px_rgba(220,38,38,0.6)]",
      icon: Icons.corridors,
      details: "Measuring road speed telemetry, bottleneck locations, and travel delays across Ikeja, Lekki-Epe, and Ikorodu corridors.",
      align: "left"
    }
  ]

  // Auto-cycle through the 5 honeycomb nodes
  React.useEffect(() => {
    if (!isAutoCycling || hoveredNode !== null) return

    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 5)
    }, 3500)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredNode])

  const currentHighlight = hoveredNode !== null ? hoveredNode : activeNode
  const activeData = nodes[currentHighlight]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-card shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-primary text-primary-foreground">
              DOMAIN RESEARCH & STAKEHOLDER MAPPING
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 06 Presentation Template
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-foreground tracking-tight pt-1">
            ON-DEMAND TRANSPORTATION BUSINESS MODEL
          </h2>
        </div>

        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className="text-xs font-mono px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-surface text-foreground-secondary transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
          <span>{isAutoCycling ? "⏸ Auto-Cycle Active" : "▶ Resume Auto-Cycle"}</span>
        </button>
      </div>

      {/* HONEYCOMB HEXAGON CLUSTER CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-4 sm:p-8 rounded-3xl border border-white/20 bg-black/70 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Background Image Backdrop */}
        <img
          src="/dix0.jpeg"
          alt="Business Understanding Backdrop"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.25] scale-105 transform-gpu -z-10 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 -z-10" />

        {/* LEFT COLUMN: INTERLOCKING HONEYCOMB HEXAGON NODES WITH RIBBON BANNERS */}
        <div className="lg:col-span-7 space-y-3 relative z-10">
          {nodes.map((node, idx) => {
            const IconComp = node.icon
            const isHighlighted = currentHighlight === idx

            return (
              <div
                key={node.num}
                onMouseEnter={() => setHoveredNode(idx)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative flex items-center gap-3 transition-all duration-500 cursor-pointer ${
                  node.align === "right" ? "sm:pl-10" : "sm:pr-10"
                }`}
              >
                {/* Number Indicator */}
                <span className={`font-mono text-xs font-black tracking-widest ${node.textColor} w-6`}>
                  {node.num}
                </span>

                {/* Ribbon Banner Bar */}
                <div
                  className={`flex-1 p-3 sm:p-3.5 rounded-2xl border transition-all duration-500 flex items-center justify-between gap-3 ${
                    isHighlighted
                      ? `${node.bgColor} ${node.borderColor} ${node.glowColor} scale-[1.02]`
                      : "bg-surface/30 border-surface hover:border-surface/80 opacity-80"
                  }`}
                >
                  <div className="space-y-0.5">
                    <h3 className={`text-xs sm:text-sm font-display font-extrabold ${isHighlighted ? "text-foreground" : "text-foreground/90"}`}>
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-foreground-secondary font-mono">{node.subtitle}</p>
                  </div>

                  {/* Hexagon Icon Badge */}
                  <div
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    className={`h-10 w-10 shrink-0 flex items-center justify-center transition-transform duration-500 shadow-md ${
                      isHighlighted ? "bg-primary text-primary-foreground scale-110" : "bg-surface text-foreground-secondary"
                    }`}
                  >
                    <IconComp className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT COLUMN: ACTIVE MODEL DETAILS CARD */}
        <div className="lg:col-span-5 relative z-10 h-full flex flex-col justify-between space-y-4">
          
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 shadow-2xl flex flex-col justify-between h-full min-h-[340px] ${activeData.bgColor} ${activeData.borderColor} ${activeData.glowColor}`}>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-sm font-black ${activeData.textColor}`}>
                    MODEL {activeData.num} / 05
                  </span>
                </div>
                <Badge variant="default" className="text-[10px] font-mono uppercase bg-primary text-primary-foreground">
                  DIXNOVA DOMAIN
                </Badge>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-foreground">
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

            {/* Model Footer Navigation Indicator */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-foreground-secondary">
                Selected Node Focus
              </span>
              <div className="flex gap-1.5">
                {nodes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveNode(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentHighlight ? "w-5 bg-primary" : "w-2 bg-surface hover:bg-foreground-secondary"
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
