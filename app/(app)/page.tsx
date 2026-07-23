import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/db/prisma"

export default async function AppRootPage() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  let orgSlug = "smartmove"

  try {
    const userRole = await prisma.userRole.findFirst({
      where: { userId: session.userId, organizationId: { not: null } },
      include: { organization: true }
    })

    if (userRole?.organization?.slug) {
      orgSlug = userRole.organization.slug
    } else {
      const firstOrg = await prisma.organization.findFirst({ select: { slug: true } })
      if (firstOrg?.slug) orgSlug = firstOrg.slug
    }
  } catch (e) {}

  redirect(`/${orgSlug}/analytics/decision-center`)
}
