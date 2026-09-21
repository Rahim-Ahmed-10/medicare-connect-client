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
  FaStethoscope,
} from "react-icons/fa6";

export default function AboutPage() {
  const stats = [
    {
      id: 1,
      number: "44,000",
      label: "Team members",
      icon: <FaUserDoctor className="w-6 h-6 text-cyan-400" />,
    },
    {
      id: 2,
      number: "900+",
      label: "Locations across NC & SC",
      icon: <FaHospital className="w-6 h-6 text-cyan-400" />,
    },
    {
      id: 3,
      number: "800+",
      label: "Physician clinics",
      icon: <FaStethoscope className="w-6 h-6 text-cyan-400" />,
    },
  ];

  const coreValues = [
    {
      id: 1,
      title: "Certified Professionals",
      description:
        "We strictly verify every doctor's registration and institutional background before approving them on our platform.",
      icon: <FaUserCheck className="w-6 h-6 text-cyan-400" />,
    },
    {
      id: 2,
      title: "Quality Care First",
      description:
        "Our infrastructure ensures that patients get real-time insights, hassle-free booking, and reliable health updates.",
      icon: <FaAward className="w-6 h-6 text-cyan-400" />,
    },
    {
      id: 3,
      title: "Data Confidentiality",
      description:
        "Your health records, personal profile details, and authentication security are our absolute priority.",
      icon: <FaShieldHeart className="w-6 h-6 text-cyan-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* 🏢 1. Top Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs tracking-wide uppercase bg-cyan-950/50 px-4 py-2 rounded-full border border-cyan-800/40 backdrop-blur-md">
            <FaHeartPulse className="w-4 h-4 animate-pulse text-cyan-400" />
            About MediCare Connect
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Revolutionizing healthcare management with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              trust and precision
            </span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            MediCare Connect is a modern healthcare portal designed to bridge
            the gap between specialized clinical doctors and patients, ensuring
            seamless workflow and secure access.
          </p>
        </div>

        {/* 🏥 2. Our Story and Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[320px] sm:h-[380px] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80"
              alt="MediCare Vision"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          </div>

          <div className="space-y-6 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-800 shadow-xl">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Our Visionary Mission
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We believe that finding the right doctor or staying updated with
              correct health guidelines shouldn't be difficult. MediCare Connect
              offers secure authentication roles so that patients can surf
              safely, and specialists can maintain records smoothly.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              From regular updates on upcoming allergy seasons to high-end
              surgical data monitoring, we stay committed to empowering your
              healthcare choices at every unique stage of life.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 text-sm group transition-colors"
              >
                Explore our online healthcare services
                <FaArrowRightLong className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 📊 3. Interactive Stats Section */}
        <div className="bg-slate-900/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md border border-slate-800/80 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800/80 flex flex-col items-center justify-center space-y-3 hover:border-slate-700 transition-all hover:-translate-y-1"
              >
                <div className="p-3.5 bg-slate-800/80 border border-slate-700/50 rounded-2xl mb-1 shadow-inner">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 4. Core Values Section */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-white">
              The Pillars of MediCare
            </h2>
            <p className="text-slate-400 text-sm">
              What sets us apart from ordinary medical portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <div
                key={value.id}
                className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shadow-sm transition-colors group-hover:bg-cyan-950/50 group-hover:border-cyan-800/50">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📞 5. Bottom CTA Box */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-4xl mx-auto flex flex-col items-center justify-center border border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Have any queries or need expert support?
          </h3>
          <p className="text-slate-400 text-sm mb-8 max-w-lg leading-relaxed">
            Our active team leaders and customer helpline managers are available
            to assist you with registration or online consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/blogs"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 font-semibold py-3.5 px-6 rounded-xl text-xs tracking-wide transition-all text-center"
            >
              Read Health Blogs
            </Link>
            <Link
              href="/services"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 px-6 rounded-xl text-xs tracking-wide transition-all shadow-lg shadow-blue-600/25 text-center active:scale-[0.98]"
            >
              Get Online Care
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}