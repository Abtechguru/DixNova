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

    return NextResponse.json({ assets })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/cms/media
// Using multipart/form-data for file uploads locally
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const organizationId = formData.get("organizationId") as string

    if (!file || !organizationId) {
      return NextResponse.json({ error: "Missing file or orgId" }, { status: 400 })
    }

    // Convert file to buffer and save to public/uploads
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), "public/uploads")
    await fs.mkdir(uploadDir, { recursive: true })

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const filepath = path.join(uploadDir, filename)
    
    await fs.writeFile(filepath, buffer)

    // Save metadata in MongoDB
    const asset = await prisma.mediaAsset.create({
      data: {
        filename,
        url: `/uploads/${filename}`,
        fileType: file.type,
        sizeBytes: file.size,
        organizationId
      }
    })

    return NextResponse.json({ success: true, asset })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
