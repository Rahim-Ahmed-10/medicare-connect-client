"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // আপাতত আমরা ধরে নিচ্ছি ইউজার লগইন করা আছে (টেস্ট করার জন্য)
  // পরবর্তীতে এখানে Auth Context থেকে ডাটা আসবে
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [showDropdown, setShowDropdown] = useState(false);

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
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          </div>

          {/* 3. Auth Buttons / User Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm shadow-blue-200 transition-all">
                  Register
                </Link>
              </>
            ) : (
              /* User Profile Profile Dropdown */
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                    alt="User"
                    className="w-9 h-9 rounded-full ring-2 ring-blue-500/20 object-cover"
                  />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 text-sm text-slate-500 border-b border-slate-50">
                      <p className="font-semibold text-slate-800">Sarah Taylor</p>
                      <p className="text-xs truncate">sarah@example.com</p>
                    </div>
                    <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">My Profile</Link>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Dashboard</Link>
                    <button 
                      onClick={() => setIsLoggedIn(false)} 
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Mobile Menu Button (Hamburger) */}
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
          <Link href="/" className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">Home</Link>
          <Link href="/doctors" className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">Find Doctors</Link>
          <Link href="/about" className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">About Us</Link>
          <Link href="/contact" className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">Contact Us</Link>
          <Link href="/dashboard" className="block py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-blue-600">Dashboard</Link>
          
          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-center py-2 text-slate-600 hover:text-blue-600">Login</Link>
                <Link href="/register" className="text-center bg-blue-600 text-white py-2 rounded-xl">Register</Link>
              </>
            ) : (
              <button onClick={() => setIsLoggedIn(false)} className="text-center bg-red-50 text-red-600 py-2 rounded-xl font-medium">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}