import { NextResponse } from 'next/server';
import { StoreService } from '@/lib/services/storeService';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const numId = parseInt(params.id, 10);
    const body = await request.json();
    const updated = await StoreService.updateProblemStepAsync(numId, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Problem section not found' }, { status: 404 });
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
    const numId = parseInt(params.id, 10);
    const success = await StoreService.deleteProblemStepAsync(numId);

    if (!success) {
      return NextResponse.json({ success: false, error: 'Problem section not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Section deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
