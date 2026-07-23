"use client"

import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

interface StarTable {
  id: string
  name: string
  type: "FACT" | "DIMENSION"
  pk: string
  fk?: string[]
  attributes: string[]
  color: string
  borderColor: string
  bgColor: string
  textColor: string
}

export function DataModelingStage() {
  const [selectedTable, setSelectedTable] = React.useState<string>("Fact_Telemetry")
  const [activePipelineStep, setActivePipelineStep] = React.useState<number>(0)

  const starTables: StarTable[] = [
    {
      id: "Fact_Telemetry",
      name: "Fact_Telemetry",
      type: "FACT",
      pk: "telemetry_id",
      fk: ["vehicle_id", "corridor_id", "date_key"],
      attributes: ["speed_kmh", "passenger_count", "congestion_score", "delay_min"],
      color: "#FFFF00",
      borderColor: "border-[#FFFF00]",
      bgColor: "bg-[#FFFF00]/10",
      textColor: "text-[#FFFF00]"
    },
    {
      id: "Fact_Revenue",
      name: "Fact_Revenue",
      type: "FACT",
      pk: "transaction_id",
      fk: ["corridor_id", "fare_type_id", "date_key"],
      attributes: ["amount_ngn", "tap_in_time", "tap_out_time", "recovery_pct"],
      color: "#2ED573",
      borderColor: "border-[#2ED573]",
      bgColor: "bg-[#2ED573]/10",
      textColor: "text-[#2ED573]"
    },
    {
      id: "Dim_Corridor",
      name: "Dim_Corridor",
      type: "DIMENSION",
      pk: "corridor_id",
      attributes: ["corridor_name", "origin_hub", "dest_hub", "length_km", "speed_limit"],
      color: "#00D4FF",
      borderColor: "border-[#00D4FF]",
      bgColor: "bg-[#00D4FF]/10",
      textColor: "text-[#00D4FF]"
    },
    {
      id: "Dim_Vehicle",
      name: "Dim_Vehicle",
      type: "DIMENSION",
      pk: "vehicle_id",
      attributes: ["plate_number", "bus_type", "seating_capacity", "depot_location"],
      color: "#00D4FF",
      borderColor: "border-[#00D4FF]",
      bgColor: "bg-[#00D4FF]/10",
      textColor: "text-[#00D4FF]"
    },
    {
      id: "Dim_Payment",
      name: "Dim_Payment",
      type: "DIMENSION",
      pk: "fare_type_id",
      attributes: ["payment_method", "card_issuer", "discount_pct", "channel"],
      color: "#00D4FF",
      borderColor: "border-[#00D4FF]",
      bgColor: "bg-[#00D4FF]/10",
      textColor: "text-[#00D4FF]"
    }
  ]

  const pipelineSteps = [
    { title: "Raw Ingestion", subtitle: "GPS & Tap-In Feeds" },
    { title: "Fact & Dim Star Schema", subtitle: "Dimensional Data Model" },
    { title: "Power BI Engine", subtitle: "Tabular In-Memory Model" },
    { title: "Governed DAX Measures", subtitle: "Calculated Transport KPIs" },
    { title: "Executive Decision Insights", subtitle: "LAMATA Policy Actions" }
  ]

  // Pipeline Step Auto Cycle
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActivePipelineStep(prev => (prev + 1) % pipelineSteps.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [pipelineSteps.length])

  const currentTable = starTables.find(t => t.id === selectedTable) || starTables[0]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* 3-COLUMN ENTERPRISE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* LEFT COLUMN: INTERACTIVE STAR SCHEMA DIAGRAM */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#162133]/90 border border-surface shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-surface/60 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-[10px] font-mono bg-[#FFFF00] text-[#07111F] font-black">
                  STAR SCHEMA MODEL
                </Badge>
                <span className="text-xs text-foreground-secondary font-mono">5 Model Entities</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Click Entity to Inspect</span>
            </div>

            {/* Interactive Schema Node Selector Grid */}
            <div className="grid grid-cols-1 gap-2.5 pt-3">
              {starTables.map((t) => {
                const isSelected = selectedTable === t.id
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTable(t.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? `${t.bgColor} ${t.borderColor} shadow-[0_0_15px_rgba(255,255,0,0.25)] scale-[1.01]`
                        : "bg-surface/30 border-surface/40 hover:border-surface hover:bg-surface/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${t.type === "FACT" ? "bg-[#FFFF00] text-[#07111F]" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"}`}>
                        {t.type}
                      </span>
                      <h4 className="text-xs font-bold font-display text-white">{t.name}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-foreground-secondary">
                      PK: {t.pk}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Active Entity Schema Inspector Card */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-surface/60 space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className={`text-xs font-mono font-bold ${currentTable.textColor}`}>
                Inspect Attributes: {currentTable.name}
              </span>
              <span className="text-[10px] font-mono text-gray-400">MongoDB / Tabular</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] font-mono bg-[#FFFF00]/20 text-[#FFFF00] px-2 py-0.5 rounded border border-[#FFFF00]/30 font-bold">
                🔑 {currentTable.pk} (PK)
              </span>
              {currentTable.fk?.map((fk, idx) => (
                <span key={idx} className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  🔗 {fk} (FK)
                </span>
              ))}
              {currentTable.attributes.map((attr, idx) => (
                <span key={idx} className="text-[10px] font-mono bg-white/10 text-gray-200 px-2 py-0.5 rounded">
                  {attr}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* CENTER COLUMN: RELATIONSHIP FLOW ANIMATION */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#162133]/90 border border-surface shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-surface/60 pb-3">
              <h3 className="text-xs font-bold font-display text-white flex items-center gap-2">
                <Icons.projects className="h-4 w-4 text-[#FFFF00]" />
                <span>Relationship Data Flow Pipeline</span>
              </h3>
              <Badge variant="outline" className="text-[9px] font-mono text-[#FFFF00] border-[#FFFF00]/40">
                1-to-Many Relationships
              </Badge>
            </div>

            {/* Pipeline Stage Steps */}
            <div className="space-y-2 pt-3">
              {pipelineSteps.map((step, idx) => {
                const isActive = activePipelineStep === idx
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-[#FFFF00]/10 border-[#FFFF00] shadow-[0_0_20px_rgba(255,255,0,0.2)]"
                        : "bg-surface/20 border-surface/40 opacity-75"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${isActive ? "bg-[#FFFF00] text-[#07111F]" : "bg-surface text-gray-400"}`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{step.title}</h4>
                        <p className="text-[10px] text-foreground-secondary font-mono">{step.subtitle}</p>
                      </div>
                    </div>

                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[#FFFF00] animate-ping" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface/30 border border-surface/50 text-center">
            <span className="text-[11px] font-mono text-foreground-secondary block">
              Star Schema Relationship Integrity: <strong className="text-emerald-400">100% Enforced</strong>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: EXECUTIVE BUSINESS BENEFITS */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-[#162133]/90 border border-surface shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-surface/60 pb-3">
              <h3 className="text-xs font-bold font-display text-white flex items-center gap-2">
                <Icons.objectives className="h-4 w-4 text-cyan-400" />
                <span>Business Value Benefits</span>
              </h3>
              <p className="text-[11px] text-foreground-secondary">Why Star Schema Data Modeling Matters</p>
            </div>

            <div className="space-y-3 pt-3">
              <div className="p-3 rounded-xl bg-surface/30 border border-surface/50 space-y-1">
                <h4 className="text-xs font-bold text-[#FFFF00]">Unified Single Source of Truth</h4>
                <p className="text-[11px] text-foreground-secondary leading-snug">
                  Connects fragmented Cowry fare transactions, GPS telemetry, and maintenance records into one canonical data model.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface/30 border border-surface/50 space-y-1">
                <h4 className="text-xs font-bold text-cyan-400">Sub-Second DAX Querying</h4>
                <p className="text-[11px] text-foreground-secondary leading-snug">
                  Star schema indexing delivers instantaneous filter slicing across Lagos corridors, vehicle types, and payment channels.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface/30 border border-surface/50 space-y-1">
                <h4 className="text-xs font-bold text-emerald-400">Governed DAX Measures</h4>
                <p className="text-[11px] text-foreground-secondary leading-snug">
                  Eliminates formula drift by standardizing farebox recovery, speed drops, and congestion index DAX measures.
                </p>
              </div>
            </div>
          </div>

          <Badge variant="outline" className="text-[10px] font-mono text-center justify-center py-1.5 border-cyan-400/40 text-cyan-300">
            ⚡ ENTERPRISE DATA ARCHITECTURE
          </Badge>
        </div>

      </div>

      {/* BOTTOM EXECUTIVE TAKEAWAY BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#162133] via-surface to-[#162133] border border-[#FFFF00]/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#FFFF00]/10 border border-[#FFFF00]/30 flex items-center justify-center text-[#FFFF00] shrink-0">
            <Icons.sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold font-display text-white">
              Executive Architectural Takeaway
            </h4>
            <p className="text-xs text-foreground-secondary">
              The star-schema dimensional model bridges raw operational data feeds with executive decision-making, guaranteeing reliable Power BI calculations for LAMATA transport policy.
            </p>
          </div>
        </div>

        <Badge variant="default" className="text-[10px] font-mono bg-[#FFFF00] text-[#07111F] font-bold shrink-0 self-end sm:self-auto">
          STAGE 10 • DATA MODELING
        </Badge>
      </div>

    </div>
  )
}
