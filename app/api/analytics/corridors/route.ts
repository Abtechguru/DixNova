import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")

    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const corridors = await prisma.corridorAnalytics.findMany({
      where: orgId ? { organizationId: orgId } : {},
      orderBy: { timestamp: "desc" },
      take: 50
    })

    const avgCongestion = corridors.length > 0
      ? Math.round(corridors.reduce((acc: number, c: any) => acc + c.congestionScore, 0) / corridors.length)
      : 0

    return NextResponse.json({
      summary: { avgCongestion, totalCorridorsMonitored: corridors.length },
      corridors
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { organizationId, corridorName, origin, destination, distanceKm, avgSpeedKmh, congestionScore, travelTimeMin, delayMinutes, activeVehicles, statusLevel } = body

    if (!organizationId || !corridorName || congestionScore === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const corridor = await prisma.corridorAnalytics.create({
      data: {
        organizationId,
        corridorName,
        origin: origin || "Terminal A",
        destination: destination || "Terminal B",
        distanceKm: Number(distanceKm || 10),
        avgSpeedKmh: Number(avgSpeedKmh || 35),
        congestionScore: Number(congestionScore),
        travelTimeMin: Number(travelTimeMin || 25),
        delayMinutes: Number(delayMinutes || 5),
        activeVehicles: Number(activeVehicles || 5),
        statusLevel: statusLevel || (congestionScore > 70 ? "SEVERE_CONGESTION" : congestionScore > 40 ? "MODERATE" : "LOW_TRAFFIC")
      }
    })

    return NextResponse.json({ success: true, corridor })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
