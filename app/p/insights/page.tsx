import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { EmptyState } from "@/components/ui/EmptyState"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { prisma } from "@/lib/db/prisma"

export default async function InsightsStoryPage() {
  let dbInsights: any[] = []

  try {
    dbInsights = await prisma.insight.findMany({
      orderBy: { createdAt: "desc" }
    })
  } catch (e) {}

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <StoryHeader 
          chapterNumber={6}
          title="Business Insights"
          subtitle="Synthesized data findings authored by Team DixNova analysts."
        />

        {dbInsights.length === 0 ? (
          <EmptyState
            title="No Business Insights Published"
            description="Waiting for administrator to upload Team DixNova's analyst findings."
          />
        ) : (
          <div className="space-y-6">
            {dbInsights.map((insight, idx) => (
              <div key={idx} className="rounded-2xl border border-surface bg-card p-8 space-y-4 shadow-soft">
                <h2 className="text-2xl font-display font-bold text-primary">{insight.title}</h2>
                <p className="text-foreground-secondary leading-relaxed">{insight.description}</p>
                {insight.businessImpact && (
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-sm font-semibold text-primary">
                    Impact Assessment: {insight.businessImpact}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <PageNavigationFooter 
          prevTitle="Power BI Dashboards"
          prevSlug="/p/powerbi-dashboards"
          nextTitle="Recommendations"
          nextSlug="/p/recommendations"
        />
      </div>
    </PublicLayout>
  )
}
