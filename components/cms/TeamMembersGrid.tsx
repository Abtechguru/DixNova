import * as React from "react"
import Image from "next/image"

export interface TeamMemberItem {
  id?: string
  name: string
  role: string
  avatarUrl?: string | null
  bio?: string | null
}

export interface TeamMembersGridProps {
  title?: string
  subtitle?: string
  members?: TeamMemberItem[]
}

const DEFAULT_MEMBERS: TeamMemberItem[] = [
  {
    name: "Teddy Yu",
    role: "Graphic Designer",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Estelle Darcy",
    role: "Creative Director",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Aaron Loeb",
    role: "Brand Strategist",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Olivia Wilson",
    role: "Web Developer",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Avery Davis",
    role: "Digital Marketing",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
  }
]

export function TeamMembersGrid({
  title = "Meet Our Team",
  subtitle = "A team of passionate creatives bringing bold ideas to life and delivering limitless possibilities for every project.",
  members = DEFAULT_MEMBERS
}: TeamMembersGridProps) {
  const displayMembers = members.length > 0 ? members : DEFAULT_MEMBERS

  // Split into top row (2 members) and bottom row (remaining) if 5 members to match template layout
  const isTemplateLayout = displayMembers.length === 5
  const topRow = isTemplateLayout ? displayMembers.slice(0, 2) : displayMembers.slice(0, Math.ceil(displayMembers.length / 2))
  const bottomRow = isTemplateLayout ? displayMembers.slice(2) : displayMembers.slice(Math.ceil(displayMembers.length / 2))

  const renderCard = (m: TeamMemberItem, idx: number) => (
    <div key={m.id || idx} className="flex flex-col items-center group relative">
      {/* Circular Avatar */}
      <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl group-hover:scale-105 transition-transform duration-300 bg-surface">
        {m.avatarUrl ? (
          <Image 
            src={m.avatarUrl} 
            alt={m.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/30 to-primary/70 flex items-center justify-center text-xl font-bold text-foreground">
            {m.name.split(" ").map(n => n[0]).join("")}
          </div>
        )}
      </div>

      {/* Attached Frosted Info Badge */}
      <div className="-mt-6 z-10 w-44 md:w-48 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-3 text-center shadow-lg transition-all group-hover:border-primary/50">
        <h4 className="text-sm font-bold font-display text-white tracking-wide truncate">{m.name}</h4>
        <p className="text-[11px] font-medium text-slate-300 truncate mt-0.5">{m.role}</p>
      </div>
    </div>
  )

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-sky-900 via-blue-900 to-sky-950 p-6 md:p-10 border border-sky-400/30 shadow-2xl space-y-8 my-4">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-block px-6 py-1.5 rounded-xl bg-white text-slate-900 font-display font-extrabold text-2xl md:text-3xl tracking-tight shadow-md">
          {title}
        </div>
      </div>

      {/* Member Cards Layout */}
      <div className="space-y-6">
        {/* Top Row */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {topRow.map((m, idx) => renderCard(m, idx))}
        </div>

        {/* Bottom Row */}
        {bottomRow.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {bottomRow.map((m, idx) => renderCard(m, idx + topRow.length))}
          </div>
        )}
      </div>

      {/* Bottom Subtitle / Mission */}
      {subtitle && (
        <div className="text-center max-w-xl mx-auto pt-2">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans opacity-90">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  )
}
