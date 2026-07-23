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
      color: "#FFFF00",
      borderColor: "border-[#FFFF00]",
      bgColor: "bg-[#162133]",
      textColor: "text-[#FFFF00]",
      badgeColor: "bg-[#FFFF00] text-[#07111F] font-bold",
      glowColor: "shadow-[0_0_25px_rgba(255,255,0,0.25)]",
      icon: Icons.revenue,
      items: [
        "Improve transportation policy decision-making.",
        "Enhance operational efficiency & fleet dispatch.",
        "Reduce operating costs & revenue leakage."
      ]
    },
    {
      id: 1,
      title: "Analytics Objectives",
      subtitle: "Data Intelligence Engine",
      color: "#2ED573",
      borderColor: "border-[#2ED573]",
      bgColor: "bg-[#162133]",
      textColor: "text-[#2ED573]",
      badgeColor: "bg-[#2ED573] text-[#07111F] font-bold",
      glowColor: "shadow-[0_0_25px_rgba(46,213,115,0.2)]",
      icon: Icons.analytics,
      items: [
        "Profile & validate 11,500+ operational records.",
        "Develop governed KPIs and DAX measures.",
        "Surface actionable passenger demand trends."
      ]
    },
    {
      id: 2,
      title: "Technical Objectives",
      subtitle: "Power BI & Web Platform",
      color: "#00D4FF",
      borderColor: "border-[#00D4FF]",
      bgColor: "bg-[#162133]",
      textColor: "text-[#00D4FF]",
      badgeColor: "bg-[#00D4FF] text-[#07111F] font-bold",
      glowColor: "shadow-[0_0_25px_rgba(0,212,255,0.2)]",
      icon: Icons.dashboard,
      items: [
        "Develop embedded Power BI report packages.",
        "Build executive decision-support control room.",
        "Present web analytics via SaaS shell."
      ]
    },
    {
      id: 3,
      title: "Strategic Mission",
      subtitle: "State-Wide Transport Impact",
      color: "#FFC107",
      borderColor: "border-[#FFC107]",
      bgColor: "bg-[#162133]",
      textColor: "text-[#FFC107]",
      badgeColor: "bg-[#FFC107] text-[#07111F] font-bold",
      glowColor: "shadow-[0_0_25px_rgba(255,193,7,0.2)]",
      icon: Icons.brain,
      items: [
        "Transform raw telemetry into strategic policy decisions.",
        "Support pilot rollout across Express corridors.",
        "Elevate commuter mobility in Lagos State."
      ]
    }
  ]

  // Auto-cycle through the 4 nodes
  React.useEffect(() => {
    if (!isAutoCycling || hoveredNode !== null) return

    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4)
    }, 3800)

    return () => clearInterval(timer)
  }, [isAutoCycling, hoveredNode])

  const currentHighlight = hoveredNode !== null ? hoveredNode : activeNode

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* HEADER CONTROL BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-surface bg-[#162133]/90 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold bg-[#FFFF00] text-[#07111F]">
              GOALS & OBJECTIVES
            </Badge>
            <span className="text-xs text-foreground-secondary font-mono">
              Stage 03 • Strategic Framework
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-display font-extrabold text-white tracking-tight pt-1">
            Strategic Targets & Project Objectives
          </h2>
        </div>

        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className="text-xs font-mono px-3 py-1 rounded-full bg-surface hover:bg-surface/80 border border-surface text-foreground-secondary transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-[#FFFF00] animate-ping" />
          <span>{isAutoCycling ? "⏸ Auto-Highlight Active" : "▶ Resume Auto-Highlight"}</span>
        </button>
      </div>

      {/* OBJECTIVES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#07111F]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* LEFT COLUMN: 4 OBJECTIVE NODES */}
        <div className="lg:col-span-7 space-y-4 relative z-10">
          {nodes.map((node) => {
            const IconComponent = node.icon
            const isHighlighted = currentHighlight === node.id

            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative rounded-3xl border p-5 transition-all duration-500 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isHighlighted
                    ? `${node.bgColor} ${node.borderColor} ${node.glowColor} scale-[1.01]`
                    : "bg-[#162133]/60 border-white/10 hover:border-white/30 opacity-85"
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-extrabold ${node.textColor}`}>
                      0{node.id + 1}
                    </span>
                    <h3 className="text-base font-display font-bold text-white">
                      {node.title}
                    </h3>
                  </div>

                  <ul className="space-y-1 pt-1">
                    {node.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-foreground-secondary flex items-start gap-1.5 leading-relaxed font-sans">
                        <span className={`text-[10px] ${node.textColor}`}>✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`shrink-0 h-10 w-10 rounded-xl flex items-center justify-center shadow-md ${node.badgeColor}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT COLUMN: TARGET BULLSEYE BADGE */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-4 min-h-[300px]">
          <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
            
            <div className="absolute inset-0 rounded-full border-4 border-[#FFFF00]/20 bg-[#FFFF00]/5 animate-pulse" />
            <div className="absolute inset-6 rounded-full border-4 border-[#FFFF00]/30 bg-[#FFFF00]/10" />
            <div className="absolute inset-12 rounded-full border-8 border-[#162133] bg-[#07111F] shadow-2xl flex items-center justify-center">
              <div className="w-[75%] h-[75%] rounded-full border-4 border-[#FFFF00] bg-[#162133] flex flex-col items-center justify-center text-white text-center p-2 shadow-inner">
                <div className="h-2 w-2 rounded-full bg-[#FFFF00] animate-ping mb-1" />
                <span className="text-[10px] font-mono font-black tracking-widest uppercase text-[#FFFF00]">TARGET FOCUS</span>
                <span className="text-[9px] font-bold text-white truncate max-w-[140px]">{nodes[currentHighlight].title}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
