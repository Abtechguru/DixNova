import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
}

export function Logo({ size = 'md', showSlogan = false, className, ...props }: LogoProps) {
  const iconDimensions = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }[size];

  return (
    <div className={cn("flex flex-col items-center group cursor-pointer shrink-0", className)} {...props}>
      <div className={cn("relative flex items-center justify-center shrink-0 rounded-xl bg-slate-900 border border-emerald-500/30 p-1 shadow-lg shadow-emerald-500/20", iconDimensions)}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Green DN Logo Symbol */}
          {/* D Outer Shape */}
          <path d="M 12 18 H 42 C 62 18 62 82 42 82 H 12 V 18 Z" fill="#10B981" />
          {/* D Inner Cutout */}
          <path d="M 24 30 H 40 C 50 30 50 70 40 70 H 24 V 30 Z" fill="#0f172a" />

          {/* Bar Chart & Trend Line Inside D */}
          <rect x="28" y="52" width="3.5" height="12" rx="1" fill="#10B981" />
          <rect x="34.5" y="44" width="3.5" height="20" rx="1" fill="#10B981" />
          <rect x="41" y="36" width="3.5" height="28" rx="1" fill="#10B981" />
          <path d="M 26 58 L 32 48 L 37 50 L 44 38" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="44" cy="38" r="2.5" fill="#34D399" />

          {/* N Shape */}
          <path d="M 52 18 H 63 L 78 62 V 18 H 88 V 82 H 77 L 62 38 V 82 H 52 V 18 Z" fill="#10B981" />

          {/* Pixel Squares Top Right N */}
          <rect x="80" y="10" width="4" height="4" fill="#34D399" />
          <rect x="86" y="10" width="4" height="4" fill="#10B981" />
          <rect x="86" y="4" width="4" height="4" fill="#059669" />
          <rect x="92" y="16" width="4" height="4" fill="#34D399" />
        </svg>
      </div>

      {showSlogan && (
        <p className="text-[10px] tracking-widest text-emerald-400 font-semibold uppercase mt-1">
          — Innovation driven by data —
        </p>
      )}
    </div>
  );
}
