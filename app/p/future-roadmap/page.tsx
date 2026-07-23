import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { TimelineJourney } from "@/components/cms/TimelineJourney"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"

export default async function FutureRoadmapStoryPage() {
  const roadmapSteps = [
    {
      stage: "PHASE 1",
      title: "Multi-Tenant SaaS Foundation & Governed Pipeline",
      description: "Sprint 1-5 deployment establishing RBAC, CMS, IoT Telemetry, and Governed Data Quality.",
      deliverables: ["Multi-Tenancy", "Prisma MongoDB Engine", "Executive Decision Center"]
    },
    {
      stage: "PHASE 2",
      title: "AI Narration & Anomaly Detection",
      description: "Integrating LLM natural language dashboard narration, predictive corridor delay forecasting, and IoT anomaly detection.",
      deliverables: ["AI Extensions", "Automated Summaries", "Predictive Delay Models"]
    },
    {
      stage: "PHASE 3",
      title: "Nationwide Transport Authority Expansion",
      description: "Onboarding federal and additional state transport ministries to the DixNova SaaS platform.",
      deliverables: ["Inter-state Corridors", "National Commuter Pass", "Cross-agency Governance"]
    }
  ]

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <StoryHeader 
          chapterNumber={9}
          title="Future Strategic Roadmap"
          subtitle="The evolution of DixNova Transport Intelligence towards AI-driven mobility."
        />

        <TimelineJourney steps={roadmapSteps} />

        <PageNavigationFooter 
          prevTitle="Business Impact"
          prevSlug="/p/business-impact"
          nextTitle="Meet the Team"
          nextSlug="/p/team"
        />
      </div>
    </PublicLayout>
  )
}
