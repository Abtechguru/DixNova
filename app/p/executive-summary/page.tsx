import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { StatCounterGrid } from "@/components/cms/StatCounterGrid"
import { EmptyState } from "@/components/ui/EmptyState"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { prisma } from "@/lib/db/prisma"

export default async function ExecutiveSummaryStoryPage() {
  let projectCount = 0
  let datasetCount = 0
  let kpiCount = 0
  let reportCount = 0
  let summaryContent: any = null

  try {
    projectCount = await prisma.project.count()
    datasetCount = await prisma.dataset.count()
    kpiCount = await prisma.kpi.count()
    reportCount = await prisma.powerBiReport.count()

    summaryContent = await prisma.executiveSummary.findFirst({
      orderBy: { updatedAt: "desc" }
    })
  } catch (e) {}

  const stats = [
    { value: `${projectCount}`, label: "Active Platform Projects", description: "Multi-tenant scope" },
    { value: `${datasetCount}`, label: "Ingested Datasets", description: "Verified transport tables" },
    { value: `${kpiCount}`, label: "Governed KPIs", description: "Reference metrics" },
    { value: `${reportCount}`, label: "Power BI Reports", description: "Embedded control rooms" },
  ]

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 flex-1 flex flex-col justify-between overflow-hidden">
        <StoryHeader 
          chapterNumber={1}
          title="Executive Summary"
          subtitle="SmartMove Nigeria is a decision intelligence platform presenting Team DixNova's completed analytics."
        />

        <div className="space-y-4 my-auto">
          <StatCounterGrid stats={stats} />

          {summaryContent ? (
            <div className="rounded-2xl border border-surface bg-card p-6 space-y-4 text-foreground leading-relaxed shadow-soft">
              <h2 className="text-xl font-display font-bold">Strategic Vision & Context</h2>
              <div className="text-foreground-secondary space-y-3 text-sm">
                {summaryContent.contentHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: summaryContent.contentHtml }} />
                ) : (
                  <p>{JSON.stringify(summaryContent.contentJson)}</p>
                )}
              </div>
            </div>
          ) : (
            <EmptyState
              title="No Executive Summary Published"
              description="Waiting for administrator to upload Team DixNova's executive brief."
            />
          )}
        </div>

        <PageNavigationFooter 
          prevTitle="Opening Story"
          prevSlug="/p/bigger-reality"
          nextTitle="Problem Statement"
          nextSlug="/p/problem-statement"
        />
      </div>
    </PublicLayout>
  )
}
