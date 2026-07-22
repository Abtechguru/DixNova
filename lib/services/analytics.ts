// DixNova Analytics Data Engine & Backend Service

export interface KpiMetrics {
  totalPassengers: number;
  passengerGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  activeFleet: number;
  totalFleet: number;
  fleetUtilization: number;
  avgDelayMins: number;
  delayChangeMins: number;
}

export interface CorridorData {
  id: string;
  name: string;
  activeBuses: number;
  occupancyRate: number;
  revenueToday: number;
  status: 'SMOOTH FLOW' | 'CONGESTED' | 'NORMAL' | 'HIGH DEMAND';
  avgSpeedKmh: number;
  state: string;
}

export interface PassengerTrend {
  time: string;
  passengers: number;
  capacity: number;
}

export interface RevenueCorridor {
  route: string;
  revenue: number; // in Millions NGN
  state: string;
}

export interface FleetHealthBreakdown {
  name: string;
  value: number;
  color: string;
}

// In-Memory Data Provider with State Filtering Support
const STATE_CORRIDORS: Record<string, CorridorData[]> = {
  "Lagos State (LAMATA)": [
    { id: 'c1', name: 'Ikeja - CMS Express', activeBuses: 142, occupancyRate: 94, revenueToday: 42500000, status: 'SMOOTH FLOW', avgSpeedKmh: 42, state: 'Lagos State (LAMATA)' },
    { id: 'c2', name: 'Oshodi - Abule Egba BRT', activeBuses: 118, occupancyRate: 98, revenueToday: 38200000, status: 'CONGESTED', avgSpeedKmh: 28, state: 'Lagos State (LAMATA)' },
    { id: 'c3', name: 'Ikorodu - TBS Terminal', activeBuses: 96, occupancyRate: 88, revenueToday: 31800000, status: 'SMOOTH FLOW', avgSpeedKmh: 45, state: 'Lagos State (LAMATA)' },
    { id: 'c4', name: 'Berger - Victoria Island', activeBuses: 85, occupancyRate: 76, revenueToday: 27400000, status: 'NORMAL', avgSpeedKmh: 36, state: 'Lagos State (LAMATA)' },
    { id: 'c5', name: 'Yaba - Lekki Phase 1', activeBuses: 64, occupancyRate: 91, revenueToday: 22100000, status: 'HIGH DEMAND', avgSpeedKmh: 32, state: 'Lagos State (LAMATA)' },
  ],
  "Abuja FCT (Central Transit)": [
    { id: 'c6', name: 'Berger Junction - Area 1', activeBuses: 95, occupancyRate: 92, revenueToday: 28400000, status: 'SMOOTH FLOW', avgSpeedKmh: 52, state: 'Abuja FCT (Central Transit)' },
    { id: 'c7', name: 'Kubwa Expressway - City Centre', activeBuses: 82, occupancyRate: 96, revenueToday: 24100000, status: 'CONGESTED', avgSpeedKmh: 35, state: 'Abuja FCT (Central Transit)' },
    { id: 'c8', name: 'Nyanya - Eagle Square', activeBuses: 78, occupancyRate: 89, revenueToday: 21900000, status: 'HIGH DEMAND', avgSpeedKmh: 40, state: 'Abuja FCT (Central Transit)' },
    { id: 'c9', name: 'Airport Corridor Express', activeBuses: 45, occupancyRate: 68, revenueToday: 18500000, status: 'SMOOTH FLOW', avgSpeedKmh: 65, state: 'Abuja FCT (Central Transit)' },
  ],
  "Rivers State Transit Authority": [
    { id: 'c10', name: 'Aba Road - Mile 1 Market', activeBuses: 72, occupancyRate: 95, revenueToday: 19800000, status: 'CONGESTED', avgSpeedKmh: 30, state: 'Rivers State Transit Authority' },
    { id: 'c11', name: 'Choba - Oil Mill Express', activeBuses: 58, occupancyRate: 84, revenueToday: 15200000, status: 'NORMAL', avgSpeedKmh: 41, state: 'Rivers State Transit Authority' },
  ],
  "Kano Line Metro": [
    { id: 'c12', name: 'Sabon Gari - Kofar Nassarawa', activeBuses: 68, occupancyRate: 90, revenueToday: 17400000, status: 'SMOOTH FLOW', avgSpeedKmh: 38, state: 'Kano Line Metro' },
    { id: 'c13', name: 'Bayero Univ - Bata Terminal', activeBuses: 52, occupancyRate: 86, revenueToday: 13900000, status: 'NORMAL', avgSpeedKmh: 44, state: 'Kano Line Metro' },
  ]
};

import { StoreService } from './storeService';

export class AnalyticsService {
  public static getCorridors(state?: string): CorridorData[] {
    let corridors: CorridorData[] = [];
    if (state && STATE_CORRIDORS[state]) {
      corridors = [...STATE_CORRIDORS[state]];
    } else {
      corridors = Object.values(STATE_CORRIDORS).flat();
    }

    try {
      const customData = StoreService.getCustomAnalysisData();
      if (customData && customData.length > 0) {
        const formattedCustom: CorridorData[] = customData.map(c => ({
          id: c.id,
          name: c.name,
          activeBuses: Number(c.activeBuses) || 0,
          occupancyRate: Number(c.occupancyRate) || 0,
          revenueToday: Number(c.revenueToday) || 0,
          status: (c.status as any) || 'NORMAL',
          avgSpeedKmh: Number(c.avgSpeedKmh) || 40,
          state: c.state || 'Custom Uploaded Data'
        }));

        if (state) {
          const filteredCustom = formattedCustom.filter(c => c.state === state);
          corridors = [...filteredCustom, ...corridors];
        } else {
          corridors = [...formattedCustom, ...corridors];
        }
      }
    } catch (e) {
      // fallback silently to memory
    }

    return corridors;
  }

  public static getExecutiveKpis(state?: string): KpiMetrics {
    const corridors = this.getCorridors(state);
    const activeFleet = corridors.reduce((acc, c) => acc + c.activeBuses, 0);
    const totalRevenue = corridors.reduce((acc, c) => acc + c.revenueToday, 0);
    const avgOccupancy = corridors.length > 0 
      ? Math.round(corridors.reduce((acc, c) => acc + c.occupancyRate, 0) / corridors.length) 
      : 88;

    return {
      totalPassengers: Math.round(activeFleet * 345.8),
      passengerGrowth: 14.2,
      totalRevenue: totalRevenue,
      revenueGrowth: 8.7,
      activeFleet: activeFleet,
      totalFleet: Math.round(activeFleet * 1.05),
      fleetUtilization: Number((avgOccupancy * 1.03).toFixed(1)),
      avgDelayMins: 3.4,
      delayChangeMins: -1.2
    };
  }

  public static getPassengerTrend(): PassengerTrend[] {
    return [
      { time: '06:00', passengers: 12400, capacity: 15000 },
      { time: '08:00', passengers: 48900, capacity: 50000 },
      { time: '10:00', passengers: 28400, capacity: 45000 },
      { time: '12:00', passengers: 21000, capacity: 40000 },
      { time: '14:00', passengers: 26500, capacity: 42000 },
      { time: '16:00', passengers: 42100, capacity: 48000 },
      { time: '18:00', passengers: 52400, capacity: 55000 },
      { time: '20:00', passengers: 18900, capacity: 30000 },
    ];
  }

  public static getRevenueByCorridor(state?: string): RevenueCorridor[] {
    const corridors = this.getCorridors(state);
    return corridors.slice(0, 5).map(c => ({
      route: c.name,
      revenue: Number((c.revenueToday / 1000000).toFixed(1)),
      state: c.state
    }));
  }

  public static getFleetHealth(state?: string): FleetHealthBreakdown[] {
    const corridors = this.getCorridors(state);
    const activeCount = corridors.reduce((acc, c) => acc + c.activeBuses, 0);

    return [
      { name: 'Active In Service', value: activeCount, color: '#10B981' },
      { name: 'Scheduled Maintenance', value: Math.round(activeCount * 0.07), color: '#3B82F6' },
      { name: 'Emergency Repair', value: Math.round(activeCount * 0.02), color: '#EF4444' },
      { name: 'Standby Fleet', value: Math.round(activeCount * 0.05), color: '#F59E0B' },
    ];
  }

  public static getPredictiveInsights() {
    return [
      {
        id: 'opt-1',
        title: 'Extend Ikeja - CMS Express Frequency',
        category: 'Revenue Optimization',
        confidence: '98%',
        description: 'Passenger demand models project an un-served surge of ~4,500 commuters daily between 18:00 and 20:00. Increasing bus frequency by 2.5 mins will add ₦2.1M in daily fare revenue.',
        action: 'Apply Optimization Plan',
        status: 'HIGH IMPACT'
      },
      {
        id: 'opt-2',
        title: 'Engine Overheat Telemetry in 14 CNG Buses',
        category: 'Preventive Maintenance',
        confidence: '94%',
        description: 'Sensor logs indicate abnormal transmission thermal cycles on Oshodi BRT fleet. Scheduled servicing recommended immediately to prevent ₦18M repair cost.',
        action: 'Schedule Depot Servicing',
        status: 'URGENT WARNING'
      }
    ];
  }
}
