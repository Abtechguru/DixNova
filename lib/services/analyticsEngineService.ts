import { prisma } from "@/lib/db/prisma"

export interface AnalyticsStageProgress {
  stage: "DRAFT" | "VALIDATED" | "MODELED" | "PUBLISHED"
  completionPct: number
  datasetCount: number
  kpiCount: number
  dashboardCount: number
}

export class AnalyticsEngineService {
  /**
   * Tracks project presentation stage based on Team DixNova's metadata records
   */
  static async calculateProjectAnalyticsProgress(projectId: string): Promise<AnalyticsStageProgress> {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        datasets: true,
        kpis: true,
        powerBiReports: true,
      }
    })

    if (!project) {
      return { stage: "DRAFT", completionPct: 0, datasetCount: 0, kpiCount: 0, dashboardCount: 0 }
    }

    let completionPct = 10
    if (project.datasets.length > 0) completionPct += 25
    if (project.datasets.some((d: any) => d.pipelineStage === "APPROVED")) completionPct += 20
    if (project.kpis.length > 0) completionPct += 20
    if (project.powerBiReports.length > 0) completionPct += 15
    if (project.isPublished) completionPct = 100

    let stage: "DRAFT" | "VALIDATED" | "MODELED" | "PUBLISHED" = "DRAFT"
    if (project.isPublished) stage = "PUBLISHED"
    else if (project.powerBiReports.length > 0) stage = "MODELED"
    else if (project.datasets.some((d: any) => d.pipelineStage === "VALIDATED")) stage = "VALIDATED"

    return {
      stage,
      completionPct,
      datasetCount: project.datasets.length,
      kpiCount: project.kpis.length,
      dashboardCount: project.powerBiReports.length
    }
  }
}
