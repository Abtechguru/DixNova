import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { EmptyState } from "@/components/ui/EmptyState"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default async function DecisionCenterPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let insights: any[] = []
  let recommendations: any[] = []
  let kpiCount = 0

  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      const projects = await prisma.project.findMany({ where: { organizationId: org.id }, select: { id: true } })
      const projectIds = projects.map((p: any) => p.id)

      insights = await prisma.insight.findMany({
        where: { projectId: { in: projectIds } },
        take: 5
      })

      recommendations = await prisma.recommendation.findMany({
        where: { projectId: { in: projectIds } },
        take: 5
      })

      kpiCount = await prisma.kpi.count({ where: { projectId: { in: projectIds } } })
    }
  } catch (e) {}

  const hasContent = insights.length > 0 || recommendations.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Executive Decision Center</h1>
          <p className="text-foreground-secondary">Unified strategic control panel, published insights, and action recommendations.</p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-sm">
          <Icons.sparkles className="h-4 w-4 mr-1 inline" /> Active KPIs: {kpiCount}
        </Badge>
      </div>

      {!hasContent ? (
        <EmptyState
          title="No Published Decision Assets"
          description="Waiting for administrator to upload Team DixNova's verified insights and executive recommendations."
          icon={<Icons.insights className="h-8 w-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Strategic Insights</CardTitle>
              <CardDescription>High impact findings generated across active transportation projects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="p-4 border border-surface rounded-xl space-y-1 bg-surface/30">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">{insight.title}</span>
                    <Badge variant="danger">{insight.priority || "HIGH"}</Badge>
                  </div>
                  <p className="text-xs text-foreground-secondary">{insight.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Action Recommendations</CardTitle>
              <CardDescription>Strategic decisions requiring leadership sign-off.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 border border-surface rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{rec.title}</div>
                    <div className="text-xs text-foreground-secondary">
                      Est. Cost: {rec.costEstimate || "TBD"} | Impact: {rec.impactEstimate || "High"}
                    </div>
                  </div>
                  <Badge variant="warning">{rec.status || "PENDING"}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
