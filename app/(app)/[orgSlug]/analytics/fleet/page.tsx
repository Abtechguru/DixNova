import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { EmptyState } from "@/components/ui/EmptyState"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default async function FleetAnalyticsPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let telemetry: any[] = []
  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      telemetry = await prisma.fleetTelemetry.findMany({
        where: { organizationId: org.id },
        orderBy: { timestamp: "desc" },
        take: 20
      })
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Fleet Telemetry & Operational Analytics</h1>
          <p className="text-foreground-secondary">
            Presentation of vehicle telemetry captured during Team DixNova&apos;s analysis.
          </p>
        </div>
      </div>

      {telemetry.length === 0 ? (
        <EmptyState
          title="No Telemetry Records Uploaded"
          description="Waiting for administrator to upload Team DixNova's verified BRT fleet telemetry dataset."
          icon={<Icons.fleet className="h-8 w-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {telemetry.map((t, idx) => (
            <Card key={idx} className="shadow-soft">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-bold">Vehicle #{t.vehicleId} ({t.vehicleType})</CardTitle>
                  <Badge variant={t.status === "ACTIVE" ? "success" : "outline"}>{t.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-foreground-secondary flex gap-6">
                <div>Speed: <strong className="text-foreground">{t.speedKmh} km/h</strong></div>
                <div>Fuel: <strong className="text-foreground">{t.fuelLevelPct}%</strong></div>
                <div>Passengers: <strong className="text-foreground">{t.passengerCount}</strong></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
