import { BaseAIAdapter } from "./adapters/base"
import { GeminiAdapter } from "./adapters/geminiAdapter"
import { OpenAIAdapter } from "./adapters/openaiAdapter"
import { FallbackAdapter } from "./adapters/fallbackAdapter"
import { AIProviderType } from "./types"

export class AIServiceFactory {
  /**
   * Instantiates an AI Provider Adapter. Falls back safely if API keys are missing.
   */
  static getAdapter(provider?: AIProviderType): BaseAIAdapter {
    const targetProvider = provider || (process.env.DEFAULT_AI_PROVIDER as AIProviderType) || "FALLBACK"

    switch (targetProvider) {
      case "GEMINI":
        if (process.env.GEMINI_API_KEY) return new GeminiAdapter()
        return new FallbackAdapter()

      case "OPENAI":
        if (process.env.OPENAI_API_KEY) return new OpenAIAdapter()
        return new FallbackAdapter()

      case "FALLBACK":
      default:
        return new FallbackAdapter()
    }
  }
}
