import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { ActionCardGrid } from "@/components/cms/ActionCardGrid"
import { EmptyState } from "@/components/ui/EmptyState"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { prisma } from "@/lib/db/prisma"

export default async function RecommendationsStoryPage() {
  let dbRecommendations: any[] = []

  try {
    const rawRecs = await prisma.recommendation.findMany()
    dbRecommendations = rawRecs.map(r => ({
      title: r.title,
      description: r.description,
      priority: (r.priority as "HIGH" | "MEDIUM" | "LOW") || "MEDIUM",
      department: r.department || "Strategy",
      impact: r.impactEstimate || "High Return",
      cost: r.costEstimate || "TBD",
      timeline: r.timeline || "Q3 2026"
    }))
  } catch (e) {}

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <StoryHeader 
          chapterNumber={7}
          title="Executive Recommendations"
          subtitle="Prioritized, actionable strategy cards with estimated cost and impact."
        />

        {dbRecommendations.length === 0 ? (
          <EmptyState
            title="No Executive Recommendations Published"
            description="Waiting for administrator to upload Team DixNova's strategic recommendations."
          />
        ) : (
          <ActionCardGrid cards={dbRecommendations} />
        )}

        <PageNavigationFooter 
          prevTitle="Business Insights"
          prevSlug="/p/insights"
          nextTitle="Business Impact"
          nextSlug="/p/business-impact"
        />
      </div>
    </PublicLayout>
  )
}
