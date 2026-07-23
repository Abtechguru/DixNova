import * as React from "react"

export function ProgramWatermark() {
  return (
    <div className="fixed bottom-3 right-4 z-50 flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-card/90 backdrop-blur-md border border-surface shadow-2xl transition-transform hover:scale-105 select-none pointer-events-auto">
      {/* AI NOW BOOTCAMP Badge */}
      <div className="flex flex-col items-center justify-center rounded-xl bg-white p-1.5 shadow-md border border-purple-200">
        <div className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-[11px] tracking-tight">
          AI NOW
        </div>
        <div className="px-2 py-0.5 rounded bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-[9px] tracking-wider uppercase mt-0.5">
          BOOTCAMP
        </div>
      </div>

      {/* Divider */}
      <div className="h-7 w-[1px] bg-slate-300 dark:bg-slate-700" />

      {/* INCUBATOR Text */}
      <div className="flex flex-col text-left">
        <span className="font-display font-extrabold text-sm tracking-wider text-slate-900 dark:text-white uppercase leading-none">
          INCUBATOR
        </span>
        <span className="text-[9px] font-sans text-slate-500 dark:text-slate-400 font-medium leading-none mt-1">
          Deliberate and strategic Impact
        </span>
      </div>
    </div>
  )
}
