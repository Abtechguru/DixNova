import { prisma } from "@/lib/db/prisma"
import { BlockRenderer, PageBlock } from "@/components/cms/BlockRenderer"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const page = await prisma.page.findFirst({
      where: { slug: params.slug, isPublished: true }
    })
    
    if (!page) return { title: "Page Not Found" }
    
    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
    }
  } catch (e) {
    return { title: "Error" }
  }
}

export default async function PublicCMSDynamicPage({ params }: Props) {
  let blocks: PageBlock[] = []
  let error = null

  try {
    const page = await prisma.page.findFirst({
      where: { slug: params.slug, isPublished: true }
    })

    if (!page) {
      notFound()
    }

    blocks = page.components as PageBlock[]
  } catch (e: any) {
    error = e.message
  }

  return (
    <PublicLayout>
      {error ? (
        <div className="p-12 text-center text-danger">Database Connection Error: {error}</div>
      ) : (
        <BlockRenderer blocks={blocks} />
      )}
    </PublicLayout>
  )
}
