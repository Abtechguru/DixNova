"use client"

import * as React from "react"
import Link from "next/link"
import { Icons } from "@/lib/utils/icons"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

interface PowerBiReport {
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
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false)

  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    fetch("/api/cms/powerbi")
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.reports)) {
          const published = res.reports.filter((r: PowerBiReport) => r.isPublished !== false)
          setReports(published)
        }
      })
      .catch(() => {
        setReports([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (!isLoading && reports.length === 0) {
    return (
      <div className="w-full bg-card border border-surface rounded-2xl p-8 text-center space-y-3 shadow-2xl">
        <Icons.powerbi className="h-10 w-10 text-primary/70 mx-auto" />
        <h3 className="text-base font-bold font-display text-foreground">No Published Power BI Control Rooms</h3>
        <p className="text-xs text-foreground-secondary max-w-md mx-auto">
          Administrator has not published a Power BI embed report or ZIP package yet. Upload and configure reports in the Admin CMS.
        </p>
      </div>
    )
  }

  const currentReport = reports[activeIdx] || reports[0]

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  return (
    <div ref={containerRef} className="w-full bg-card border border-surface rounded-2xl p-4 md:p-6 shadow-2xl space-y-4">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-surface pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Icons.powerbi className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base text-foreground">
                {currentReport.name}
              </h3>
              {currentReport.category && (
                <Badge variant="default" className="text-[10px] bg-primary/20 text-primary border-primary/30">
                  {currentReport.category}
                </Badge>
              )}
              {currentReport.fileType === "ZIP_PACKAGE" && (
                <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                  📦 ZIP PACKAGE
                </Badge>
              )}
            </div>
            <p className="text-xs text-foreground-secondary line-clamp-1">
              {currentReport.description || "Live Power BI Embedded Visualization Control Room"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {currentReport.zipUrl && (
            <Button variant="outline" size="sm" asChild className="text-xs">
              <a href={currentReport.zipUrl} download>
                📥 Download ZIP
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={toggleFullscreen} className="text-xs">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
          <Button variant="default" size="sm" asChild className="text-xs">
            <Link href="/p/powerbi-dashboards" target="_blank">
              Open Full Portal ↗
            </Link>
          </Button>
        </div>
      </div>

      {/* Report Switcher Tabs */}
      {reports.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {reports.map((rep, idx) => (
            <button
              key={rep.id || idx}
              onClick={() => setActiveIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${
                idx === activeIdx
                  ? "bg-primary text-primary-foreground border-primary font-semibold shadow-md"
                  : "bg-surface/50 hover:bg-surface text-foreground-secondary border-surface"
              }`}
            >
              <Icons.powerbi className="h-3.5 w-3.5" />
              <span>{rep.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Embed Display Container */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] max-h-[600px] bg-black rounded-xl overflow-hidden border border-surface shadow-inner">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-surface/30">
            <Icons.loader className="h-8 w-8 text-primary animate-spin" />
            <p className="text-xs font-mono text-foreground-secondary">Loading Embedded Power BI Visualizations...</p>
          </div>
        ) : currentReport.embedUrl ? (
          <iframe
            key={currentReport.embedUrl}
            src={currentReport.embedUrl}
            title={currentReport.name}
            className="w-full h-full border-0 rounded-xl"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-surface/20">
            <Icons.powerbi className="h-12 w-12 text-primary/60" />
            <div className="space-y-1 max-w-md">
              <h4 className="text-sm font-bold font-display text-foreground">{currentReport.name}</h4>
              <p className="text-xs text-foreground-secondary">
                Report ID: <code className="text-primary">{currentReport.reportId}</code> | Workspace ID: <code className="text-primary">{currentReport.workspaceId}</code>
              </p>
              <p className="text-xs text-foreground-secondary pt-2">
                Configure direct Power BI Embed URL in the Admin CMS to enable full interactive iframe viewing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
