import * as React from "react"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"
import Link from "next/link"

export default async function ProjectsCMSPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { slug: params.orgSlug },
    include: {
      projects: {
        include: {
          workspace: true
        },
        orderBy: { updatedAt: 'desc' }
      }
    }
  })

  if (!org) redirect("/app")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Projects</h1>
          <p className="text-foreground-secondary">Manage intelligence projects and datasets.</p>
        </div>
        <Button>
          <Icons.projects className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="rounded-xl border border-surface bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Workspace</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {org.projects.map((project: any) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  {project.name}
                  {project.client && <div className="text-xs text-foreground-secondary">{project.client}</div>}
                </TableCell>
                <TableCell>{project.workspace.name}</TableCell>
                <TableCell>
                  <Badge variant={project.status === "PUBLISHED" ? "success" : "default"}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{project.visibility}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/app/${org.slug}/projects/${project.id}/editor`}>Edit Content</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {org.projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-foreground-secondary">
                  No projects found. Create your first project to begin.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
