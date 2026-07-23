import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/db/prisma"
import { AdminLayout } from "@/components/layout/AdminLayout"

export default async function OrganizationLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { orgSlug: string }
}) {
  const session = await getSession()
  if (!session) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { slug: params.orgSlug },
    include: { branding: true }
  })

  if (!org) redirect("/app") // or 404

  // Verify access
  const hasAccess = session.roles.some(
    r => r.organizationId === org.id || r.role === "SUPER_ADMIN"
  )

  if (!hasAccess) {
    redirect("/app") // unauthorized
  }

  // We wrap the children in our previously built AdminLayout shell, 
  // but now we can pass dynamic data like org branding, user avatar, etc.
  return (
    <AdminLayout>
      {/* 
        We could inject OrganizationSwitcher and WorkspaceSwitcher here later.
        For now, we just render the secure child content. 
      */}
      {children}
    </AdminLayout>
  )
}
