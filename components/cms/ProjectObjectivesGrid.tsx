"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

interface ObjectiveNode {
  id: number
  title: string
  subtitle: string
  color: string
  borderColor: string
  bgColor: string
  textColor: string
  badgeColor: string
  glowColor: string
  icon: any
  items: string[]
}

export function ProjectObjectivesGrid() {
  const [activeNode, setActiveNode] = React.useState<number>(0)
  const [hoveredNode, setHoveredNode] = React.useState<number | null>(null)
  const [isAutoCycling, setIsAutoCycling] = React.useState<boolean>(true)

  const nodes: ObjectiveNode[] = [
    {
      id: 0,
      title: "Business Objectives",
      subtitle: "Commercial & Operational Efficiency",
      color: "#f97316", // Orange
      borderColor: "border-orange-500",
      bgColor: "bg-orange-950/40",
      textColor: "text-orange-400",
      badgeColor: "bg-orange-500 text-white",
      glowColor: "shadow-[0_0_25px_rgba(249,115,22,0.5)]",
      icon: Icons.revenue,
      items: [
        "Improve transportation decision-making.",
        "Enhance operational efficiency & fleet dispatch.",
        "Reduce operating costs & revenue leakage."
      ]
    },
    {
      id: 1,
      title: "Analytics Objectives",
      subtitle: "Data Intelligence Engine",
      color: "#10b981", // Teal / Emerald
      borderColor: "border-emerald-500",
      bgColor: "bg-emerald-950/40",
      textColor: "text-emerald-400",
      badgeColor: "bg-emerald-500 text-white",
      glowColor: "shadow-[0_0_25px_rgba(16,185,129,0.5)]",
      icon: Icons.analytics,
      items: [
        "Profile & validate 11,500+ operational records.",
        "Develop governed KPIs and metrics.",
        "Surface actionable passenger demand trends."
      ]
    },
    {
      id: 2,
      title: "Technical Objectives",
      subtitle: "Power BI & Web Platform",
      color: "#eab308", // Gold / Yellow
      borderColor: "border-yellow-500",
      bgColor: "bg-yellow-950/40",
      textColor: "text-yellow-400",
      badgeColor: "bg-yellow-500 text-black font-bold",
      glowColor: "shadow-[0_0_25px_rgba(234,179,8,0.5)]",
      icon: Icons.dashboard,
      items: [
        "Develop interactive Power BI embedded reports.",
        "Build executive decision-support control room.",
        "Present web analytics via SaaS shell."
      ]
    },
    {
      id: 3,
      title: "Strategic Mission",
      subtitle: "State-Wide Transport Impact",
      color: "#06b6d4", // Light Blue / Cyan
      borderColor: "border-cyan-500",
      bgColor: "bg-cyan-950/40",
      textColor: "text-cyan-400",
      badgeColor: "bg-cyan-500 text-white",
      glowColor: "shadow-[0_0_25px_rgba(6,182,212,0.5)]",
      icon: Icons.brain,
      items: [
        "Transform raw data into strategic policy decisions.",
        "Support pilot rollout across Express corridors.",
        "Elevate commuter satisfaction in Lagos State."
      ]
    }
  ]

  // Auto-cycle through the 4 nodes
  React.useEffect(() => {
    if (!isAutoCycling || hoveredNode !== null) return

    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4)
    }, 3200)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredNode])

  const currentHighlight = hoveredNode !== null ? hoveredNode : activeNode

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-card shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-primary text-primary-foreground">
              GOALS & OBJECTIVES
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Team DixNova Strategic Framework
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-foreground tracking-tight pt-1">
            Project Objectives & Strategic Targets
          </h2>
        </div>

        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className="text-xs font-mono px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-surface text-foreground-secondary transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
          <span>{isAutoCycling ? "⏸ Auto-Highlight Active" : "▶ Resume Auto-Highlight"}</span>
        </button>
      </div>

      {/* TARGET & OBJECTIVES CONNECTOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-4 sm:p-6 rounded-3xl border border-surface bg-card/60 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* LEFT COLUMN: 4 OBJECTIVE NODES WITH CONNECTOR STYLES */}
        <div className="lg:col-span-7 space-y-3.5 z-10">
          {nodes.map((node) => {
            const IconComponent = node.icon
            const isHighlighted = currentHighlight === node.id

            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative rounded-2xl border p-4 sm:p-5 transition-all duration-500 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isHighlighted
                    ? `${node.bgColor} ${node.borderColor} ${node.glowColor} scale-[1.02]`
                    : "bg-surface/30 border-surface hover:border-surface/80 opacity-85"
                }`}
              >
                {/* Node Text Content */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-extrabold ${node.textColor}`}>
                      0{node.id + 1}
                    </span>
                    <h3 className={`text-sm sm:text-base font-display font-bold ${isHighlighted ? "text-foreground" : "text-foreground/90"}`}>
                      {node.title}
                    </h3>
                  </div>

                  <ul className="space-y-1 pt-1">
                    {node.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-foreground-secondary flex items-start gap-1.5 leading-snug">
                        <span className={`text-[10px] ${node.textColor}`}>✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Node Icon Badge Tag (Inspired by PowerPoint Template Arrow Tag) */}
                <div className={`shrink-0 px-3.5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md ${node.badgeColor} transition-transform group-hover:scale-105`}>
                  <IconComponent className="h-5 w-5" />
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT COLUMN: 3D BULLSEYE TARGET GRAPHIC WITH POINTER LINES */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-4 min-h-[320px] lg:min-h-[420px]">
          
          {/* Target Graphic Canvas */}
          <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
            
            {/* Concentric Target Circles */}
            <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 bg-rose-500/5 animate-pulse" />
            <div className="absolute inset-4 rounded-full border-4 border-rose-500/30 bg-rose-500/10" />
            <div className="absolute inset-10 rounded-full border-8 border-rose-600 bg-surface shadow-2xl flex items-center justify-center">
              <div className="w-[78%] h-[78%] rounded-full border-8 border-rose-600 bg-rose-500 flex items-center justify-center shadow-inner">
                <div className="w-[55%] h-[55%] rounded-full border-4 border-white bg-rose-700 shadow-2xl flex flex-col items-center justify-center text-white text-center p-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-ping mb-1" />
                  <span className="text-[10px] font-mono font-black tracking-widest uppercase">BULLSEYE</span>
                  <span className="text-[8px] font-bold text-amber-300">TARGET</span>
                </div>
              </div>
            </div>

            {/* SVG Connecting Lines to Current Highlighted Node */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {nodes.map((node) => {
                const isCurrent = currentHighlight === node.id
                const yPos = 20 + node.id * 20
                return (
                  <g key={node.id}>
                    <line
                      x1="0"
                      y1={yPos}
                      x2="50"
                      y2="50"
                      stroke={node.color}
                      strokeWidth={isCurrent ? "2.5" : "1"}
                      strokeOpacity={isCurrent ? "0.9" : "0.25"}
                      strokeDasharray={isCurrent ? "none" : "3,3"}
                      className="transition-all duration-500"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={isCurrent ? "4" : "2"}
                      fill={node.color}
                      className="transition-all duration-500"
                    />
                  </g>
                )
              })}
            </svg>

            {/* Overlay Active Node Badge Info */}
            <div className="absolute -bottom-2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-center shadow-xl">
              <span className="text-[10px] font-mono text-gray-300 font-semibold">
                TARGET FOCUS: <strong className={nodes[currentHighlight].textColor}>{nodes[currentHighlight].title}</strong>
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
