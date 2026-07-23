import * as React from "react"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Icons } from "@/lib/utils/icons"

export default async function MediaLibraryPage({ params }: { params: { orgSlug: string } }) {
  const session = await getSession()
  if (!session) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { slug: params.orgSlug },
    include: {
      mediaAssets: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!org) redirect("/app")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Media Library</h1>
          <p className="text-foreground-secondary">Manage images, documents, and assets for your CMS.</p>
        </div>
        <Button>
          <Icons.media className="mr-2 h-4 w-4" /> Upload File
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {org.mediaAssets.map((asset: any) => (
          <Card key={asset.id} className="overflow-hidden group cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-0">
              {asset.fileType.startsWith("image/") ? (
                <div className="aspect-square bg-surface relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset.url} alt={asset.filename} className="object-cover w-full h-full" />
                </div>
              ) : (
                <div className="aspect-square bg-surface flex items-center justify-center text-foreground-secondary">
                  <Icons.reports className="h-12 w-12" />
                </div>
              )}
              <div className="p-3 border-t border-surface text-xs truncate">
                {asset.filename}
              </div>
            </CardContent>
          </Card>
        ))}

        {org.mediaAssets.length === 0 && (
          <div className="col-span-full h-48 border-2 border-dashed border-surface rounded-xl flex flex-col items-center justify-center text-foreground-secondary">
            <Icons.media className="h-8 w-8 mb-2 opacity-50" />
            <p>Drag and drop files here to upload</p>
          </div>
        )}
      </div>
    </div>
  )
}
