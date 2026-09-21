"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FaSearch, 
  FaUserMd, 
  FaHospital, 
  FaMoneyBillWave, 
  FaChevronRight, 
  FaStar, 
  FaGraduationCap, 
  FaCheckCircle,
  FaStethoscope
} from "react-icons/fa";

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

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

  const specialties = ["All", ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean))];

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
      <div className="flex justify-center items-center min-h-screen bg-[#0B0F19]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <FaStethoscope className="text-blue-400 absolute text-sm animate-pulse" />
          </div>
          <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Loading Specialist Directory...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 font-sans antialiased pb-20 selection:bg-blue-500 selection:text-white">
      
      {/* 🌟 Top Hero Banner Section */}
      <div className="relative overflow-hidden bg-slate-900/40 border-b border-slate-800/60 py-14 px-4 backdrop-blur-xl">
        {/* Glow Ambient Light */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center sm:text-left space-y-3 relative z-10">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold tracking-wide px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <FaCheckCircle className="text-blue-400 text-xs" /> Verified Clinical Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">Specialist</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Connect with verified medical experts, view practice details, and schedule your appointment seamlessly.
          </p>
        </div>
      </div>

      {/* 🎛️ Search & Dropdown Filter Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-7 relative z-20">
        <div className="bg-[#0F172A]/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-2xl shadow-black/50 flex flex-col sm:flex-row gap-3">
          
          {/* 🔍 Search Input */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input 
              type="text"
              placeholder="Search by name, hospital, or qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0F19] border border-slate-800/80 focus:border-blue-500/60 rounded-xl pl-10 pr-4 py-3 text-xs font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          {/* 🔽 Dropdown Select */}
          <div className="w-full sm:w-64 relative">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full bg-[#0B0F19] border border-slate-800/80 focus:border-blue-500/60 rounded-xl px-4 py-3 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'right 16px center', 
                backgroundSize: '14px' 
              }}
            >
              {specialties.map((spec, index) => (
                <option key={index} value={spec} className="bg-[#0F172A] text-slate-200">
                  {spec === "All" ? "All Specialties" : spec}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* 🔲 Doctors Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Counter Header */}
        <div className="flex justify-between items-center bg-[#0F172A]/40 px-5 py-3 rounded-xl border border-slate-800/60 mb-6">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-blue-400 font-bold">{filteredDoctors.length}</span> verified doctors
          </p>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
          </span>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="bg-[#0F172A]/50 border border-slate-800 p-12 rounded-3xl text-center max-w-md mx-auto mt-12">
            <div className="w-12 h-12 bg-slate-800/60 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FaSearch className="text-lg" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 mb-1">No Doctors Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">No doctor matched your current search parameters. Try clearing or changing the filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => {
              const originalIndex = doctors.findIndex(d => d.doctorName === doctor.doctorName);
              const doctorId = originalIndex !== -1 ? originalIndex : index;

              return (
                <div 
                  key={index} 
                  className="group relative bg-[#0F172A]/60 hover:bg-[#0F172A] rounded-2xl border border-slate-800/80 hover:border-blue-500/40 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Card Top Highlight */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/0 group-hover:via-blue-500/60 to-transparent transition-all duration-500" />

                  {/* Main Profile Info */}
                  <div className="p-5 space-y-4">
                    <div className="flex gap-4 items-center">
                      
                      {/* Avatar Wrapper */}
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-b from-slate-700 to-slate-800 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 flex-shrink-0 shadow-md">
                        <img 
                          src={doctor.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"} 
                          alt={doctor.doctorName} 
                          className="w-full h-full object-cover rounded-[14px] bg-[#0B0F19]"
                        />
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="inline-block bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-md border border-blue-500/20 uppercase">
                          {doctor.specialization || "General"}
                        </span>
                        
                        <h2 className="font-bold text-slate-100 text-sm tracking-tight truncate group-hover:text-blue-400 transition-colors">
                          {doctor.doctorName}
                        </h2>

                        <div className="flex items-center gap-1 text-amber-400 text-[10px]">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                          <span className="text-slate-400 font-semibold ml-1 text-[11px]">(5.0)</span>
                        </div>
                      </div>
                    </div>

                    {/* Qualifications & Hospital Details */}
                    <div className="space-y-2 border-t border-slate-800/80 pt-3.5 text-[11px] text-slate-400">
                      <p className="flex items-center gap-2 truncate">
                        <FaGraduationCap className="text-blue-400 text-xs flex-shrink-0" />
                        <span className="truncate"><strong className="text-slate-200 font-medium">Degree:</strong> {doctor.qualifications}</span>
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <FaUserMd className="text-blue-400 text-xs flex-shrink-0" />
                        <span>Experience: <strong className="text-slate-200 font-medium">{doctor.experience}</strong></span>
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <FaHospital className="text-blue-400 text-xs flex-shrink-0" />
                        <span className="truncate">{doctor.hospitalName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Button */}
                  <div className="px-5 py-3.5 bg-[#080C14]/80 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-slate-300">
                      <FaMoneyBillWave className="text-xs text-emerald-400 mr-0.5" />
                      <span className="text-sm font-bold text-emerald-400">${doctor.consultationFee || "130"}</span>
                      <span className="text-[10px] text-slate-500 font-medium">/ Fee</span>
                    </div>

                    <Link 
                      href={`/find-doctors/${doctorId}`}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-blue-600/25 active:scale-95"
                    >
                      <span>Book Appointment</span>
                      <FaChevronRight className="text-[8px]" />
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