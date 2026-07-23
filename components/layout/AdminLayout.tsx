"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/lib/utils/icons"
import { Button } from "@/components/ui/Button"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-surface bg-surface transition-all duration-300 md:sticky md:top-0 md:h-screen",
          isSidebarOpen ? "w-64" : "w-0 -translate-x-full md:w-20 md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-surface">
          {isSidebarOpen ? (
            <span className="font-display text-xl font-bold text-primary">SmartMove</span>
          ) : (
            <Icons.dashboard className="mx-auto h-6 w-6 text-primary" />
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <Icons.close className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {/* Navigation Links Mockup */}
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-colors hover:bg-primary/20">
            <Icons.dashboard className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Dashboard</span>}
          </Link>
          <Link href="/projects" className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground-secondary transition-colors hover:bg-surface hover:text-foreground">
            <Icons.projects className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Projects</span>}
          </Link>
          <Link href="/kpis" className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground-secondary transition-colors hover:bg-surface hover:text-foreground">
            <Icons.kpis className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">KPIs</span>}
          </Link>
        </nav>

        <div className="border-t border-surface p-4">
          <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground-secondary transition-colors hover:bg-surface hover:text-foreground">
            <Icons.settings className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Settings</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex w-full flex-col flex-1">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-surface bg-background/80 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex"
            >
              <Icons.menu className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Icons.menu className="h-5 w-5" />
            </Button>
            
            <div className="hidden lg:flex items-center bg-surface px-3 py-1.5 rounded-lg border border-surface">
              <Icons.search className="h-4 w-4 text-foreground-secondary mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-foreground-secondary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Icons.notifications className="h-5 w-5 text-foreground-secondary" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-sm font-medium text-primary">JD</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}
