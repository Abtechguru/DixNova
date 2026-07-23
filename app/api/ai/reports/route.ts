import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { AIServiceFactory } from "@/lib/ai/aiServiceFactory"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { reportType, title, keyTakeaways } = await request.json()

    const adapter = AIServiceFactory.getAdapter()
    const prompt = `Write a formal ${reportType || "Executive Brief"} titled "${title || "SmartMove Transport Assessment"}" incorporating points: ${keyTakeaways || "Fleet speed optimal, fare collection digital"}.`

    const response = await adapter.generateChatCompletion([
      { role: "user", content: prompt }
    ])

    return NextResponse.json({ success: true, reportContent: response.content })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
