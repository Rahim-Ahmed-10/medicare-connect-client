"use client";

import { useEffect, useState } from "react";
import { 
  FaUserMd, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaRegCheckCircle, 
  FaStethoscope, 
  FaTrashAlt, 
  FaFileAlt, 
  FaStar,
  FaClock
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client"; // 👈 আপনার Better Auth ক্লায়েন্ট পাথ নিশ্চিত করুন

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Better Auth ক্লায়েন্ট সেশন থেকে ডাইনামিক ইউজার ডাটা নেওয়া হচ্ছে
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const serverBaseUrl = "http://localhost:8085";

  const loadBookings = async () => {
    if (!userEmail) return;
    try {
      setLoading(true);
      const res = await fetch(`${serverBaseUrl}/api/bookings?email=${userEmail}`);
      const result = await res.json();
      if (result.success) {
        setAppointments(result.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      loadBookings();
    } else if (!isPending && !userEmail) {
      setLoading(false);
    }
  }, [userEmail, isPending]);

  const handleCancelBooking = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to cancel this appointment?");
    if (!isConfirm) return;

    try {
      const res = await fetch(`${serverBaseUrl}/api/bookings/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        setAppointments((prev) => prev.filter((item) => item._id !== id));
        alert("Appointment canceled successfully.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // স্ট্যাটস ক্যালকুলেশন (স্টাইলিশ গ্রিডের জন্য)
  const totalFees = appointments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F6]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="font-sans font-medium text-slate-500 text-sm">Loading control panel info...</div>
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F6] font-sans p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-sm shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Please log in to your patient account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] p-4 sm:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 🌿 ১. Welcome Banner (রেফারেন্স ইমেজের মতো) */}
        <div className="bg-[#2D6A4F] text-white p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="relative z-10 space-y-2 max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {session?.user?.name || "Patient"}! 👋
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              Access real-time schedules, view medical records, coordinate with top clinicians, and manage payments securely.
            </p>
          </div>
          {/* ব্যাকগ্রাউন্ড শ্যাডো ইফেক্ট */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
            <FaRegCheckCircle size={240} />
          </div>
        </div>

        {/* 📊 ২. ৪টি স্টাইলিশ স্ট্যাটস কার্ড গ্রিড (Overview Row) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* কার্ড ১: মোট বুকিং */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              <FaCalendarAlt />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-none">{appointments.length}</h3>
              <p className="text-[11px] font-medium text-slate-400 mt-1">Upcoming Clinics</p>
            </div>
          </div>

          {/* কার্ড ২: হিস্ট্রি / রেকর্ড */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
              <FaFileAlt />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-none">1</h3>
              <p className="text-[11px] font-medium text-slate-400 mt-1">Histories & Checkups</p>
            </div>
          </div>

          {/* কার্ড ৩: টোটাল ট্রানজেকশন ফিস */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
              <FaMoneyBillWave />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-none">${totalFees}</h3>
              <p className="text-[11px] font-medium text-slate-400 mt-1">Total Transactions</p>
            </div>
          </div>

          {/* কার্ড ৪: রিভিউ কাউন্ট */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shrink-0">
              <FaStar />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-none">2</h3>
              <p className="text-[11px] font-medium text-slate-400 mt-1">Clinical Reviews</p>
            </div>
          </div>

        </div>

        {/* 🗓️ ৩. ক্লিন ও প্রফেশনাল আপকামিং কনসালটেশন লিস্ট */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Upcoming Consultations</h2>
          </div>

          {appointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              No clinical visits registered on your server registry.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <div 
                  key={appointment._id} 
                  className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  {/* ডাক্তার ও স্পেশালিস্ট ইনফো */}
                  <div className="flex gap-4 items-center">
                    <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200/60 text-lg shrink-0">
                      <FaUserMd />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-900 text-sm">{appointment.doctorName}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <FaStethoscope className="text-[10px]" /> {appointment.specialty}
                      </p>
                    </div>
                  </div>

                  {/* তারিখ ও সময় */}
                  <div className="flex flex-wrap sm:flex-nowrap gap-4 text-xs font-medium text-slate-600 w-full sm:w-auto">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/40">
                      <FaCalendarAlt className="text-slate-400" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/40">
                      <FaClock className="text-slate-400" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>

                  {/* ফি, স্ট্যাটাস এবং অ্যাকশন বাটন */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400 font-bold">Fee paid</span>
                      <strong className="text-slate-900 text-sm">${appointment.amount || "10"} USD</strong>
                    </div>

                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-amber-200/60">
                      {appointment.status || "Pending"}
                    </span>

                    <button
                      onClick={() => handleCancelBooking(appointment._id)}
                      className="text-slate-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Cancel Appointment"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}