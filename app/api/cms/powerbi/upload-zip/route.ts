import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { extractZipPackage } from "@/lib/utils/zip"

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

// POST /api/cms/powerbi/upload-zip
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const name = (formData.get("name") as string) || ""
    const category = (formData.get("category") as string) || "Dashboard Package"
    const description = (formData.get("description") as string) || ""
    const existingId = formData.get("id") as string | null

    if (!file) {
      return NextResponse.json({ success: false, error: "No ZIP file provided" }, { status: 400 })
    }

    if (!file.name.toLowerCase().endsWith(".zip") && !file.name.toLowerCase().endsWith(".pbix")) {
      return NextResponse.json({ success: false, error: "Only .zip or .pbix files are supported" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const folderId = `pbi-${Date.now()}`
    const extractionResult = await extractZipPackage(buffer, folderId, file.name)

    const reportName = name.trim() || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
    const project = await getOrCreateDefaultProject()

    const reportData = {
      projectId: project.id,
      name: reportName,
      category,
      description: description || `Uploaded Power BI Zip package (${extractionResult.fileCount} extracted files)`,
      workspaceId: "zip-package-workspace",
      reportId: folderId,
      embedUrl: extractionResult.entryUrl || extractionResult.zipUrl,
      zipUrl: extractionResult.zipUrl,
      entryPath: extractionResult.entryPath || "",
      fileType: "ZIP_PACKAGE",
      fileSizeBytes: file.size,
      isPublished: true
    }

    let report
    if (existingId) {
      report = await prisma.powerBiReport.update({
        where: { id: existingId },
        data: reportData
      })
    } else {
      report = await prisma.powerBiReport.create({
        data: reportData
      })
    }

    return NextResponse.json({
      success: true,
      report,
      extraction: extractionResult
    })
  } catch (error: any) {
    console.error("ZIP package processing error:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to process ZIP package" }, { status: 500 })
  }
}
