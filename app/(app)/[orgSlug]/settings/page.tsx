import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

export default async function OrganizationSettingsPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { slug: params.orgSlug },
    include: { branding: true }
  })

  if (!org) redirect("/app")

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Organization Settings</h1>
        <p className="text-foreground-secondary">Manage {org.name} branding, domains, and general settings.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>Update your organization's core details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Organization Name</label>
              <Input defaultValue={org.name} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug / URL</label>
              <Input defaultValue={org.slug} disabled />
              <p className="text-xs text-foreground-secondary">To change your slug, contact support.</p>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding & Colors</CardTitle>
            <CardDescription>Customize the look and feel of your tenant.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Color Hex</label>
              <div className="flex gap-4 items-center">
                <div 
                  className="h-10 w-10 rounded-lg border border-surface shadow-soft" 
                  style={{ backgroundColor: org.branding?.primaryColor || "#FFFF00" }} 
                />
                <Input defaultValue={org.branding?.primaryColor || "#FFFF00"} className="w-32" />
              </div>
            </div>
            <Button variant="outline">Update Branding</Button>
          </CardContent>
        </Card>
        
        <Card className="border-danger/20 bg-danger/5">
          <CardHeader>
            <CardTitle className="text-danger">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions for your organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="danger">Delete Organization</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
