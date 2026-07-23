import { NextResponse } from "next/server"
import { destroySession, getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/db/prisma"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    
    if (session) {
      // Remove from database
      await prisma.session.deleteMany({
        where: { id: session.sessionId }
      })
      
      // Audit log
      await prisma.auditLog.create({
        data: {
          actorId: session.userId,
          action: "USER_LOGOUT",
          ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        }
      })
    }

    // Remove HttpOnly cookie
    destroySession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    // Even if db query fails, ensure cookie is destroyed
    destroySession()
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
