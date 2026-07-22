"use client"
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const passengerData = [
  { time: '06:00', passengers: 12400 },
  { time: '08:00', passengers: 48900 },
  { time: '10:00', passengers: 28400 },
  { time: '12:00', passengers: 21000 },
  { time: '14:00', passengers: 26500 },
  { time: '16:00', passengers: 42100 },
  { time: '18:00', passengers: 52400 },
  { time: '20:00', passengers: 18900 },
];

const routeRevenueData = [
  { route: 'Ikeja - CMS', revenue: 42.5 },
  { route: 'Oshodi - Abule Egba', revenue: 38.2 },
  { route: 'Ikorodu - TBS', revenue: 31.8 },
  { route: 'Berger - Victoria Is.', revenue: 27.4 },
  { route: 'Yaba - Lekki', revenue: 22.1 },
];

const fleetHealthData = [
  { name: 'Active In Service', value: 880, color: '#10B981' },
  { name: 'Scheduled Maintenance', value: 85, color: '#3B82F6' },
  { name: 'Emergency Repair', value: 25, color: '#EF4444' },
  { name: 'Standby Fleet', value: 60, color: '#F59E0B' },
];

export function PassengerDemandChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={passengerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="passengersGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Area type="monotone" dataKey="passengers" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#passengersGrad)" name="Passenger Volume" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RouteRevenueChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={routeRevenueData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
          <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} unit="M ₦" />
          <YAxis dataKey="route" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={110} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
            formatter={(value) => [`₦${value} Million`, 'Revenue']}
          />
          <Bar dataKey="revenue" fill="#10B981" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FleetStatusPieChart() {
  return (
    <div className="h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={fleetHealthData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {fleetHealthData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#0b1f3a" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
