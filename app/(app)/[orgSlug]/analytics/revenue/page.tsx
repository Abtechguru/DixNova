import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { EmptyState } from "@/components/ui/EmptyState"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default async function RevenueAnalyticsPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  let transactions: any[] = []
  try {
    const org = await prisma.organization.findUnique({ where: { slug: params.orgSlug } })
    if (org) {
      transactions = await prisma.revenueTransaction.findMany({
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
          <h1 className="text-3xl font-display font-bold">Farebox Yield & Revenue Analytics</h1>
          <p className="text-foreground-secondary">
            Presentation of Cowry card fare collections analyzed by Team DixNova.
          </p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="No Revenue Records Published"
          description="Waiting for administrator to upload Team DixNova's verified revenue transaction dataset."
          icon={<Icons.revenue className="h-8 w-8" />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {transactions.map((tx, idx) => (
            <Card key={idx} className="shadow-soft">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-bold">{tx.corridorName} ({tx.fareType})</CardTitle>
                  <Badge variant="success">₦{tx.amountNgn.toLocaleString()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-foreground-secondary flex gap-6">
                <div>Vehicle Class: <strong className="text-foreground">{tx.vehicleClass}</strong></div>
                <div>Passengers: <strong className="text-foreground">{tx.passengerCount}</strong></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
