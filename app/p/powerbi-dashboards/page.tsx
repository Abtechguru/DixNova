import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { EmptyState } from "@/components/ui/EmptyState"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { prisma } from "@/lib/db/prisma"
import { Icons } from "@/lib/utils/icons"

export default async function PowerBiDashboardsStoryPage() {
  let reports: any[] = []

  try {
    reports = await prisma.powerBiReport.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" }
    })
  } catch (e) {}

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <StoryHeader 
          chapterNumber={5}
          title="Power BI Embedded Dashboards"
          subtitle="Interactive business intelligence reports embedded seamlessly within the platform shell."
        />

        {reports.length === 0 ? (
          <EmptyState
            title="No Power BI Dashboards Published"
            description="Waiting for administrator to configure and embed Team DixNova's Power BI control rooms."
            icon={<Icons.powerbi className="h-8 w-8 text-primary" />}
          />
        ) : (
          <div className="space-y-8">
            {reports.map((report, idx) => (
              <div key={idx} className="rounded-2xl border border-surface bg-card p-6 space-y-4 shadow-soft">
                <h3 className="text-xl font-bold font-display">{report.name}</h3>
                <p className="text-sm text-foreground-secondary">{report.description}</p>
                {report.embedUrl ? (
                  <iframe 
                    src={report.embedUrl}
                    className="w-full aspect-[16/9] rounded-xl border border-surface"
                    allowFullScreen
                  />
                ) : (
                  <div className="p-8 bg-surface rounded-xl text-center text-sm text-foreground-secondary">
                    Power BI Embed Token Configured (Report ID: {report.reportId})
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <PageNavigationFooter 
          prevTitle="KPI Framework"
          prevSlug="/p/kpi-framework"
          nextTitle="Business Insights"
          nextSlug="/p/insights"
        />
      </div>
    </PublicLayout>
  )
}
