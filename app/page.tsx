import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StartPresentationButton } from "@/components/landing/StartPresentationButton"

export default async function LandingPage() {
  return (
    <PublicLayout>
      <section className="h-full flex-1 flex flex-col items-center justify-center bg-background px-4 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-6xl sm:text-7xl font-display font-extrabold tracking-tight text-foreground leading-tight">
            DixNova
          </h1>

          <p className="text-2xl sm:text-3xl font-display font-semibold text-primary tracking-wide">
            Driven by Data
          </p>

          <div className="pt-6">
            <StartPresentationButton />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
