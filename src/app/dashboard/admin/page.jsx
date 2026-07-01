"use client";

import React, { useState, useEffect } from 'react';
import { FaUsers, FaUserMd, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

const AdminDashboardHomePage = () => {
  const [stats, setStats] = useState({
    patients: 0,
    clinicians: 0,
    bookings: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8085";
        
        // এখানে আপনার সার্ভারের API এন্ডপয়েন্ট অনুযায়ী ইউআরএলগুলো ঠিক করুন
        const res = await fetch(`${serverUrl}/api/admin/dashboard-stats`);
        const data = await res.json();
        
        if (data) {
          setStats({
            patients: data.totalPatients || 0,
            clinicians: data.totalClinicians || 0,
            bookings: data.totalBookings || 0,
            revenue: data.totalRevenue || 0
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) return <div className="p-10 text-center text-emerald-500">Loading Dashboard...</div>;

  const statCards = [
    { title: "Total Patients", value: stats.patients, icon: <FaUsers />, color: "text-blue-500" },
    { title: "Verified Clinicians", value: stats.clinicians, icon: <FaUserMd />, color: "text-emerald-500" },
    { title: "All Bookings", value: stats.bookings, icon: <FaCalendarCheck />, color: "text-purple-500" },
    { title: "Gross Co-pays", value: `$${stats.revenue}`, icon: <FaDollarSign />, color: "text-amber-500" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Hospital Ecosystem Controls</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className={`text-2xl ${stat.color} bg-gray-100 p-3 rounded-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold">{stat.title}</p>
              <h3 className="text-2xl font-black text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHomePage;