import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

const SEED_MEMBERS = [
  {
    name: "Teddy Yu",
    role: "Graphic Designer",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    order: 1
  },
  {
    name: "Estelle Darcy",
    role: "Creative Director",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    order: 2
  },
  {
    name: "Aaron Loeb",
    role: "Brand Strategist",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    order: 3
  },
  {
    name: "Olivia Wilson",
    role: "Web Developer",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    order: 4
  },
  {
    name: "Avery Davis",
    role: "Digital Marketing",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    order: 5
  }
]

// GET /api/cms/team-members
export async function GET() {
  try {
    const db = prisma as any
    if (!db.teamMember) {
      return NextResponse.json({ success: true, data: SEED_MEMBERS })
    }

    let members = await db.teamMember.findMany({
      orderBy: { order: "asc" }
    })

    if (!members || members.length === 0) {
      try {
        for (const m of SEED_MEMBERS) {
          await db.teamMember.create({ data: m })
        }
        members = await db.teamMember.findMany({ orderBy: { order: "asc" } })
      } catch (seedErr) {
        return NextResponse.json({ success: true, data: SEED_MEMBERS })
      }
    }

    return NextResponse.json({ success: true, data: members })
  } catch (error: any) {
    return NextResponse.json({ success: true, data: SEED_MEMBERS })
  }
}

// POST /api/cms/team-members
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, role, avatarUrl, bio, order } = body

    if (!name || !role) {
      return NextResponse.json({ success: false, error: "Name and role are required" }, { status: 400 })
    }

    const db = prisma as any
    if (!db.teamMember) {
      return NextResponse.json({ success: true, data: { name, role, avatarUrl, bio, order } })
    }

    const created = await db.teamMember.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        avatarUrl: avatarUrl || null,
        bio: bio || null,
        order: Number(order) || 0
      }
    })

    return NextResponse.json({ success: true, data: created })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create team member" }, { status: 500 })
  }
}

// PUT /api/cms/team-members
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, name, role, avatarUrl, bio, order } = body

    if (!id) {
      return NextResponse.json({ success: false, error: "Member ID is required" }, { status: 400 })
    }

    if (!name || !role) {
      return NextResponse.json({ success: false, error: "Name and role are required" }, { status: 400 })
    }

    const db = prisma as any
    if (!db.teamMember) {
      return NextResponse.json({ success: true, data: { id, name, role, avatarUrl, bio, order } })
    }

    const updated = await db.teamMember.update({
      where: { id },
      data: {
        name: name.trim(),
        role: role.trim(),
        avatarUrl: avatarUrl || null,
        bio: bio || null,
        order: Number(order) || 0
      }
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update team member" }, { status: 500 })
  }
}

// DELETE /api/cms/team-members
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 })
    }

    const db = prisma as any
    if (db.teamMember) {
      await db.teamMember.delete({ where: { id } })
    }
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete team member" }, { status: 500 })
  }
}
