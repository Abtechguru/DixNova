import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")

    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const telemetry = await prisma.fleetTelemetry.findMany({
      where: orgId ? { organizationId: orgId } : {},
      orderBy: { timestamp: "desc" },
      take: 100
    })

    // Aggregations
    const activeVehicles = telemetry.filter((t: any) => t.status === "ACTIVE").length
    const avgSpeed = telemetry.length > 0 
      ? Math.round((telemetry.reduce((acc: number, t: any) => acc + t.speedKmh, 0) / telemetry.length) * 10) / 10 
      : 0
    const totalPassengers = telemetry.reduce((acc: number, t: any) => acc + t.passengerCount, 0)

    return NextResponse.json({
      summary: { activeVehicles, avgSpeed, totalPassengers, totalFleetCount: telemetry.length },
      telemetry
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
    const { organizationId, vehicleId, vehicleType, driverName, speedKmh, latitude, longitude, fuelLevelPct, passengerCount, status } = body

    if (!organizationId || !vehicleId || speedKmh === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const record = await prisma.fleetTelemetry.create({
      data: {
        organizationId,
        vehicleId,
        vehicleType: vehicleType || "BUS",
        driverName,
        speedKmh: Number(speedKmh),
        latitude: Number(latitude || 6.5244),
        longitude: Number(longitude || 3.3792),
        fuelLevelPct: Number(fuelLevelPct || 100),
        passengerCount: Number(passengerCount || 0),
        status: status || "ACTIVE"
      }
    })

    return NextResponse.json({ success: true, record })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
