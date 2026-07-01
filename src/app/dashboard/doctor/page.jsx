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
    // 🎯 Better-Auth সেশন থেকে লগইন করা ডক্টরের তথ্য
    const { data: session, isPending } = authClient.useSession();
    const doctorEmail = session?.user?.email;
    const doctorName = session?.user?.name || "Dr. Nusrat Jahan"; 

    // 🚀 লাইভ ডাটা স্টেটসমূহ
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

                if (bookingsRes.ok && bookingsRes.headers.get("content-type")?.includes("application/json")) {
                    const bookingsResult = await bookingsRes.json();
                    setBookings(bookingsResult.data || bookingsResult || []);
                } else {
                    setBookings([]);
                }

                if (reviewsRes.ok && reviewsRes.headers.get("content-type")?.includes("application/json")) {
                    const reviewsResult = await reviewsRes.json();
                    setReviews(reviewsResult.data || reviewsResult || []);
                } else {
                    setReviews([]);
                }

            } catch (error) {
                console.error("Network error:", error);
                setBookings([]);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [doctorName]);

    // =========================================================
    // 📊 ডাইনামিক ক্যালকুলেশনসমূহ (কার্ডের জন্য)
    // =========================================================
    const totalApprovedPatients = bookings.filter(b => 
        b.status?.toLowerCase() === "confirmed" || 
        b.status?.toLowerCase() === "approved"
    ).length;

    const pendingPatients = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
    
    const validReviews = Array.isArray(reviews) ? reviews : [];
    const totalRating = validReviews.reduce((acc, curr) => {
        const currentRating = Number(curr.rating);
        return acc + (isNaN(currentRating) ? 0 : currentRating);
    }, 0);

    const averageRating = validReviews.length > 0 
        ? (totalRating / validReviews.length).toFixed(1) 
        : "5.0";

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#090e1a]">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#090e1a] text-white p-4 sm:p-6 md:p-10 font-sans antialiased">
            <div className="max-w-7xl mx-auto">
                
                {/* 📌 হেডার */}
                <div className="mb-8 bg-[#111827] p-6 rounded-2xl border border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center text-xl border border-emerald-500/20">
                            <FaUserMd />
                        </div>
                        <div>
                            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase px-2 py-0.5 rounded tracking-wider">
                                Active Practitioner Portal
                            </span>
                            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                                {doctorName}
                            </h1>
                            {doctorEmail && (
                                <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5">
                                    <FaRegEnvelope /> {doctorEmail}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-sm font-semibold text-gray-500 uppercase tracking-widest animate-pulse">
                        Syncing Live Records...
                    </div>
                ) : (
                    <>
                        {/* 📊 কার্ডসমূহ */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 border-l-4 border-emerald-500">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Patients</p>
                                        <h3 className="text-3xl font-black text-white mt-2">{totalApprovedPatients}</h3>
                                    </div>
                                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl text-lg">
                                        <FaUsers />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 border-l-4 border-amber-500">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Approvals</p>
                                        <h3 className="text-3xl font-black text-white mt-2">{pendingPatients}</h3>
                                    </div>
                                    <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl text-lg">
                                        <FaClock />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 border-l-4 border-blue-500">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rating Score</p>
                                        <h3 className="text-3xl font-black text-white mt-2 flex items-center gap-1">
                                            {averageRating} <span className="text-amber-400 text-xl">★</span>
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl text-lg">
                                        <FaStar />
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-2">Based on {validReviews.length} reviews</p>
                            </div>
                        </div>

                        {/* 🗓️ সুনির্দিষ্ট অ্যাপয়েন্টমেন্ট শিডিউল টেবিল */}
                        <div className="bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">
                            <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-[#161f30]">
                                <div className="flex items-center gap-2">
                                    <FaCircle className="text-emerald-500 text-[8px] animate-pulse" />
                                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">PATIENT RECORDS</h2>
                                </div>
                                <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                                    {bookings.length} Registered
                                </span>
                            </div>
                            
                            {bookings.length === 0 ? (
                                <div className="text-center py-16 text-gray-500 text-sm">
                                    No patient logs found.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#0f1624] text-gray-400 text-[11px] uppercase font-bold border-b border-gray-800 tracking-wider">
                                                {/* 👤 শুধুমাত্র ২টি নির্দিষ্ট কলাম */}
                                                <th className="p-4 pl-6 w-1/3">Patient Name / Identity</th>
                                                <th className="p-4 pr-6 w-2/3">Problem / Symptoms Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs text-gray-300 divide-y divide-gray-800/60 font-medium">
                                            {bookings.map((booking) => {
                                                // ইমেল থেকে নাম জেনারেট করা হচ্ছে (যেমন: kulsum@gmail.com -> Kulsum)
                                                const cleanName = booking.userEmail 
                                                    ? booking.userEmail.split('@')[0].replace(/[0-9]/g, '')
                                                    : "Unknown Patient";
                                                const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

                                                return (
                                                    <tr key={booking._id || booking.id} className="hover:bg-gray-800/20 transition-colors">
                                                        {/* 👤 পেশেন্ট নাম কলাম */}
                                                        <td className="p-4 pl-6 font-semibold text-white">
                                                            <span className="flex items-center gap-2">
                                                                <FaUser className="text-emerald-500 text-[11px]" />
                                                                <div>
                                                                    <p className="text-sm capitalize">{formattedName}</p>
                                                                    <p className="text-[10px] text-gray-500 font-normal mt-0.5">{booking.userEmail}</p>
                                                                </div>
                                                            </span>
                                                        </td>
                                                        
                                                        {/* 🩺 পেশেন্ট প্রবলেম কলাম */}
                                                        <td className="p-4 pr-6 text-amber-200/95 font-medium leading-relaxed">
                                                            <span className="flex items-start gap-2 py-1">
                                                                <FaStethoscope className="text-gray-500 shrink-0 text-[11px] mt-0.5" />
                                                                <span>{booking.symptomsDescription || "No issues specified by the patient."}</span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DoctorPage;