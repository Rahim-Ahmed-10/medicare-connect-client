"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from "@/lib/auth-client"; // সেশন পাওয়ার জন্য
import { 
  FaFilePrescription, 
  FaUserInjured, 
  FaUserMd, 
  FaClipboardList, 
  FaPills, 
  FaEdit 
} from 'react-icons/fa';

export default function PrescriptionsCabin() {
  const { data: session } = authClient.useSession();
  const doctorName = session?.user?.name;
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorName) {
      setLoading(false);
      return;
    }

    // শুধুমাত্র লগইন করা ডাক্তারের নামের সাথে ফিল্টার করে ডাটা আনছি
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prescriptions?doctorName=${encodeURIComponent(doctorName)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPrescriptions(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [doctorName]);

  if (loading) return <div className="p-10 text-center text-emerald-400 font-bold">Loading...</div>;

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <FaFilePrescription size={32} className="text-emerald-400" />
        <h1 className="text-3xl font-bold text-emerald-400">All Doctors Prescription Cabin</h1>
      </div>

      {/* এখানে চেক করছি ডাটা আছে কি না */}
      {prescriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prescriptions.map((p) => (
            <div key={p._id} className="bg-[#1e293b] border border-gray-700 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6 border-b border-gray-600 pb-4">
                <div className="flex items-center gap-3">
                  <FaUserInjured className="text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Patient</p>
                    <p className="font-semibold">{p.patientName || "Not Provided"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-emerald-400 uppercase">Doctor</p>
                  <p className="font-semibold text-emerald-300">{p.doctorName}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <FaClipboardList className="text-emerald-500 mt-1" />
                  <p className="text-sm text-gray-300"><strong>Diagnosis:</strong> {p.diagnosis}</p>
                </div>
                <div className="flex gap-3">
                  <FaPills className="text-blue-400 mt-1" />
                  <p className="text-sm text-gray-300"><strong>Meds:</strong> {p.meds}</p>
                </div>
              </div>

              <Link href={`/dashboard/doctor/prescriptions/${p._id}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all duration-300"
              >
                <FaEdit /> Edit Prescription
              </Link>
            </div>
          ))}
        </div>
      ) : (
        /* ডাটা না থাকলে এই মেসেজটি দেখাবে */
        <div className="text-center p-20 border-2 border-dashed border-gray-700 rounded-2xl">
          <p className="text-gray-400 text-xl font-semibold">No data found for {doctorName}</p>
        </div>
      )}
    </div>
  );
}