"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const AppointmentsInbox = () => {
  const { data: session } = authClient.useSession();
  const doctorName = session?.user?.name;
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!doctorName) return;
    const res = await fetch(`http://localhost:8085/api/doctor/bookings?doctorName=${encodeURIComponent(doctorName)}`);
    const result = await res.json();
    setBookings(Array.isArray(result.data) ? result.data : []);
  };

  useEffect(() => { fetchBookings(); }, [doctorName]);

  const handleStatusUpdate = async (id, status) => {
    if (status === "Rejected") {
      await fetch(`http://localhost:8085/api/bookings/${id}`, { method: 'DELETE' });
    } else {
      await fetch(`http://localhost:8085/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    }
    fetchBookings();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Clinical Appointment Inbox</h2>
      {bookings.map((b) => (
        <div key={b._id} className="border p-4 mb-4 rounded shadow-md flex justify-between items-center">
          <div>
            <p><strong>Patient:</strong> {b.userEmail?.split('@')[0]}</p>
            <p><strong>Time:</strong> {b.time || "N/A"}</p>
            <p><strong>Symptom:</strong> {b.symptomsDescription}</p>
          </div>

          <div className="flex gap-2">
            {b.status === "Pending" || !b.status ? (
              <>
                <button onClick={() => handleStatusUpdate(b._id, "Accepted")} className="bg-blue-600 text-white px-3 py-1 rounded">Accept Link</button>
                <button onClick={() => handleStatusUpdate(b._id, "Rejected")} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
                <button className="bg-gray-400 text-white px-3 py-1 rounded" disabled>Pending</button>
              </>
            ) : (
              <a href={`/dashboard/doctor/prescriptions/${b._id}`}>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded font-bold">Mark Completed & Prescribe</button>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsInbox;