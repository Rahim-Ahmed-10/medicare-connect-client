"use client";
import Link from "next/link";
import { 
  FaVideo, 
  FaFilePrescription, 
  FaCapsules, 
  FaHeartPulse, 
  FaBaby, 
  FaBrain, 
  FaKitMedical, 
  FaArrowRightLong 
} from "react-icons/fa6";

export default function FeaturesSection() {
  // 1. Quick Action Cards (English Updated)
  const quickActions = [
    {
      id: 1,
      title: "Online Video Call",
      desc: "Start a live video consultation instantly with experienced and certified doctors.",
      icon: <FaVideo className="w-6 h-6 text-[#7A1FA2]" />,
      bg: "bg-purple-50",
      border: "hover:border-purple-300",
      link: "/services"
    },
    {
      id: 2,
      title: "E-Prescription",
      desc: "Get your digital medical prescription in your dashboard right after the session ends.",
      icon: <FaFilePrescription className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
      border: "hover:border-blue-300",
      link: "/services"
    },
    {
      id: 3,
      title: "Medicine Delivery",
      desc: "Order prescribed medicines directly to your doorstep with our hassle-free service.",
      icon: <FaCapsules className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50",
      border: "hover:border-emerald-300",
      link: "/services"
    }
  ];

  // 2. Specialized Departments (English Updated)
  const departments = [
    { name: "Cardiology", subtitle: "Heart Care", icon: <FaHeartPulse className="w-5 h-5 text-red-500" /> },
    { name: "Pediatrics", subtitle: "Child Care", icon: <FaBaby className="w-5 h-5 text-amber-500" /> },
    { name: "Neurology", subtitle: "Brain & Nerve", icon: <FaBrain className="w-5 h-5 text-indigo-500" /> },
    { name: "General Health", subtitle: "Primary Care", icon: <FaKitMedical className="w-5 h-5 text-teal-500" /> },
  ];

  return (
    <div className="w-full bg-[#818386] pt-10 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ⚡ 1. Quick Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link 
              href={action.link} 
              key={action.id} 
              className={`bg-white rounded-[2rem] p-6 shadow-xl border-2 border-transparent ${action.border} transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${action.bg} flex items-center justify-center shadow-sm`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#7A1FA2] transition-colors">
                  {action.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {action.desc}
                </p>
              </div>
              <div className="mt-4 pt-2 flex items-center gap-2 text-xs font-bold text-[#7A1FA2]">
                Get Service <FaArrowRightLong className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* 🩺 2. Specialist Departments Section */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Specialized Departments
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Select the appropriate department to connect with the right healthcare specialist.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {departments.map((dept, index) => (
              <Link 
                href="/services" 
                key={index} 
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-purple-300 hover:bg-purple-50/20 transition-all duration-200 text-center flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {dept.icon}
                </div>
                <div className="font-bold text-slate-900 text-sm">{dept.name}</div>
                <div className="text-[11px] font-medium text-slate-400">{dept.subtitle}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}