import { BaseAIAdapter } from "./base"
import { AIMessage, AIRequestContext, AIChatOptions, AIChatResponse, AIProviderType } from "../types"

export class GeminiAdapter extends BaseAIAdapter {
  providerName: AIProviderType = "GEMINI"
  defaultModel = "gemini-1.5-pro"

  private apiKey: string

  constructor(apiKey?: string) {
    super()
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || ""
  }

  async generateChatCompletion(
    messages: AIMessage[],
    context?: AIRequestContext,
    options?: AIChatOptions
  ): Promise<AIChatResponse> {
    const startTime = Date.now()
    const model = options?.model || this.defaultModel
    const systemPrompt = this.buildSystemPrompt(context, options?.systemInstruction)

    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured")
    }

    try {
      // In production, invoke @google/generative-ai REST endpoint
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            ...messages.map(m => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }]
            }))
          ],
          generationConfig: {
            temperature: options?.temperature ?? 0.2,
            maxOutputTokens: options?.maxTokens ?? 1024
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.statusText}`)
      }

      const data = await response.json()
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated."

      return {
        content: textContent,
        provider: this.providerName,
        model,
        latencyMs: Date.now() - startTime
      }
    } catch (e: any) {
      throw new Error(`GeminiAdapter Failed: ${e.message}`)
    }
  }
}
