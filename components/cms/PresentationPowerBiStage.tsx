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

  const currentReport = reports[activeIdx] || reports[0] || defaultFallback

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 my-2">
      
      {/* EXECUTIVE KEYNOTE DASHBOARD FRAME */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#162133]/90 border border-white/10 space-y-4 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-[#FFFF00] text-[#07111F] font-mono text-[9px] font-black">
                AUTHORITATIVE POWER BI SUBMISSION
              </Badge>
              <span className="text-xs font-mono text-cyan-300">Team DixNova • Group 10</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
              SmartMove Nigeria Transportation Intelligence Control Room
            </h2>
          </div>

          <Badge variant="outline" className="text-xs font-mono text-[#FFFF00] border-[#FFFF00]/40">
            2022–2024 VERIFIED ANALYTICS AUDIT
          </Badge>
        </div>

        {/* 3-QUESTION EXECUTIVE STORYTELLING FRAME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#07111F] border border-sky-500/30 space-y-1">
            <div className="text-[10px] font-mono font-bold text-sky-400 uppercase">1. WHAT HAPPENED? (DESCRIPTIVE)</div>
            <p className="text-xs text-gray-300 leading-snug">
              400 buses carried 131,000+ passengers generating <strong className="text-emerald-400">₦70.6M revenue</strong> against <strong className="text-rose-400">₦159.8M maintenance cost</strong> (₦89.2M deficit).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07111F] border border-amber-500/30 space-y-1">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">2. WHY DID IT HAPPEN? (DIAGNOSTIC)</div>
            <p className="text-xs text-gray-300 leading-snug">
              Top 5 busiest routes run negative operating margin due to un-staggered peak schedules (Surulere 7am vs Yaba-Epe 9pm) and Epe-Berger 19m depot delays.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07111F] border border-emerald-500/30 space-y-1">
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">3. WHAT SHOULD MANAGEMENT DO? (PRESCRIPTIVE)</div>
            <p className="text-xs text-gray-300 leading-snug">
              Implement staggered fleet scheduling, enforce 5,000 km preventive maintenance, replace persistent breakdown buses, and track cost by depot.
            </p>
          </div>
        </div>
      </div>

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
                  : "bg-[#162133] border border-white/10 text-gray-300 hover:text-white"
              }`}
            >
              📊 {rpt.name}
            </button>
          ))}
        </div>
      )}

      {/* Primary Power BI Report Component */}
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
