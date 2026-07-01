"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from 'next/link';

const AppointmentsInbox = () => {
  const { data: session } = authClient.useSession();
  const doctorName = session?.user?.name;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!doctorName) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor/bookings?doctorName=${encodeURIComponent(doctorName)}`);
      const result = await res.json();
      setBookings(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [doctorName]);

  const handleStatusUpdate = async (id, status) => {
    if (status === "Rejected") {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`, { method: 'DELETE' });
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    }
    fetchBookings();
  };

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-emerald-400 border-l-4 border-emerald-500 pl-4">
        Clinical Appointment Inbox
      </h2>

      {loading ? (
        <p className="text-emerald-400 animate-pulse">Loading appointments...</p>
      ) : bookings.length === 0 ? (
        <div className="bg-[#1e293b] p-8 rounded-xl border border-gray-700 text-center text-gray-400">
          No pending appointments found.
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div key={b._id} className="bg-[#1e293b] border border-gray-700 p-6 rounded-2xl shadow-lg flex justify-between items-center hover:border-emerald-500/50 transition-all">
              <div className="space-y-3">
                {/* ডাটাবেসের ফিল্ড অনুযায়ী নাম দেখানো হচ্ছে */}
                <p className="text-lg font-bold text-white">Patient: {b.userEmail}</p>
                <p className="text-sm text-emerald-400">Doctor: {b.doctorName}</p>
                <p className="text-sm text-gray-400">Time: {b.date} at {b.time || "N/A"}</p>
                <div className="bg-[#0f172a] p-3 rounded-lg border border-gray-600">
                  <p className="text-sm text-gray-300 italic">Symptoms: "{b.symptomsDescription}"</p>
                </div>
              </div>

              <div className="flex gap-3">
                {b.status === "Pending" || !b.status ? (
                  <>
                    <button onClick={() => handleStatusUpdate(b._id, "Accepted")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-semibold transition">
                      Accept
                    </button>
                    <button onClick={() => handleStatusUpdate(b._id, "Rejected")} className="bg-red-900/50 hover:bg-red-800 text-red-200 px-5 py-2 rounded-lg font-semibold transition">
                      Reject
                    </button>
                  </>
                ) : (
                  <Link href={`/dashboard/doctor/appointments/${b._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/20 transition-transform transform hover:scale-105">
                      Prescribe
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsInbox;