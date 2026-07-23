/**
 * AI Extension Interfaces for SmartMove Nigeria Platform
 * Ready for future integration with LLM Narration, Forecasting models, and Anomaly Detectors.
 */

export interface AINarrationRequest {
  contextType: "DASHBOARD" | "PROJECT" | "KPI_ALERT"
  contextId: string
  datasetPayload?: any
}

export interface AINarrationResponse {
  summary: string
  keyTakeaways: string[]
  recommendedActions: string[]
  confidenceScore: number
}

export interface AIForecastRequest {
  historicalData: Array<{ timestamp: string; value: number }>
  horizonPeriods: number
}

export interface AIForecastResponse {
  predictions: Array<{ timestamp: string; predictedValue: number; lowerBound: number; upperBound: number }>
}

export interface AIAnomalyDetectionResult {
  anomalyDetected: Boolean
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  explanation: string
  flaggedDataPoints: any[]
}

export abstract class AIAnalyticsExtensionService {
  abstract generateDashboardNarration(request: AINarrationRequest): Promise<AINarrationResponse>
  abstract forecastMetrics(request: AIForecastRequest): Promise<AIForecastResponse>
  abstract detectDataAnomalies(datasetId: string): Promise<AIAnomalyDetectionResult>
}
