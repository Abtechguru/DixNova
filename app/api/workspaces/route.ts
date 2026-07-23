import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"
import { hasOrgPermission } from "@/lib/auth/rbac"

// GET /api/workspaces?orgId=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")

    if (!orgId) return NextResponse.json({ error: "orgId required" }, { status: 400 })

    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Users with any org role or specific workspace roles can see workspaces
    const orgRole = session.roles.find(r => r.organizationId === orgId || r.role === "SUPER_ADMIN")
    const workspaceRoles = session.roles.filter(r => r.workspaceId != null)

    if (!orgRole && workspaceRoles.length === 0) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const workspaces = await prisma.workspace.findMany({
      where: orgRole ? { organizationId: orgId } : { id: { in: workspaceRoles.map(r => r.workspaceId!) } }
    })

    return NextResponse.json({ workspaces })
  } catch (error) {
    console.error("GET Workspaces Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/workspaces
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { name, slug, orgId, description } = await request.json()

    if (!name || !slug || !orgId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Require ORG_ADMIN or SUPER_ADMIN
    if (!hasOrgPermission(session, orgId, "ORG_ADMIN" as any)) {
      return NextResponse.json({ error: "Forbidden: Requires ORG_ADMIN" }, { status: 403 })
    }

    const workspace = await prisma.workspace.create({
      data: { name, slug, description, organizationId: orgId }
    })

    // Assign creator as PROJECT_MANAGER of this workspace
    await prisma.userRole.create({
      data: {
        userId: session.userId,
        workspaceId: workspace.id,
        role: "PROJECT_MANAGER"
      }
    })

    await prisma.auditLog.create({
      data: {
        actorId: session.userId,
        action: "WORKSPACE_CREATED",
        organizationId: orgId,
        targetId: workspace.id,
        targetType: "WORKSPACE"
      }
    })

    return NextResponse.json({ success: true, workspace })
  } catch (error) {
    console.error("POST Workspaces Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
