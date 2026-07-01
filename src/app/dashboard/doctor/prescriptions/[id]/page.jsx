"use client";

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function PrescriptionPage({ params }) {
  // ১. Next.js 15+ অনুযায়ী params কে unwrapping করা
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [data, setData] = useState({ diagnosis: '', meds: '', notes: '' });
  const router = useRouter();

 const handleIssue = async () => {
    try {
      const res = await fetch(`http://localhost:8085/api/prescriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            bookingId: id, 
            ...data 
        })
      });

      if (res.ok) {
        // router.push('/dashboard/doctor/prescriptions-cabin'); 
        // এই লাইনটি মুছে দিন বা কমেন্ট করে দিন যাতে রিডাইরেক্ট না হয়।
        
        // এখন ডাক্তারকে শুধু একটি সাকসেস মেসেজ দেখান
        alert("Prescription saved successfully!");
        
        // চাইলে ডাটাগুলো পরিষ্কার করে দিতে পারেন যাতে নতুন করে লেখা যায়
        setData({ diagnosis: '', meds: '', notes: '' });
      } else {
        alert("Failed to save prescription");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto border shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-emerald-800">Generate Digital Rx</h1>
      
      <div className="space-y-4">
        <input 
            className="w-full border p-3 rounded" 
            onChange={(e) => setData({...data, diagnosis: e.target.value})} 
            placeholder="Clinical Diagnosis (e.g., Acute Respiratory Infection)" 
        />
        <textarea 
            className="w-full border p-3 rounded h-32" 
            onChange={(e) => setData({...data, meds: e.target.value})} 
            placeholder="Medications Instructions (e.g., Aspirin 81mg, Amoxicillin 500mg)" 
        />
        <textarea 
            className="w-full border p-3 rounded h-20" 
            onChange={(e) => setData({...data, notes: e.target.value})} 
            placeholder="Advisory Notes (e.g., Avoid strenuous workouts, take rest)" 
        />
      </div>
      
      <div className="flex gap-4 mt-6">
        <button 
            onClick={() => router.back()} 
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold"
        >
            Cancel
        </button>
        <button 
            onClick={handleIssue} 
            className="bg-emerald-800 text-white px-6 py-2 rounded font-semibold"
        >
            Issue Digital Prescription
        </button>
      </div>
    </div>
  );
}