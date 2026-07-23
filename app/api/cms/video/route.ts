import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

export async function GET() {
  try {
    const summary = await prisma.executiveSummary.findFirst()
    const videoUrl = (summary?.contentJson as any)?.videoUrl || "/open.mp4"
    return NextResponse.json({ success: true, videoUrl })
  } catch (error: any) {
    return NextResponse.json({ success: true, videoUrl: "/open.mp4" })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { videoUrl } = body

    if (!videoUrl) {
      return NextResponse.json({ success: false, error: "videoUrl is required" }, { status: 400 })
    }

    let project = await prisma.project.findFirst()
    if (!project) {
      const org = await prisma.organization.findFirst()
      const ws = await prisma.workspace.findFirst()
      if (org && ws) {
        project = await prisma.project.create({
          data: {
            name: "Lagos SmartMove Intelligence",
            slug: "lagos-smartmove",
            organizationId: org.id,
            workspaceId: ws.id
          }
        })
      }
    }

    if (project) {
      await prisma.executiveSummary.upsert({
        where: { projectId: project.id },
        create: {
          projectId: project.id,
          contentJson: { videoUrl }
        },
        update: {
          contentJson: { videoUrl }
        }
      })
    }

    return NextResponse.json({ success: true, videoUrl })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
