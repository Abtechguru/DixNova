import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"

export async function GET() {
  try {
    const problem = await prisma.problemStatement.findFirst()
    return NextResponse.json({ success: true, data: problem })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { summary, whoDetails, whatDetails, whenDetails, whereDetails, whyDetails } = body

    let project = await prisma.project.findFirst()
    if (!project) {
      const org = await prisma.organization.findFirst()
      const ws = await prisma.workspace.findFirst()
      if (!org || !ws) {
        return NextResponse.json({ success: false, error: "No workspace environment initialized" }, { status: 400 })
      }
      project = await prisma.project.create({
        data: {
          name: "Lagos SmartMove Intelligence",
          slug: "lagos-smartmove",
          organizationId: org.id,
          workspaceId: ws.id
        }
      })
    }

    const updated = await prisma.problemStatement.upsert({
      where: { projectId: project.id },
      create: {
        projectId: project.id,
        businessChallenge: summary,
        whoDetails: whoDetails || [],
        whatDetails: whatDetails || [],
        whenDetails: whenDetails || [],
        whereDetails: whereDetails || [],
        whyDetails: whyDetails || [],
        fiveWsJson: { summary, whoDetails, whatDetails, whenDetails, whereDetails, whyDetails }
      },
      update: {
        businessChallenge: summary,
        whoDetails: whoDetails || [],
        whatDetails: whatDetails || [],
        whenDetails: whenDetails || [],
        whereDetails: whereDetails || [],
        whyDetails: whyDetails || [],
        fiveWsJson: { summary, whoDetails, whatDetails, whenDetails, whereDetails, whyDetails }
      }
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
