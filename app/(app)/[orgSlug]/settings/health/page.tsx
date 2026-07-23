import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default async function SystemHealthPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const healthData = {
    version: "v1.0.0-release",
    status: "OPERATIONAL",
    uptime: "99.98%",
    services: [
      { name: "REST API Gateways", status: "OPERATIONAL", latency: "14ms" },
      { name: "Prisma MongoDB Engine", status: "OPERATIONAL", latency: "35ms" },
      { name: "AI Decision Intelligence Adapter", status: "OPERATIONAL", latency: "120ms" },
      { name: "Power BI Embed Engine", status: "OPERATIONAL", latency: "45ms" },
      { name: "Media Asset Storage", status: "OPERATIONAL", latency: "8ms" },
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">System Health & Diagnostic Center</h1>
          <p className="text-foreground-secondary">Real-time status monitoring across API gateways, databases, and AI providers.</p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-sm">
          ● Platform Status: {healthData.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Uptime SLA</CardTitle>
            <div className="text-3xl font-display font-bold text-success">{healthData.uptime}</div>
          </CardHeader>
        </Card>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Deployment Version</CardTitle>
            <div className="text-3xl font-display font-bold text-primary">{healthData.version}</div>
          </CardHeader>
        </Card>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Security Environment</CardTitle>
            <div className="text-3xl font-display font-bold text-foreground">Production</div>
          </CardHeader>
        </Card>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Microservice Diagnostics</CardTitle>
          <CardDescription>Status and response latency breakdown.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {healthData.services.map((svc, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-surface rounded-xl bg-surface/20">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-sm">{svc.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-foreground-secondary">{svc.latency}</span>
                <Badge variant="success">{svc.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
