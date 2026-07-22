import { NextResponse } from 'next/server';
import { StoreService } from '@/lib/services/storeService';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const updated = await StoreService.updateTeamMemberAsync(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const success = await StoreService.deleteTeamMemberAsync(id);

    if (!success) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Member deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
