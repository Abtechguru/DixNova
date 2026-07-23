import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { AIServiceFactory } from "@/lib/ai/aiServiceFactory"
import { prisma } from "@/lib/db/prisma"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { projectId, dashboardType } = await request.json()

    // Fetch dashboard context if projectId provided
    let contextData = ""
    if (projectId) {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { kpis: true, insights: true }
      })
      if (project) {
        contextData = `Project: ${project.name}, KPIs: ${project.kpis.map((k: any) => `${k.name}=${k.currentValue}`).join(", ")}`
      }
    }

    const adapter = AIServiceFactory.getAdapter()
    const prompt = `Generate an executive narrative for the ${dashboardType || "Transport Mobility"} dashboard using context: ${contextData}`

    const response = await adapter.generateChatCompletion(
      [{ role: "user", content: prompt }],
      { projectId }
    )

    return NextResponse.json({ success: true, narration: response.content })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
