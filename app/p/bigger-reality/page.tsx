import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { BiggerRealityVideoStage } from "@/components/cms/BiggerRealityVideoStage"

export default async function BiggerRealityStoryPage() {
  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 flex-1 flex flex-col justify-between overflow-hidden">
        <StoryHeader 
          chapterNumber={1}
          title="Opening Story: The Bigger Reality"
          subtitle="Navigating the Macro Urban Transportation Ecosystem"
        />

        <div className="flex-1 overflow-hidden flex flex-col justify-center my-auto">
          <BiggerRealityVideoStage />
        </div>

        <PageNavigationFooter 
          prevTitle="DixNova Home"
          prevSlug="/"
          nextTitle="Executive Summary"
          nextSlug="/p/executive-summary"
        />
      </div>
    </PublicLayout>
  )
}
