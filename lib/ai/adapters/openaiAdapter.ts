import { BaseAIAdapter } from "./base"
import { AIMessage, AIRequestContext, AIChatOptions, AIChatResponse, AIProviderType } from "../types"

export class OpenAIAdapter extends BaseAIAdapter {
  providerName: AIProviderType = "OPENAI"
  defaultModel = "gpt-4o"

  private apiKey: string

  constructor(apiKey?: string) {
    super()
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || ""
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
      throw new Error("OPENAI_API_KEY is not configured")
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content }))
          ],
          temperature: options?.temperature ?? 0.2,
          max_tokens: options?.maxTokens ?? 1024
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.statusText}`)
      }

      const data = await response.json()
      const content = data.choices?.[0]?.message?.content || "No content."

      return {
        content,
        provider: this.providerName,
        model,
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
        latencyMs: Date.now() - startTime
      }
    } catch (e: any) {
      throw new Error(`OpenAIAdapter Failed: ${e.message}`)
    }
  }
}
