"use client";
import Link from "next/link";
import { 
  FaHeartPulse, 
  FaUserCheck, 
  FaAward, 
  FaShieldHeart, 
  FaArrowRightLong, 
  FaUserDoctor, 
  FaHospital, 
  FaStethoscope 
} from "react-icons/fa6";

export default function AboutPage() {
  const stats = [
    {
      id: 1,
      number: "44,000+",
      label: "Team Members",
      icon: <FaUserDoctor className="w-5 h-5 text-[#7A1FA2]" />,
    },
    {
      id: 2,
      number: "900+",
      label: "Locations Covered",
      icon: <FaHospital className="w-5 h-5 text-[#7A1FA2]" />,
    },
    {
      id: 3,
      number: "800+",
      label: "Specialist Clinics",
      icon: <FaStethoscope className="w-5 h-5 text-[#7A1FA2]" />,
    },
  ];

  const coreValues = [
    {
      id: 1,
      title: "Certified Professionals",
      description: "We strictly verify every doctor's registration and institutional background before approving them on our platform.",
      icon: <FaUserCheck className="w-6 h-6 text-[#7A1FA2]" />,
    },
    {
      id: 2,
      title: "Quality Care First",
      description: "Our infrastructure ensures that patients get real-time insights, hassle-free booking, and reliable health updates.",
      icon: <FaAward className="w-6 h-6 text-[#7A1FA2]" />,
    },
    {
      id: 3,
      title: "Data Confidentiality",
      description: "Your health records, personal profile details, and authentication security are our absolute priority.",
      icon: <FaShieldHeart className="w-6 h-6 text-[#7A1FA2]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#818386] py-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 🏢 1. Top Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#9A00D7] font-bold text-xs tracking-wide uppercase bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <FaHeartPulse className="w-4 h-4 animate-pulse" />
            About MediCare Connect
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A] tracking-tight leading-tight">
            Revolutionizing healthcare management with trust and precision
          </h1>
          <p className="text-base text-[#1E293B] leading-relaxed">
            MediCare Connect is a modern healthcare portal designed to bridge the gap between specialized clinical doctors and patients, ensuring seamless workflow and secure access.
          </p>
        </div>

        {/* 🏥 2. Our Story and Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[320px] md:h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-200 group">
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80" 
              alt="Medical Team Collaboration" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <div className="space-y-6 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Visionary Mission
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We believe that finding the right doctor or staying updated with correct health guidelines shouldn't be difficult. MediCare Connect offers secure authentication roles so that patients can surf safely, and specialists can maintain records smoothly.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              From regular updates on upcoming allergy seasons to high-end surgical data monitoring, we stay committed to empowering your healthcare choices at every unique stage of life.
            </p>
            <div className="pt-2">
              <Link 
                href="/services" 
                className="inline-flex items-center gap-2 text-[#7A1FA2] font-bold hover:underline text-sm group"
              >
                Explore our online healthcare services
                <FaArrowRightLong className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 📊 3. Interactive Stats Section (নতুন যোগ করা হয়েছে) */}
        <div className="bg-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center space-y-2">
                <div className="p-3 bg-purple-50 rounded-full mb-1">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-slate-900">{stat.number}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 4. Core Values Section */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#0D1B2A]">The Pillars of MediCare</h2>
            <p className="text-slate-700 text-sm mt-2">What sets us apart from ordinary medical portals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <div 
                key={value.id} 
                className="bg-white rounded-[2rem] p-6 shadow-md border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shadow-sm transition-colors group-hover:bg-[#6A1B9A]/10">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-[#7A1FA2]">
                    {value.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📞 5. Bottom CTA Footer Box */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl text-center max-w-4xl mx-auto flex flex-col items-center justify-center border border-slate-100">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
            Have any queries or need expert support?
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-lg">
            Our active team leaders and customer helpline managers are available to assist you with registration or online consultation.
          </p>
          <div className="flex gap-4">
            <Link
              href="/blogs"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl text-xs tracking-wide transition-all"
            >
              Read Health Blogs
            </Link>
            <Link
              href="/services"
              className="bg-[#6A1B9A] hover:bg-[#4A148C] text-white font-bold py-3 px-6 rounded-xl text-xs tracking-wide transition-all active:scale-[0.98] shadow-md shadow-purple-100"
            >
              Get Online Care
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}