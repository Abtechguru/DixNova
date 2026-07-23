import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")

    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const transactions = await prisma.revenueTransaction.findMany({
      where: orgId ? { organizationId: orgId } : {},
      orderBy: { timestamp: "desc" },
      take: 100
    })

    const totalRevenueNgn = transactions.reduce((acc: number, t: any) => acc + (t.status === "SUCCESSFUL" ? t.amountNgn : 0), 0)
    const totalPassengersServed = transactions.reduce((acc: number, t: any) => acc + t.passengerCount, 0)

    return NextResponse.json({
      summary: { totalRevenueNgn, totalPassengersServed, transactionCount: transactions.length },
      transactions
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
    const { organizationId, corridorName, fareType, vehicleClass, passengerCount, amountNgn, status } = body

    if (!organizationId || !corridorName || amountNgn === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const transaction = await prisma.revenueTransaction.create({
      data: {
        organizationId,
        corridorName,
        fareType: fareType || "CARD",
        vehicleClass: vehicleClass || "STANDARD",
        passengerCount: Number(passengerCount || 1),
        amountNgn: Number(amountNgn),
        status: status || "SUCCESSFUL"
      }
    })

    return NextResponse.json({ success: true, transaction })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
