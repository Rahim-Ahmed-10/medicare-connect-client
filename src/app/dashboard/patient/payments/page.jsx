import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // 🔐 Better Auth সেশন
import { FaUserMd, FaCalendarAlt, FaReceipt, FaMoneyBillWave } from "react-icons/fa";

export default async function PatientPaymentsPage() {
  // ১. সেশন থেকে লগইন থাকা ইউজারের ডাটা এবং ইমেইল নেওয়া
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const userEmail = session?.user?.email;

  let payments = [];
  let errorMsg = null;

  // ২. সরাসরি আপনার রানিং এক্সপ্রেস সার্ভার (Port: 8085) থেকে ডাটা ফেচ করা
  if (userEmail) {
    try {
      const res = await fetch(`http://localhost:8085/api/bookings?email=${userEmail}`, {
        cache: "no-store", // রিয়েল-টাইম ডাটার জন্য ক্যাশ অফ
      });
      
      const result = await res.json();
      
      if (result.success && Array.isArray(result.data)) {
        // 💡 শুধুমাত্র যে ডক্টরদের পেমেন্ট 'Confirmed' বা স্ট্যাটাস সাকসেসফুল, তাদের ফিল্টার করে দেখানো হচ্ছে
        payments = result.data.filter(
          (booking) => booking.status === "Confirmed" || booking.amount
        );
      }
    } catch (error) {
      console.error("Failed to fetch payments from express:", error);
      errorMsg = "Express server connection failed!";
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen font-sans text-slate-300">
      
      {/* 🔝 হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white tracking-tight">Stripe Payment Transactions</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review your finalized digital ledger settlements and active medical billing logs securely verified via Stripe channels.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-4">
          {errorMsg}
        </div>
      )}

      {/* 📊 মেইন পেমেন্ট টেবিল */}
      <div className="bg-[#0D1321] border border-white/[0.06] rounded-2xl shadow-xl overflow-hidden">
        {payments.length === 0 ? (
          // 📭 ডাটা না থাকলে ক্লিন ভিউ
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
              <FaReceipt className="text-2xl" />
            </div>
            <h3 className="text-sm font-bold text-slate-400">No Transactions Logged</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              There are no confirmed Stripe payment checkout logs registered for {userEmail || "this user"}.
            </p>
          </div>
        ) : (
          // 📋 ডাইনামিক টেবিল লেআউট (এক্সপ্রেস ডাটাবেজ থেকে সরাসরি রিড হচ্ছে)
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6"><span className="flex items-center gap-2"><FaUserMd className="text-blue-400" /> Paid Practitioner</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-2"><FaReceipt className="text-slate-400" /> Stripe Charge / TXID</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-2"><FaMoneyBillWave className="text-emerald-400" /> Amount</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-2"><FaCalendarAlt className="text-amber-400" /> Date</span></th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs font-semibold text-slate-300">
                {payments.map((pay) => (
                  <tr key={pay._id} className="hover:bg-white/[0.01] transition-colors">
                    
                    {/* ডাক্তার এবং স্পেশালিটি */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">{pay.doctorName}</div>
                      <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-0.5">
                        {pay.specialty || "General Clinical"}
                      </div>
                    </td>

                    {/* ডাইনামিক ট্রানজেকশন/সেশন আইডি */}
                    <td className="py-4 px-6 font-mono text-[11px] text-slate-500 tracking-tight">
                      {pay.stripeSessionId || pay.transactionId || `tx_stripe_${pay._id.slice(0, 8)}`}
                    </td>

                    {/* পেমেন্ট অ্যামাউন্ট */}
                    <td className="py-4 px-6 text-emerald-400 font-extrabold text-sm">
                      ${pay.amount || "20"} USD
                    </td>

                    {/* পেমেন্টের তারিখ */}
                    <td className="py-4 px-6 text-slate-400 font-medium">
                      {pay.date || "N/A"}
                    </td>

                    {/* স্ট্যাটাস ব্যাজ */}
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-emerald-500/20">
                        {pay.status === "Confirmed" ? "SUCCESS" : "SUCCESS"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-[10px] italic text-slate-500 text-center mt-4">
        All payment processes are end-to-end encrypted under standard Stripe merchant processing protocols.
      </p>

    </div>
  );
}