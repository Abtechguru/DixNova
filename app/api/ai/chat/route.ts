import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { AIServiceFactory } from "@/lib/ai/aiServiceFactory"
import { AIMessage, AIRequestContext, AIProviderType } from "@/lib/ai/types"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { messages, context, provider } = body as {
      messages: AIMessage[]
      context?: AIRequestContext
      provider?: AIProviderType
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 })
    }

    // Enrich context with session details safely
    const enrichedContext: AIRequestContext = {
      ...context,
      userRole: session.roles[0]?.role || "VIEWER"
    }

    // Acquire provider adapter
    const adapter = AIServiceFactory.getAdapter(provider)
    const response = await adapter.generateChatCompletion(messages, enrichedContext)

    return NextResponse.json({ success: true, response })
  } catch (error: any) {
    console.error("AI Chat API Error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
