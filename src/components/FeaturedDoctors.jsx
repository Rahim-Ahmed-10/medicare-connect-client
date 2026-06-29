"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeartPulse, FaStar, FaArrowRightLong } from "react-icons/fa6";

export default function FeaturedDoctors() {
  const [topDoctors, setTopDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/doctors.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setTopDoctors(data.slice(0, 3));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Featured doctors load korte somossa hoyeche:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full bg-[#0D1527] py-16 text-center text-slate-400 font-semibold animate-pulse">
        Loading Top Specialists...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0D1527] pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#3B82F6] font-bold text-xs tracking-wide uppercase mb-1">
              <FaHeartPulse className="w-4 h-4" />
              Meet Our Specialists
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Available Top-Rated Doctors
            </h2>
          </div>
          <Link href="/find-doctors" className="text-slate-400 hover:text-[#3B82F6] font-bold text-xs md:text-sm flex items-center gap-2 group transition-colors">
            View All Doctors <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topDoctors.map((doc, index) => {
            const docId = doc._id || doc.id || index;
            const doctorImg = doc.image || doc.profileImage || "https://via.placeholder.com/400";
            const docName = doc.doctorName || doc.name || "Unknown Doctor";
            const docTitle = doc.medicalSpecialty || doc.specialization || doc.title || "Specialist";
            const docHospital = doc.practicingHospital || doc.hospitalName || doc.hospital || "Medical College Hospital";
            const docRating = doc.rating || "5.0";

            return (
              <div key={docId} className="bg-[#0F1A36] rounded-[2rem] p-4 shadow-2xl border border-slate-800/60 flex flex-col justify-between group hover:scale-[1.01] transition-all duration-300">
                <div className="space-y-4">
                  <div className="relative h-[240px] rounded-[1.8rem] overflow-hidden bg-slate-900">
                    <img 
                      src={doctorImg} 
                      alt={docName} 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-3 right-3 bg-[#0D1527]/90 backdrop-blur-sm px-3 py-1 rounded-xl flex items-center gap-1 shadow-md text-xs font-black text-white border border-slate-700/40">
                      <FaStar className="text-amber-400 w-3.5 h-3.5" /> {docRating}
                    </div>
                  </div>
                  <div className="px-2 space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                      {docName}
                    </h3>
                    <p className="text-[#22D3EE] font-semibold text-xs tracking-wide uppercase">
                      {docTitle}
                    </p>
                    <p className="text-slate-400 text-[11px] leading-tight font-medium">
                      {docHospital}
                    </p>
                  </div>
                </div>
                
                {/* 🎯 বুকিং বাটন - আপনার মেইন গেটওয়ে বাটনের কালার ও থিম ম্যাচিং করা হয়েছে */}
                <div className="px-2 pt-4 pb-1">
                  <Link 
                    href={`/find-doctors/${docId}`} 
                    className="w-full bg-[#1B62FD] hover:bg-[#1554E2] text-white text-center font-bold py-3.5 rounded-xl text-xs block transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] tracking-wider"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}