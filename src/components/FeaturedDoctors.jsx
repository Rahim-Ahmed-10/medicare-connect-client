"use client";
import Link from "next/link";
import { FaHeartPulse, FaStar, FaArrowRightLong } from "react-icons/fa6";

export default function FeaturedDoctors() {
  const topDoctors = [
    {
    id: 1,
    name: "Dr. Nusrat Jahan",
    title: "Gynecology & Obstetrics Specialist",
    hospital: "Bangabandhu Sheikh Mujib Medical University",
    rating: "5.0",
    reviews: "310 Reviews",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&auto=format&fit=crop&q=80"
  },
    {
      id: 2,
      name: "Dr. Fahim Ahmed",
      title: "Consultant Cardiologist",
      hospital: "National Heart Foundation",
      rating: "5.0",
      reviews: "240 Reviews",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Dr. Sarah Taylor",
      title: "Allergy & Immunology Specialist",
      hospital: "Square Hospitals Ltd.",
      rating: "4.8",
      reviews: "95 Reviews",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"
    }
  ];

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
          {topDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-[2rem] p-4 shadow-xl flex flex-col justify-between group hover:scale-[1.01] transition-all duration-300">
              <div className="space-y-4">
                <div className="relative h-[240px] rounded-[1.8rem] overflow-hidden bg-slate-100">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl flex items-center gap-1 shadow-sm text-xs font-black text-slate-900">
                    <FaStar className="text-amber-400 w-3.5 h-3.5" /> {doc.rating}
                  </div>
                </div>
                <div className="px-2 space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#7A1FA2] transition-colors">{doc.name}</h3>
                  <p className="text-[#7A1FA2] font-semibold text-xs tracking-wide uppercase">{doc.title}</p>
                  <p className="text-slate-400 text-[11px] leading-tight font-medium">{doc.hospital}</p>
                </div>
              </div>
              <div className="px-2 pt-4 pb-1">
                <Link href="/services" className="w-full bg-[#6A1B9A] hover:bg-[#4A148C] text-white text-center font-bold py-3 rounded-xl text-xs block transition-all active:scale-[0.98]">
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}