"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend, CartesianGrid 
} from 'recharts';
import { FaUsers, FaUserMd, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

const AdminDashboardHomePage = () => {
  const [stats, setStats] = useState({ patients: 0, clinicians: 0, bookings: 0, revenue: 0 });
  const [chartData, setChartData] = useState({ ratings: [], timeline: [], specialty: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/dashboard-stats`);
      const data = await res.json();
      
      setStats({
        patients: data.totalPatients,
        clinicians: data.totalClinicians,
        bookings: data.totalBookings,
        revenue: data.totalRevenue
      });

      // চার্টের ডাটা ম্যাপ করা
      setChartData({
        ratings: data.ratingData || [], 
        timeline: data.timelineData || [],
        specialty: data.specialtyData || []
      });
    };
    fetchData();
  }, []);

  const COLORS = ['#10b981', '#8b5cf6', '#0ea5e9', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8 text-white">Hospital Ecosystem Controls</h2>

      {/* ৪টি মেইন কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Patients" value={stats.patients} icon={<FaUsers />} color="text-blue-400" />
        <StatCard title="Verified Clinicians" value={stats.clinicians} icon={<FaUserMd />} color="text-emerald-400" />
        <StatCard title="All Bookings" value={stats.bookings} icon={<FaCalendarCheck />} color="text-purple-400" />
        <StatCard title="Gross Co-pays" value={`$${stats.revenue}`} icon={<FaDollarSign />} color="text-amber-400" />
      </div>

      {/* চার্ট সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {/* Clinician Performance */}
<div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
  <h3 className="text-lg font-semibold mb-4">Clinician Performance Index</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData.ratings.filter(d => d.rating > 0)}> {/* এখানে filter যোগ করা হয়েছে */}
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis 
        dataKey="doctorName" 
        stroke="#94a3b8" 
        fontSize={10}             // নাম ছোট করার জন্য ফন্ট সাইজ কমিয়ে দিলাম
        interval={0}              // সব নাম দেখানোর জন্য
        angle={-45}               // নামগুলো বাঁকা করে দিলে জায়গা বাঁচে এবং প্রফেশনাল লাগে
        textAnchor="end"          // নামগুলো সুন্দরভাবে অ্যালাইন করার জন্য
        height={60}               // নামগুলোর জন্য জায়গা বাড়ানো হলো
      />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} 
      />
      <Bar dataKey="rating" fill="#10b981" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

        {/* Appointment Timeline */}
        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Appointment Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData.timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="_id" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
              <Area type="monotone" dataKey="count" stroke="#10b981" fill="#065f46" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Specialty Breakdown */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 mt-6">
        <h3 className="text-lg font-semibold mb-4">Ecosystem Specialty Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData.specialty} dataKey="count" nameKey="_id" cx="50%" cy="50%" innerRadius={80} outerRadius={100} paddingAngle={5}>
              {chartData.specialty.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 shadow-sm flex items-center gap-4">
    <div className={`text-2xl ${color} bg-[#0f172a] p-3 rounded-lg`}>{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black text-white">{value}</h3>
    </div>
  </div>
);

export default AdminDashboardHomePage;