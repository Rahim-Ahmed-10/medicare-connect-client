"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch, FaStethoscope, FaUserMd, FaHospital, FaMoneyBillWave, FaChevronRight, FaStar, FaGraduationCap } from "react-icons/fa";

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // 📂 public/doctors.json থেকে ডাটা লোড করা
  useEffect(() => {
    fetch("/doctors.json")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors database:", err);
        setIsLoading(false);
      });
  }, []);

  // ড্রপডাউন মেনুর জন্য ইউনিক স্পেশালিটি লিস্ট বের করা
  const specialties = ["All", ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean))];

  // সার্চ এবং ড্রপডাউন ফিল্টারিং লজিক
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = 
      doctor.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.qualifications?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialization === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8FAF9]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-sm font-semibold text-slate-500">Loading Doctor Matrix Database...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-800 font-sans antialiased pb-16">
      
      {/* 🌟 Top Hero Banner Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-950 text-white py-14 px-4 border-b border-emerald-900 shadow-sm">
        <div className="max-w-6xl mx-auto text-center sm:text-left space-y-3">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Verified Clinical Directory
          </span>
          <h1 className="text-3xl font-black tracking-tight">Find Your Specialist</h1>
          <p className="text-xs text-emerald-200/80 max-w-xl font-medium leading-relaxed">
            Access certified physicians, configure active clinical shifts, and clear diagnostic checkout sessions instantly.
          </p>
        </div>
      </div>

      {/* 🎛️ Search & Dropdown Filter Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row gap-4">
          
          {/* 🔍 Search Input Field */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input 
              type="text"
              placeholder="Search by name, hospital, or degrees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl pl-10 pr-4 py-3 text-xs font-medium focus:outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all text-slate-900"
            />
          </div>

          {/* 🔽 Dropdown Select Matrix */}
          <div className="w-full sm:w-64 relative">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all text-slate-900 cursor-pointer appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'right 16px center', 
                backgroundSize: '14px' 
              }}
            >
              {specialties.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec === "All" ? "All Specialties" : spec}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* 🔲 Grid System for Doctors */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Results Info Row */}
        <div className="flex justify-between items-center bg-white px-5 py-3 rounded-xl border border-slate-200 mb-6">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{filteredDoctors.length}</span> matching specialists
          </p>
          <span className="text-[9px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
            Live Matrix
          </span>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 max-w-md mx-auto mt-12">
            <h3 className="text-sm font-bold text-slate-800 mb-1">No Matching Records</h3>
            <p className="text-xs text-slate-500">Could not resolve any doctor metrics matching your input criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => {
              // JSON ফাইলের মেইন ইনডেক্স ঠিক রাখা
              const originalIndex = doctors.findIndex(d => d.doctorName === doctor.doctorName);
              
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-600/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* Top Avatar Profile Block */}
                  <div className="p-5 flex-1 space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex-shrink-0">
                        <img 
                          src={doctor.profileImage || "https://via.placeholder.com/150"} 
                          alt={doctor.doctorName} 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="inline-block bg-emerald-50 text-emerald-800 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-100">
                          {doctor.specialization || "General"}
                        </span>
                        <h2 className="font-bold text-slate-900 text-sm tracking-tight truncate group-hover:text-emerald-700 transition-colors">
                          {doctor.doctorName}
                        </h2>
                        <div className="flex items-center gap-1 text-amber-500 text-[10px]">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                          <span className="text-slate-400 font-bold ml-1">(5.0)</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Credentials List */}
                    <div className="space-y-2 border-t border-slate-100 pt-3.5 text-[11px] text-slate-600">
                      <p className="flex items-center gap-2 truncate">
                        <FaGraduationCap className="text-slate-400 text-xs flex-shrink-0" />
                        <span className="truncate"><strong className="text-slate-800 font-semibold">Degrees:</strong> {doctor.qualifications}</span>
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <FaUserMd className="text-slate-400 text-xs flex-shrink-0" />
                        <span>Practice: <strong className="text-slate-800 font-semibold">{doctor.experience}</strong></span>
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <FaHospital className="text-slate-400 text-xs flex-shrink-0" />
                        <span className="truncate">{doctor.hospitalName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Book Trigger */}
                  <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-emerald-700">
                      <FaMoneyBillWave className="text-xs" />
                      <span className="text-xs font-black">${doctor.consultationFee || "130"}</span>
                    </div>

                    <Link 
                      href={`/find-doctors/${index}`}
                      className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-lg transition-all flex items-center gap-1 shadow-sm"
                    >
                      Book Matrix <FaChevronRight className="text-[8px]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}