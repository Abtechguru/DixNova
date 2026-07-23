"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icons } from "@/lib/utils/icons"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

export function PublicHeader() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/p/executive-summary", label: "Executive Summary" },
    { href: "/p/analytics-journey", label: "Analytics Journey" },
    { href: "/p/powerbi-dashboards", label: "Power BI Control Room" },
    { href: "/p/kpi-framework", label: "KPI Framework" },
    { href: "/p/insights", label: "Insights" },
    { href: "/p/recommendations", label: "Recommendations" },
  ]

  return (
    <header className="w-full bg-card/90 backdrop-blur-md border-b border-surface sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Attribution & Logo */}
        <Link href="/presentation" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground font-black flex items-center justify-center font-display shadow-md group-hover:scale-105 transition-transform">
            SN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
                DixNova SmartMove
              </span>
              <Badge variant="default" className="text-[9px] font-mono font-bold bg-primary text-primary-foreground px-1.5 py-0">
                GROUP 10
              </Badge>
            </div>
            <span className="text-[10px] font-mono text-foreground-secondary block -mt-0.5">
              Lagos Metropolitan Analytics Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold border border-primary/20"
                    : "text-foreground-secondary hover:text-foreground hover:bg-surface/50"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild className="hidden sm:inline-flex text-xs">
            <Link href="/admin">
              <Icons.settings className="mr-1.5 h-3.5 w-3.5" /> Admin CMS
            </Link>
          </Button>

          <Button size="sm" variant="default" asChild className="text-xs font-bold shadow-soft">
            <Link href="/presentation">
              19-Stage Deck ↗
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
