import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { ProjectObjectivesGrid } from "@/components/cms/ProjectObjectivesGrid"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"

export default async function ObjectivesStoryPage() {
  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 flex-1 flex flex-col justify-between overflow-hidden">
        <StoryHeader 
          chapterNumber={3}
          title="Project Objectives"
          subtitle="To address these challenges, our project was guided by four key objectives across Business, Analytics, Technical, and Strategic domains."
        />

        <div className="flex-1 overflow-hidden flex flex-col justify-center">
          <ProjectObjectivesGrid />
        </div>

        <PageNavigationFooter 
          prevTitle="Problem Statement"
          prevSlug="/p/problem-statement"
          nextTitle="Analytics Journey"
          nextSlug="/p/analytics-journey"
        />
      </div>
    </PublicLayout>
  )
}
