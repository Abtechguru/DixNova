"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/lib/utils/icons"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error("Next.js Error Boundary Caught:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="h-20 w-20 rounded-full bg-danger/10 flex items-center justify-center text-danger font-display font-bold text-3xl">
        500
      </div>
      <h1 className="text-4xl font-display font-bold">Unexpected Platform Incident</h1>
      <p className="text-foreground-secondary max-w-md">
        An isolated application error occurred. The incident has been logged for Site Reliability Engineering review.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} size="lg">
          <Icons.loader className="mr-2 h-4 w-4" /> Retry Request
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.location.href = "/"}>
          Return Home
        </Button>
      </div>
    </div>
  )
}
