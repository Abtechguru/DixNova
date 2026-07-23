"use client"

import * as React from "react"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="h-screen w-screen max-h-screen max-w-vw overflow-hidden flex flex-col bg-background font-sans">
      {/* Blank Top Header Space */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  )
}
