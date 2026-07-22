import { NextResponse } from 'next/server';
import { StoreService } from '@/lib/services/storeService';

export async function GET() {
  try {
    const data = await StoreService.getCustomAnalysisDataAsync();
    const logs = await StoreService.getUploadLogsAsync();
    return NextResponse.json({ success: true, data, logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { records, filename } = body;

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid data records provided' }, { status: 400 });
    }

    const count = await StoreService.addAnalysisDataAsync(records, filename || 'data_import.csv');

    return NextResponse.json({ success: true, count, message: `Successfully imported ${count} analysis records` }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await StoreService.clearAnalysisDataAsync();
    return NextResponse.json({ success: true, message: 'All custom analysis data cleared' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
