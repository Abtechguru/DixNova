"use client"

import * as React from "react"
import Link from "next/link"
import { Icons } from "@/lib/utils/icons"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

// Interfaces
interface MediaAsset {
  id: string
  filename: string
  url: string
  fileType: string
  sizeBytes: number
  createdAt: string
}

interface PowerBiReport {
  id: string
  name: string
  category?: string
  description?: string
  workspaceId?: string
  reportId?: string
  embedUrl?: string
  isPublished?: boolean
  displayOrder?: number
}

interface TeamMember {
  id?: string
  name: string
  role: string
  avatarUrl?: string
  bio?: string
  order?: number
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<"video" | "media" | "powerbi" | "team" | "problem">("video")

  // Global Notification / Toast State
  const [toastMsg, setToastMsg] = React.useState<{ text: string; type: "success" | "error" } | null>(null)

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMsg({ text, type })
    setTimeout(() => setToastMsg(null), 4000)
  }

  // ---------------------------------------------------------------------------
  // 1. VIDEO STAGE STATE
  // ---------------------------------------------------------------------------
  const [videoUrl, setVideoUrl] = React.useState<string>("/open.mp4")
  const [isVideoUploading, setIsVideoUploading] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/cms/video")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.videoUrl) {
          setVideoUrl(res.videoUrl)
        }
      })
      .catch(() => {})
  }, [])

  const handleSaveVideo = async (urlToSave: string) => {
    setIsVideoUploading(true)
    try {
      const res = await fetch("/api/cms/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: urlToSave })
      })
      const data = await res.json()
      if (data.success) {
        setVideoUrl(urlToSave)
        showToast("Opening Story Video / Media successfully synced to presentation!")
      } else {
        showToast(data.error || "Failed to save video URL", "error")
      }
    } catch (err: any) {
      showToast("Error saving video to presentation database", "error")
    } finally {
      setIsVideoUploading(false)
    }
  }

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsVideoUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/cms/media", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (data.success && data.asset?.url) {
        await handleSaveVideo(data.asset.url)
        fetchMediaAssets()
      } else {
        showToast(data.error || "Failed to upload video file", "error")
      }
    } catch (err) {
      showToast("Upload failed", "error")
    } finally {
      setIsVideoUploading(false)
    }
  }

  // ---------------------------------------------------------------------------
  // 2. MEDIA LIBRARY STATE
  // ---------------------------------------------------------------------------
  const [mediaAssets, setMediaAssets] = React.useState<MediaAsset[]>([])
  const [mediaFilter, setMediaFilter] = React.useState<"ALL" | "IMAGE" | "VIDEO">("ALL")
  const [isMediaUploading, setIsMediaUploading] = React.useState(false)

  const fetchMediaAssets = () => {
    fetch("/api/cms/media")
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.assets)) {
          setMediaAssets(res.assets)
        }
      })
      .catch(() => {})
  }

  React.useEffect(() => {
    fetchMediaAssets()
  }, [])

  const handleGeneralFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsMediaUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append("file", files[i])
        const res = await fetch("/api/cms/media", {
          method: "POST",
          body: formData
        })
        const data = await res.json()
        if (!data.success) {
          showToast(data.error || "File upload failed", "error")
        }
      }
      showToast(`${files.length} media file(s) uploaded successfully!`)
      fetchMediaAssets()
    } catch (err) {
      showToast("File upload failed", "error")
    } finally {
      setIsMediaUploading(false)
      e.target.value = ""
    }
  }

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media asset?")) return
    try {
      const res = await fetch(`/api/cms/media?id=${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        showToast("Media asset deleted!")
        fetchMediaAssets()
      }
    } catch (err) {
      showToast("Failed to delete media asset", "error")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    showToast("URL copied to clipboard!")
  }

  const filteredMedia = mediaAssets.filter(asset => {
    if (mediaFilter === "IMAGE") return asset.fileType.startsWith("image/")
    if (mediaFilter === "VIDEO") return asset.fileType.startsWith("video/")
    return true
  })

  // ---------------------------------------------------------------------------
  // 3. POWER BI DASHBOARDS STATE
  // ---------------------------------------------------------------------------
  const [pbiReports, setPbiReports] = React.useState<PowerBiReport[]>([])
  const [isPbiLoading, setIsPbiLoading] = React.useState(false)
  const [isPbiZipUploading, setIsPbiZipUploading] = React.useState(false)
  const [editingPbi, setEditingPbi] = React.useState<Partial<PowerBiReport> | null>(null)
  const [pbiPreviewUrl, setPbiPreviewUrl] = React.useState<string>("")

  const fetchPbiReports = () => {
    setIsPbiLoading(true)
    fetch("/api/cms/powerbi")
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.reports)) {
          setPbiReports(res.reports)
        }
      })
      .catch(() => {})
      .finally(() => setIsPbiLoading(false))
  }

  React.useEffect(() => {
    fetchPbiReports()
  }, [])

  const handleZipFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsPbiZipUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    if (editingPbi?.name) formData.append("name", editingPbi.name)
    if (editingPbi?.category) formData.append("category", editingPbi.category)
    if (editingPbi?.description) formData.append("description", editingPbi.description)
    if (editingPbi?.id) formData.append("id", editingPbi.id)

    try {
      const res = await fetch("/api/cms/powerbi/upload-zip", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (data.success) {
        showToast(`Power BI ZIP package uploaded & extracted (${data.extraction?.fileCount || 0} files)!`)
        setEditingPbi(null)
        fetchPbiReports()
      } else {
        showToast(data.error || "ZIP upload failed", "error")
      }
    } catch (err) {
      showToast("Failed to upload ZIP package", "error")
    } finally {
      setIsPbiZipUploading(false)
      e.target.value = ""
    }
  }

  const handleSavePbi = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPbi?.name) {
      showToast("Report name is required", "error")
      return
    }

    try {
      const isEditing = Boolean(editingPbi.id)
      const url = "/api/cms/powerbi"
      const method = isEditing ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPbi)
      })

      const data = await res.json()
      if (data.success) {
        showToast(isEditing ? "Power BI report updated!" : "Power BI report created!")
        setEditingPbi(null)
        fetchPbiReports()
      } else {
        showToast(data.error || "Failed to save Power BI report", "error")
      }
    } catch (err) {
      showToast("Error saving Power BI report", "error")
    }
  }

  const handleDeletePbi = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Power BI report?")) return
    try {
      const res = await fetch(`/api/cms/powerbi?id=${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        showToast("Power BI report deleted!")
        fetchPbiReports()
      }
    } catch (err) {
      showToast("Failed to delete Power BI report", "error")
    }
  }

  const handleTogglePublishPbi = async (report: PowerBiReport) => {
    try {
      const res = await fetch("/api/cms/powerbi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: report.id, isPublished: !report.isPublished })
      })
      const data = await res.json()
      if (data.success) {
        showToast(`Report ${!report.isPublished ? "Published" : "Unpublished"}!`)
        fetchPbiReports()
      }
    } catch (err) {
      showToast("Failed to toggle publish status", "error")
    }
  }

  // ---------------------------------------------------------------------------
  // 4. TEAM MEMBERS STATE
  // ---------------------------------------------------------------------------
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([])
  const [editingMember, setEditingMember] = React.useState<Partial<TeamMember> | null>(null)

  const fetchTeamMembers = () => {
    fetch("/api/cms/team-members")
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setTeamMembers(res.data)
        }
      })
      .catch(() => {})
  }

  React.useEffect(() => {
    fetchTeamMembers()
  }, [])

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMember?.name || !editingMember?.role) {
      showToast("Name and role are required", "error")
      return
    }

    try {
      const isEditing = Boolean(editingMember.id)
      const method = isEditing ? "PUT" : "POST"
      const res = await fetch("/api/cms/team-members", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember)
      })
      const data = await res.json()
      if (data.success) {
        showToast(isEditing ? "Team member updated!" : "Team member added!")
        setEditingMember(null)
        fetchTeamMembers()
      } else {
        showToast(data.error || "Failed to save team member", "error")
      }
    } catch (err) {
      showToast("Error saving team member", "error")
    }
  }

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return
    try {
      const res = await fetch(`/api/cms/team-members?id=${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        showToast("Team member deleted!")
        fetchTeamMembers()
      }
    } catch (err) {
      showToast("Failed to delete team member", "error")
    }
  }

  // ---------------------------------------------------------------------------
  // 5. PROBLEM STATEMENT STATE
  // ---------------------------------------------------------------------------
  const [probSummary, setProbSummary] = React.useState("")
  const [probWho, setProbWho] = React.useState("")
  const [probWhat, setProbWhat] = React.useState("")
  const [probWhen, setProbWhen] = React.useState("")
  const [probWhere, setProbWhere] = React.useState("")
  const [probWhy, setProbWhy] = React.useState("")
  const [isProbSaving, setIsProbSaving] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/cms/problem-statement")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          const d = res.data
          setProbSummary(d.businessChallenge || "")
          setProbWho((d.whoDetails || []).join("\n"))
          setProbWhat((d.whatDetails || []).join("\n"))
          setProbWhen((d.whenDetails || []).join("\n"))
          setProbWhere((d.whereDetails || []).join("\n"))
          setProbWhy((d.whyDetails || []).join("\n"))
        }
      })
      .catch(() => {})
  }, [])

  const handleSaveProblemStatement = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProbSaving(true)
    try {
      const payload = {
        summary: probSummary,
        whoDetails: probWho.split("\n").filter(Boolean),
        whatDetails: probWhat.split("\n").filter(Boolean),
        whenDetails: probWhen.split("\n").filter(Boolean),
        whereDetails: probWhere.split("\n").filter(Boolean),
        whyDetails: probWhy.split("\n").filter(Boolean)
      }
      const res = await fetch("/api/cms/problem-statement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.success) {
        showToast("Problem statement updated and synced with Presentation Stage 03!")
      } else {
        showToast(data.error || "Failed to save problem statement", "error")
      }
    } catch (err) {
      showToast("Error saving problem statement", "error")
    } finally {
      setIsProbSaving(false)
    }
  }

  // Helper formatting for file sizes
  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pb-16">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md flex items-center gap-3 animate-slide-down ${
            toastMsg.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/90 border-rose-500/50 text-rose-200"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current animate-ping" />
          <span className="text-xs font-semibold">{toastMsg.text}</span>
        </div>
      )}

      {/* Main Admin Header */}
      <header className="border-b border-surface bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-inner">
              <Icons.dashboard className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-extrabold tracking-tight text-foreground">
                  DixNova Admin CMS Control Center
                </h1>
                <Badge variant="default" className="text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  LIVE SYNC
                </Badge>
              </div>
              <p className="text-xs text-foreground-secondary">
                Manage Media Uploads, Power BI Embedded Dashboards, Video Stages & Presentation Content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="/presentation" target="_blank">
                <Icons.website className="mr-1.5 h-3.5 w-3.5 text-primary" /> Presentation Portal ↗
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="/p/powerbi-dashboards" target="_blank">
                <Icons.powerbi className="mr-1.5 h-3.5 w-3.5 text-amber-500" /> Power BI Portal ↗
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-xs">
              <Link href="/">✕ Exit Admin</Link>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-1 border-t border-surface/50 overflow-x-auto">
          {[
            { id: "video", label: "🎥 Video & Opening Story", badge: "Stage 01" },
            { id: "media", label: "🖼️ Media Assets Library", badge: `${mediaAssets.length} Files` },
            { id: "powerbi", label: "📊 Power BI & Visualizations", badge: `${pbiReports.length} Embeds` },
            { id: "team", label: "👥 Team Members", badge: `${teamMembers.length} Members` },
            { id: "problem", label: "📝 Problem Statement (5 Ws)", badge: "Stage 03" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary bg-primary/5 font-bold"
                  : "border-transparent text-foreground-secondary hover:text-foreground hover:bg-surface/30"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] opacity-75 font-mono px-1.5 py-0.5 rounded bg-surface/80 border border-surface">
                {tab.badge}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex-1 w-full space-y-8">
        {/* ========================================================================= */}
        {/* TAB 1: VIDEO STAGE & OPENING STORY MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === "video" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border border-surface rounded-2xl bg-card p-6 space-y-6 shadow-soft">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface pb-4">
                <div>
                  <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                    <span>Presentation Opening Story Media</span>
                    <Badge variant="default" className="text-[10px]">STAGE 01</Badge>
                  </h2>
                  <p className="text-xs text-foreground-secondary">
                    Configure the MP4/WebM video or image displayed on Stage 01 (&quot;The Bigger Reality&quot;) in the presentation portal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg">
                    <Icons.media className="h-4 w-4" />
                    <span>{isVideoUploading ? "Uploading Video..." : "Upload New Video / Image"}</span>
                    <input
                      type="file"
                      accept="video/*,image/*"
                      className="hidden"
                      onChange={handleVideoFileUpload}
                      disabled={isVideoUploading}
                    />
                  </label>
                </div>
              </div>

              {/* Input for custom direct URL */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold text-foreground-secondary">
                  Active Media Source URL (Video MP4 or Image URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="e.g. /open.mp4 or https://domain.com/video.mp4"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-surface bg-surface/30 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
                  />
                  <Button
                    onClick={() => handleSaveVideo(videoUrl)}
                    disabled={isVideoUploading}
                    className="text-xs font-bold"
                  >
                    Save & Sync
                  </Button>
                </div>
              </div>

              {/* Live Preview Container */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-foreground-secondary font-bold">
                  LIVE PRESENTATION PREVIEW
                </span>
                <div className="relative w-full aspect-[16/9] max-h-[450px] bg-black rounded-2xl overflow-hidden border border-surface flex items-center justify-center shadow-2xl">
                  {videoUrl.match(/\.(jpeg|jpg|png|gif|webp|svg)($|\?)/i) || videoUrl.startsWith("data:image/") ? (
                    <img src={videoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <video
                      key={videoUrl}
                      src={videoUrl}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-mono text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>ACTIVE ON STAGE 01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MEDIA ASSETS LIBRARY */}
        {/* ========================================================================= */}
        {activeTab === "media" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border border-surface rounded-2xl bg-card p-6 space-y-6 shadow-soft">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface pb-4">
                <div>
                  <h2 className="text-lg font-bold font-display text-foreground">Media Assets & Upload Gallery</h2>
                  <p className="text-xs text-foreground-secondary">
                    Upload images, videos, and documents used across team member profiles, presentations, and reports.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 border border-surface rounded-xl p-1 bg-surface/30">
                    {(["ALL", "IMAGE", "VIDEO"] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setMediaFilter(type)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          mediaFilter === type ? "bg-primary text-primary-foreground" : "text-foreground-secondary hover:text-foreground"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg">
                    <Icons.media className="h-4 w-4" />
                    <span>{isMediaUploading ? "Uploading..." : "Upload Files"}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*,application/pdf"
                      className="hidden"
                      onChange={handleGeneralFileUpload}
                      disabled={isMediaUploading}
                    />
                  </label>
                </div>
              </div>

              {/* Gallery Grid */}
              {filteredMedia.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-surface rounded-2xl space-y-3">
                  <Icons.media className="h-10 w-10 text-foreground-secondary mx-auto" />
                  <h4 className="text-sm font-bold text-foreground">No Media Assets Uploaded Yet</h4>
                  <p className="text-xs text-foreground-secondary">
                    Click &quot;Upload Files&quot; above to add images and videos to the media library.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMedia.map(asset => (
                    <div
                      key={asset.id}
                      className="group border border-surface rounded-xl bg-card overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                        {asset.fileType.startsWith("image/") ? (
                          <img src={asset.url} alt={asset.filename} className="w-full h-full object-cover" />
                        ) : asset.fileType.startsWith("video/") ? (
                          <video src={asset.url} className="w-full h-full object-cover" />
                        ) : (
                          <div className="p-4 text-center">
                            <Icons.reports className="h-8 w-8 text-primary mx-auto" />
                            <span className="text-[10px] font-mono text-foreground-secondary">{asset.fileType}</span>
                          </div>
                        )}
                        <Badge variant="default" className="absolute top-2 right-2 text-[9px] uppercase font-mono bg-black/70 backdrop-blur-md">
                          {asset.fileType.split("/")[1] || "FILE"}
                        </Badge>
                      </div>

                      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground truncate" title={asset.filename}>
                            {asset.filename}
                          </p>
                          <p className="text-[10px] font-mono text-foreground-secondary">
                            {formatBytes(asset.sizeBytes)} • {new Date(asset.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-surface/50">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(asset.url)}
                            className="flex-1 text-[11px] py-1 h-7"
                          >
                            Copy URL
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMedia(asset.id)}
                            className="text-rose-500 hover:text-rose-400 hover:bg-rose-950/30 text-[11px] px-2 h-7"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: POWER BI DASHBOARDS & EMBEDS */}
        {/* ========================================================================= */}
        {activeTab === "powerbi" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border border-surface rounded-2xl bg-card p-6 space-y-6 shadow-soft">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface pb-4">
                <div>
                  <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                    <span>Power BI Embedded Visualizations Manager</span>
                    <Badge variant="default" className="text-[10px]">STAGE 11</Badge>
                  </h2>
                  <p className="text-xs text-foreground-secondary">
                    Create, edit, preview, and publish interactive Power BI reports to the presentation portal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg">
                    <Icons.projects className="h-4 w-4" />
                    <span>{isPbiZipUploading ? "Extracting ZIP..." : "📦 Upload & Extract ZIP Package"}</span>
                    <input
                      type="file"
                      accept=".zip,.pbix"
                      className="hidden"
                      onChange={handleZipFileUpload}
                      disabled={isPbiZipUploading}
                    />
                  </label>

                  <Button
                    onClick={() => {
                      setEditingPbi({
                        name: "Commuter Farebox Recovery Dashboard",
                        category: "Financial Intelligence",
                        description: "Interactive Cowry card revenue and trip density report.",
                        embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiOGZmMmRlMzgtN2ZlYS00ZTk0LTg3OWItZGYwN2Q1Y2E4OWUxIiwidCI6IjYxZDExMWJmLWFlNGItNGRjYi1hZDAyLTlhZTc3NDk5Mzk5YSJ9",
                        workspaceId: "ws-lagos-transit",
                        reportId: "rpt-farebox-01",
                        isPublished: true,
                        displayOrder: pbiReports.length + 1
                      })
                    }}
                    className="text-xs font-bold"
                  >
                    + Add Power BI Embed URL
                  </Button>
                </div>
              </div>

              {/* Form Modal / Panel for Creating/Editing */}
              {editingPbi && (
                <form onSubmit={handleSavePbi} className="p-5 border border-primary/40 rounded-2xl bg-surface/20 space-y-4">
                  <div className="flex items-center justify-between border-b border-surface/50 pb-2">
                    <h3 className="text-sm font-bold text-primary">
                      {editingPbi.id ? "Edit Power BI Report Embed" : "Add New Power BI Report Embed"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingPbi(null)}
                      className="text-xs text-foreground-secondary hover:text-foreground"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-foreground-secondary">Report Name *</label>
                      <input
                        type="text"
                        required
                        value={editingPbi.name || ""}
                        onChange={(e) => setEditingPbi({ ...editingPbi, name: e.target.value })}
                        placeholder="e.g. Lagos Corridor Farebox Dashboard"
                        className="w-full px-3 py-2 rounded-xl border border-surface bg-card text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-foreground-secondary">Category</label>
                      <input
                        type="text"
                        value={editingPbi.category || ""}
                        onChange={(e) => setEditingPbi({ ...editingPbi, category: e.target.value })}
                        placeholder="e.g. Traffic Management, Financials"
                        className="w-full px-3 py-2 rounded-xl border border-surface bg-card text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[11px] font-mono text-foreground-secondary">Power BI Embed URL (Iframe Public/Embedded URL)</label>
                      <input
                        type="text"
                        value={editingPbi.embedUrl || ""}
                        onChange={(e) => setEditingPbi({ ...editingPbi, embedUrl: e.target.value })}
                        placeholder="https://app.powerbi.com/view?r=..."
                        className="w-full px-3 py-2 rounded-xl border border-surface bg-card text-xs font-mono text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-foreground-secondary">Workspace ID</label>
                      <input
                        type="text"
                        value={editingPbi.workspaceId || ""}
                        onChange={(e) => setEditingPbi({ ...editingPbi, workspaceId: e.target.value })}
                        placeholder="ws-lagos-01"
                        className="w-full px-3 py-2 rounded-xl border border-surface bg-card text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-foreground-secondary">Report ID</label>
                      <input
                        type="text"
                        value={editingPbi.reportId || ""}
                        onChange={(e) => setEditingPbi({ ...editingPbi, reportId: e.target.value })}
                        placeholder="rpt-01"
                        className="w-full px-3 py-2 rounded-xl border border-surface bg-card text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[11px] font-mono text-foreground-secondary">Description</label>
                      <textarea
                        rows={2}
                        value={editingPbi.description || ""}
                        onChange={(e) => setEditingPbi({ ...editingPbi, description: e.target.value })}
                        placeholder="Brief summary of the insights presented by this report..."
                        className="w-full px-3 py-2 rounded-xl border border-surface bg-card text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-surface/50">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={editingPbi.isPublished !== false}
                        onChange={(e) => setEditingPbi({ ...editingPbi, isPublished: e.target.checked })}
                        className="rounded border-surface text-primary focus:ring-primary"
                      />
                      <span>Publish immediately to Presentation Portal</span>
                    </label>

                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setEditingPbi(null)}>
                        Cancel
                      </Button>
                      <Button type="submit" size="sm">
                        Save Power BI Report
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Reports Table / List */}
              <div className="space-y-4">
                {pbiReports.length === 0 ? (
                  <div className="p-12 text-center border-2 border-dashed border-surface rounded-2xl space-y-3">
                    <Icons.powerbi className="h-10 w-10 text-amber-500 mx-auto" />
                    <h4 className="text-sm font-bold text-foreground">No Power BI Dashboards Configured</h4>
                    <p className="text-xs text-foreground-secondary">
                      Add a Power BI Embed URL to visualize dashboards in Stage 11 of the presentation.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pbiReports.map((report) => (
                      <div
                        key={report.id}
                        className="border border-surface rounded-2xl bg-card p-5 space-y-4 shadow-sm hover:border-primary/50 transition-all"
                      >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-surface/50 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Icons.powerbi className="h-4 w-4 text-amber-500" />
                              <h4 className="font-bold font-display text-sm text-foreground">{report.name}</h4>
                              <Badge variant={report.isPublished ? "default" : "secondary"} className="text-[10px]">
                                {report.isPublished ? "PUBLISHED" : "DRAFT"}
                              </Badge>
                              {report.category && (
                                <span className="text-[10px] font-mono text-foreground-secondary px-2 py-0.5 bg-surface rounded">
                                  {report.category}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-foreground-secondary pt-1">{report.description}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTogglePublishPbi(report)}
                              className="text-xs py-1 h-8"
                            >
                              {report.isPublished ? "Unpublish" : "Publish"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingPbi(report)}
                              className="text-xs py-1 h-8"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePbi(report.id)}
                              className="text-rose-500 hover:text-rose-400 hover:bg-rose-950/30 text-xs py-1 h-8"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>

                        {/* Embed Preview Box */}
                        {report.embedUrl ? (
                          <div className="space-y-2">
                            <button
                              onClick={() => setPbiPreviewUrl(pbiPreviewUrl === report.embedUrl ? "" : (report.embedUrl || ""))}
                              className="text-xs text-primary hover:underline font-mono flex items-center gap-1"
                            >
                              <span>{pbiPreviewUrl === report.embedUrl ? "▼ Hide Live Preview" : "▶ Toggle Live Embed Preview"}</span>
                            </button>

                            {pbiPreviewUrl === report.embedUrl && (
                              <div className="w-full aspect-video max-h-[400px] bg-black rounded-xl overflow-hidden border border-surface shadow-inner">
                                <iframe src={report.embedUrl} title={report.name} className="w-full h-full border-0" allowFullScreen />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-4 bg-surface/30 rounded-xl text-xs font-mono text-foreground-secondary">
                            Workspace: {report.workspaceId} | Report ID: {report.reportId} (No direct Embed URL configured)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: TEAM MEMBERS CMS */}
        {/* ========================================================================= */}
        {activeTab === "team" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border border-surface rounded-2xl bg-card p-6 space-y-6 shadow-soft">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface pb-4">
                <div>
                  <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                    <span>Team DixNova CMS Editor</span>
                    <Badge variant="default" className="text-[10px]">STAGE 19</Badge>
                  </h2>
                  <p className="text-xs text-foreground-secondary">
                    Manage team member profile photos, names, roles, and ordering displayed on Stage 19.
                  </p>
                </div>

                <Button
                  onClick={() => setEditingMember({ name: "", role: "", avatarUrl: "", bio: "", order: teamMembers.length + 1 })}
                  className="text-xs font-bold"
                >
                  + Add Team Member
                </Button>
              </div>

              {/* Editing Form */}
              {editingMember && (
                <form onSubmit={handleSaveMember} className="p-6 border-2 border-[#FFFF00]/60 rounded-3xl bg-[#07111F] space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-base font-bold font-display text-[#FFFF00] flex items-center gap-2">
                      <span>{editingMember.id ? "✏️ Edit Team Member Details" : "➕ Add New Team Member"}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingMember(null)}
                      className="text-xs font-mono text-gray-400 hover:text-white px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-amber-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={editingMember.name || ""}
                        onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                        placeholder="e.g. Olasupo Akintunde Olusola"
                        className="w-full px-4 py-3 rounded-xl border border-white/30 bg-[#162133] text-sm font-bold text-white placeholder-gray-400 focus:outline-none focus:border-[#FFFF00] focus:ring-2 focus:ring-[#FFFF00]/50 shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-amber-300">Role / Title *</label>
                      <input
                        type="text"
                        required
                        value={editingMember.role || ""}
                        onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                        placeholder="e.g. Team Lead - Quality Assurance"
                        className="w-full px-4 py-3 rounded-xl border border-white/30 bg-[#162133] text-sm font-bold text-white placeholder-gray-400 focus:outline-none focus:border-[#FFFF00] focus:ring-2 focus:ring-[#FFFF00]/50 shadow-inner"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-mono font-bold text-amber-300">Avatar Photo URL / Direct Upload</label>
                      <div className="flex gap-3 items-center">
                        {editingMember.avatarUrl && (
                          <img
                            src={editingMember.avatarUrl}
                            alt="Avatar Preview"
                            className="h-12 w-12 rounded-full object-cover border-2 border-[#FFFF00] shrink-0 shadow-md"
                          />
                        )}
                        <input
                          type="text"
                          value={editingMember.avatarUrl || ""}
                          onChange={(e) => setEditingMember({ ...editingMember, avatarUrl: e.target.value })}
                          placeholder="https://... or /uploads/..."
                          className="flex-1 px-4 py-3 rounded-xl border border-white/30 bg-[#162133] text-xs font-mono text-white placeholder-gray-400 focus:outline-none focus:border-[#FFFF00] focus:ring-2 focus:ring-[#FFFF00]/50 shadow-inner"
                        />
                        <label className="cursor-pointer px-4 py-3 bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 rounded-xl text-xs font-black border border-[#FFFF00] flex items-center gap-1.5 shrink-0 shadow-md transition-all hover:scale-105">
                          <span>📷 Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const formData = new FormData()
                                formData.append("file", file)
                                try {
                                  const res = await fetch("/api/cms/media", { method: "POST", body: formData })
                                  const data = await res.json()
                                  if (data.success && data.asset?.url) {
                                    setEditingMember(prev => prev ? { ...prev, avatarUrl: data.asset.url } : null)
                                    showToast("Photo uploaded successfully!")
                                  } else {
                                    showToast(data.error || "Photo upload failed", "error")
                                  }
                                } catch (err) {
                                  showToast("Photo upload failed", "error")
                                } finally {
                                  e.target.value = ""
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                    <Button type="button" variant="outline" size="sm" onClick={() => setEditingMember(null)} className="text-xs border-white/20 text-white">
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-[#FFFF00] text-[#07111F] hover:bg-[#FFFF00]/90 font-black text-xs px-6 py-2.5 rounded-xl shadow-md">
                      💾 Save Team Member
                    </Button>
                  </div>
                </form>
              )}

              {/* Members List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border border-surface rounded-2xl bg-card p-4 space-y-3 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover border border-surface"
                      />
                      <div>
                        <h4 className="font-bold font-display text-sm text-foreground">{member.name}</h4>
                        <p className="text-xs text-primary font-semibold">{member.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-surface/50">
                      <Button variant="outline" size="sm" onClick={() => setEditingMember(member)} className="text-[11px] h-7 px-3">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => member.id && handleDeleteMember(member.id)}
                        className="text-rose-500 hover:text-rose-400 hover:bg-rose-950/30 text-[11px] h-7 px-2"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: PROBLEM STATEMENT (5 WS) */}
        {/* ========================================================================= */}
        {activeTab === "problem" && (
          <div className="space-y-6 animate-fade-in">
            <form onSubmit={handleSaveProblemStatement} className="border border-surface rounded-2xl bg-card p-6 space-y-6 shadow-soft">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface pb-4">
                <div>
                  <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                    <span>Problem Statement Framework (5 Ws)</span>
                    <Badge variant="default" className="text-[10px]">STAGE 03</Badge>
                  </h2>
                  <p className="text-xs text-foreground-secondary">
                    Update the core business challenge, Who, What, When, Where, and Why statements for Stage 03.
                  </p>
                </div>

                <Button type="submit" disabled={isProbSaving} className="text-xs font-bold">
                  {isProbSaving ? "Saving to Database..." : "Save & Sync Stage 03"}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-foreground">Business Challenge Summary</label>
                  <textarea
                    rows={2}
                    value={probSummary}
                    onChange={(e) => setProbSummary(e.target.value)}
                    placeholder="Describe the overarching urban mobility and transit challenge in Lagos..."
                    className="w-full px-4 py-2.5 rounded-xl border border-surface bg-surface/30 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-amber-500">WHO (Affected Stakeholders)</label>
                    <textarea
                      rows={3}
                      value={probWho}
                      onChange={(e) => setProbWho(e.target.value)}
                      placeholder="One detail per line..."
                      className="w-full px-3 py-2 rounded-xl border border-surface bg-surface/30 text-xs text-foreground focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-blue-500">WHAT (Core Problem)</label>
                    <textarea
                      rows={3}
                      value={probWhat}
                      onChange={(e) => setProbWhat(e.target.value)}
                      placeholder="One detail per line..."
                      className="w-full px-3 py-2 rounded-xl border border-surface bg-surface/30 text-xs text-foreground focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-purple-500">WHEN (Temporal Impact)</label>
                    <textarea
                      rows={3}
                      value={probWhen}
                      onChange={(e) => setProbWhen(e.target.value)}
                      placeholder="One detail per line..."
                      className="w-full px-3 py-2 rounded-xl border border-surface bg-surface/30 text-xs text-foreground focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-emerald-500">WHERE (Geographic Scope)</label>
                    <textarea
                      rows={3}
                      value={probWhere}
                      onChange={(e) => setProbWhere(e.target.value)}
                      placeholder="One detail per line..."
                      className="w-full px-3 py-2 rounded-xl border border-surface bg-surface/30 text-xs text-foreground focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-mono font-bold text-rose-500">WHY (Strategic Urgency & Consequences)</label>
                    <textarea
                      rows={3}
                      value={probWhy}
                      onChange={(e) => setProbWhy(e.target.value)}
                      placeholder="One detail per line..."
                      className="w-full px-3 py-2 rounded-xl border border-surface bg-surface/30 text-xs text-foreground focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}