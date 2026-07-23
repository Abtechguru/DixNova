import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { EmptyState } from "@/components/ui/EmptyState"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Icons } from "@/lib/utils/icons"

export default async function DataQualityPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let scorecards: any[] = []
  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      const projects = await prisma.project.findMany({ where: { organizationId: org.id }, select: { id: true } })
      const projectIds = projects.map((p: any) => p.id)

      const datasets = await prisma.dataset.findMany({
        where: { projectId: { in: projectIds } },
        include: { qualityScorecard: true }
      })

      scorecards = datasets.filter((d: any) => d.qualityScorecard).map((d: any) => ({
        name: d.name,
        scorecard: d.qualityScorecard
      }))
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Data Quality Scorecards</h1>
        <p className="text-foreground-secondary">Governance diagnostic scorecards evaluating datasets uploaded by Team DixNova.</p>
      </div>

      {scorecards.length === 0 ? (
        <EmptyState
          title="No Data Quality Scorecards Available"
          description="Waiting for administrator to upload and validate Team DixNova's datasets."
          icon={<Icons.datasets className="h-8 w-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scorecards.map((item, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                <span className="text-2xl font-bold font-display text-success">
                  {item.scorecard.overallScore}%
                </span>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-foreground-secondary">
                <div>Completeness: <strong>{item.scorecard.completeness}%</strong></div>
                <div>Consistency: <strong>{item.scorecard.consistency}%</strong></div>
                <div>Uniqueness: <strong>{item.scorecard.uniqueness}%</strong></div>
                <div>Accuracy: <strong>{item.scorecard.accuracy}%</strong></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
