import { cookies } from "next/headers"
import { NextRequest } from "next/server"

const SESSION_COOKIE_NAME = "smartmove_session"
const SECRET = process.env.JWT_SECRET || "smartmove-enterprise-secret-key-change-in-production"

export interface SessionPayload {
  userId: string
  email: string
  sessionId: string
  roles: Array<{
    role: string
    organizationId?: string | null
    workspaceId?: string | null
    projectId?: string | null
  }>
  expiresAt: string
}

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/")
  while (str.length % 4) str += "="
  return atob(str)
}

export async function encrypt(payload: any): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" }
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  
  const encoder = new TextEncoder()
  const data = encoder.encode(`${encodedHeader}.${encodedPayload}`)
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", key, data)
  const signatureArray = Array.from(new Uint8Array(signature))
  const encodedSignature = base64UrlEncode(String.fromCharCode(...signatureArray))
  
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const [encodedHeader, encodedPayload, signature] = parts
    
    const encoder = new TextEncoder()
    const data = encoder.encode(`${encodedHeader}.${encodedPayload}`)
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    )
    
    const rawSig = base64UrlDecode(signature)
    const signatureBytes = Uint8Array.from(rawSig, c => c.charCodeAt(0))
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, data)
    
    if (!isValid) return null
    return JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload
  } catch (e) {
    return null
  }
}

export async function createSessionCookie(sessionPayload: SessionPayload) {
  const expires = new Date(sessionPayload.expiresAt)
  const sessionToken = await encrypt(sessionPayload)

  cookies().set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
    path: "/",
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value
  if (!sessionCookie) return null
  return await decrypt(sessionCookie)
}

export async function updateSession(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!sessionCookie) return null

  const payload = await decrypt(sessionCookie)
  if (!payload) return null

  const newExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000)
  payload.expiresAt = newExpiration.toISOString()

  const res = new Response()
  res.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${await encrypt(payload)}; Path=/; HttpOnly; SameSite=Lax; Expires=${newExpiration.toUTCString()}${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  )
  return res
}

export function destroySession() {
  cookies().set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    sameSite: "lax",
    path: "/",
  })
}
