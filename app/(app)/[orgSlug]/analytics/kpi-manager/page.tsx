import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { EmptyState } from "@/components/ui/EmptyState"
import { Icons } from "@/lib/utils/icons"

export default async function KpiManagerPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let kpis: any[] = []
  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      const projects = await prisma.project.findMany({ where: { organizationId: org.id }, select: { id: true } })
      const projectIds = projects.map((p: any) => p.id)

      kpis = await prisma.kpi.findMany({
        where: { projectId: { in: projectIds } },
        orderBy: { displayOrder: "asc" }
      })
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Enterprise KPI Manager</h1>
          <p className="text-foreground-secondary">Configure KPI definitions, formulas (text reference), targets, and actual values.</p>
        </div>
        <Button>
          <Icons.kpis className="mr-2 h-4 w-4" /> Add New KPI
        </Button>
      </div>

      {kpis.length === 0 ? (
        <EmptyState
          title="No KPIs Configured"
          description="Waiting for administrator to add Team DixNova's KPI reference entries."
          icon={<Icons.kpis className="h-8 w-8" />}
        />
      ) : (
        <div className="rounded-xl border border-surface bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>KPI Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Formula Reference</TableHead>
                <TableHead>Current vs Target</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.map((k, i) => (
                <TableRow key={i}>
                  <TableCell className="font-semibold">{k.name}</TableCell>
                  <TableCell><Badge variant="outline">{k.category || "General"}</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-foreground-secondary">{k.formula || "Reference Only"}</TableCell>
                  <TableCell>
                    <span className="font-bold">{k.currentValue ?? "N/A"} {k.unit || ""}</span>
                    <span className="text-xs text-foreground-secondary ml-1">/ {k.targetValue ?? "N/A"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={k.trend === "UP" ? "success" : "danger"}>{k.trend || "STABLE"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit Entry</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
