"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  FaStar,
} from "react-icons/fa";

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [reviewCount, setReviewCount] = useState(0); 
  const [loading, setLoading] = useState(true);
  
  const { data: session, isPending } = useSession();
  const userEmail = session?.user?.email;
  // টোকেন সরাসরি সেশন থেকে নেয়া হয়েছে
  const token = session?.session?.token;

  const serverBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  // ডাটা লোড করার ফাংশন
  const loadDashboardData = async () => {
    if (!userEmail || !token) return;

    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      // বুকিং এবং রিভিউ কাউন্ট একসাথে ফেচ করা
      const [bookingsRes, reviewsRes] = await Promise.all([
        fetch(`${serverBaseUrl}/api/bookings?email=${userEmail}`, { headers }),
        fetch(`${serverBaseUrl}/api/reviews/count?email=${userEmail}`, { headers })
      ]);

      const bookingsData = await bookingsRes.json();
      const reviewsData = await reviewsRes.json();

      if (bookingsData.success) setAppointments(bookingsData.data || []);
      if (reviewsData.success) setReviewCount(reviewsData.count || 0);
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      if (userEmail && token) {
        loadDashboardData();
      } else {
        setLoading(false);
      }
    }
  }, [userEmail, isPending, token]);

  const totalFees = appointments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070a13]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070a13] p-4 text-white">
        Please log in to your patient account.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a13] p-6 text-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* বাম পাশের সাইডবার */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800">
             <h1 className="text-xl font-black text-white">Welcome, {session?.user?.name}</h1>
             <p className="text-slate-400 text-xs">{userEmail}</p>
          </div>

          <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-5 space-y-3">
            <div className="flex justify-between p-3 bg-[#111a31] rounded-xl border border-slate-700">
              <span className="text-xs">Upcoming Clinics</span>
              <span className="font-bold">{appointments.length}</span>
            </div>
            <div className="flex justify-between p-3 bg-[#111a31] rounded-xl border border-slate-700">
              <span className="text-xs">Total Payments</span>
              <span className="font-bold text-emerald-400">${totalFees}</span>
            </div>
          </div>
        </div>

        {/* ডান পাশের অ্যাপয়েন্টমেন্ট লিস্ট */}
        <div className="lg:col-span-8 bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800 font-bold">Consultation Schedule</div>
          
          <div className="p-6 space-y-4">
            {appointments.map((apt) => (
              <div key={apt._id} className="bg-[#111a31] p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{apt.doctorName}</h4>
                  <p className="text-xs text-blue-400">{apt.specialty}</p>
                </div>
                
                {/* রিভিউ বাটন */}
   <Link 
  href={`/dashboard/patient/reviews/${apt.doctorId}?doctor=${encodeURIComponent(apt.doctorName)}`}
  className="bg-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition"
>
  <FaStar className="inline mr-1" /> Give Review
</Link>          </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}