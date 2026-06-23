"use client";

import { useEffect, useState } from "react";
// 📝 ফিক্স ১: ক্যাশ ফ্রেন্ডলি আইকন ইম্পোর্ট
import { FaHeart, FaClock, FaCalendar, FaStethoscope } from "react-icons/fa";
import Link from "next/link"; // 📝 ফিক্স ২: ক্লায়েন্ট সাইড নেভিগেশনের জন্য Next.js Link ব্যবহার করা ভালো

export default function AllDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    fetch("/doctors.json")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setIsDataLoading(false);
      })
      .catch((error) => {
        console.error("Data load korte somossa hoyeche:", error);
        setIsDataLoading(false);
      });
  }, []);

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#040711]">
        <div className="text-xl font-semibold text-blue-600 animate-pulse">
          Loading All Doctors List...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040711] py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
            Find Our Professional Doctors
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-400 sm:mt-4">
            Book appointments with the best specialists from around the country.
          </p>
        </div>

        {/* Total Count */}
        <div className="mb-6">
          <p className="text-slate-400 font-medium">
            Total Doctors Found: <span className="text-blue-500 font-bold">{doctors.length}</span>
          </p>
        </div>

        {/* Loop Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div 
              key={index} 
              className="bg-[#090D16] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-white/[0.06] flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Header Image & Verification Badge */}
                <div className="relative h-60 w-full bg-gray-900">
                  <img 
                    src={doctor.profileImage || "https://via.placeholder.com/400"} 
                    alt={doctor.doctorName}
                    className="w-full h-full object-cover object-top"
                  />
                  <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full text-white ${
                    doctor.verificationStatus === "Verified" ? "bg-green-500" : "bg-amber-500"
                  }`}>
                    {doctor.verificationStatus || "Verified"}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {/* Specialization */}
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wide">
                    <FaHeart />
                    {doctor.specialization}
                  </div>

                  {/* Doctor Name & Qualifications */}
                  <h2 className="text-2xl font-bold text-slate-200 mt-2 hover:text-blue-400 transition-colors cursor-pointer">
                    {doctor.doctorName}
                  </h2>
                  <p className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-1.5">
                    <FaStethoscope className="text-slate-500" />
                    {doctor.qualifications}
                  </p>
                  
                  {/* Hospital Info */}
                  <p className="text-xs text-slate-500 mt-1 pl-5">
                    {doctor.hospitalName}
                  </p>

                  <hr className="my-5 border-white/[0.06]" />

                  {/* Info stats (Experience & Fees) */}
                  <div className="grid grid-cols-2 gap-4 bg-white/[0.02] p-3 rounded-xl text-center mb-4 border border-white/[0.04]">
                    <div>
                      <span className="block text-xs text-slate-500 uppercase font-semibold">Experience</span>
                      <span className="text-sm font-bold text-slate-300">{doctor.experience}</span>
                    </div>
                    <div className="border-l border-white/[0.06]">
                      <span className="block text-xs text-slate-500 uppercase font-semibold">Fees</span>
                      <span className="text-sm font-bold text-green-400">$ {doctor.consultationFee}</span>
                    </div>
                  </div>

                  {/* Available Days */}
                  <div className="flex items-start gap-2 text-xs text-slate-400 mb-2">
                    <FaCalendar className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-300">Days:</strong>{" "}
                      {doctor.availableDays && doctor.availableDays.length > 0 
                        ? doctor.availableDays.join(", ") 
                        : "Not specified"}
                    </div>
                  </div>

                  {/* Available Slots */}
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <FaClock className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-300">Slots:</strong>{" "}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {doctor.availableSlots?.map((slot, sIdx) => (
                          <span key={sIdx} className="bg-blue-950 text-blue-400 px-2 py-0.5 rounded text-[10px] font-medium border border-blue-900">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📅 Card Footer Button (Next.js Link কম্পোনেন্ট ব্যবহার করা হয়েছে) */}
              <div className="p-6 pt-0">
                <Link
                  href={`/find-doctors/${index}`} 
                  className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  Request Appointment
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}