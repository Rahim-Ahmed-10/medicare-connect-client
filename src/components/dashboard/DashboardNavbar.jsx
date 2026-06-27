"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaBell, 
  FaUser, 
  FaCog,
  FaHome 
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function DashboardNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    // 🎨 image_6fa16b.png এর সাথে মিল রেখে ব্যাকগ্রাউন্ড ও বর্ডার ডার্ক করা হয়েছে
    <header className="bg-[#0f172a] border-b border-slate-800/80 h-16 sticky top-0 z-40 flex items-center justify-between px-6 sm:px-10 font-sans">
      
      {/* 🏷️ বাম পাশ: ড্যাশবোর্ড টাইটেল */}
      <div>
        <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
          Patient Control Panel
        </h1>
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium hidden sm:block mt-0.5">
          Overview & Real-time Server Registry
        </p>
      </div>

      {/* 🔔 ডান পাশ: অ্যাকশনস */}
      <div className="flex items-center gap-4">
        
        {/* হোম বাটন */}
        <Link 
          href="/" 
          className="w-9 h-9 text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 rounded-xl flex items-center justify-center transition-all cursor-pointer"
          title="Back to Home Website"
        >
          <FaHome size={18} />
        </Link>

        {/* নোটিফিকেশন বাটন */}
        <button className="w-9 h-9 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl flex items-center justify-center transition-colors relative cursor-pointer">
          <FaBell size={16} />
          {/* ইমেজ অনুযায়ী লাইট গ্রিন নোটিফিকেশন ডট */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#4ade80] rounded-full ring-2 ring-[#0f172a]"></span>
        </button>

        {/* ডিভাইডার লাইন */}
        <div className="h-6 w-[1px] bg-slate-800 mx-1"></div>

        {/* 🔐 প্রোফাইল সেকশন */}
        {isPending ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        ) : user ? (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 cursor-pointer focus:outline-none p-1 rounded-xl hover:bg-slate-800/50 transition-colors"
            >
              {user.image ? (
                <img 
                  src={user.image} 
                  alt="profile" 
                  className="w-8 h-8 rounded-full object-cover border border-slate-700 shadow-sm" 
                />
              ) : (
                <FaUserCircle className="text-2xl text-slate-400" />
              )}
              
              {/* ইউজারনেম ও রোল টেক্সট */}
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-200 leading-none">{user.name?.split(" ")[0]}</p>
                <span className="text-[9px] font-black text-blue-400 bg-blue-950/40 px-1.5 py-0.5 rounded-md mt-1 inline-block uppercase tracking-wider border border-blue-900/30">
                  Patient
                </span>
              </div>
            </button>

            {/* ড্রপডাউন মেনু */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#111a31] border border-slate-800 rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-200 text-slate-300">
                <div className="px-4 py-2.5 border-b border-slate-800">
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{user.email}</p>
                </div>

                <button 
                  onClick={() => { setIsDropdownOpen(false); router.push("/dashboard/patient/profile"); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-left cursor-pointer"
                >
                  <FaUser className="text-slate-500 text-[11px]" /> My Profile
                </button>

                <div className="border-t border-slate-800 my-1"></div>

                <button 
                  onClick={() => { setIsDropdownOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/30 font-semibold transition-colors text-left cursor-pointer"
                >
                  <FaSignOutAlt className="text-[11px]" /> Logout Account
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}