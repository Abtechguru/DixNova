import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "gradient" | "success"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25": variant === "default",
            "border border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white backdrop-blur-md": variant === "outline",
            "hover:bg-slate-800/60 text-slate-300 hover:text-white": variant === "ghost",
            "text-primary underline-offset-4 hover:underline": variant === "link",
            "bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:opacity-95": variant === "gradient",
            "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25": variant === "success",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-lg px-3 text-xs": size === "sm",
            "h-12 rounded-xl px-8 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
