"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("admin@dixnova.com")
  const [password, setPassword] = React.useState("dixnova2026")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        // Fallback: If seed user doesn't exist yet, trigger initial admin session via app gateway
        const fallbackRes = await fetch("/api/auth/demo-session", { method: "POST" }).catch(() => null)
        if (fallbackRes && fallbackRes.ok) {
          router.push("/app")
          return
        }
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Invalid Admin Credentials")
      }

      router.push("/app")
      router.refresh()
    } catch (err: any) {
      // Direct bypass to app gateway for hackathon demonstration
      router.push("/app")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="default" className="px-3 py-1 text-xs font-mono uppercase tracking-widest">
            Enterprise Control Center
          </Badge>

          <h1 className="text-4xl font-display font-extrabold text-foreground tracking-tight">
            DixNova Admin
          </h1>

          <p className="text-sm text-primary font-semibold tracking-wide">
            Driven by Data
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-surface bg-card shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-display text-foreground">Admin Authentication</h2>
            <p className="text-xs text-foreground-secondary">
              Enter authorized administrator credentials to manage platform CMS, Power BI control rooms, and data scorecards.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-danger/10 p-3 text-xs text-danger border border-danger/20">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Admin Email</label>
              <Input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@dixnova.com" 
                required 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Admin Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                required 
              />
            </div>

            <Button type="submit" className="w-full py-6 font-bold shadow-lg" size="lg" disabled={isLoading}>
              {isLoading ? (
                <Icons.loader className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                "Access Admin Workspace"
              )}
            </Button>
          </form>

          <div className="pt-2 border-t border-surface text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleLogin()} 
              className="text-xs text-foreground-secondary hover:text-primary"
            >
              ⚡ 1-Click Quick Admin Demo Login
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-foreground-secondary hover:text-foreground">
            ← Return to DixNova Home
          </Link>
        </div>
      </div>
    </div>
  )
}
