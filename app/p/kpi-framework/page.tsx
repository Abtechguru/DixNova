import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { StatCounterGrid } from "@/components/cms/StatCounterGrid"
import { EmptyState } from "@/components/ui/EmptyState"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { prisma } from "@/lib/db/prisma"

export default async function KpiFrameworkStoryPage() {
  let kpiStats: any[] = []

  try {
    const dbKpis = await prisma.kpi.findMany({
      take: 8,
      orderBy: { displayOrder: "asc" }
    })

    kpiStats = dbKpis.map(k => ({
      value: k.currentValue !== null && k.currentValue !== undefined ? `${k.currentValue} ${k.unit || ""}` : "N/A",
      label: k.name,
      description: `Target: ${k.targetValue ?? "N/A"} ${k.unit || ""}`
    }))
  } catch (e) {}

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <StoryHeader 
          chapterNumber={4}
          title="KPI Framework"
          subtitle="Governed reference metrics tracking operational performance and service quality."
        />

        {kpiStats.length === 0 ? (
          <EmptyState
            title="No Governed KPIs Published"
            description="Waiting for administrator to upload Team DixNova's KPI reference metadata."
          />
        ) : (
          <StatCounterGrid stats={kpiStats} />
        )}

        <PageNavigationFooter 
          prevTitle="Analytics Journey"
          prevSlug="/p/analytics-journey"
          nextTitle="Power BI Dashboards"
          nextSlug="/p/powerbi-dashboards"
        />
      </div>
    </PublicLayout>
  )
}
