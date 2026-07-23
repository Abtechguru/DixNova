import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { AnalyticsMaturityJourney } from "@/components/cms/AnalyticsMaturityJourney"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"

export default async function AnalyticsJourneyStoryPage() {
  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 flex-1 flex flex-col justify-between overflow-hidden">
        <StoryHeader 
          chapterNumber={4}
          title="⭐ Analytics Maturity Journey ⭐"
          subtitle="The complete 10-stage transportation analytics lifecycle from business understanding to business impact."
        />

        <div className="flex-1 overflow-hidden flex flex-col justify-center">
          <AnalyticsMaturityJourney />
        </div>

        <PageNavigationFooter 
          prevTitle="Project Objectives"
          prevSlug="/p/objectives"
          nextTitle="Power BI Dashboards"
          nextSlug="/p/powerbi-dashboards"
        />
      </div>
    </PublicLayout>
  )
}
