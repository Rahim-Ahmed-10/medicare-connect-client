"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaClock, 
  FaStar, 
  FaRegEnvelope, 
  FaUserMd, 
  FaCircle,
  FaStethoscope,
  FaUser
} from "react-icons/fa";

const DoctorPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const doctorEmail = session?.user?.email;
  const doctorName = session?.user?.name || "Dr. Nusrat Jahan"; 

  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!doctorName) return;

      try {
        setLoading(true);
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8085";

        const [bookingsRes, reviewsRes] = await Promise.all([
          fetch(`${serverUrl}/api/doctor/bookings?doctorName=${encodeURIComponent(doctorName)}`),
          fetch(`${serverUrl}/api/doctor/reviews?doctorName=${encodeURIComponent(doctorName)}`)
        ]);

        if (bookingsRes.ok) {
          const bookingsResult = await bookingsRes.json();
          setBookings(bookingsResult.data || bookingsResult || []);
        }

        if (reviewsRes.ok) {
          const reviewsResult = await reviewsRes.json();
          setReviews(reviewsResult.data || reviewsResult || []);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorName]);

  const totalApprovedPatients = bookings.filter(b => 
    b.status?.toLowerCase() === "confirmed" || b.status?.toLowerCase() === "approved"
  ).length;

  const pendingPatients = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
  
  const validReviews = Array.isArray(reviews) ? reviews : [];
  const averageRating = validReviews.length > 0 
    ? (validReviews.reduce((acc, curr) => acc + Number(curr.rating || 0), 0) / validReviews.length).toFixed(1) 
    : "5.0";

  if (isPending) return <div className="min-h-screen flex items-center justify-center bg-[#090e1a] text-emerald-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#090e1a] text-white p-4 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* 📌 Header */}
        <div className="mb-8 bg-[#111827] p-6 rounded-2xl border border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center text-xl border border-emerald-500/20">
              <FaUserMd />
            </div>
            <div>
              <h1 className="text-2xl font-black">{doctorName}</h1>
              <p className="text-gray-400 text-xs flex items-center gap-1.5"><FaRegEnvelope /> {doctorEmail}</p>
            </div>
          </div>
        </div>

        {/* 📊 Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111827] p-6 rounded-2xl border-l-4 border-emerald-500 border border-gray-800">
            <p className="text-xs font-bold text-gray-400 uppercase">Total Patients</p>
            <h3 className="text-3xl font-black mt-2">{totalApprovedPatients}</h3>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border-l-4 border-amber-500 border border-gray-800">
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Approvals</p>
            <h3 className="text-3xl font-black mt-2">{pendingPatients}</h3>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border-l-4 border-blue-500 border border-gray-800">
            <p className="text-xs font-bold text-gray-400 uppercase">Rating Score</p>
            <h3 className="text-3xl font-black mt-2 flex items-center gap-1">{averageRating} <span className="text-amber-400 text-xl">★</span></h3>
            <p className="text-[10px] text-gray-500 mt-2">Based on {validReviews.length} reviews</p>
          </div>
        </div>

        {/* 📋 Patient Records & Feedback Table */}
        <div className="bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-800 bg-[#161f30] flex justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2"><FaCircle className="text-emerald-500 text-[8px]" /> Patient Records & Feedback</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[11px] uppercase border-b border-gray-800">
                  <th className="p-4 pl-6">Patient Name</th>
                  <th className="p-4">Symptom</th>
                  <th className="p-4 pr-6">Patient Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {bookings.map((booking) => {
                  const patientReview = reviews.find(r => r.patientId === booking.patientId || r.email === booking.userEmail);
                  return (
                    <tr key={booking._id} className="hover:bg-gray-800/20">
                      <td className="p-4 pl-6 font-semibold">{booking.userEmail?.split('@')[2] || "Unknown"}</td>
                      <td className="p-4 text-amber-200/90">{booking.symptomsDescription || "No issues specified"}</td>
                      <td className="p-4 pr-6 text-gray-400 italic">
                        {patientReview ? (
                          <div className="flex flex-col">
                            <span>"{patientReview.reviewText || patientReview.comment}"</span>
                            <span className="text-amber-500 font-bold mt-1 text-[10px]">Rating: {patientReview.rating}★</span>
                          </div>
                        ) : <span className="text-gray-600">No review yet</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;