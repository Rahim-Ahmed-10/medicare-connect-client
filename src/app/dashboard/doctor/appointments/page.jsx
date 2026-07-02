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
    if (!doctorName) {
      setLoading(false);
      return;
    }
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

  useEffect(() => { 
    fetchBookings(); 
  }, [doctorName]);

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

  const handlePrescribeClick = async (id) => {
    setBookings(prev => prev.map(b => b._id === id ? {...b, status: "Prescribed"} : b));
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "Prescribed" })
    });
  };

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-emerald-400 border-l-4 border-emerald-500 pl-4">
        Clinical Appointment Inbox
      </h2>

      {/* লোডিং, নো ডাটা, এবং ডাটা রেন্ডারিং লজিক */}
      {loading ? (
        <p className="text-emerald-400 animate-pulse text-center">Loading appointments...</p>
      ) : bookings.length === 0 ? (
        <div className="text-center p-12 bg-[#1e293b] rounded-2xl border border-dashed border-gray-600">
          <p className="text-gray-400 text-xl font-semibold">No data found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div key={b._id} className="bg-[#1e293b] border border-gray-700 p-6 rounded-2xl flex justify-between items-center hover:border-emerald-500/30 transition-all">
              <div>
                <p className="text-lg font-bold">Patient: {b.userEmail}</p>
                <p className="text-sm text-gray-400">Time: {b.date} at {b.time}</p>
                <p className="text-sm text-gray-300 italic mt-2">Symptoms: "{b.symptomsDescription}"</p>
              </div>

              <div className="flex gap-3">
                {b.status === "Pending" || !b.status ? (
                  <>
                    <button onClick={() => handleStatusUpdate(b._id, "Accepted")} className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-lg font-semibold transition">Accept</button>
                    <button onClick={() => handleStatusUpdate(b._id, "Rejected")} className="bg-red-900/50 hover:bg-red-800 text-red-200 px-5 py-2 rounded-lg font-semibold transition">Reject</button>
                  </>
                ) : b.status === "Prescribed" ? (
                  <span className="text-emerald-500 font-bold px-4 py-2 border border-emerald-500 rounded-lg bg-emerald-950/30">
                    Prescribed
                  </span>
                ) : (
                  <Link href={`/dashboard/doctor/appointments/${b._id}`}>
                    <button 
                      onClick={() => handlePrescribeClick(b._id)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg"
                    >
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