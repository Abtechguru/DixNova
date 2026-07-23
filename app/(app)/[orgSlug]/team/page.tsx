import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/lib/utils/icons"

export default async function TeamManagementPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { slug: params.orgSlug },
    include: {
      users: {
        include: {
          user: { select: { id: true, name: true, email: true, status: true } }
        }
      }
    }
  })

  if (!org) redirect("/app")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Team Management</h1>
          <p className="text-foreground-secondary">Manage access and roles for {org.name}.</p>
        </div>
        <Button>
          <Icons.users className="h-4 w-4 mr-2" /> Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Members</CardTitle>
          <CardDescription>Users with access to this organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {org.users.map((member: any) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="font-medium">{member.user.name || "Pending Invite"}</div>
                    <div className="text-xs text-foreground-secondary">{member.user.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.role.replace("_", " ")}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.user.status === "ACTIVE" ? "success" : "warning"}>
                      {member.user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit Role</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
