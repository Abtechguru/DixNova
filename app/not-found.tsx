import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/lib/utils/icons"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-3xl">
        404
      </div>
      <h1 className="text-4xl font-display font-bold">Page or Resource Not Found</h1>
      <p className="text-foreground-secondary max-w-md">
        The transportation intelligence resource you requested could not be located or has been archived.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          Return to Platform Home <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
