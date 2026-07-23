import { AIMessage, AIRequestContext, AIChatOptions, AIChatResponse, AIProviderType } from "../types"

export abstract class BaseAIAdapter {
  abstract providerName: AIProviderType
  abstract defaultModel: string

  /**
   * Generates a chat completion given a conversation history and request context
   */
  abstract generateChatCompletion(
    messages: AIMessage[],
    context?: AIRequestContext,
    options?: AIChatOptions
  ): Promise<AIChatResponse>

  /**
   * Constructs a secure system prompt incorporating tenant RBAC context
   */
  protected buildSystemPrompt(context?: AIRequestContext, customInstruction?: string): string {
    const baseInstruction = customInstruction || "You are SmartMove AI, an enterprise Decision Intelligence Copilot for the SmartMove Nigeria Transport Platform."
    
    if (!context) return baseInstruction

    return `
${baseInstruction}

Security & Tenant Access Context:
- Active Organization ID: ${context.organizationId || "N/A"}
- Active Workspace ID: ${context.workspaceId || "N/A"}
- Active Project ID: ${context.projectId || "N/A"}
- Active User Role: ${context.userRole || "VIEWER"}
- Current Route: ${context.currentRoute || "/"}

Constraint: Only provide analytical insights and data supported by the active tenant context. Do not invent unauthorized tenant data.
`.trim()
  }
}
