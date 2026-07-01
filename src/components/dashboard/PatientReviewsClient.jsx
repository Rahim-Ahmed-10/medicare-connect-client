"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { 
  FaUserMd, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaRegCheckCircle, 
  FaStethoscope, 
  FaFileAlt, 
  FaStar,
  FaClock,
  FaShieldAlt
} from "react-icons/fa";


export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [reviewCount, setReviewCount] = useState(0); 
  const [loading, setLoading] = useState(true);
  
  const { data: session, isPending } =useSession();
  const userEmail = session?.user?.email;

  // 🎯 Better Auth ক্লায়েন্ট থেকে সরাসরি টোকেনটি বের করা
  const token = authClient.useSession()?.data?.session?.token || authClient.token?.();

  const serverBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  // 🚀 ১. বুকিংস লোড করার সময় টোকেন পাঠানো
  const loadBookings = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`${serverBaseUrl}/api/bookings?email=${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 🎯 হেডার্সে সিকিউর টোকেন যুক্ত করা হলো
          "Authorization": `Bearer ${token?.token}`
        }
      });
      const result = await res.json();
      if (result.success) {
        setAppointments(result.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // 🚀 ২. রিভিউ কাউন্ট লোড করার সময় টোকen পাঠানো
  const loadReviewCount = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`${serverBaseUrl}/api/reviews/count?email=${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 🎯 হেডার্সে সিকিউর টোকেন যুক্ত করা হলো
          "Authorization": `Bearer ${token}`
        }
      });
      const result = await res.json();
      if (result.success) {
        setReviewCount(result.count || 0);
      }
    } catch (error) {
      console.error("Error fetching review count:", error);
    }
  };

  useEffect(() => {
    const initDashboard = async () => {
      // 🎯 ইউজার ইমেইল এবং টোকেন দুটিই রেডি হলেই কেবল এপিআই কল হবে
      if (userEmail && token) {
        setLoading(true);
        await Promise.all([loadBookings(), loadReviewCount()]); 
        setLoading(false);
      } else if (!isPending && !userEmail) {
        setLoading(false);
      }
    };
    initDashboard();
  }, [userEmail, isPending, token]); // 🎯 ডিপেনডেন্সি অ্যারেতে token যুক্ত করা হয়েছে

  const totalFees = appointments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070a13]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.4)]"></div>
          <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Loading Workspace...</div>
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070a13] p-4">
        <div className="bg-[#0f172a] p-8 rounded-2xl border border-slate-800 text-center max-w-sm shadow-xl">
          <p className="text-sm font-medium text-slate-300">Please log in to your patient account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a13] p-4 sm:p-6 lg:p-8 font-sans text-slate-200 antialiased">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 📌 বাম পাশের সেকশন */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800/80 shadow-lg relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 text-blue-500/5 pointer-events-none">
                <FaRegCheckCircle size={130} />
              </div>
              <div className="relative z-10 space-y-2.5">
                <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 font-extrabold uppercase px-2.5 py-1 rounded-md tracking-widest">
                  Overview Portal
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Welcome, <span className="text-blue-400">{session?.user?.name || "Patient"}</span>
                </h1>
                <p className="text-slate-400 text-xs font-medium truncate">
                  {userEmail}
                </p>
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-5 space-y-3.5 shadow-lg">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Metrics Ledger</h3>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#111a31] border border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-sm">
                    <FaCalendarAlt />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Upcoming Clinics</span>
                </div>
                <span className="text-sm font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">{appointments.length}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#111a31] border border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">
                    <FaFileAlt />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Medical Logs</span>
                </div>
                <span className="text-sm font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">1</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#111a31] border border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
                    <FaMoneyBillWave />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Total Payments</span>
                </div>
                <span className="text-sm font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-800/40">${totalFees}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#111a31] border border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-sm">
                    <FaStar />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Submitted Reviews</span>
                </div>
                <span className="text-sm font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">{reviewCount}</span>
              </div>
            </div>

            <div className="bg-blue-950/20 border border-blue-900/40 p-4 rounded-xl flex gap-3 items-start">
              <FaShieldAlt className="text-blue-400 shrink-0 mt-0.5 text-xs" />
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Your clinical records are safeguarded with end-to-end cloud encryption layers.
              </p>
            </div>
          </div>

          {/* 🗓️ ডান পাশের সেকশন */}
          <div className="lg:col-span-8 bg-[#0f172a] rounded-2xl border border-slate-800/80 shadow-lg overflow-hidden">
            <div className="p-5 border-b border-slate-800 bg-[#111a31]/40 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live Consultation Schedule</h2>
            </div>

            {appointments.length === 0 ? (
              <div className="p-16 text-center text-slate-500 text-sm font-medium tracking-wide">
                No appointment logs or sessions linked with this profile.
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {appointments.map((appointment, index) => (
                  <div key={appointment._id} className="relative flex gap-4 items-start group">
                    
                    <div className="flex flex-col items-center h-full pt-1.5 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0f172a] ring-4 ring-blue-950/40 transition-all group-hover:ring-blue-900/60"></div>
                      {index !== appointments.length - 1 && (
                        <div className="w-[1px] bg-slate-800 group-hover:bg-slate-700 h-24 mt-2 transition-colors"></div>
                      )}
                    </div>

                    <div className="flex-1 bg-[#111a31]/40 hover:bg-[#111a31]/80 p-5 rounded-xl border border-slate-800/80 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-blue-400 border border-slate-800 flex items-center justify-center text-base shrink-0 shadow-inner">
                          <FaUserMd />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm tracking-wide">{appointment.doctorName}</h4>
                          <p className="text-[10px] text-blue-400 flex items-center gap-1 mt-0.5 font-extrabold uppercase tracking-widest">
                            <FaStethoscope className="text-[9px]" /> {appointment.specialty}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                          <span className="flex items-center gap-1.5 bg-[#0f172a] px-2.5 py-1.5 rounded-lg border border-slate-800">
                            <FaCalendarAlt className="text-slate-500 text-[10px]" /> {appointment.date}
                          </span>
                          <span className="flex items-center gap-1.5 bg-[#0f172a] px-2.5 py-1.5 rounded-lg border border-slate-800">
                            <FaClock className="text-slate-500 text-[10px]" /> {appointment.time}
                          </span>
                        </div>
                        
                        <span className="bg-[#052e16]/30 text-[#4ade80] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md border border-[#15803d]/30 shadow-[0_0_10px_rgba(74,222,128,0.05)]">
                          {appointment.status || "CONFIRMED"}
                        </span>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}