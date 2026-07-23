import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { prisma } from "@/lib/db/prisma"

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    if (!query) return NextResponse.json({ results: [] })

    // Perform cross-entity search across Projects, KPIs, and Insights
    const [projects, kpis, insights] = await Promise.all([
      prisma.project.findMany({ where: { name: { contains: query, mode: "insensitive" } }, take: 5 }),
      prisma.kpi.findMany({ where: { name: { contains: query, mode: "insensitive" } }, take: 5 }),
      prisma.insight.findMany({ where: { title: { contains: query, mode: "insensitive" } }, take: 5 }),
    ])

    return NextResponse.json({
      results: [
        ...projects.map((p: any) => ({ type: "PROJECT", title: p.name, link: `/app` })),
        ...kpis.map((k: any) => ({ type: "KPI", title: k.name, link: `/app` })),
        ...insights.map((i: any) => ({ type: "INSIGHT", title: i.title, link: `/app` }))
      ]
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
