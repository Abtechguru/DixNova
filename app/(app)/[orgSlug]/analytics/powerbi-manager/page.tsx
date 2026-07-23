import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { EmptyState } from "@/components/ui/EmptyState"
import { Icons } from "@/lib/utils/icons"

export default async function PowerBiManagerPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let reports: any[] = []
  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      const projects = await prisma.project.findMany({ where: { organizationId: org.id }, select: { id: true } })
      const projectIds = projects.map((p: any) => p.id)

      reports = await prisma.powerBiReport.findMany({
        where: { projectId: { in: projectIds } }
      })
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Power BI Workspaces & Catalog</h1>
          <p className="text-foreground-secondary">Manage embedded Power BI report IDs, workspace credentials, and embed links.</p>
        </div>
        <Button>
          <Icons.powerbi className="mr-2 h-4 w-4" /> Embed Report
        </Button>
      </div>

      {reports.length === 0 ? (
        <EmptyState
          title="No Power BI Reports Configured"
          description="Waiting for administrator to embed Team DixNova's Power BI dashboards."
          icon={<Icons.powerbi className="h-8 w-8 text-primary" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((r, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base font-semibold">{r.name}</CardTitle>
                  <Badge variant={r.isPublished ? "success" : "default"}>
                    {r.isPublished ? "PUBLISHED" : "DRAFT"}
                  </Badge>
                </div>
                <CardDescription>Workspace ID: {r.workspaceId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-surface rounded-lg flex items-center justify-center text-foreground-secondary border border-surface">
                  <Icons.powerbi className="h-10 w-10 text-primary opacity-80" />
                </div>
                <div className="flex justify-between items-center text-xs text-foreground-secondary">
                  <span>Report ID: {r.reportId}</span>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
