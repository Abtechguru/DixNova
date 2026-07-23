export type AIProviderType = "GEMINI" | "OPENAI" | "AZURE_OPENAI" | "CLAUDE" | "LOCAL_LLM" | "FALLBACK"

export interface AIMessage {
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string
}

export interface AIRequestContext {
  organizationId?: string
  workspaceId?: string
  projectId?: string
  userRole?: string
  currentRoute?: string
  dashboardData?: any
}

export interface AIChatOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  systemInstruction?: string
}

export interface AIChatResponse {
  content: string
  provider: AIProviderType
  model: string
  promptTokens?: number
  completionTokens?: number
  latencyMs: number
}
