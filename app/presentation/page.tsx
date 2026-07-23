"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"
import { ProblemStatement5Ws } from "@/components/cms/ProblemStatement5Ws"
import { TeamMembersGrid, TeamMemberItem } from "@/components/cms/TeamMembersGrid"
import { ProjectObjectivesGrid } from "@/components/cms/ProjectObjectivesGrid"
import { AnalyticsMaturityJourney } from "@/components/cms/AnalyticsMaturityJourney"
import { BiggerRealityVideoStage } from "@/components/cms/BiggerRealityVideoStage"
import { PresentationPowerBiStage } from "@/components/cms/PresentationPowerBiStage"
import { ExecutiveSummaryStage } from "@/components/cms/ExecutiveSummaryStage"

interface Slide {
  stage: string
  title: string
  subtitle: string
  content: React.ReactNode
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [dbMembers, setDbMembers] = React.useState<TeamMemberItem[]>([])

  React.useEffect(() => {
    fetch("/api/cms/team-members")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setDbMembers(res.data)
        }
      })
      .catch(() => {})
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
        <div className="p-6 border border-surface rounded-xl bg-surface/20 space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold font-display text-sm">Stakeholder Alignment</h4>
          <p className="text-xs text-foreground-secondary">
            Team DixNova mapped operational pain points across transit authorities, BRT operators, and commuters prior to data collection.
          </p>
        </div>
      )
    },

    // 7. Data Understanding
    {
      stage: "STAGE 07",
      title: "Data Understanding",
      subtitle: "Exploratory Telemetry Data Assessment",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-card space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold text-primary font-display text-sm">Multimodal Data Feeds</h4>
          <p className="text-xs text-foreground-secondary">
            Assessed dataset structures across GPS vehicle telemetry feeds, Cowry card transaction logs, and arterial road sensor records.
          </p>
        </div>
      )
    },

    // 8. Data Cleaning
    {
      stage: "STAGE 08",
      title: "Data Cleaning",
      subtitle: "Data Quality Scorecard Rules & Filtering",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-surface/30 space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold font-display text-sm">6-Dimension Quality Pipeline</h4>
          <p className="text-xs text-foreground-secondary">
            Filtered null values, duplicate transaction keys, and GPS drift errors to establish a verified Data Quality Scorecard.
          </p>
        </div>
      )
    },

    // 9. Data Preparation
    {
      stage: "STAGE 09",
      title: "Data Preparation",
      subtitle: "Transformation, Normalization & Feature Engineering",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-card space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold text-primary font-display text-sm">Feature Engineering</h4>
          <p className="text-xs text-foreground-secondary">
            Engineered trip duration metrics, peak-hour congestion flags, and digital payment ratio variables for downstream modeling.
          </p>
        </div>
      )
    },

    // 10. Data Modeling
    {
      stage: "STAGE 10",
      title: "Data Modeling",
      subtitle: "Star-Schema Architecture",
      content: (
        <div className="p-6 border border-surface rounded-xl bg-card space-y-2 max-w-xl mx-auto">
          <h4 className="font-bold text-primary font-display text-sm">Dimensional Modeling</h4>
          <p className="text-xs text-foreground-secondary">
            Structured `Fact_Revenue`, `Fact_Telemetry`, `Dim_Corridor`, and `Dim_Vehicle` tables for optimal Power BI DAX performance.
          </p>
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
    <div className="min-h-screen min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-background text-foreground flex flex-col justify-between p-3 sm:p-6 md:p-8 space-y-4">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-surface pb-3 flex-none">
        <div className="flex items-center gap-2 sm:gap-3">
          <Badge variant="default" className="text-[10px] sm:text-xs">{slide.stage}</Badge>
          <span className="text-[10px] sm:text-xs font-mono text-foreground-secondary">SLIDE {currentSlide + 1} / {slides.length}</span>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-xs">
          <Link href="/">✕ Exit Presentation</Link>
        </Button>
      </div>

      {/* Main Slide Card (Centered Vertically) */}
      <div className="flex-1 flex flex-col justify-center items-center my-auto py-2 w-full max-w-7xl mx-auto">
        {currentSlide !== 0 && (
          <div className="space-y-1 sm:space-y-2 text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight text-foreground">
              {slide.title}
            </h1>
            <p className="text-xs sm:text-sm text-foreground-secondary">{slide.subtitle}</p>
          </div>
        )}

        <div className="w-full">
          {slide.content}
        </div>
      </div>

      {/* Bottom Navigation Footer with Arrow Controls */}
      <div className="flex items-center justify-between border-t border-surface pt-3 max-w-3xl mx-auto w-full flex-none gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentSlide === 0}
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          className="text-xs px-2 sm:px-3"
        >
          <Icons.chevronRight className="mr-1 sm:mr-2 h-3.5 w-3.5 rotate-180" /> Previous
        </Button>

        <div className="hidden sm:flex gap-1 items-center overflow-x-auto max-w-[200px] md:max-w-none scrollbar-none px-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                i === currentSlide ? "w-5 bg-primary" : "w-1.5 bg-surface hover:bg-foreground-secondary"
              }`}
            />
          ))}
        </div>

        <Button
          variant="default"
          size="sm"
          disabled={currentSlide === slides.length - 1}
          onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
          className="text-xs px-2 sm:px-3"
        >
          Next <Icons.chevronRight className="ml-1 sm:ml-2 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
