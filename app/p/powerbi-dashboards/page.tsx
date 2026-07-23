import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { EmptyState } from "@/components/ui/EmptyState"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { PowerBiZipVisualizer } from "@/components/powerbi/PowerBiZipVisualizer"
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
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <StoryHeader 
          chapterNumber={5}
          title="Power BI Embedded Dashboards & Extracted ZIP Packages"
          subtitle="Interactive business intelligence reports, DAX KPIs, corridor slicers, and automated AI data interpretations."
        />

        {reports.length === 0 ? (
          <EmptyState
            title="No Power BI Control Rooms Published"
            description="No Power BI dashboards or ZIP packages have been published yet. Log in to Admin CMS to upload reports."
            icon={<Icons.powerbi className="h-8 w-8 text-primary" />}
          />
        ) : (
          <div className="space-y-10">
            {reports.map((report, idx) => (
              <PowerBiZipVisualizer
                key={report.id || idx}
                reportData={{
                  id: report.id,
                  name: report.name,
                  category: report.category,
                  description: report.description,
                  zipUrl: report.zipUrl,
                  entryPath: report.entryPath,
                  embedUrl: report.embedUrl,
                  fileCount: report.fileSizeBytes ? Math.floor(report.fileSizeBytes / 15000) + 1 : undefined,
                  fileSizeBytes: report.fileSizeBytes
                }}
              />
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

