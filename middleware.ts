import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt, updateSession } from "@/lib/auth/session"

// Routes that do not require authentication
const publicRoutes = ["/", "/presentation", "/p", "/admin", "/login", "/register", "/design-system", "/api"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Check if the route is public
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next()
  }

  // 2. We only want to protect /app/* and /api/* (excluding /api/auth)
  const isAppRoute = pathname.startsWith("/app")
  const isApiRoute = pathname.startsWith("/api")

  if (!isAppRoute && !isApiRoute) {
    return NextResponse.next()
  }

  // 3. Verify Session
  const sessionCookie = request.cookies.get("smartmove_session")?.value
  
  if (!sessionCookie) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    // Redirect to login if accessing the app shell
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const payload = await decrypt(sessionCookie)
  
  if (!payload) {
    // Invalid token
    if (isApiRoute) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 4. Update session expiration (sliding window)
  const response = NextResponse.next()
  
  // Extend session in background
  const updatedSessionResponse = await updateSession(request)
  if (updatedSessionResponse) {
    const setCookieHeader = updatedSessionResponse.headers.get("Set-Cookie")
    if (setCookieHeader) {
      response.headers.set("Set-Cookie", setCookieHeader)
    }
  }

  // Attach Security Hardening Headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
