import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")

    // Aggregate Executive Decision Center metrics
    const [kpis, insights, recommendations, datasets] = await Promise.all([
      prisma.kpi.findMany({ take: 10, orderBy: { displayOrder: "asc" } }),
      prisma.insight.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.recommendation.findMany({ take: 5, where: { status: "OPEN" } }),
      prisma.dataset.findMany({ select: { qualityScore: true } })
    ])

    const avgDataHealth = datasets.length > 0
      ? Math.round(datasets.reduce((acc: number, d: any) => acc + (d.qualityScore || 90), 0) / datasets.length)
      : 94

    const criticalAlertsCount = kpis.filter((k: any) => k.trend === "DOWN" || (k.currentValue && k.thresholdMin && k.currentValue < k.thresholdMin)).length

    return NextResponse.json({
      healthScore: avgDataHealth,
      criticalAlertsCount,
      topKpis: kpis,
      latestInsights: insights,
      pendingRecommendations: recommendations
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
