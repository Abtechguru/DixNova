"use client"

import * as React from "react"
import { Icons } from "@/lib/utils/icons"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

export interface PowerBiEmbedViewerProps {
  name: string
  category?: string
  description?: string
  embedUrl?: string | null
  zipUrl?: string | null
  fileType?: string | null
  workspaceId?: string | null
  reportId?: string | null
  fileSizeBytes?: number | null
  className?: string
}

export function PowerBiEmbedViewer({
  name,
  category,
  description,
  embedUrl,
  zipUrl,
  fileType,
  workspaceId,
  reportId,
  fileSizeBytes,
  className = ""
}: PowerBiEmbedViewerProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [hasError, setHasError] = React.useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  const formatBytes = (bytes?: number | null) => {
    if (!bytes) return null
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-2xl border border-surface bg-card p-4 sm:p-6 shadow-soft space-y-4 ${className}`}
    >
      {/* Header bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-surface pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
            <Icons.powerbi className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display font-bold text-base text-foreground">
                {name}
              </h3>
              {category && (
                <Badge variant="default" className="text-[10px] bg-primary/20 text-primary border-primary/30">
                  {category}
                </Badge>
              )}
              {fileType === "ZIP_PACKAGE" && (
                <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                  📦 EXTRACTED ZIP PACKAGE
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-xs text-foreground-secondary line-clamp-1 mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {fileSizeBytes && (
            <span className="text-[11px] font-mono text-foreground-secondary px-2.5 py-1 rounded-lg bg-surface border border-surface">
              {formatBytes(fileSizeBytes)}
            </span>
          )}

          {zipUrl && (
            <Button variant="outline" size="sm" asChild className="text-xs">
              <a href={zipUrl} download>
                📥 Download Package
              </a>
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={toggleFullscreen} className="text-xs">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
        </div>
      </div>

      {/* Embed Container Frame */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] max-h-[640px] bg-black rounded-xl overflow-hidden border border-surface shadow-inner">
        {isLoading && !hasError && embedUrl && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-3 bg-surface/80 backdrop-blur-sm">
            <Icons.loader className="h-8 w-8 text-primary animate-spin" />
            <p className="text-xs font-mono text-foreground-secondary">Loading Embedded Power BI Visualizations...</p>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-surface/30">
            <Icons.powerbi className="h-10 w-10 text-danger" />
            <div className="space-y-1 max-w-md">
              <h4 className="text-sm font-bold font-display text-foreground">Failed to Load Report Embed</h4>
              <p className="text-xs text-foreground-secondary">
                Please check the iframe URL or network connectivity to Power BI servers.
              </p>
            </div>
          </div>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            title={name}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            className="w-full h-full border-0 rounded-xl"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-surface/20">
            <Icons.powerbi className="h-12 w-12 text-primary/60" />
            <div className="space-y-1 max-w-md">
              <h4 className="text-sm font-bold font-display text-foreground">{name}</h4>
              {reportId && (
                <p className="text-xs text-foreground-secondary">
                  Report ID: <code className="text-primary">{reportId}</code> | Workspace ID: <code className="text-primary">{workspaceId || "default"}</code>
                </p>
              )}
              <p className="text-xs text-foreground-secondary pt-2">
                Configure direct Power BI Embed URL or upload a report ZIP package in the Admin CMS to render interactive visualizations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
