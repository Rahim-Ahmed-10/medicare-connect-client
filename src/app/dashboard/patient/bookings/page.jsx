import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // 🔐 আপনার প্রজেক্টের Better Auth বা সেশন ইম্পোর্ট করুন
import { FaUserMd, FaCalendarAlt, FaClock, FaStethoscope, FaWallet } from "react-icons/fa";
import CancelBookingButton from "@/components/dashboard/CancelBookingButton";

 // 👈 ডিলিট হ্যান্ডেল করার জন্য নিচের ক্লায়েন্ট কম্পোনেন্টটি লাগবে

export default async function PatientBookingsPage() {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

 
  
  const userEmail = session?.user?.email;

  let appointments = [];
  let errorMsg = null;

  // ২. ব্যাকএন্ড এক্সপ্রেস সার্ভার থেকে ডাটা ফেচ করা
  if (userEmail) {
    try {
      const res = await fetch(`https://medicare-connect-server-nine.vercel.app/api/bookings?email=${userEmail}`, {
        cache: "no-store", // রিয়েল-টাইম ডাটা পাওয়ার জন্য ক্যাশ অফ রাখা হলো
      });
      const result = await res.json();
      if (result.success) {
        appointments = result.data;
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      errorMsg = "Server connection failed!";
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen font-sans text-slate-300">
      {/* হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white tracking-tight">My Appointments</h1>
        <p className="text-xs text-slate-400 mt-1">
          Welcome back, <span className="text-blue-400 font-semibold">{session?.user?.name || "Patient"}</span>. Manage your booked sessions below.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-4">
          {errorMsg}
        </div>
      )}

      {/* অ্যাপয়েন্টমেন্ট লিস্ট রেন্ডারিং */}
      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/[0.05] rounded-2xl text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 text-2xl mb-4">
            <FaUserMd />
          </div>
          <p className="text-sm font-semibold text-slate-400">No appointments found.</p>
          <p className="text-xs text-slate-500 mt-1">You haven't booked any doctors yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((doc) => (
            <div 
              key={doc._id} 
              className="bg-[#0D1321] border border-white/[0.06] p-5 rounded-2xl shadow-xl transition-all hover:border-blue-500/20"
            >
              {/* টপ কার্ড: ডাক্তার ও স্ট্যাটাস */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl shrink-0">
                    <FaUserMd />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-white">{doc.doctorName}</h3>
                    <p className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                      <FaStethoscope className="text-[10px]" /> {doc.specialty || "General Physician"}
                    </p>
                  </div>
                </div>

                {/* ব্যাকএন্ড থেকে আসা ডাইনামিক স্ট্যাটাস */}
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg border text-center self-start sm:self-center ${
                  doc.status === "Confirmed" 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}>
                  {doc.status || "Pending"}
                </span>
              </div>

              {/* মিডল কার্ড: ডেট, টাইম এবং ফিস */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 bg-white/[0.02] p-3 rounded-xl border border-white/[0.04] text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-slate-500" />
                  <span>{doc.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-slate-500" />
                  <span>{doc.time}</span>
                </div>
                <div className="flex items-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.06]">
                  <FaWallet className="text-slate-500" />
                  <span>Fee: <strong className="text-blue-400">${doc.amount || doc.consultationFee || 0} USD</strong></span>
                </div>
              </div>

              {/* সিম্পটম ডেসক্রিপশন */}
              {doc.symptomsDescription && (
                <div className="bg-white/[0.01] rounded-xl p-3 border border-white/[0.04] mb-4 text-left">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block tracking-wider">Symptoms Ledger</span>
                  <p className="text-xs text-slate-400 mt-1 italic">"{doc.symptomsDescription}"</p>
                </div>
              )}

              {/* অ্যাকশন বাটন সমূহ */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.04]">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer">
                  Pay now (Stripe)
                </button>
                {/* অ্যাপয়েন্টমেন্ট ক্যানসেল বা ডিলিট করার বাটন কম্পোনেন্ট */}
                <CancelBookingButton bookingId={doc._id} />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}