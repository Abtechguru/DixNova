"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ProblemStatement5Ws } from "@/components/cms/ProblemStatement5Ws"
import { Icons } from "@/lib/utils/icons"

export default function AdminProblemStatementCMSPage() {
  const [summary, setSummary] = React.useState("Enterprise Transportation Congestion & Farebox Leakage Challenge")
  const [whoText, setWhoText] = React.useState("Lagos State Commuters & Bus Passengers\nBRT Operators & Fleet Dispatchers\nState Ministry Transport Authorities")
  const [whatText, setWhatText] = React.useState("Real-time fleet telemetry tracking\nAutomated corridor congestion alerts\nUnified Cowry card farebox reconciliation")
  const [whenText, setWhenText] = React.useState("Morning rush hours (07:00 - 09:30)\nEvening peak commutes (17:00 - 19:30)\nRainy season traffic slowdowns")
  const [whereText, setWhereText] = React.useState("Lekki-Epe Expressway Corridor\nThird Mainland Bridge Bottlenecks\nIkorodu - CMS BRT Routes")
  const [whyText, setWhyText] = React.useState("Reduce 45+ min average commuter delays\nRecover estimated ₦1.4B in annual revenue leaks\nBoost public transit efficiency by 25%+")

  const [saving, setSaving] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch("/api/cms/problem-statement")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          const d = res.data
          if (d.businessChallenge) setSummary(d.businessChallenge)
          if (d.whoDetails?.length) setWhoText(d.whoDetails.join("\n"))
          if (d.whatDetails?.length) setWhatText(d.whatDetails.join("\n"))
          if (d.whenDetails?.length) setWhenText(d.whenDetails.join("\n"))
          if (d.whereDetails?.length) setWhereText(d.whereDetails.join("\n"))
          if (d.whyDetails?.length) setWhyText(d.whyDetails.join("\n"))
        }
      })
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    const payload = {
      summary,
      whoDetails: whoText.split("\n").filter(Boolean),
      whatDetails: whatText.split("\n").filter(Boolean),
      whenDetails: whenText.split("\n").filter(Boolean),
      whereDetails: whereText.split("\n").filter(Boolean),
      whyDetails: whyText.split("\n").filter(Boolean)
    }

    try {
      const res = await fetch("/api/cms/problem-statement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.success) {
        setMessage("✓ 5 Ws Problem Statement published successfully to database!")
      } else {
        setMessage("Error saving: " + data.error)
      }
    } catch (e: any) {
      setMessage("Failed to connect to server.")
    } finally {
      setSaving(false)
    }
  }

  const parseLines = (text: string) => text.split("\n").filter(Boolean)

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface pb-6">
        <div>
          <Badge variant="default" className="mb-2">Admin CMS Editor</Badge>
          <h1 className="text-3xl font-display font-extrabold text-foreground">5 Ws Problem Statement Manager</h1>
          <p className="text-sm text-foreground-secondary">Edit and publish the 5 Ws problem statement template live across the platform.</p>
        </div>

        <Button onClick={handleSave} disabled={saving} size="lg" className="shadow-lg">
          {saving ? "Publishing..." : "Publish 5 Ws Statement"}
        </Button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.startsWith("✓") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-danger/10 text-danger border border-danger/30"}`}>
          {message}
        </div>
      )}

      {/* Editor Grid */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Problem Statement Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Problem Statement Summary</label>
            <Input 
              value={summary} 
              onChange={e => setSummary(e.target.value)} 
              placeholder="Summary of the main transportation challenge..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* WHO */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-400 uppercase">WHO? (Affecting)</label>
              <textarea 
                rows={6}
                className="w-full rounded-xl border border-surface bg-background p-3 text-xs focus:ring-1 focus:ring-primary"
                value={whoText}
                onChange={e => setWhoText(e.target.value)}
                placeholder="One detail per line..."
              />
            </div>

            {/* WHAT */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-yellow-400 uppercase">WHAT? (Unmet Need)</label>
              <textarea 
                rows={6}
                className="w-full rounded-xl border border-surface bg-background p-3 text-xs focus:ring-1 focus:ring-primary"
                value={whatText}
                onChange={e => setWhatText(e.target.value)}
                placeholder="One detail per line..."
              />
            </div>

            {/* WHEN */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase">WHEN? (Happening)</label>
              <textarea 
                rows={6}
                className="w-full rounded-xl border border-surface bg-background p-3 text-xs focus:ring-1 focus:ring-primary"
                value={whenText}
                onChange={e => setWhenText(e.target.value)}
                placeholder="One detail per line..."
              />
            </div>

            {/* WHERE */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase">WHERE? (Occurring)</label>
              <textarea 
                rows={6}
                className="w-full rounded-xl border border-surface bg-background p-3 text-xs focus:ring-1 focus:ring-primary"
                value={whereText}
                onChange={e => setWhereText(e.target.value)}
                placeholder="One detail per line..."
              />
            </div>

            {/* WHY */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-cyan-400 uppercase">WHY? (Worth Solving)</label>
              <textarea 
                rows={6}
                className="w-full rounded-xl border border-surface bg-background p-3 text-xs focus:ring-1 focus:ring-primary"
                value={whyText}
                onChange={e => setWhyText(e.target.value)}
                placeholder="One detail per line..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview Card */}
      <div className="space-y-3">
        <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
          <Icons.dashboard className="h-5 w-5 text-primary" /> Live Component Preview
        </h3>
        <ProblemStatement5Ws 
          summary={summary}
          who={{ details: parseLines(whoText) }}
          what={{ details: parseLines(whatText) }}
          when={{ details: parseLines(whenText) }}
          where={{ details: parseLines(whereText) }}
          why={{ details: parseLines(whyText) }}
        />
      </div>
    </div>
  )
}
