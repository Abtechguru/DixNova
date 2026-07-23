import { BaseAIAdapter } from "./base"
import { AIMessage, AIRequestContext, AIChatOptions, AIChatResponse, AIProviderType } from "../types"
import { prisma } from "@/lib/db/prisma"

export class FallbackAdapter extends BaseAIAdapter {
  providerName: AIProviderType = "FALLBACK"
  defaultModel = "smartmove-deterministic-v1"

  async generateChatCompletion(
    messages: AIMessage[],
    context?: AIRequestContext,
    options?: AIChatOptions
  ): Promise<AIChatResponse> {
    const startTime = Date.now()
    const lastUserMessage = messages.filter(m => m.role === "user").pop()?.content.toLowerCase() || ""

    let responseText = "I am SmartMove AI Assistant. I analyze and summarize Team DixNova's completed transport analytics, published KPIs, Power BI dashboards, and analyst recommendations."

    try {
      if (lastUserMessage.includes("kpi") || lastUserMessage.includes("metric") || lastUserMessage.includes("speed")) {
        const kpis = await prisma.kpi.findMany({ take: 5 })
        if (kpis.length > 0) {
          responseText = `**Published Reference KPIs:**\n` + kpis.map((k: any) => `- **${k.name}**: ${k.currentValue ?? "N/A"} ${k.unit || ""} (Target: ${k.targetValue ?? "N/A"})`).join("\n")
        } else {
          responseText = "No published KPI metadata found in database. Waiting for administrator to upload Team DixNova's KPI reference entries."
        }
      } else if (lastUserMessage.includes("insight") || lastUserMessage.includes("finding")) {
        const insights = await prisma.insight.findMany({ take: 3 })
        if (insights.length > 0) {
          responseText = `**Analyst Insights:**\n` + insights.map((i: any) => `- **${i.title}**: ${i.description}`).join("\n")
        } else {
          responseText = "No analyst insights published yet. Upload analyst findings via the Admin CMS."
        }
      } else if (lastUserMessage.includes("recommend") || lastUserMessage.includes("action")) {
        const recs = await prisma.recommendation.findMany({ take: 3 })
        if (recs.length > 0) {
          responseText = `**Executive Recommendations:**\n` + recs.map((r: any) => `- **${r.title}**: ${r.description} (Est. Cost: ${r.costEstimate || "TBD"})`).join("\n")
        } else {
          responseText = "No executive recommendations published yet. Waiting for administrator entries."
        }
      }
    } catch (e) {}

    return {
      content: responseText,
      provider: this.providerName,
      model: this.defaultModel,
      latencyMs: Date.now() - startTime
    }
  }
}
