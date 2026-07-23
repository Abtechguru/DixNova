import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Icons } from "@/lib/utils/icons"

interface EmptyStateProps {
  title: string
  description: string
  actionText?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  actionText,
  onAction,
  icon
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-surface bg-card/50 my-6 space-y-4">
      <div className="p-4 bg-primary/10 text-primary rounded-2xl">
        {icon || <Icons.datasets className="h-8 w-8" />}
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-display font-bold text-foreground">{title}</h3>
        <p className="text-sm text-foreground-secondary leading-relaxed">{description}</p>
      </div>

      {actionText && (
        <Button onClick={onAction} variant="outline" size="sm" className="mt-2">
          {actionText}
        </Button>
      )}
    </div>
  )
}
