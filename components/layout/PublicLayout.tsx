"use client"

import * as React from "react"
import { PublicHeader } from "@/components/layout/PublicHeader"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background font-sans text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      <PublicHeader />
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
    </div>
  )
}

