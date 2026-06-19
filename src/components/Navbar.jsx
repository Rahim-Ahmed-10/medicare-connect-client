"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // 🌟 ইমেজ ব্রোকেন/নষ্ট হলে ট্র্যাকিং করার জন্য একটি স্টেট
  const [imageError, setImageError] = useState(false);

  // Better Auth থেকে সেশন এবং ইউজার ডাটা নিয়ে আসা
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // ইউজারের নামের প্রথম অক্ষর বের করার হেল্পার ফাংশন
  const getInitials = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  // লগআউট হ্যান্ডেলার
  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setShowDropdown(false);
          setIsOpen(false);
          setImageError(false); // স্টেট রিসেট
          window.location.reload();
        },
      },
    });
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                MediCare<span className="text-cyan-500">Connect</span>
              </span>
            </Link>
          </div>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/doctors" className="hover:text-blue-600 transition-colors">Find Doctors</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link>
            {user && <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>}
          </div>

          {/* 3. Auth Buttons / User Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-9 h-9 bg-slate-200 rounded-full animate-pulse"></div>
            ) : !user ? (
              <>
                <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm shadow-blue-200 transition-all">
                  Register
                </Link>
              </>
            ) : (
              /* User Profile Dropdown */
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2.5 focus:outline-none cursor-pointer group"
                >
                  {/* 🌟 কন্ডিশন: ইমেজ যদি থাকে এবং লোডিং এরর না থাকে তবেই ছবি দেখাবে */}
                  {user?.image && !imageError ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      onError={() => setImageError(true)} // 👈 ছবি নষ্ট বা ব্রোকেন হলে এই ফাংশনটি রান হবে
                      className="w-9 h-9 rounded-full ring-2 ring-blue-500/20 object-cover transition-all group-hover:ring-blue-500/40"
                    />
                  ) : (
                    // 🌟 ছবি না থাকলে বা ছবি ব্রোকেন হলে এই সুন্দর ফলব্যাকটি দেখাবে
                    <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-semibold text-sm shadow-sm ring-1 ring-slate-300 uppercase transition-all group-hover:bg-slate-300">
                      {getInitials(user?.name)}
                    </div>
                  )}
                  
                  {/* প্রোফাইলের সাথে ইউজারের নাম */}
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors max-w-[120px] truncate normal-case">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 text-sm text-slate-500 border-b border-slate-50">
                      <p className="font-semibold text-slate-800 normal-case">{user?.name}</p>
                      <p className="text-xs truncate text-slate-400">{user?.email}</p>
                      {user?.role && (
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                          {user.role}
                        </span>
                      )}
                    </div>
                    <Link href="/dashboard/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">My Profile</Link>
                    <Link href="/dashboard" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Dashboard</Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none cursor-pointer"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-2 font-medium text-slate-600 shadow-inner">
          <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">Home</Link>
          <Link href="/doctors" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">Find Doctors</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">About Us</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">Contact Us</Link>
          {user && <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">Dashboard</Link>}
          
          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            {!user ? (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-2 text-slate-600 hover:text-blue-600">Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-center bg-blue-600 text-white py-2 rounded-xl">Register</Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                {/* মোবাইল মেনুতে ইউজারের সংক্ষিপ্ত পরিচিতি */}
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                  {user?.image && !imageError ? (
                    <img
                      src={user.image}
                      alt="User"
                      onError={() => setImageError(true)} // 👈 মোবাইলেও হ্যান্ডেল করা হয়েছে
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-semibold text-sm ring-1 ring-slate-300 uppercase">
                      {getInitials(user?.name)}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-sm font-semibold text-slate-800 leading-none normal-case">{user?.name}</p>
                    <p className="text-xs text-slate-400 mt-1 truncate">{user?.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-center bg-red-50 text-red-600 py-2 rounded-xl font-medium cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}