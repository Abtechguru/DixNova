import { NextResponse } from 'next/server';
import { StoreService } from '@/lib/services/storeService';

export async function GET() {
  try {
    const team = await StoreService.getTeamAsync();
    return NextResponse.json({ success: true, data: team });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, bio, photoUrl, skills } = body;

    if (!name || !role) {
      return NextResponse.json({ success: false, error: 'Name and Role are required' }, { status: 400 });
    }

    const newMember = await StoreService.addTeamMemberAsync({
      name,
      role,
      bio: bio || '',
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      skills: Array.isArray(skills) ? skills : []
    });

    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
