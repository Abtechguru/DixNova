import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { ProblemStatement5Ws } from "@/components/cms/ProblemStatement5Ws"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { prisma } from "@/lib/db/prisma"

export default async function ProblemStatementStoryPage() {
  let dbProblem: any = null

  try {
    dbProblem = await prisma.problemStatement.findFirst()
  } catch (e) {}

  const summary = dbProblem?.businessChallenge || "Enterprise Transportation Congestion & Farebox Leakage Challenge"
  const whoDetails = dbProblem?.whoDetails?.length ? dbProblem.whoDetails : [
    "Lagos State Commuters & Bus Passengers",
    "BRT Operators & Fleet Dispatchers",
    "State Ministry Transport Authorities"
  ]
  const whatDetails = dbProblem?.whatDetails?.length ? dbProblem.whatDetails : [
    "Real-time fleet telemetry tracking",
    "Automated corridor congestion alerts",
    "Unified Cowry card farebox reconciliation"
  ]
  const whenDetails = dbProblem?.whenDetails?.length ? dbProblem.whenDetails : [
    "Morning rush hours (07:00 - 09:30)",
    "Evening peak commutes (17:00 - 19:30)",
    "Rainy season traffic slowdowns"
  ]
  const whereDetails = dbProblem?.whereDetails?.length ? dbProblem.whereDetails : [
    "Lekki-Epe Expressway Corridor",
    "Third Mainland Bridge Bottlenecks",
    "Ikorodu - CMS BRT Routes"
  ]
  const whyDetails = dbProblem?.whyDetails?.length ? dbProblem.whyDetails : [
    "Reduce 45+ min average commuter delays",
    "Recover estimated ₦1.4B in annual revenue leaks",
    "Boost public transit efficiency by 25%+"
  ]

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 flex-1 flex flex-col justify-between overflow-hidden">
        <StoryHeader 
          chapterNumber={2}
          title="Problem Statement Framework"
          subtitle="5 Ws Framework: Deconstructing urban traffic bottlenecks, fare collection inefficiencies, and data fragmentation."
        />

        <div className="flex-1 overflow-hidden flex flex-col justify-center">
          <ProblemStatement5Ws 
            summary={summary}
            who={{ details: whoDetails }}
            what={{ details: whatDetails }}
            when={{ details: whenDetails }}
            where={{ details: whereDetails }}
            why={{ details: whyDetails }}
          />
        </div>

        <PageNavigationFooter 
          prevTitle="Executive Summary"
          prevSlug="/p/executive-summary"
          nextTitle="Project Objectives"
          nextSlug="/p/objectives"
        />
      </div>
    </PublicLayout>
  )
}
