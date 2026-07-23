import * as React from "react"
import Link from "next/link"
import { Icons } from "@/lib/utils/icons"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Pane - Branding & Illustration */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex relative overflow-hidden">
        {/* Background Pattern Mockup */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur-md">
            <Icons.dashboard className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="font-display text-3xl font-bold tracking-tight">SmartMove</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h1 className="font-display text-5xl font-bold leading-tight">
            Transportation Intelligence for the Modern Enterprise.
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Harness real-time data, optimize fleet routes, and forecast revenue with our multi-tenant analytics platform.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} DixNova. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Right Pane - Form Content */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  )
}
