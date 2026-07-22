import { NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/services/analytics';

export async function GET() {
  const trend = AnalyticsService.getPassengerTrend();
  return NextResponse.json({ success: true, timestamp: new Date().toISOString(), data: trend });
}
