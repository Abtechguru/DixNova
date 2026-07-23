"use client"

import * as React from "react"
import { Icons } from "@/lib/utils/icons"

export function BiggerRealityVideoStage() {
  const [showVideo, setShowVideo] = React.useState(false)
  const [videoUrl, setVideoUrl] = React.useState<string>("/open.mp4")
  const [isUploading, setIsUploading] = React.useState(false)

  // Fetch persisted video URL from MongoDB database on load
  React.useEffect(() => {
    fetch("/api/cms/video")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.videoUrl) {
          setVideoUrl(res.videoUrl)
        }
      })
      .catch(() => {})

    // 3-second zoom-in text effect before showing video
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const fallbackVideoSrc = "https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-city-at-night-41550-large.mp4"

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] min-h-[320px] sm:min-h-[480px] mx-auto rounded-2xl overflow-hidden border border-surface bg-black flex items-center justify-center shadow-2xl">
      {/* 3-Second Zoom In Text Animation */}
      {!showVideo ? (
        <div className="flex flex-col items-center justify-center p-4 sm:p-8 text-center animate-[zoomInOut_3s_ease-in-out_forwards]">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-primary uppercase tracking-widest mb-3">
            DixNova Opening Story
          </span>
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-white drop-shadow-[0_0_40px_rgba(250,204,21,0.9)]">
            THE BIGGER REALITY
          </h1>
        </div>
      ) : (
        /* Media Container Playing Continuously Across Screen */
        <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
          {videoUrl.match(/\.(jpeg|jpg|png|gif|webp|svg)($|\?)/i) || videoUrl.startsWith("data:image/") ? (
            <img
              key={videoUrl}
              src={videoUrl}
              alt="Opening Story Media"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover transform-gpu"
              style={{ transform: "translateZ(0)", willChange: "transform" }}
            />
          ) : (
            <video
              key={videoUrl}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={(e) => {
                const target = e.target as HTMLVideoElement
                if (target.src !== fallbackVideoSrc) {
                  target.src = fallbackVideoSrc
                }
              }}
              className="w-full h-full object-cover transform-gpu"
              style={{ transform: "translateZ(0)", willChange: "transform" }}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
        </div>
      )}

      <style jsx global>{`
        @keyframes zoomInOut {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.25);
            opacity: 1;
          }
          90% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(0.85);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
