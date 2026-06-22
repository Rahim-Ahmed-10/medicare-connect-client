"use client";
import React, { useState } from "react";
import {
  FaSearch,
  FaUserMd,
  FaStar,
  FaStethoscope,
  FaMapMarkerAlt,
} from "react-icons/fa";

// ডামি ডক্টর ডাটা (পরবর্তীতে আপনার ডাটাবেজ থেকে ফেচ করে বসাতে পারবেন)
const initialDoctors = [
  {
    id: 1,
    name: "Dr. Asif Rahman",
    specialty: "Cardiologist",
    experience: "12 years",
    rating: 4.9,
    reviews: 120,
    location: "Dhaka Medical College",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrician",
    experience: "8 years",
    rating: 4.8,
    reviews: 95,
    location: "Popular Diagnostic, Dhanmondi",
    image: "https://img.magnific.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg", // 💡 এটি Next.js-এ সরাসরি এবং দ্রুত লোড হবে
  },
  {
    id: 3,
    name: "Dr. S. M. Imran",
    specialty: "Neurologist",
    experience: "15 years",
    rating: 5.0,
    reviews: 210,
    location: "Square Hospital, Panthapath",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Dr. Farhana Yasmin",
    specialty: "Gynecologist",
    experience: "10 years",
    rating: 4.7,
    reviews: 88,
    location: "Ibn Sina, Mirpur",
    image:
      "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=200&auto=format&fit=crop",
  },
];

const categories = [
  "All",
  "Cardiologist",
  "Pediatrician",
  "Neurologist",
  "Gynecologist",
];

const FindDoctorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // সার্চ এবং ক্যাটাগরি ফিল্টারিং লজিক
  const filteredDoctors = initialDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || doctor.specialty === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 pt-8">
      {/* 🏥 হেডার এবং ওয়েলকাম টেক্সট */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-2xl border border-white/[0.06] text-white">
        <div>
          <h1 className="text-2xl font-black tracking-tight font-sans">
            Find Your Doctor
          </h1>
          <p className="text-xs text-blue-200 mt-1">
            Book an appointment with our top medical specialists.
          </p>
        </div>

        {/* 🔍 সার্চ বার */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search doctor or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400 focus:bg-white/20 text-sm text-white placeholder-slate-400 backdrop-blur-md transition-all"
          />
          <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 size-4" />
        </div>
      </div>

      {/* 🏷️ ক্যাটাগরি ফিল্টার চিপস */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-[#090D16] text-slate-400 border border-white/[0.06] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🩻 ডাক্তারদের লিস্ট গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-[#090D16] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between hover:border-blue-500/30 transition-all group relative overflow-hidden"
            >
              <div className="flex gap-4">
                {/* 👤 ডাক্তারের ছবি */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="size-16 rounded-xl object-cover border border-white/[0.1] shrink-0"
                />

                {/* 📝 বিস্তারিত */}
                <div className="flex flex-col text-left overflow-hidden">
                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                    {doctor.name}
                  </h3>

                  <span className="text-xs font-semibold text-blue-400 mt-0.5 flex items-center gap-1.5">
                    <FaStethoscope className="size-3" /> {doctor.specialty}
                  </span>

                  <span className="text-[11px] text-slate-400 mt-1 font-medium">
                    Experience: {doctor.experience}
                  </span>

                  <div className="flex items-center gap-1 mt-2 bg-white/[0.02] border border-white/[0.04] w-fit px-2 py-0.5 rounded-lg">
                    <FaStar className="text-amber-400 size-3" />
                    <span className="text-[11px] font-bold text-slate-300">
                      {doctor.rating}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* 📍 চেম্বার লোকেশন */}
              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-start gap-2 text-slate-400 text-[11px]">
                <FaMapMarkerAlt className="text-slate-500 mt-0.5 shrink-0 size-3" />
                <span className="truncate">{doctor.location}</span>
              </div>

              {/* 📅 বুকিং বাটন */}
              <button className="w-full bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-200 mt-4 cursor-pointer border border-blue-500/20 hover:border-transparent active:scale-[0.98]">
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          /* 🔍 ডাক্তার না পাওয়া গেলে */
          <div className="col-span-full py-12 text-center bg-[#090D16] border border-white/[0.06] rounded-2xl">
            <FaUserMd className="mx-auto text-slate-600 size-10 mb-3" />
            <h3 className="text-sm font-bold text-slate-300">
              No Doctors Found
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for a different name or specialty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctorPage;
