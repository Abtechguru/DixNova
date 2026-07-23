import { NextResponse } from "next/server"
import { verifyPassword } from "@/lib/auth/password"
import { prisma } from "@/lib/db/prisma"
import { createSessionCookie } from "@/lib/auth/session"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
      }
    })

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const isValid = await verifyPassword(password, user.passwordHash)

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Account is disabled" },
        { status: 403 }
      )
    }

    // Create database session
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: Math.random().toString(36).substring(2) + Date.now().toString(36),
        expiresAt,
        userAgent: request.headers.get("user-agent"),
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      },
    })

    // Set cookie
    await createSessionCookie({
      userId: user.id,
      email: user.email,
      sessionId: session.id,
      roles: user.roles.map((r: any) => ({
        role: r.role,
        organizationId: r.organizationId,
        workspaceId: r.workspaceId,
        projectId: r.projectId
      })),
      expiresAt: expiresAt.toISOString(),
    })

    // Audit Log
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: "USER_LOGIN",
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      }
    })
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
