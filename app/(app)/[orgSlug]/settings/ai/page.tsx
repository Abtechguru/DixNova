import * as React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default async function AISettingsPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const providers = [
    { name: "Google Gemini", type: "GEMINI", model: "gemini-1.5-pro", status: "CONFIGURED" },
    { name: "OpenAI / Azure", type: "OPENAI", model: "gpt-4o", status: "AVAILABLE" },
    { name: "Fallback Engine", type: "FALLBACK", model: "deterministic-v1", status: "ACTIVE" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">AI Provider & Governance Settings</h1>
          <p className="text-foreground-secondary">Configure provider-agnostic models, token limits, and RBAC context rules.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((p, idx) => (
          <Card key={idx} className="hover:border-primary/50 transition-colors shadow-soft">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-semibold">{p.name}</CardTitle>
                <Badge variant={p.status === "ACTIVE" ? "success" : "outline"}>{p.status}</Badge>
              </div>
              <CardDescription>Default Model: {p.model}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="w-full">Configure Credentials</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Security & Context Bounds</CardTitle>
          <CardDescription>Enforce strict tenant data boundaries and audit logging.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-foreground-secondary">
          <div className="p-4 border border-surface rounded-xl bg-surface/30 space-y-1">
            <div className="font-semibold text-foreground">RBAC Tenant Isolation</div>
            <p>AI Copilot prompts automatically mask external tenant data and inject user role permissions.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
