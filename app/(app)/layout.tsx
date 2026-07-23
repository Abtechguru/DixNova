import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/db/prisma"

export default async function AppGatewayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  // Find all organizations the user belongs to
  const userOrgs = await prisma.userRole.findMany({
    where: { userId: session.userId },
    select: {
      organization: {
        select: { slug: true }
      }
    }
  })

  // Filter out any nulls (if they have a role without an org context, like global SUPER_ADMIN)
  const validOrgs = userOrgs.filter((r: any) => r.organization).map((r: any) => r.organization!)

  // In a real app, if the path is exactly `/app` we might want to redirect to their first org:
  // We'll handle this redirection logic inside a page.tsx at /app/page.tsx, so this layout just passes children.
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}
