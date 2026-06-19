"use client";
import Link from "next/link";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-slate-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
        
        {/* 1. Illustration (Tailwind UI দিয়ে তৈরি মডার্ন মেডিকেল-স্টাইল ৪MD৪ ইলাস্ট্রেশন) */}
        <div className="relative flex justify-center">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center animate-bounce duration-1000">
            <span className="text-7xl font-black bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              404
            </span>
          </div>
          {/* ছোট ডেকোরেটিভ প্লাস/মেডিক্যাল সাইন আইকন */}
          <div className="absolute top-2 right-12 w-6 h-6 bg-cyan-500 rounded-lg flex items-center justify-center shadow-md rotate-12 animate-pulse">
            <span className="text-white text-xs font-bold">+</span>
          </div>
          <div className="absolute bottom-2 left-12 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-md animate-pulse delay-75">
            <span className="text-white text-[10px] font-bold">+</span>
          </div>
        </div>

        {/* 2. Error Message */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-red-500 bg-red-50 px-3 py-1.5 rounded-xl w-fit mx-auto text-sm font-semibold">
            <FiAlertCircle className="w-4 h-4" />
            <span>Page Not Found</span>
          </div>
          
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
            আপনি যে লিংকটি খুঁজছেন তা হয়তো পরিবর্তন করা হয়েছে অথবা অস্তিত্ব নেই। দয়া করে সঠিক ইউআরএলটি চেক করুন।
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-6">
          
          {/* 3. Back Home Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <FiHome className="w-5 h-5" />
            <span>মূল পাতায় ফিরে যান</span>
          </Link>
          
        </div>
      </div>
    </div>
  );
}