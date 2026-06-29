"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// গ্র্যাভিটি-র নিজস্ব ভ্যালিড আইকন
import { Bell, Envelope, Gear, House } from "@gravity-ui/icons";
import {
  FaRegCheckCircle,
  FaRegCalendarAlt,
  FaRegCreditCard,
  FaRegStar,
  FaRegUser,
} from "react-icons/fa";

// মেডিকেল ও রোল ভিত্তিক আইকন
import {
  FaUserMd,
  FaUserInjured,
  FaFileMedical,
  FaCalendarCheck,
} from "react-icons/fa";

// 🎯 ফিক্সড: layout.js থেকে পাঠানো role এবং user আলাদাভাবে রিসিভ করা হলো
export default function DashboardSidebar({ role, user }) {
  const pathname = usePathname();

  // সেশনের বদলে সরাসরি প্রপস থেকে রোল নেওয়া হচ্ছে
  const userRole = role || "patient";

  
  const dashboardItems = {
    admin: [
      { icon: House, label: "Home", link: "/dashboard/admin" },
      { icon: FaUserMd, label: "Doctors", link: "/dashboard/admin/doctors" },
      { icon: FaUserInjured, label: "Patients", link: "/dashboard/admin/patients" },
      { icon: FaFileMedical, label: "Reports", link: "/dashboard/admin/reports" },
      { icon: Bell, label: "Alerts", link: "/dashboard/admin/notifications" },
      { icon: Gear, label: "Settings", link: "/dashboard/admin/settings" },
    ],
    doctor: [
      { icon: House, label: "Home", link: "/dashboard/doctor" }, // 🎯 লেবেল Home করে দেওয়া হলো যাতে সুন্দর দেখায়
      { icon: FaCalendarCheck, label: "Appts", link: "/dashboard/doctor/appointments" },
      { icon: FaUserInjured, label: "Patients", link: "/dashboard/doctor/patients" },
      { icon: FaFileMedical, label: "Presc", link: "/dashboard/doctor/prescriptions" },
      { icon: Envelope, label: "Messages", link: "/dashboard/doctor/messages" },
      { icon: Gear, label: "Settings", link: "/dashboard/doctor/settings" },
    ],
    patient: [
      { icon: FaRegCheckCircle, label: "Overview", link: "/dashboard/patient" },
      { icon: FaRegCalendarAlt, label: "My Appointments", link: "/dashboard/patient/bookings" },
      { icon: FaRegCreditCard, label: "Payments History", link: "/dashboard/patient/payments" },
      { icon: FaRegStar, label: "Feedback Reviews", link: "/dashboard/patient/reviews" },
      { icon: FaRegUser, label: "My Profile", link: "/dashboard/patient/profile" },
    ],
  };

  const currentNavItems = dashboardItems[userRole] || dashboardItems["patient"];

  return (
    <>
      {/* 💻 ডেস্কটপ সাইডবার (lg:block) */}
      <aside className="hidden w-64 shrink-0 border-r border-white/[0.06] bg-[#090D16] p-4.5 lg:block h-screen sticky top-0">
        
        {/* লোগো সেকশন */}
        <div className="flex items-center gap-3 select-none mb-6 px-1">
          <div className="flex size-9.5 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 10.5V20a2 2 0 01-2 2H7a2 2 0 01-2 2v-9.5m14 0a2 2 0 00-3-1.7l-4.3 2.5a2 2 0 01-2.2 0L5.3 8.8a2 2 0 00-3 1.7m16 0V6a2 2 0 00-2-2H7a2 2 0 00-2 2v4.5m14 0h-3.5a1.5 1.5 0 01-1.5-1.5V6"
              />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight font-sans">
              MediCare
            </span>
            <span className="text-[9px] text-blue-400 font-bold tracking-widest uppercase -mt-1">
              Health Sync
            </span>
          </div>
        </div>

        {/* ইউজারের প্রোফাইল কার্ড */}
        {user && (
          <div className="flex items-center gap-2 mb-4 p-1.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/30 text-blue-400 border border-blue-500/10 flex items-center justify-center font-bold text-sm uppercase select-none shrink-0">
              {user.name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <span className="text-xs font-bold text-slate-200 truncate">
                {user.name || "User"}
              </span>
              <span className="text-[10px] text-blue-400 font-semibold capitalize mt-0.5">
                {userRole}
              </span>
            </div>
          </div>
        )}

        {/* লিংক লিস্ট */}
        <div className="h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
          <nav className="flex flex-col gap-2 w-full">
            {currentNavItems.map((item) => {
              const isActive = pathname === item.link;

              return (
                <Link
                  key={item.label}
                  href={item.link}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 relative cursor-pointer overflow-hidden ${
                    isActive 
                      ? "bg-white/[0.06] text-white" 
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5 z-10 text-left">
                    <item.icon 
                      className={`size-4.5 transition-transform duration-200 group-hover:scale-105 ${
                        isActive ? "text-blue-400" : "text-slate-400 group-hover:text-blue-400"
                      }`} 
                    />
                    <span className="tracking-wide ml-1">{item.label}</span>
                  </div>

                  {/* ⚡ অ্যাক্টিভ ইন্ডিকেটর বার */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-md" />
                  )}
                  
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* 📱 মোবাইল বটম নেভিগেশন (lg:hidden) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#090D16]/95 backdrop-blur-lg border-t border-white/[0.06] px-2 py-2 flex items-center justify-around shadow-2xl">
        {currentNavItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.link;

          return (
            <Link
              key={item.label}
              href={item.link}
              className={`flex flex-col items-center justify-center gap-1.5 px-2 py-1 rounded-xl active:scale-95 transition-all w-16 ${
                isActive ? "text-blue-400" : "text-slate-400 hover:text-blue-400"
              }`}
            >
              <item.icon className="size-5" />
              <span className={`text-[10px] tracking-tight text-center truncate w-full ${
                isActive ? "font-bold text-blue-400" : "font-medium"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}