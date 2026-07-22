"use client"
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, ComposedChart
} from 'recharts';
import { 
  CongestionCategory, 
  BreakdownCategory, 
  FleetAvailabilityStatus, 
  MonthlyFuelMetric, 
  MonthlyPassengerMetric 
} from '@/lib/services/analytics';

// Default Fallbacks
const defaultCongestionImpactData: CongestionCategory[] = [
  { category: 'On Time (0-5m)', trips: 24500, fill: '#10B981' },
  { category: 'Slight (6-15m)', trips: 14200, fill: '#3B82F6' },
  { category: 'Moderate (16-30m)', trips: 8400, fill: '#F59E0B' },
  { category: 'High (31-45m)', trips: 4100, fill: '#F97316' },
  { category: 'Severe (45m+)', trips: 1800, fill: '#EF4444' },
];

const defaultBreakdownTypeData: BreakdownCategory[] = [
  { type: 'Preventive Maint.', count: 420 },
  { type: 'Tyre Replacement', count: 280 },
  { type: 'Brake Service', count: 210 },
  { type: 'Engine Overhaul', count: 140 },
  { type: 'Battery & Elect.', count: 95 },
];

const defaultFleetAvailabilityData: FleetAvailabilityStatus[] = [
  { name: 'Active In Service', value: 820, color: '#10B981' },
  { name: 'Under Maintenance', value: 120, color: '#F59E0B' },
  { name: 'Out of Service', value: 60, color: '#EF4444' },
];

const defaultMonthlyFuelData: MonthlyFuelMetric[] = [
  { month: 'Jan', fuelLitres: 120, fuelCost: 102.0 },
  { month: 'Feb', fuelLitres: 128, fuelCost: 115.2 },
  { month: 'Mar', fuelLitres: 135, fuelCost: 128.3 },
  { month: 'Apr', fuelLitres: 142, fuelCost: 142.0 },
  { month: 'May', fuelLitres: 138, fuelCost: 144.9 },
  { month: 'Jun', fuelLitres: 150, fuelCost: 165.0 },
  { month: 'Jul', fuelLitres: 158, fuelCost: 181.7 },
];

const defaultPassengerDemandVariabilityData: MonthlyPassengerMetric[] = [
  { month: 'Jan', passengers: 1150 },
  { month: 'Feb', passengers: 1280 },
  { month: 'Mar', passengers: 1420 },
  { month: 'Apr', passengers: 1310 },
  { month: 'May', passengers: 1540 },
  { month: 'Jun', passengers: 1680 },
  { month: 'Jul', passengers: 1850 },
];

// 1. Traffic Congestion Impact Clustered Bar Chart
export function TrafficCongestionChart({ data }: { data?: CongestionCategory[] }) {
  const chartData = data && data.length > 0 ? data : defaultCongestionImpactData;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
            formatter={(val: number) => [`${val.toLocaleString()} Trips`, 'Frequency']}
          />
          <Bar dataKey="trips" radius={[6, 6, 0, 0]} barSize={28}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill || '#10B981'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 2. Vehicle Breakdown Types Bar Chart
export function VehicleBreakdownChart({ data }: { data?: BreakdownCategory[] }) {
  const chartData = data && data.length > 0 ? data : defaultBreakdownTypeData;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
          <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={110} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
            formatter={(value) => [`${value} Occurrences`, 'Breakdown Count']}
          />
          <Bar dataKey="count" fill="#F59E0B" radius={[0, 6, 6, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 3. Fleet Availability Donut Chart
export function FleetAvailabilityDonutChart({ data }: { data?: FleetAvailabilityStatus[] }) {
  const chartData = data && data.length > 0 ? data : defaultFleetAvailabilityData;

  return (
    <div className="h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#10B981'} stroke="#0b1f3a" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// 4. Rising Fuel Costs Line & Column Combo Chart
export function FuelCostsComboChart({ data }: { data?: MonthlyFuelMetric[] }) {
  const chartData = data && data.length > 0 ? data : defaultMonthlyFuelData;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} unit="k L" />
          <YAxis yAxisId="right" orientation="right" stroke="#EF4444" fontSize={11} tickLine={false} unit="M ₦" />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
          <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
          <Bar yAxisId="left" dataKey="fuelLitres" name="Fuel Consumed (k Litres)" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
          <Line yAxisId="right" type="monotone" dataKey="fuelCost" name="Fuel Cost (Million ₦)" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// 5. Passenger Demand Variability Line Chart
export function PassengerDemandVariabilityChart({ data }: { data?: MonthlyPassengerMetric[] }) {
  const chartData = data && data.length > 0 ? data : defaultPassengerDemandVariabilityData;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="k" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
            formatter={(val: number) => [`${(val * 1000).toLocaleString()} Commuters`, 'Passenger Count']}
          />
          <Line type="monotone" dataKey="passengers" stroke="#10B981" strokeWidth={3} dot={{ r: 5, fill: '#10B981' }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
