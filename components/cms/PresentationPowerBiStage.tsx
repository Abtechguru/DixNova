"use client"

import * as React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/lib/utils/icons"
import { PowerBiZipVisualizer } from "@/components/powerbi/PowerBiZipVisualizer"

export interface PowerBiReport {
  id: string
  name: string
  category?: string
  description?: string
  workspaceId?: string
  reportId?: string
  embedUrl?: string
  zipUrl?: string
  entryPath?: string
  fileType?: string
  fileSizeBytes?: number
  isPublished?: boolean
  displayOrder?: number
}

export function PresentationPowerBiStage() {
  const [reports, setReports] = React.useState<PowerBiReport[]>([])
  const [activeIdx, setActiveIdx] = React.useState<number>(0)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const defaultFallback: PowerBiReport = {
    id: "default-pbi-group10",
    name: "HACKATHON GROUP 10 PROJECT.pbix",
    category: "Dashboard Package",
    description: "Uploaded Power BI Zip package (9 extracted files)",
    zipUrl: "/uploads/powerbi/zips/HACKATHON-GROUP-10-PROJECT.pbix--1-.zip",
    fileType: "ZIP_PACKAGE",
    fileSizeBytes: 608334,
    isPublished: true
  }

  React.useEffect(() => {
    fetch("/api/cms/powerbi")
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.reports) && res.reports.length > 0) {
          const published = res.reports.filter((r: PowerBiReport) => r.isPublished !== false)
          setReports(published.length > 0 ? published : [defaultFallback])
        } else {
          setReports([defaultFallback])
        }
      })
      .catch(() => {
        setReports([defaultFallback])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // Official Lagos Transport Analytics Empty State
  if (!isLoading && reports.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#162133]/90 border border-surface p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Low-opacity vector transport map backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#FFFF00_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Vector Transport Network Illustration */}
        <div className="relative z-10 space-y-4">
          <div className="h-20 w-20 rounded-2xl bg-[#FFFF00]/10 border border-[#FFFF00]/30 flex items-center justify-center text-[#FFFF00] mx-auto shadow-[0_0_40px_rgba(255,255,0,0.2)]">
            <Icons.powerbi className="h-10 w-10 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl font-display font-extrabold text-white tracking-tight">
              Lagos Transportation Analytics Briefing
            </h3>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              No analytics have been published yet. Upload a validated Power BI report package from the Admin Portal to begin presenting transportation insights.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Button size="sm" asChild className="bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-bold text-xs">
              <Link href="/admin">Launch Admin CMS Portal ↗</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const currentReport = reports[activeIdx] || reports[0]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      {/* Multiple Reports Selector Tabs if > 1 report */}
      {reports.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {reports.map((rpt, idx) => (
            <button
              key={rpt.id || idx}
              onClick={() => setActiveIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                idx === activeIdx
                  ? "bg-[#FFFF00] text-[#07111F] font-bold shadow-soft"
                  : "bg-card border border-surface text-foreground-secondary hover:text-white"
              }`}
            >
              📊 {rpt.name}
            </button>
          ))}
        </div>
      )}

      {/* Embedded Workspace or ZIP Package Visualizer */}
      {currentReport && (
        <PowerBiZipVisualizer
          reportData={{
            id: currentReport.id,
            name: currentReport.name,
            category: currentReport.category,
            description: currentReport.description,
            zipUrl: currentReport.zipUrl,
            entryPath: currentReport.entryPath,
            embedUrl: currentReport.embedUrl,
            fileCount: currentReport.fileSizeBytes ? Math.floor(currentReport.fileSizeBytes / 15000) + 1 : undefined,
            fileSizeBytes: currentReport.fileSizeBytes
          }}
        />
      )}
    </div>
  )
}
