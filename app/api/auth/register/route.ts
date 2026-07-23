import { NextResponse } from "next/server"
import { hashPassword } from "@/lib/auth/password"
import { prisma } from "@/lib/db/prisma"
import { createSessionCookie } from "@/lib/auth/session"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }

    // Hash password using native WebCrypto
    const passwordHash = await hashPassword(password)

    // Check if this is the very first user in the system
    const userCount = await prisma.user.count()
    const isFirstUser = userCount === 0

    // Create User
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    })

    // If first user, make them SUPER_ADMIN
    if (isFirstUser) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          role: "SUPER_ADMIN",
        },
      })
    }

    // Create session
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: Math.random().toString(36).substring(2) + Date.now().toString(36), // Simple token generation
        expiresAt,
        userAgent: request.headers.get("user-agent"),
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      },
    })

    const roles = await prisma.userRole.findMany({
      where: { userId: user.id },
      select: { role: true, organizationId: true, workspaceId: true, projectId: true },
    })

    // Set HttpOnly cookie
    await createSessionCookie({
      userId: user.id,
      email: user.email,
      sessionId: session.id,
      roles,
      expiresAt: expiresAt.toISOString(),
    })

    // Audit Log
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: "USER_REGISTERED",
        targetId: user.id,
        targetType: "USER",
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      }
    })

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
