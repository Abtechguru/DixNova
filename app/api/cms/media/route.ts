import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getSession } from "@/lib/auth/session"
import fs from "fs/promises"
import path from "path"

// GET /api/cms/media
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get("orgId")

    const assets = await prisma.mediaAsset.findMany({
      where: orgId ? { organizationId: orgId } : {},
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({ success: true, assets })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// POST /api/cms/media
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    let organizationId = formData.get("organizationId") as string | null

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 })
    }

    if (!organizationId) {
      let org = await prisma.organization.findFirst()
      if (!org) {
        org = await prisma.organization.create({
          data: {
            name: "Lagos SmartMove Transport Authority",
            slug: "lagos-smartmove"
          }
        })
      }
      organizationId = org.id
    }

    // Convert file to buffer and save to public/uploads
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), "public/uploads")
    await fs.mkdir(uploadDir, { recursive: true })

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const filename = `${Date.now()}-${safeName}`
    const filepath = path.join(uploadDir, filename)
    
    await fs.writeFile(filepath, buffer)

    // Save metadata in MongoDB
    const asset = await prisma.mediaAsset.create({
      data: {
        filename,
        url: `/uploads/${filename}`,
        fileType: file.type || "application/octet-stream",
        sizeBytes: file.size,
        organizationId
      }
    })

    return NextResponse.json({ success: true, asset })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/cms/media
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing asset ID" }, { status: 400 })
    }

    const asset = await prisma.mediaAsset.findUnique({ where: { id } })
    if (asset) {
      // Remove file from disk if local
      if (asset.url.startsWith("/uploads/")) {
        const filepath = path.join(process.cwd(), "public", asset.url)
        try {
          await fs.unlink(filepath)
        } catch (e) {
          // File might already be deleted on disk
        }
      }
      await prisma.mediaAsset.delete({ where: { id } })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

