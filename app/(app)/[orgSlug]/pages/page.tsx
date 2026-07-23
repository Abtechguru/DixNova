import * as React from "react"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default async function PagesCMSPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { slug: params.orgSlug },
    include: {
      pages: {
        orderBy: { updatedAt: 'desc' }
      }
    }
  })

  if (!org) redirect("/app")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Website Builder</h1>
          <p className="text-foreground-secondary">Design dynamic pages for the public website.</p>
        </div>
        <Button>
          <Icons.website className="mr-2 h-4 w-4" /> Create Page
        </Button>
      </div>

      <div className="rounded-xl border border-surface bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Title</TableHead>
              <TableHead>Slug (URL)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {org.pages.map((page: any) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell className="text-primary">/{page.slug}</TableCell>
                <TableCell>
                  <Badge variant={page.isPublished ? "success" : "warning"}>
                    {page.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Build Layout</Button>
                </TableCell>
              </TableRow>
            ))}
            {org.pages.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-foreground-secondary">
                  No pages found. The public website is currently empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
