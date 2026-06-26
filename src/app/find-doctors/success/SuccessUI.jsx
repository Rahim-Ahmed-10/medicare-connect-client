"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { FaCheckCircle, FaReceipt, FaArrowRight } from "react-icons/fa";

export default function SuccessUI({ customerEmail, amount, transactionId }) {
  const router = useRouter();
  const searchParams = useSearchParams(); // 🚀 ১. ইউআরএল থেকে স্ট্রাইপের পাঠানো ডাটা রিড করার জন্য
  const [countdown, setCountdown] = useState(7); 

  // ইউআরএল থেকে স্ট্রাইপ সেশনের মাধ্যমে আসা ডাইনামিক বুকিং ডাটা এক্সট্র্যাক্ট করা হচ্ছে
  const doctorName = searchParams.get("doctorName") || "Dr. Rahim";
  const specialty = searchParams.get("specialty") || "GYNECOLOGIST";
  const date = searchParams.get("date") || "06/10/2026";
  const time = searchParams.get("time") || "03:00 PM";

  // 🎯 ২. ড্যাশবোর্ডের জন্য ডাইনামিক ইউআরএল কুয়েরি স্ট্রিং তৈরি করা হলো
  const dynamicDashboardUrl = `/dashboard/patient?doctorName=${encodeURIComponent(doctorName)}&specialty=${encodeURIComponent(specialty)}&date=${date}&time=${time}&amount=${amount}`;

  useEffect(() => {
    // 🎉 কালারফুল কনফেটি ড্রপ অ্যানিমেশন
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#15803d", "#2563eb", "#a855f7"]
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#15803d", "#2563eb", "#a855f7"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // 🕒 সেফ কাউন্টডাউন টাইমার
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🎯 ৩. কাউন্টডাউন ০ হলে স্বয়ংক্রিয়ভাবে ডাইনামিক ড্যাশবোর্ড লিংকে রিডাইরেক্ট হবে
  useEffect(() => {
    if (countdown === 0) {
      router.push(dynamicDashboardUrl);
    }
  }, [countdown, router, dynamicDashboardUrl]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F8FAF9] px-4 py-10 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 text-center max-w-lg w-full transition-all duration-300">
        
        {/* Animated Check Icon */}
        <div className="flex justify-center mb-5 animate-bounce">
          <div className="bg-emerald-50 p-4 rounded-full text-[#15803d]">
            <FaCheckCircle size={54} />
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Appointment Booked!
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Your payment has been processed successfully. A confirmation email and digital ticket have been sent to:
        </p>
        
        {/* User Email Badge */}
        <div className="mt-2 bg-slate-50 border border-slate-200/60 inline-block px-4 py-1.5 rounded-full text-xs font-bold text-slate-700">
          {customerEmail}
        </div>

        {/* 💳 Invoice/Receipt Mini Card */}
        <div className="bg-slate-50/80 border border-slate-200/50 rounded-2xl p-4 text-left my-6 space-y-2.5">
          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/60 font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><FaReceipt /> Payment Receipt</span>
            <span className="text-[#15803d]">Paid</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-medium">Amount Charged</span>
            <span className="font-bold text-slate-800">${amount} USD</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-medium">Transaction ID</span>
            <span className="font-mono text-xs text-slate-600 truncate max-w-[180px]" title={transactionId}>
              {transactionId}
            </span>
          </div>
        </div>

        {/* Live Countdown Toast */}
        <p className="text-xs text-slate-400 font-medium mb-6">
          Redirecting to dashboard automatically in <span className="text-[#15803d] font-bold text-sm">{countdown}</span> seconds...
        </p>

        {/* Manual Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#116530] text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] shadow-sm cursor-pointer"
          >
            Go to Homepage
          </Link>
          
          {/* 🎯 ৪. ম্যানুয়াল বাটনটিতেও ডাইনামিক ড্যাশবোর্ড লিংক ম্যাপ করে দেওয়া হলো */}
          <Link
            href={dynamicDashboardUrl} 
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
          >
            View Appointments <FaArrowRight size={10} />
          </Link>
        </div>

      </div>
    </section>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import confetti from "canvas-confetti";
// import { FaCheckCircle, FaReceipt, FaArrowRight } from "react-icons/fa";

// export default function SuccessUI({ 
//   customerEmail = "patient@example.com", 
//   amount = "80", 
//   transactionId = "TXN_MOCK_123456" 
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams(); // 🚀 ১. ইউআরএল থেকে স্ট্রাইপের পাঠানো ডাটা রিড করার জন্য

//   const [countdown, setCountdown] = useState(7); 

//   // ইউআরএল থেকে স্ট্রাইপ সেশনের মাধ্যমে আসা ডাইনামিক বুকিং ডাটা এক্সট্র্যাক্ট করা হচ্ছে
//   const doctorName = searchParams.get("doctorName") || "Dr. Nusrat Jahan";
//   const specialty = searchParams.get("specialty") || "GYNECOLOGIST";
//   const date = searchParams.get("date") || "06/10/2026";
//   const time = searchParams.get("time") || "02:00 PM";

//   // 🎯 ২. ড্যাশবোর্ডের জন্য ডাইনামিক ইউআরএল কুয়েরি স্ট্রিং তৈরি করা হলো
//   const dynamicDashboardUrl = `/dashboard/patient?doctorName=${encodeURIComponent(doctorName)}&specialty=${encodeURIComponent(specialty)}&date=${date}&time=${time}&amount=${amount}`;

//   useEffect(() => {
//     // 🎉 কালারফুল কনফেটি ড্রপ অ্যানিমেশন
//     const duration = 3 * 1000;
//     const end = Date.now() + duration;

//     (function frame() {
//       confetti({
//         particleCount: 3,
//         angle: 60,
//         spread: 55,
//         origin: { x: 0 },
//         colors: ["#15803d", "#2563eb", "#a855f7"]
//       });
//       confetti({
//         particleCount: 3,
//         angle: 120,
//         spread: 55,
//         origin: { x: 1 },
//         colors: ["#15803d", "#2563eb", "#a855f7"]
//       });

//       if (Date.now() < end) {
//         requestAnimationFrame(frame);
//       }
//     }());

//     // 🕒 সেফ কাউন্টডাউন টাইমার
//     const timer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // 🎯 ৩. কাউন্টডাউন ০ হলে স্বয়ংক্রিয়ভাবে ডাইনামিক ড্যাশবোর্ড লিংকে রিডাইরেক্ট হবে
//   useEffect(() => {
//     if (countdown === 0) {
//       router.push(dynamicDashboardUrl);
//     }
//   }, [countdown, router, dynamicDashboardUrl]);

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-[#F8FAF9] px-4 py-10 font-sans">
//       <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 text-center max-w-lg w-full transition-all duration-300">
        
//         {/* Animated Check Icon */}
//         <div className="flex justify-center mb-5 animate-bounce">
//           <div className="bg-emerald-50 p-4 rounded-full text-[#15803d]">
//             <FaCheckCircle size={54} />
//           </div>
//         </div>

//         {/* Headings */}
//         <h1 className="text-3xl font-black text-slate-900 tracking-tight">
//           Appointment Booked!
//         </h1>
//         <p className="text-sm text-slate-500 mt-2">
//           Your payment has been processed successfully. A confirmation email and digital ticket have been sent to:
//         </p>
        
//         {/* User Email Badge */}
//         <div className="mt-2 bg-slate-50 border border-slate-200/60 inline-block px-4 py-1.5 rounded-full text-xs font-bold text-slate-700">
//           {customerEmail}
//         </div>

//         {/* 💳 Invoice/Receipt Mini Card */}
//         <div className="bg-slate-50/80 border border-slate-200/50 rounded-2xl p-4 text-left my-6 space-y-2.5">
//           <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/60 font-bold text-slate-400 uppercase tracking-wider">
//             <span className="flex items-center gap-1.5"><FaReceipt /> Payment Receipt</span>
//             <span className="text-[#15803d]">Paid</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-slate-400 font-medium">Amount Charged</span>
//             <span className="font-bold text-slate-800">${amount} USD</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-slate-400 font-medium">Transaction ID</span>
//             <span className="font-mono text-xs text-slate-600 truncate max-w-[180px]" title={transactionId}>
//               {transactionId}
//             </span>
//           </div>
//         </div>

//         {/* Live Countdown Toast */}
//         <p className="text-xs text-slate-400 font-medium mb-6">
//           Redirecting to dashboard automatically in <span className="text-[#15803d] font-bold text-sm">{countdown}</span> seconds...
//         </p>

//         {/* Manual Navigation Buttons */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <Link
//             href="/"
//             className="flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#116530] text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] shadow-sm cursor-pointer"
//           >
//             Go to Homepage
//           </Link>
          
//           {/* 🎯 ৪. ম্যানুয়াল বাটনটিতেও ডাইনামিক ড্যাশবোর্ড লিংক ম্যাপ করে দেওয়া হলো */}
//           <Link
//             href={dynamicDashboardUrl} 
//             className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
//           >
//             View Appointments <FaArrowRight size={10} />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }  