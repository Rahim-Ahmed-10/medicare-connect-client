"use client";

import React, { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrescriptionPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [data, setData] = useState({ diagnosis: '', meds: '', notes: '' });
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    
    // ডাটা ফেচিং
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`)
      .then((res) => res.json())
      .then((res) => {
        // এখানে ডাটা স্ট্রাকচারটি চেক করুন (res.data বা সরাসরি res)
        setBooking(res.data || res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleIssue = async () => {
    if(!data.diagnosis || !data.meds) return alert("Please fill at least Diagnosis and Meds");
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prescriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                bookingId: id, 
                patientName: booking?.userEmail, // ডাটাবেস থেকে পাওয়া ইমেইল
                doctorName: booking?.doctorName, // ডাটাবেস থেকে পাওয়া ডাক্তার
                ...data 
            })
        });
        if (res.ok) {
            alert("Prescription Issued Successfully!");
            router.push('/dashboard/doctor/prescriptions');
        }
    } catch (error) {
        alert("Failed to issue prescription");
    }
  };

  if (loading) return <div className="p-10 text-center text-emerald-400 font-bold">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-[#111827] border border-gray-700 shadow-2xl rounded-2xl mt-10 text-white">
      <h1 className="text-3xl font-bold mb-2 text-emerald-400">Generate Digital Rx</h1>
      <p className="text-gray-400 mb-6">For Appointment ID: <span className="text-emerald-300 font-mono">{id}</span></p>
      
      {/* পেশেন্ট এবং ডক্টর ইনফো কার্ড */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-[#1f2937] rounded-lg border border-gray-600">
            <p className="text-xs uppercase text-gray-500 font-bold tracking-wider">Patient</p>
            <p className="text-white font-semibold">{booking?.userEmail || "Unknown"}</p>
        </div>
        <div className="p-4 bg-[#1f2937] rounded-lg border border-gray-600">
            <p className="text-xs uppercase text-gray-500 font-bold tracking-wider">Assigned Doctor</p>
            <p className="text-emerald-300 font-semibold">{booking?.doctorName || "Dr. Assigned"}</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
            <label className="text-sm text-gray-400 mb-1 block">Clinical Diagnosis</label>
            <input 
                className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
                onChange={(e) => setData({...data, diagnosis: e.target.value})} 
                placeholder="e.g. Acute Bronchitis" 
            />
        </div>
        <div>
            <label className="text-sm text-gray-400 mb-1 block">Medications Instructions</label>
            <textarea 
                className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-lg h-32 focus:ring-2 focus:ring-emerald-500 outline-none" 
                onChange={(e) => setData({...data, meds: e.target.value})} 
                placeholder="Write medicines, dosages, and frequency..." 
            />
        </div>
        <div>
            <label className="text-sm text-gray-400 mb-1 block">Advisory Notes</label>
            <textarea 
                className="w-full bg-[#1f2937] border border-gray-600 text-white p-4 rounded-lg h-24 focus:ring-2 focus:ring-emerald-500 outline-none" 
                onChange={(e) => setData({...data, notes: e.target.value})} 
                placeholder="Rest, diet or follow-up instructions..." 
            />
        </div>
      </div>
      
      <div className="flex gap-4 mt-8">
        <button onClick={() => router.back()} className="bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600">Cancel</button>
        <button onClick={handleIssue} className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-900/50 flex-1">
            Issue Digital Prescription
        </button>
      </div>
    </div>
  );
}