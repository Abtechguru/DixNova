import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { StatCounterGrid } from "@/components/cms/StatCounterGrid"
import { EmptyState } from "@/components/ui/EmptyState"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { prisma } from "@/lib/db/prisma"

export default async function BusinessImpactStoryPage() {
  let recCount = 0
  let insightCount = 0
  let reportCount = 0

  try {
    recCount = await prisma.recommendation.count()
    insightCount = await prisma.insight.count()
    reportCount = await prisma.powerBiReport.count()
  } catch (e) {}

  const hasData = recCount > 0 || insightCount > 0 || reportCount > 0

  const impactStats = [
    { value: `${recCount}`, label: "Executive Recommendations", description: "Actionable strategic proposals" },
    { value: `${insightCount}`, label: "Validated Insights", description: "Analyst-authored findings" },
    { value: `${reportCount}`, label: "Embedded Control Rooms", description: "Power BI dashboards" },
    { value: "100%", label: "Multi-Tenant Scalability", description: "Enterprise deployment ready" },
  ]

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <StoryHeader 
          chapterNumber={8}
          title="Quantifiable Business Impact"
          subtitle="Measuring financial return, passenger satisfaction, and operational speed."
        />

        {!hasData ? (
          <EmptyState
            title="No Impact Data Available"
            description="Waiting for administrator to upload analytics findings."
          />
        ) : (
          <StatCounterGrid stats={impactStats} />
        )}

        <PageNavigationFooter 
          prevTitle="Recommendations"
          prevSlug="/p/recommendations"
          nextTitle="Future Roadmap"
          nextSlug="/p/future-roadmap"
        />
      </div>
    </PublicLayout>
  )
}
