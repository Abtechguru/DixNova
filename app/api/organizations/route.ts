import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

// GET /api/organizations
// Returns all organizations the current user belongs to
export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const userOrgs = await prisma.userRole.findMany({
      where: { userId: session.userId, organizationId: { not: null } },
      include: {
        organization: {
          include: { branding: true }
        }
      }
    })

    const organizations = userOrgs.map((r: any) => r.organization)

    return NextResponse.json({ organizations })
  } catch (error) {
    console.error("GET Organizations Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/organizations
// Creates a new organization and assigns the creator as ORG_ADMIN
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { name, slug } = await request.json()

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Verify slug uniqueness
    const existing = await prisma.organization.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: "Organization slug already taken" }, { status: 409 })
    }

    // Transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx: any) => {
      // 1. Create Org
      const org = await tx.organization.create({
        data: { name, slug }
      })

      // 2. Create Default Branding
      await tx.organizationBranding.create({
        data: { organizationId: org.id, primaryColor: "#FFFF00" }
      })

      // 3. Assign User as ORG_ADMIN
      await tx.userRole.create({
        data: {
          userId: session.userId,
          organizationId: org.id,
          role: "ORG_ADMIN"
        }
      })

      // 4. Audit Log
      await tx.auditLog.create({
        data: {
          actorId: session.userId,
          action: "ORGANIZATION_CREATED",
          organizationId: org.id,
          targetId: org.id,
          targetType: "ORGANIZATION"
        }
      })

      return org
    })

    // Note: Session cookie holds cached roles, so in a real app, 
    // the client should request a token refresh or we should update the session cookie here.

    return NextResponse.json({ success: true, organization: result })
  } catch (error) {
    console.error("POST Organizations Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
