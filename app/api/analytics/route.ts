import { NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/services/analytics';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state') || undefined;

    const kpis = AnalyticsService.getExecutiveKpis(state);
    const corridors = AnalyticsService.getCorridors(state);
    const congestionData = AnalyticsService.getTrafficCongestionImpact(state);
    const breakdownData = AnalyticsService.getVehicleBreakdownTypes(state);
    const fleetAvailabilityData = AnalyticsService.getFleetAvailability(state);
    const monthlyFuelData = AnalyticsService.getMonthlyFuelCosts(state);
    const monthlyPassengerData = AnalyticsService.getPassengerDemandVariability(state);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        kpis,
        corridors,
        congestionData,
        breakdownData,
        fleetAvailabilityData,
        monthlyFuelData,
        monthlyPassengerData
      }
    });
  } catch (error: any) {
    console.error('Error fetching analytics dashboard data:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to aggregate analytics data' },
      { status: 500 }
    );
  }
}
