"use client"

import * as React from "react"

export function LagosTransitBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Deep Midnight Background Base */}
      <div className="absolute inset-0 bg-[#07111F]" />

      {/* Soft Radial Ambient Glow Highlights */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-amber-400/10 blur-[140px] animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* SVG Vector Backdrop: Lagos Skylines, Bridges & Corridor Networks */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lagosRoadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFF00" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#07111F" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="bridgeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#162133" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Lagos Grid Mesh */}
        <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#162133" strokeWidth="0.8" opacity="0.4" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />

        {/* Eko & Third Mainland Bridge Vector Cable Structures (Low opacity) */}
        <g stroke="url(#bridgeGrad)" strokeWidth="1.5" fill="none" opacity="0.35">
          {/* Eko Bridge Suspension Arches */}
          <path d="M 100 850 Q 300 650 500 850" />
          <path d="M 500 850 Q 700 650 900 850" />
          <path d="M 900 850 Q 1100 650 1300 850" />
          
          {/* Vertical Cables */}
          <line x1="200" y1="725" x2="200" y2="850" />
          <line x1="300" y1="675" x2="300" y2="850" />
          <line x1="400" y1="725" x2="400" y2="850" />
          <line x1="600" y1="725" x2="600" y2="850" />
          <line x1="700" y1="675" x2="700" y2="850" />
          <line x1="800" y1="725" x2="800" y2="850" />
          <line x1="1000" y1="725" x2="1000" y2="850" />
          <line x1="1100" y1="675" x2="1100" y2="850" />
          <line x1="1200" y1="725" x2="1200" y2="850" />
        </g>

        {/* Lagos Arterial Corridors (Ikorodu BRT, Ikeja Express, Lekki-Epe Expressway, Oshodi Hub) */}
        {/* Corridor 1: Ikorodu to Island */}
        <path
          d="M 120 100 C 250 220, 380 350, 520 480 C 650 600, 780 720, 950 820"
          fill="none"
          stroke="url(#lagosRoadGrad)"
          strokeWidth="3"
        />
        <path
          d="M 120 100 C 250 220, 380 350, 520 480 C 650 600, 780 720, 950 820"
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2"
          className="animate-traffic"
        />

        {/* Corridor 2: Lekki-Epe Coastal Expressway */}
        <path
          d="M 450 780 C 680 750, 920 730, 1380 760"
          fill="none"
          stroke="#00D4FF"
          strokeWidth="2.5"
          opacity="0.7"
        />
        <path
          d="M 450 780 C 680 750, 920 730, 1380 760"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          className="animate-traffic"
        />

        {/* Corridor 3: Ikeja Express to Oshodi Hub */}
        <path
          d="M 280 200 C 400 320, 480 420, 750 500"
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Key Mobility Hub Location Nodes */}
        {/* Oshodi Interchange Hub */}
        <circle cx="520" cy="480" r="10" fill="#00D4FF" opacity="0.3" className="animate-ping" />
        <circle cx="520" cy="480" r="6" fill="#00D4FF" />
        <circle cx="520" cy="480" r="3" fill="#FFFFFF" />

        {/* Ikeja Terminal Node */}
        <circle cx="280" cy="200" r="8" fill="#FFFF00" opacity="0.3" className="animate-ping" />
        <circle cx="280" cy="200" r="5" fill="#FFFF00" />

        {/* Lekki Toll Node */}
        <circle cx="920" cy="730" r="8" fill="#FFFF00" opacity="0.3" className="animate-ping" />
        <circle cx="920" cy="730" r="5" fill="#FFFF00" />

        {/* Lagos Megacity Skyline Vector Silhouette (Low opacity bottom contour) */}
        <path
          d="M 0 900 L 0 820 L 40 820 L 40 760 L 70 760 L 70 820 L 110 820 L 110 740 L 150 740 L 150 820 L 220 820 L 220 700 L 260 700 L 260 820 L 320 820 L 320 730 L 370 730 L 370 820 L 450 820 L 450 850 L 1440 850 L 1440 900 Z"
          fill="#0B1526"
          opacity="0.9"
        />
      </svg>

      {/* Subtle Scanline Overlay Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07111F]/50 to-[#07111F]" />
    </div>
  )
}
