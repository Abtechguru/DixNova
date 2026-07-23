import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { EmptyState } from "@/components/ui/EmptyState"
import { Icons } from "@/lib/utils/icons"

export default async function ReportsCatalogPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let reports: any[] = []
  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      reports = await prisma.reportAsset.findMany({
        where: { organizationId: org.id },
        orderBy: { updatedAt: "desc" }
      })
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Report Repository & Catalog</h1>
          <p className="text-foreground-secondary">Centralized repository for PDF, Excel, PowerPoint, and Word documents.</p>
        </div>
        <Button>
          <Icons.reports className="mr-2 h-4 w-4" /> Publish Report
        </Button>
      </div>

      {reports.length === 0 ? (
        <EmptyState
          title="No Published Reports Available"
          description="Waiting for administrator to upload report files (PDF, Word, PPT)."
          icon={<Icons.reports className="h-8 w-8" />}
        />
      ) : (
        <div className="rounded-xl border border-surface bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-semibold">{r.title}</TableCell>
                  <TableCell><Badge variant="outline">{r.format}</Badge></TableCell>
                  <TableCell>{r.category || "General"}</TableCell>
                  <TableCell>{Math.round(r.sizeBytes / 1024 / 1024 * 10) / 10} MB</TableCell>
                  <TableCell>{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Download</Button>
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
