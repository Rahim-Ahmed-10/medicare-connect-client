"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { FiPlusSquare, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  
  const [imageError, setImageError] = useState(false);

  // Better Auth থেকে সেশন এবং ইউজার ডাটা নিয়ে আসা
  const { data: session, isPending } = useSession();
  const user = session?.user;
  
  // 🎯 ফিক্সড ১: ইউজারের রোল সেফলি হ্যান্ডেল করা (সবসময় এটিই লিংকে ব্যবহার হবে)
  const userRole = user?.role || "patient";

  // ইউজারের নামের প্রথম অক্ষর বের করার হেল্পার ফাংশন
  const getInitials = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  const pathname = usePathname();
  if (pathname.includes('/dashboard')) {
    return null;
  }

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
          
          {/* 1. Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
                <FiPlusSquare className="w-5 h-5 text-white" />
              </div>
              
              <span className="text-2xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 bg-clip-text text-transparent tracking-tight">
                Medi<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-bold">Care</span>
              </span>
            </Link>
          </div>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            
            {/* 🎯 কন্ডিশন: ইউজার লগইন না থাকলে অথবা লগইন করা ইউজার যদি Patient হয়, তবেই দেখাবে */}
            {(!user || userRole === "patient") && (
              <Link href="/find-doctors" className="hover:text-blue-600 transition-colors">Find Doctors</Link>
            )}
            
            <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link>
            
            {/* 🎯 ফিক্সড ২: এখানে user?.role এর বদলে ডাইনামিক এবং সেফ userRole ভ্যারিয়েবল ব্যবহার করা হয়েছে */}
            {user && (
              <Link href={`/dashboard/${userRole}`} className="hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* 3. Auth Buttons / User Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-9 h-9 bg-slate-200 rounded-full animate-pulse"></div>
            ) : !user ? (
              <>
                <Link href="/login" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2.5 focus:outline-none cursor-pointer group bg-slate-50/50 hover:bg-slate-50 px-3 py-1.5 rounded-xl border border-transparent hover:border-slate-100 transition-all"
                >
                  {user?.image && !imageError ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      onError={() => setImageError(true)}
                      className="w-8 h-8 rounded-full ring-2 ring-blue-500/20 object-cover transition-all group-hover:ring-blue-500/40"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shadow-sm uppercase transition-all group-hover:bg-blue-100">
                      {getInitials(user?.name)}
                    </div>
                  )}
                  
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors max-w-[120px] truncate normal-case">
                    {user?.name}
                  </span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-1.5 border border-slate-100/80 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 text-sm text-slate-500 border-b border-slate-50">
                      <p className="font-bold text-slate-800 normal-case">{user?.name}</p>
                      <p className="text-xs truncate text-slate-400 mt-0.5">{user?.email}</p>
                      {user?.role && (
                        <span className="inline-block mt-1.5 text-[10px] uppercase font-extrabold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">
                          {user.role}
                        </span>
                      )}
                    </div>
                    <Link href="/dashboard/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50/80">My Profile</Link>
                    
                    {/* 🎯 ফিক্সড ৩: ড্রপডাউনের ভেতরেও userRole ব্যবহার করা হয়েছে */}
                    <Link href={`/dashboard/${userRole}`} onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50/80">Dashboard</Link>
                    
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold cursor-pointer border-t border-slate-50 mt-1"
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
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-slate-100 focus:outline-none cursor-pointer"
            >
              {isOpen ? (
                <FiX className="h-6 w-6 text-slate-600" />
              ) : (
                <FiMenu className="h-6 w-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1.5 font-semibold text-slate-600 shadow-inner">
          <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-blue-600">Home</Link>
          
          {/* 🎯 মোবাইল মেনুতেও একই কন্ডিশন সেট করা হলো */}
          {(!user || userRole === "patient") && (
            <Link href="/find-doctors" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-blue-600">Find Doctors</Link>
          )}
          
          <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-blue-600">About Us</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-blue-600">Contact Us</Link>
          
          {/* 🎯 ফিক্সড ৪: মোবাইল মেনুর ড্যাশবোর্ড লিংকেও userRole ব্যবহার করা হয়েছে */}
          {user && (
            <Link href={`/dashboard/${userRole}`} onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-blue-600">
              Dashboard
            </Link>
          )}
          
          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            {!user ? (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-2 text-slate-600 hover:text-blue-600 font-bold">Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-center bg-blue-600 text-white py-2.5 rounded-xl font-bold">Register</Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl">
                  {user?.image && !imageError ? (
                    <img
                      src={user.image}
                      alt="User"
                      onError={() => setImageError(true)}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm uppercase">
                      {getInitials(user?.name)}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-800 leading-none normal-case">{user?.name}</p>
                    <p className="text-xs text-slate-400 mt-1 truncate">{user?.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-center bg-red-50 text-red-600 py-2.5 rounded-xl font-bold cursor-pointer"
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