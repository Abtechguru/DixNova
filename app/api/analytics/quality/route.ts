import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const datasetId = searchParams.get("datasetId")

    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    if (!datasetId) {
      const scorecards = await prisma.dataQualityScorecard.findMany({
        include: { dataset: { select: { name: true, pipelineStage: true } } },
        orderBy: { updatedAt: "desc" }
      })
      return NextResponse.json({ scorecards })
    }

    const scorecard = await prisma.dataQualityScorecard.findUnique({
      where: { datasetId },
      include: { dataset: true, validationLogs: true }
    })

    if (!scorecard) return NextResponse.json({ error: "Scorecard not found" }, { status: 404 })

    return NextResponse.json({ scorecard })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
