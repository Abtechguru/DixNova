import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/lib/utils/icons"

interface PageNavigationFooterProps {
  prevTitle?: string
  prevSlug?: string
  nextTitle?: string
  nextSlug?: string
}

export function PageNavigationFooter({ prevTitle, prevSlug, nextTitle, nextSlug }: PageNavigationFooterProps) {
  return (
    <div className="py-4 border-t border-surface flex items-center justify-between gap-4 mt-auto">
      {prevSlug ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={prevSlug}>
            <Icons.chevronRight className="rotate-180 mr-2 h-4 w-4" /> Previous: {prevTitle}
          </Link>
        </Button>
      ) : <div />}

      {nextSlug && (
        <Button size="sm" asChild>
          <Link href={nextSlug}>
            Next: {nextTitle} <Icons.chevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}
