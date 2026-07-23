import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

// Helper to ensure a default Project exists in DB
async function getOrCreateDefaultProject() {
  let project = await prisma.project.findFirst()
  if (!project) {
    let org = await prisma.organization.findFirst()
    if (!org) {
      org = await prisma.organization.create({
        data: {
          name: "Lagos SmartMove Transport Authority",
          slug: "lagos-smartmove"
        }
      })
    }
    let ws = await prisma.workspace.findFirst({ where: { organizationId: org.id } })
    if (!ws) {
      ws = await prisma.workspace.create({
        data: {
          name: "Primary Analytics Workspace",
          slug: "primary-analytics",
          organizationId: org.id
        }
      })
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
  return project
}

// GET /api/cms/powerbi
export async function GET() {
  try {
    const reports = await prisma.powerBiReport.findMany({
      orderBy: { displayOrder: "asc" }
    })
    return NextResponse.json({ success: true, reports })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch Power BI reports" }, { status: 500 })
  }
}

// POST /api/cms/powerbi
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, category, description, workspaceId, reportId, embedUrl, isPublished, displayOrder } = body

    if (!name) {
      return NextResponse.json({ success: false, error: "Report name is required" }, { status: 400 })
    }

    const project = await getOrCreateDefaultProject()

    const report = await prisma.powerBiReport.create({
      data: {
        projectId: project.id,
        name,
        category: category || "Operational Intelligence",
        description: description || "",
        workspaceId: workspaceId || "default-workspace",
        reportId: reportId || `pbi-${Date.now()}`,
        embedUrl: embedUrl || "",
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        displayOrder: typeof displayOrder === "number" ? displayOrder : 0
      }
    })

    return NextResponse.json({ success: true, report })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create Power BI report" }, { status: 500 })
  }
}

// PUT /api/cms/powerbi
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, name, category, description, workspaceId, reportId, embedUrl, isPublished, displayOrder } = body

    if (!id) {
      return NextResponse.json({ success: false, error: "Report ID is required" }, { status: 400 })
    }

    const dataToUpdate: any = {}
    if (name !== undefined) dataToUpdate.name = name
    if (category !== undefined) dataToUpdate.category = category
    if (description !== undefined) dataToUpdate.description = description
    if (workspaceId !== undefined) dataToUpdate.workspaceId = workspaceId
    if (reportId !== undefined) dataToUpdate.reportId = reportId
    if (embedUrl !== undefined) dataToUpdate.embedUrl = embedUrl
    if (isPublished !== undefined) dataToUpdate.isPublished = Boolean(isPublished)
    if (displayOrder !== undefined) dataToUpdate.displayOrder = Number(displayOrder)

    const updated = await prisma.powerBiReport.update({
      where: { id },
      data: dataToUpdate
    })

    return NextResponse.json({ success: true, report: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update Power BI report" }, { status: 500 })
  }
}

// DELETE /api/cms/powerbi
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Report ID is required" }, { status: 400 })
    }

    await prisma.powerBiReport.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete Power BI report" }, { status: 500 })
  }
}
