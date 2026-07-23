"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { LagosTransitBackdrop } from "@/components/layout/LagosTransitBackdrop"
import { FloatingPresentationController } from "@/components/layout/FloatingPresentationController"

import type { TeamMemberItem, TeamMembersGridProps } from "@/components/cms/TeamMembersGrid"

// Lazy loaded presentation stage components for code splitting & initial load performance
const ProblemStatement5Ws = dynamic(() => import("@/components/cms/ProblemStatement5Ws").then(m => m.ProblemStatement5Ws as any))
const TeamMembersGrid = dynamic<TeamMembersGridProps>(() => import("@/components/cms/TeamMembersGrid").then(m => m.TeamMembersGrid as any))
const ProjectObjectivesGrid = dynamic(() => import("@/components/cms/ProjectObjectivesGrid").then(m => m.ProjectObjectivesGrid as any))
const AnalyticsMaturityJourney = dynamic(() => import("@/components/cms/AnalyticsMaturityJourney").then(m => m.AnalyticsMaturityJourney as any))
const BiggerRealityVideoStage = dynamic(() => import("@/components/cms/BiggerRealityVideoStage").then(m => m.BiggerRealityVideoStage as any))
const PresentationPowerBiStage = dynamic(() => import("@/components/cms/PresentationPowerBiStage").then(m => m.PresentationPowerBiStage as any))
const ExecutiveSummaryStage = dynamic(() => import("@/components/cms/ExecutiveSummaryStage").then(m => m.ExecutiveSummaryStage as any))
const BusinessUnderstandingStage = dynamic(() => import("@/components/cms/BusinessUnderstandingStage").then(m => m.BusinessUnderstandingStage as any))
const DataUnderstandingStage = dynamic(() => import("@/components/cms/DataUnderstandingStage").then(m => m.DataUnderstandingStage as any))
const DataCleaningStage = dynamic(() => import("@/components/cms/DataCleaningStage").then(m => m.DataCleaningStage as any))
const DataPreparationStage = dynamic(() => import("@/components/cms/DataPreparationStage").then(m => m.DataPreparationStage as any))
const DataModelingStage = dynamic(() => import("@/components/cms/DataModelingStage").then(m => m.DataModelingStage as any))

interface Slide {
  stage: string
  title: string
  subtitle: string
  content: React.ReactNode
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [dbMembers, setDbMembers] = React.useState<TeamMemberItem[]>([])

  const fetchMembers = React.useCallback(() => {
    fetch("/api/cms/team-members")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setDbMembers(res.data)
        }
      })
      .catch(() => {})
  }, [])

  React.useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  React.useEffect(() => {
    if (currentSlide === 18) { // STAGE 19 (index 18)
      fetchMembers()
    }
  }, [currentSlide, fetchMembers])

  // Keyboard navigation support (Left/Right arrows, PageUp/PageDown, Home/End)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setCurrentSlide(prev => Math.min(20 - 1, prev + 1))
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setCurrentSlide(prev => Math.max(0, prev - 1))
      } else if (e.key === "Home") {
        setCurrentSlide(0)
      } else if (e.key === "End") {
        setCurrentSlide(19)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const slides: Slide[] = [
    // 1. Opening Story
    {
      stage: "STAGE 01",
      title: "Opening Story",
      subtitle: "The Bigger Reality • Lagos Public Transportation System",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <BiggerRealityVideoStage />
        </div>
      )
    },

    // 2. Executive Summary
    {
      stage: "STAGE 02",
      title: "Executive Summary Audit",
      subtitle: "Team DixNova Power BI Verified Submission (2022–2024)",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <ExecutiveSummaryStage />
        </div>
      )
    },

    // 3. Problem Statement
    {
      stage: "STAGE 03",
      title: "Problem Statement Framework",
      subtitle: "5 Ws Problem Framing & Operational Pain Points",
      content: (
        <div className="max-w-5xl mx-auto">
          <ProblemStatement5Ws />
        </div>
      )
    },

    // 4. Objectives
    {
      stage: "STAGE 04",
      title: "Project Objectives",
      subtitle: "Business, Analytics, Technical, and Strategic Targets",
      content: (
        <div className="max-w-5xl mx-auto">
          <ProjectObjectivesGrid />
        </div>
      )
    },

    // 5. ⭐ Analytics Maturity Journey ⭐
    {
      stage: "STAGE 05",
      title: "Analytics Maturity Journey",
      subtitle: "The 10-Stage End-to-End Transportation Analytics Lifecycle",
      content: (
        <div className="max-w-5xl mx-auto">
          <AnalyticsMaturityJourney />
        </div>
      )
    },

    // 6. Business Understanding
    {
      stage: "STAGE 06",
      title: "Business Understanding",
      subtitle: "Lagos BRT Domain Research & Stakeholder Mapping",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <BusinessUnderstandingStage />
        </div>
      )
    },

    // 7. Data Understanding
    {
      stage: "STAGE 07",
      title: "Data Understanding",
      subtitle: "Exploratory Telemetry Assessment across 11,500+ Records",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <DataUnderstandingStage />
        </div>
      )
    },

    // 8. Data Cleaning
    {
      stage: "STAGE 08",
      title: "Data Cleaning & Quality",
      subtitle: "Data Quality Scorecard Rules & 94.8% Completeness Audit",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <DataCleaningStage />
        </div>
      )
    },

    // 9. Data Preparation
    {
      stage: "STAGE 09",
      title: "Data Preparation",
      subtitle: "Transformation, Normalization & Power Query Engineering",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <DataPreparationStage />
        </div>
      )
    },

    // 10. Data Modeling
    {
      stage: "STAGE 10",
      title: "Data Modeling",
      subtitle: "Star-Schema Relational Architecture in Power BI",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <DataModelingStage />
        </div>
      )
    },

    // 11. Authoritative Power BI Dashboards
    {
      stage: "STAGE 11",
      title: "Power BI Control Room",
      subtitle: "Authoritative Interactive Submission & Slicers Engine",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <PresentationPowerBiStage />
        </div>
      )
    },

    // 12. Governed DAX Metrics & KPIs
    {
      stage: "STAGE 12",
      title: "Governed DAX Metrics & KPIs",
      subtitle: "DAX Formulated Telemetry Metrics (Power BI Evidence)",
      content: (
        <div className="w-full max-w-5xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#162133] border border-emerald-500/30 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">DAX MEASURE 01</Badge>
              <h4 className="text-sm font-bold text-white">Fleet Availability Rate</h4>
              <div className="text-2xl font-black font-display text-emerald-400">81.0%</div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                <code className="text-[#FFFF00] font-mono text-[10px]">DIVIDE(ActiveBuses, TotalFleet)</code>: 323 active out of 400 buses deployable.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#162133] border border-rose-500/30 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">DAX MEASURE 02</Badge>
              <h4 className="text-sm font-bold text-white">Net Operating Deficit</h4>
              <div className="text-2xl font-black font-display text-rose-400">₦89.2 Million</div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                <code className="text-[#FFFF00] font-mono text-[10px]">SUM(MaintenanceCost) - SUM(TicketRevenue)</code>: ₦159.8M cost vs ₦70.6M revenue.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#162133] border border-sky-500/30 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">DAX MEASURE 03</Badge>
              <h4 className="text-sm font-bold text-white">Worst Dispatch Delay</h4>
              <div className="text-2xl font-black font-display text-sky-400">19.0 Mins</div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                <code className="text-[#FFFF00] font-mono text-[10px]">MAX(DispatchDelayMin)</code>: Epe - Berger depot dispatch delay (fixable this week).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#162133] border border-purple-500/30 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">DAX MEASURE 04</Badge>
              <h4 className="text-sm font-bold text-white">Passenger Volume</h4>
              <div className="text-2xl font-black font-display text-purple-400">131,000+</div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                <code className="text-[#FFFF00] font-mono text-[10px]">SUM(BoardingCount)</code>: Verified 3-year commuter volume (2022–2024).
              </p>
            </div>
          </div>
        </div>
      )
    },

    // 13. Diagnostic Insights
    {
      stage: "STAGE 13",
      title: "Analyst Diagnostic Findings",
      subtitle: "3-Question Executive Storytelling (What, Why, Action)",
      content: (
        <div className="w-full max-w-5xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#162133] border border-white/10 space-y-3">
              <div className="text-xs font-mono font-bold text-[#FFFF00] uppercase">📌 WHAT HAPPENED? (DESCRIPTIVE)</div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                SmartMove operates 400 buses carrying 131,000+ passengers. Ticket revenue (₦70.6M) peaked in 2022 and has declined while maintenance costs escalated to ₦159.8M.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#162133] border border-white/10 space-y-3">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">🔍 WHY DID IT HAPPEN? (DIAGNOSTIC)</div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Every single one of the top 5 busiest routes operates at a net loss. Surulere-Oshodi and Apapa-Lekki both peak at 7am while Yaba-Epe peaks at 9pm — fleet deployment was un-staggered.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#162133] border border-white/10 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">🚀 WHAT SHOULD MANAGEMENT DO?</div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Stagger fleet deployment across complementary peak hours, fix the 19-minute depot dispatch delay on Epe-Berger, and enforce preventive maintenance to curb ₦159.8M costs.
              </p>
            </div>
          </div>
        </div>
      )
    },

    // 14. Actionable Proposals
    {
      stage: "STAGE 14",
      title: "Actionable Policy Proposals",
      subtitle: "Prioritized Executive Decision Support Cards",
      content: (
        <div className="w-full max-w-5xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#162133] border border-emerald-500/30 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">ACTION 01</Badge>
              <h4 className="text-sm font-bold text-white">Staggered Fleet Re-allocation</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Reallocate buses between 7am peak routes (Surulere & Apapa) and 9pm peak routes (Yaba-Epe) to maximize 81% fleet availability without acquiring new buses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#162133] border border-sky-500/30 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">ACTION 02</Badge>
              <h4 className="text-sm font-bold text-white">Fix Epe-Berger Dispatch Delays</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Eliminate the 19-minute depot dispatch delay on Epe-Berger this week by restructuring morning driver check-in routines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#162133] border border-amber-500/30 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">ACTION 03</Badge>
              <h4 className="text-sm font-bold text-white">Preventive Maintenance Schedule</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Implement structured 5,000 km servicing to curtail ₦159.8M maintenance costs and return 30+ breakdown buses to active revenue service.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#162133] border border-purple-500/30 space-y-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">ACTION 04</Badge>
              <h4 className="text-sm font-bold text-white">Depot Cost Governance</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Establish strict per-depot cost monitoring (starting with Oshodi Depot running 88 buses) to track repair drivers and evaluate service providers.
              </p>
            </div>
          </div>
        </div>
      )
    },

    // 15. Business Impact & ROI
    {
      stage: "STAGE 15",
      title: "Business Impact & ROI",
      subtitle: "Return on Investment & Operational Efficiency",
      content: (
        <div className="w-full max-w-5xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-6 rounded-2xl bg-[#162133] border border-emerald-500/30 space-y-2">
              <div className="text-3xl font-black font-display text-emerald-400">₦89.2 Million</div>
              <h4 className="text-xs font-bold text-white uppercase font-mono">Potential Loss Reduction</h4>
              <p className="text-xs text-gray-300 leading-relaxed">By controlling maintenance cost drivers and repairing 25 out-of-service buses.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#162133] border border-sky-500/30 space-y-2">
              <div className="text-3xl font-black font-display text-sky-400">19 Mins</div>
              <h4 className="text-xs font-bold text-white uppercase font-mono">Delay Elimination</h4>
              <p className="text-xs text-gray-300 leading-relaxed">Resolving depot dispatch lag on the Epe-Berger corridor.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#162133] border border-[#FFFF00]/30 space-y-2">
              <div className="text-3xl font-black font-display text-[#FFFF00]">22%</div>
              <div className="text-xs font-bold text-white uppercase font-mono">Capacity Optimization</div>
              <p className="text-xs text-gray-300 leading-relaxed">Staggered fleet reallocation across peak corridors.</p>
            </div>
          </div>
        </div>
      )
    },

    // 16. Executive Presentation Shell
    {
      stage: "STAGE 16",
      title: "Executive Presentation Platform",
      subtitle: "The Presentation Layer Showcase Built for Power BI",
      content: (
        <div className="p-6 border border-white/10 rounded-3xl bg-[#162133] space-y-3 max-w-2xl mx-auto text-center shadow-2xl">
          <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">PRESENTATION LAYER</Badge>
          <h4 className="font-bold font-display text-lg text-white">Narrator Shell for Authoritative Power BI Report</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            This platform acts as the executive presenter layer that communicates business problem, analytics journey, and prescriptive recommendations, while Power BI remains the authoritative evidence source.
          </p>
        </div>
      )
    },

    // 17. Platform Demo & Workspace
    {
      stage: "STAGE 17",
      title: "Platform Demo & Admin Workspace",
      subtitle: "Live Workspace & Power BI Control Room",
      content: (
        <div className="p-6 border border-white/10 rounded-3xl bg-[#162133] space-y-4 max-w-2xl mx-auto text-center shadow-2xl">
          <h4 className="font-bold font-display text-lg text-[#FFFF00]">Live Interactive Workspace</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Access live Power BI embeds, dataset quality scorecards, and high-contrast admin CMS.
          </p>
          <Button size="sm" asChild className="bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-bold text-xs">
            <Link href="/admin">Launch Admin Workspace ↗</Link>
          </Button>
        </div>
      )
    },

    // 18. Future Roadmap
    {
      stage: "STAGE 18",
      title: "Future Strategic Roadmap",
      subtitle: "Phase 3 Nationwide Transport Authority Expansion",
      content: (
        <div className="p-6 border border-white/10 rounded-3xl bg-[#162133] space-y-3 max-w-2xl mx-auto text-center shadow-2xl">
          <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">PHASE 3 EXPANSION</Badge>
          <h4 className="font-bold font-display text-base text-white">Nationwide Intermodal Terminal Rollout</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Scaling Power BI star schemas across inter-state BRT corridors, Lagos Rail Mass Transit (LRMT), and ferry terminals.
          </p>
        </div>
      )
    },

    // 19. Team DixNova
    {
      stage: "STAGE 19",
      title: "Team DixNova",
      subtitle: "Driven by Data • National Analytics Hackathon Submission",
      content: (
        <div className="max-w-5xl mx-auto">
          <TeamMembersGrid members={dbMembers} />
        </div>
      )
    },

    // 20. Questions & Answers
    {
      stage: "STAGE 20",
      title: "Questions & Answers",
      subtitle: "Thank You Judges & Transport Authorities",
      content: (
        <div className="p-8 border border-white/10 rounded-3xl bg-[#162133] text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
          <h3 className="text-2xl font-bold font-display text-[#FFFF00]">Open for Judge Q&A</h3>
          <p className="text-xs text-gray-300 leading-relaxed max-w-md mx-auto">
            Thank you for evaluating Team DixNova&apos;s submission for the SmartMove Nigeria Transportation Intelligence Audit.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button size="sm" asChild className="bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-bold text-xs">
              <Link href="/">Return to DixNova Home</Link>
            </Button>
          </div>
        </div>
      )
    }
  ]

  const slide = slides[currentSlide]

  return (
    <div className="h-screen max-h-screen w-full max-w-full overflow-hidden bg-[#07111F] text-foreground flex flex-col justify-between p-2 sm:p-4 space-y-2 relative selection:bg-[#FFFF00] selection:text-[#07111F]">
      {/* Lagos Urban Mobility Vector Backdrop */}
      <LagosTransitBackdrop />

      {/* Main Slide Content Card */}
      <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto py-1 pb-20 sm:pb-24 w-full max-w-7xl mx-auto scrollbar-none relative z-10">
        {currentSlide !== 0 && (
          <div className="text-center py-2.5 px-6 bg-[#162133]/90 backdrop-blur-xl border border-white/10 rounded-3xl flex-none mb-3 w-full max-w-4xl space-y-0.5 shadow-2xl">
            <h1 className="text-base sm:text-xl md:text-2xl font-display font-extrabold text-white tracking-tight">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-xs font-mono text-foreground-secondary truncate">{slide.subtitle}</p>
            )}
          </div>
        )}

        <div className="w-full my-auto">
          {slide.content}
        </div>
      </div>

      {/* Floating Executive Presentation Navigation Controller */}
      <FloatingPresentationController
        currentSlide={currentSlide}
        totalSlides={slides.length}
        stageTitle={slide.title}
        stageNumber={slide.stage}
        onPrev={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
        onNext={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
        onSelectSlide={(idx) => setCurrentSlide(idx)}
      />
    </div>
  )
}
