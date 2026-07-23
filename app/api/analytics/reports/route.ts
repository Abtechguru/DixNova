import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")

    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const reports = await prisma.reportAsset.findMany({
      where: orgId ? { organizationId: orgId } : {},
      orderBy: { updatedAt: "desc" }
    })

    return NextResponse.json({ reports })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { organizationId, projectId, title, description, format, fileUrl, sizeBytes, category } = body

    if (!organizationId || !title || !fileUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const report = await prisma.reportAsset.create({
      data: {
        organizationId,
        projectId,
        title,
        description,
        format: format || "PDF",
        fileUrl,
        sizeBytes: Number(sizeBytes || 1024000),
        category: category || "EXECUTIVE_BRIEF"
      }
    })

    return NextResponse.json({ success: true, report })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
