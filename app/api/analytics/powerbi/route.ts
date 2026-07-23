import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { projectId, name, workspaceId, reportId, embedUrl } = body

    if (!projectId || !name || !workspaceId || !reportId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const report = await prisma.powerBiReport.create({
      data: {
        projectId,
        name,
        workspaceId,
        reportId,
        embedUrl
      }
    })

    return NextResponse.json({ success: true, report })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
