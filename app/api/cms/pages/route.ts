import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")

    const pages = await prisma.page.findMany({
      where: orgId ? { organizationId: orgId } : {},
      orderBy: { updatedAt: "desc" }
    })

    return NextResponse.json({ pages })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const { title, slug, organizationId, components, metaTitle, metaDescription } = body

    if (!title || !slug || !organizationId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        organizationId,
        components: components || [],
        metaTitle,
        metaDescription
      }
    })

    return NextResponse.json({ success: true, page })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
