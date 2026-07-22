import { NextResponse } from 'next/server';
import { StoreService } from '@/lib/services/storeService';

export async function GET() {
  try {
    const settings = await StoreService.getSettingsAsync();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updated = await StoreService.updateSettingsAsync(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
