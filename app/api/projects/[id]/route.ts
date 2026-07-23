import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        executiveSummary: true,
        problemStatement: true,
        objectives: { orderBy: { displayOrder: "asc" } },
        datasets: true,
        kpis: { orderBy: { displayOrder: "asc" } },
        powerBiReports: { orderBy: { displayOrder: "asc" } },
        insights: { orderBy: { createdAt: "desc" } },
        recommendations: true,
      }
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error("GET Project Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()

    // Example of filtering allowed fields to prevent overriding IDs
    const { name, client, description, category, status, visibility, isPublished, bannerUrl, logoUrl } = body

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        name,
        client,
        description,
        category,
        status,
        visibility,
        isPublished,
        bannerUrl,
        logoUrl
      }
    })

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: session.userId,
        action: "PROJECT_UPDATED",
        organizationId: project.organizationId,
        targetId: project.id,
        targetType: "PROJECT"
      }
    })

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error("PATCH Project Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
