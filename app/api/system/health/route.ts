import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

export async function GET() {
  const startTime = Date.now()
  let dbStatus = "HEALTHY"
  let dbLatencyMs = 0

  try {
    const dbStart = Date.now()
    await prisma.$runCommandRaw({ ping: 1 })
    dbLatencyMs = Date.now() - dbStart
  } catch (e) {
    dbStatus = "DEGRADED"
  }

  const payload = {
    status: dbStatus === "HEALTHY" ? "OPERATIONAL" : "DEGRADED",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0-production-release",
    services: {
      api: { status: "HEALTHY", latencyMs: Date.now() - startTime },
      database: { status: dbStatus, latencyMs: dbLatencyMs, provider: "MongoDB Atlas" },
      aiService: { status: "HEALTHY", provider: process.env.DEFAULT_AI_PROVIDER || "FALLBACK" },
      powerBiEmbeds: { status: "OPERATIONAL" },
      fileStorage: { status: "HEALTHY", mode: "LOCAL_UPLOADS" }
    }
  }

  return NextResponse.json(payload)
}
