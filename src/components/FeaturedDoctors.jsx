"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeartPulse, FaStar, FaArrowRightLong } from "react-icons/fa6";

export default function FeaturedDoctors() {
  const [topDoctors, setTopDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // public ফোল্ডারের doctors.json থেকে ডাটা ফেচ করা হচ্ছে
    fetch("/doctors.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // .slice(0, 3) দিয়ে শুধুমাত্র প্রথম ৩ জন ডাক্তারকে নেওয়া হচ্ছে
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
      <div className="w-full bg-[#818386] py-16 text-center text-white font-semibold animate-pulse">
        Loading Top Specialists...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#818386] pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#9A00D7] font-bold text-xs tracking-wide uppercase mb-1">
              <FaHeartPulse className="w-4 h-4" />
              Meet Our Specialists
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D1B2A] tracking-tight">
              Available Top-Rated Doctors
            </h2>
          </div>
          <Link href="/services" className="text-white hover:text-[#9A00D7] font-bold text-xs md:text-sm flex items-center gap-2 group transition-colors">
            View All Doctors <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topDoctors.map((doc, index) => {
            // আপনার JSON ফাইলের ফিল্ডের নামের সাথে ম্যাচ করার জন্য ফলব্যাক সেট করা হয়েছে
            const docId = doc._id || doc.id || index;
            const doctorImg = doc.image || doc.profileImage || "https://via.placeholder.com/400";
            const docName = doc.doctorName || doc.name || "Unknown Doctor";
            const docTitle = doc.medicalSpecialty || doc.specialization || doc.title || "Specialist";
            const docHospital = doc.practicingHospital || doc.hospitalName || doc.hospital || "Medical College Hospital";
            const docRating = doc.rating || "5.0";

            return (
              <div key={docId} className="bg-white rounded-[2rem] p-4 shadow-xl flex flex-col justify-between group hover:scale-[1.01] transition-all duration-300">
                <div className="space-y-4">
                  <div className="relative h-[240px] rounded-[1.8rem] overflow-hidden bg-slate-100">
                    <img 
                      src={doctorImg} 
                      alt={docName} 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl flex items-center gap-1 shadow-sm text-xs font-black text-slate-900">
                      <FaStar className="text-amber-400 w-3.5 h-3.5" /> {docRating}
                    </div>
                  </div>
                  <div className="px-2 space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#7A1FA2] transition-colors">
                      {docName}
                    </h3>
                    <p className="text-[#7A1FA2] font-semibold text-xs tracking-wide uppercase">
                      {docTitle}
                    </p>
                    <p className="text-slate-400 text-[11px] leading-tight font-medium">
                      {docHospital}
                    </p>
                  </div>
                </div>
                
                <div className="px-2 pt-4 pb-1">
                  <Link href={`/find-doctors/${docId}`} className="w-full bg-[#6A1B9A] hover:bg-[#4A148C] text-white text-center font-bold py-3 rounded-xl text-xs block transition-all active:scale-[0.98]">
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