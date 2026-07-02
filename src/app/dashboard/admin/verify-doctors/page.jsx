"use client";
import React, { useState, useEffect } from 'react';

const VerifyDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false); // আপডেট লোডিং দেখার জন্য

  // ডাটাবেজ থেকে ডাটা লোড করা
  const loadDoctors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors`);
      const data = await res.json();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // স্ট্যাটাস আপডেট করার ফাংশন
  const handleAction = async (id, action) => {
    setLoading(true); // লোডিং শুরু
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors/${action}/${id}`, { 
        method: 'PATCH' 
      });
      
      if (res.ok) {
        // ডাটাবেজে আপডেট সফল হলে আবার ডাটা লোড করুন
        await loadDoctors(); 
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setLoading(false); // লোডিং শেষ
    }
  };

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-8">Doctor License Verification</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 shadow-lg">
            {/* ডক্টরের ইমেজ */}
            <img 
              src={doctor.profileImage} 
              alt={doctor.doctorName} 
              className="w-full h-48 object-cover rounded-lg mb-4" 
            />
            
            <h3 className="text-xl font-bold">{doctor.doctorName}</h3>
            <p className="text-sm text-gray-400 mb-2">{doctor.specialization}</p>
            
            <div className="text-sm text-gray-300 mb-4">
              <p>Hospital: {doctor.hospitalName}</p>
              <p>Status: 
                <span className={`ml-2 font-bold ${
                  doctor.verificationStatus === 'Verified' ? 'text-emerald-400' : 
                  doctor.verificationStatus === 'Rejected' ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {doctor.verificationStatus || "Pending"}
                </span>
              </p>
            </div>

            {/* অ্যাকশন বাটনসমূহ */}
            <div className="flex gap-2">
              <button 
                disabled={loading}
                onClick={() => handleAction(doctor._id, 'approve')} 
                className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded text-xs cursor-pointer disabled:opacity-50">
                Approve
              </button>
              <button 
                disabled={loading}
                onClick={() => handleAction(doctor._id, 'reject')} 
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs cursor-pointer disabled:opacity-50">
                Reject
              </button>
              <button 
                disabled={loading}
                onClick={() => handleAction(doctor._id, 'cancel')} 
                className="bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded text-xs cursor-pointer disabled:opacity-50">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifyDoctorsPage;