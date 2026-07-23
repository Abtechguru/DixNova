import * as React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { StoryHeader } from "@/components/cms/StoryHeader"
import { TeamMembersGrid } from "@/components/cms/TeamMembersGrid"
import { PageNavigationFooter } from "@/components/cms/PageNavigationFooter"
import { prisma } from "@/lib/db/prisma"

export default async function TeamStoryPage() {
  let dbMembers: any[] = []

  try {
    dbMembers = await prisma.teamMember.findMany({
      orderBy: { order: "asc" }
    })
  } catch (e) {}

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 flex-1 flex flex-col justify-between overflow-hidden">
        <StoryHeader 
          chapterNumber={1}
          title="Meet the Team"
          subtitle="The engineering, data architecture, and creative minds behind DixNova Intelligence."
        />

        <div className="flex-1 overflow-hidden flex flex-col justify-center">
          <TeamMembersGrid members={dbMembers} />
        </div>

        <PageNavigationFooter 
          prevTitle="DixNova Home"
          prevSlug="/"
          nextTitle="The Bigger Reality"
          nextSlug="/p/bigger-reality"
        />
      </div>
    </PublicLayout>
  )
}
