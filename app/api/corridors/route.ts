import { NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/services/analytics';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state') || undefined;

  const corridors = AnalyticsService.getCorridors(state);
  return NextResponse.json({ success: true, timestamp: new Date().toISOString(), count: corridors.length, data: corridors });
}
