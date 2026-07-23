import { NextResponse } from "next/server"
import * as path from "path"
import * as fs from "fs"
import { prisma } from "@/lib/db/prisma"
import { parsePbiLayoutFile } from "@/lib/utils/pbi-parser"

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
    let reports = await prisma.powerBiReport.findMany({
      orderBy: { displayOrder: "asc" }
    })

    if (reports.length === 0) {
      try {
        const project = await getOrCreateDefaultProject()
        const defaultReport = await prisma.powerBiReport.create({
          data: {
            projectId: project.id,
            name: "HACKATHON GROUP 10 PROJECT.pbix",
            category: "Dashboard Package",
            description: "Uploaded Power BI Zip package (9 extracted files)",
            workspaceId: "zip-package-workspace",
            reportId: "pbi-1784809751168",
            embedUrl: "/uploads/powerbi/zips/HACKATHON-GROUP-10-PROJECT.pbix--1-.zip",
            zipUrl: "/uploads/powerbi/zips/HACKATHON-GROUP-10-PROJECT.pbix--1-.zip",
            entryPath: "",
            fileType: "ZIP_PACKAGE",
            fileSizeBytes: 608334,
            displayOrder: 0,
            isPublished: true
          }
        })
        reports = [defaultReport]
      } catch (err) {
        // Fallback in case DB write is restricted
        reports = [
          {
            id: "fallback-pbi-10",
            projectId: "default-project",
            name: "HACKATHON GROUP 10 PROJECT.pbix",
            category: "Dashboard Package",
            description: "Uploaded Power BI Zip package (9 extracted files)",
            workspaceId: "zip-package-workspace",
            reportId: "pbi-1784809751168",
            embedUrl: "/uploads/powerbi/zips/HACKATHON-GROUP-10-PROJECT.pbix--1-.zip",
            zipUrl: "/uploads/powerbi/zips/HACKATHON-GROUP-10-PROJECT.pbix--1-.zip",
            entryPath: "",
            fileType: "ZIP_PACKAGE",
            fileSizeBytes: 608334,
            thumbnailUrl: null,
            refreshSchedule: null,
            securityRole: null,
            displayOrder: 0,
            isPublished: true,
            createdAt: new Date(),
            updatedAt: new Date()
          } as any
        ]
      }
    }

    // Attach parsed layout data for each report if extracted Report/Layout exists
    const enrichedReports = reports.map(r => {
      const reportObj = typeof (r as any).toJSON === "function" ? (r as any).toJSON() : { ...r }
      const layoutPath = path.join(process.cwd(), "public", "uploads", "powerbi", "extracted", r.reportId || "", "Report", "Layout")
      
      if (fs.existsSync(layoutPath)) {
        const parsedLayout = parsePbiLayoutFile(layoutPath)
        if (parsedLayout) {
          reportObj.parsedLayout = parsedLayout
        }
      }
      return reportObj
    })

    return NextResponse.json({ success: true, reports: enrichedReports })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch Power BI reports" }, { status: 500 })
  }
}

// POST /api/cms/powerbi
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, category, description, workspaceId, reportId, embedUrl, zipUrl, entryPath, fileType, fileSizeBytes, isPublished, displayOrder } = body

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
        zipUrl: zipUrl || null,
        entryPath: entryPath || null,
        fileType: fileType || (zipUrl ? "ZIP_PACKAGE" : "EMBED_URL"),
        fileSizeBytes: typeof fileSizeBytes === "number" ? fileSizeBytes : null,
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
    const { id, name, category, description, workspaceId, reportId, embedUrl, zipUrl, entryPath, fileType, fileSizeBytes, isPublished, displayOrder } = body

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
    if (zipUrl !== undefined) dataToUpdate.zipUrl = zipUrl
    if (entryPath !== undefined) dataToUpdate.entryPath = entryPath
    if (fileType !== undefined) dataToUpdate.fileType = fileType
    if (fileSizeBytes !== undefined) dataToUpdate.fileSizeBytes = fileSizeBytes
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
