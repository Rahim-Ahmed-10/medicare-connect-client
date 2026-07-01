"use client";

import React, { useEffect, useState } from 'react';
import { 
  FaFilePrescription, 
  FaUserInjured, 
  FaUserMd, 
  FaCalendarAlt, 
  FaClipboardList, 
  FaPills, 
  FaInfoCircle 
} from 'react-icons/fa';

export default function PrescriptionsCabin() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prescriptions`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
            console.log("Fetched Data:", data.data); // চেক করুন এখানে নাম আসছে কি না
            setPrescriptions(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center text-emerald-400 font-bold">Loading...</div>;

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <FaFilePrescription size={32} className="text-emerald-400" />
        <h1 className="text-3xl font-bold text-emerald-400">Prescription Cabin</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prescriptions.map((p) => (
          <div key={p._id} className="bg-[#1e293b] border border-gray-700 p-6 rounded-2xl shadow-lg">
            
            {/* Header: Name Section */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-600 pb-4">
              <div className="flex items-center gap-3">
                <FaUserInjured className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Patient</p>
                  <p className="font-semibold">{p.patientName || "Not Provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-[10px] text-emerald-400 uppercase">Doctor</p>
                  <p className="font-semibold text-emerald-300">{p.doctorName || "Not Provided"}</p>
                </div>
                <FaUserMd className="text-emerald-500" />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <FaClipboardList className="text-emerald-500 mt-1" />
                <p className="text-sm text-gray-300"><strong>Diagnosis:</strong> {p.diagnosis}</p>
              </div>
              <div className="flex gap-3">
                <FaPills className="text-blue-400 mt-1" />
                <p className="text-sm text-gray-300"><strong>Meds:</strong> {p.meds}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}