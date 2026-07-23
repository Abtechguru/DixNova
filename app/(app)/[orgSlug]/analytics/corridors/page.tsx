import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { EmptyState } from "@/components/ui/EmptyState"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default async function CorridorAnalyticsPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let corridors: any[] = []
  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      corridors = await prisma.corridorAnalytics.findMany({
        where: { organizationId: org.id },
        orderBy: { timestamp: "desc" },
        take: 10
      })
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Corridor Congestion & Speed Analytics</h1>
          <p className="text-foreground-secondary">
            Presentation of arterial traffic bottlenecks analyzed by Team DixNova.
          </p>
        </div>
      </div>

      {corridors.length === 0 ? (
        <EmptyState
          title="No Corridor Records Published"
          description="Waiting for administrator to upload Team DixNova's verified corridor congestion dataset."
          icon={<Icons.analytics className="h-8 w-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {corridors.map((c, idx) => (
            <Card key={idx} className="shadow-soft">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-bold">{c.corridorName}</CardTitle>
                  <Badge variant={c.statusLevel === "CRITICAL" ? "danger" : "warning"}>{c.statusLevel}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-foreground-secondary flex gap-6">
                <div>Route: <strong className="text-foreground">{c.origin} → {c.destination}</strong></div>
                <div>Delay: <strong className="text-foreground">+{c.delayMinutes} min</strong></div>
                <div>Congestion Index: <strong className="text-foreground">{c.congestionScore}%</strong></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
