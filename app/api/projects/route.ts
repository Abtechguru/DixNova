import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"
import { hasProjectPermission } from "@/lib/auth/rbac"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")
    const workspaceId = searchParams.get("workspaceId")

    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Build the dynamic where clause based on tenant parameters
    const where: any = {}
    if (orgId) where.organizationId = orgId
    if (workspaceId) where.workspaceId = workspaceId

    const projects = await prisma.project.findMany({
      where,
      include: {
        organization: { select: { name: true, slug: true } },
        workspace: { select: { name: true } }
      },
      orderBy: { updatedAt: "desc" }
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("GET Projects Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { name, slug, orgId, workspaceId, client, description, category, tags, visibility } = body

    if (!name || !slug || !orgId || !workspaceId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Role verification logic could go here. For now, assume any logged in user can request creation,
    // but in a strict enterprise app you'd enforce PROJECT_MANAGER or ORG_ADMIN.

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        organizationId: orgId,
        workspaceId,
        client,
        description,
        category,
        tags: tags || [],
        visibility: visibility || "INTERNAL",
        status: "DRAFT"
      }
    })

    // Immediately grant the creator PROJECT_MANAGER permissions on the new project
    await prisma.userRole.create({
      data: {
        userId: session.userId,
        projectId: project.id,
        role: "PROJECT_MANAGER"
      }
    })

    // Audit Log
    await prisma.auditLog.create({
      data: {
        actorId: session.userId,
        action: "PROJECT_CREATED",
        organizationId: orgId,
        targetId: project.id,
        targetType: "PROJECT"
      }
    })

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error("POST Projects Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
