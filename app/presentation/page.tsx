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
      subtitle: "The Bigger Reality",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <BiggerRealityVideoStage />
        </div>
      )
    },

    // 2. Executive Summary
    {
      stage: "STAGE 02",
      title: "Executive Summary",
      subtitle: "Group 10 Hackathon Submission | Data Coverage: Jan 2022 – Dec 2024",
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
      subtitle: "5 Ws Problem Statement Template",
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
      title: "⭐ Analytics Maturity Journey ⭐",
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
      subtitle: "Domain Research & Stakeholder Mapping",
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
      subtitle: "Exploratory Telemetry Data Assessment",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <DataUnderstandingStage />
        </div>
      )
    },

    // 8. Data Cleaning
    {
      stage: "STAGE 08",
      title: "Data Cleaning",
      subtitle: "Data Quality Scorecard Rules & Filtering",
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
      subtitle: "Transformation, Normalization & Feature Engineering",
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
      subtitle: "Star-Schema Architecture",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <DataModelingStage />
        </div>
      )
    },

    // 11. Power BI Dashboards
    {
      stage: "STAGE 11",
      title: "Power BI Dashboards",
      subtitle: "Embedded Interactive Intelligence Control Room",
      content: (
        <div className="w-full max-w-5xl mx-auto">
          <PresentationPowerBiStage />
        </div>
      )
    },

    // 12. KPIs
    {
      stage: "STAGE 12",
      title: "KPIs",
      subtitle: "Governed Operational Metrics",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-card space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold text-primary font-display text-sm">Reference KPI Metadata</h4>
          <p className="text-xs text-foreground-secondary">
            Governed metric formulas and target values defined by Team DixNova analysts.
          </p>
        </div>
      )
    },

    // 13. Insights
    {
      stage: "STAGE 13",
      title: "Insights",
      subtitle: "Analyst-Authored Data Findings",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-card space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold text-primary font-display text-sm">Analyst Findings Repository</h4>
          <p className="text-xs text-foreground-secondary">
            Synthesized transport insights linking corridor congestion events with passenger volume spikes.
          </p>
        </div>
      )
    },

    // 14. Recommendations
    {
      stage: "STAGE 14",
      title: "Recommendations",
      subtitle: "Actionable Strategic Proposals",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-surface/30 space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold font-display text-emerald-500 text-sm">Fleet Dispatch & Intermodal Recommendations</h4>
          <p className="text-xs text-foreground-secondary">Prioritized action cards detailing implementation cost, timeline, and ROI.</p>
        </div>
      )
    },

    // 15. Business Impact
    {
      stage: "STAGE 15",
      title: "Business Impact",
      subtitle: "Return on Investment & Commuter Relief",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-card space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold text-primary font-display text-sm">Yield Growth & Operational Speed</h4>
          <p className="text-xs text-foreground-secondary">Measuring digital fare recovery and commuter delay reduction.</p>
        </div>
      )
    },

    // 16. Introducing SmartMove Platform
    {
      stage: "STAGE 16",
      title: "Introducing SmartMove Platform",
      subtitle: "The Multi-Tenant SaaS Decision Support System",
      content: (
        <div className="p-6 border border-surface rounded-2xl bg-card space-y-3 max-w-xl mx-auto text-center">
          <Badge variant="default" className="text-[10px] uppercase font-mono">SAAS GATEWAY</Badge>
          <h4 className="font-bold font-display text-base text-foreground">Governed SaaS Platform Shell</h4>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            Multi-tenant architecture supporting state ministries, BRT fleet operators, and analytics managers with RBAC security.
          </p>
        </div>
      )
    },

    // 17. Platform Demo
    {
      stage: "STAGE 17",
      title: "Platform Demo",
      subtitle: "Live System Navigation & Admin CMS",
      content: (
        <div className="p-6 border border-surface rounded-2xl bg-card space-y-4 max-w-xl mx-auto text-center">
          <h4 className="font-bold font-display text-base text-primary">Live Workspace Demonstration</h4>
          <p className="text-xs text-foreground-secondary">
            Access live dashboards, automated data quality scorecards, and AI copilot drawer.
          </p>
          <Button size="sm" asChild>
            <Link href="/admin">Launch Admin Workspace</Link>
          </Button>
        </div>
      )
    },

    // 18. Future Roadmap
    {
      stage: "STAGE 18",
      title: "Future Roadmap",
      subtitle: "AI Narration & Multi-State Expansion",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-surface/30 space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold font-display text-sm">Nationwide Transport Authority Rollout</h4>
          <p className="text-xs text-foreground-secondary">Phase 3 expansion onto inter-state corridors and national intermodal terminals.</p>
        </div>
      )
    },

    // 19. Team
    {
      stage: "STAGE 19",
      title: "Team DixNova",
      subtitle: "Meet Our Creative & Engineering Leads",
      content: (
        <div className="max-w-5xl mx-auto">
          <TeamMembersGrid members={dbMembers} />
        </div>
      )
    },

    // 20. Questions
    {
      stage: "STAGE 20",
      title: "Questions & Answers",
      subtitle: "Thank You Judges & Stakeholders",
      content: (
        <div className="p-6 border border-surface rounded-2xl bg-card text-center space-y-4 max-w-xl mx-auto">
          <h3 className="text-xl font-bold font-display text-primary">Open for Judge Q&A</h3>
          <p className="text-xs text-foreground-secondary max-w-md mx-auto">
            You can now test live routes, inspect the Power BI embeds, or interact with the AI Copilot assistant.
          </p>
          <Button size="sm" asChild>
            <Link href="/">Return to DixNova Home</Link>
          </Button>
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
