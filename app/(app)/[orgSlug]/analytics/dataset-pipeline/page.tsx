import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { EmptyState } from "@/components/ui/EmptyState"
import { Icons } from "@/lib/utils/icons"

export default async function DatasetPipelinePage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let datasets: any[] = []
  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      const projects = await prisma.project.findMany({ where: { organizationId: org.id }, select: { id: true } })
      const projectIds = projects.map((p: any) => p.id)

      datasets = await prisma.dataset.findMany({
        where: { projectId: { in: projectIds } },
        orderBy: { updatedAt: "desc" }
      })
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Governed Dataset Pipeline</h1>
          <p className="text-foreground-secondary">Repository of datasets uploaded and prepared by Team DixNova analysts.</p>
        </div>
        <Button>
          <Icons.datasets className="mr-2 h-4 w-4" /> Upload Dataset
        </Button>
      </div>

      {datasets.length === 0 ? (
        <EmptyState
          title="No Datasets Uploaded"
          description="Waiting for administrator to upload Team DixNova's validated transport dataset files."
          icon={<Icons.datasets className="h-8 w-8" />}
        />
      ) : (
        <div className="rounded-xl border border-surface bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dataset Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rows</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead>Pipeline Stage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-semibold">{d.name}</TableCell>
                  <TableCell><Badge variant="outline">{d.category || "Transport"}</Badge></TableCell>
                  <TableCell>{(d.rowCount || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="font-bold text-success">{d.qualityScore ?? 100}%</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={d.pipelineStage === "APPROVED" ? "success" : d.pipelineStage === "VALIDATED" ? "default" : "warning"}>
                      {d.pipelineStage}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm">Inspect Logs</Button>
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
