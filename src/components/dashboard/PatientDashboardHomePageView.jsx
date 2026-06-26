// "use client";

// import React from "react";
// import { useSearchParams } from "next/navigation";
// import { 
//   FaCalendarAlt, 
//   FaClock, 
//   FaUserMd, 
//   FaCheckCircle, 
//   FaFileInvoiceDollar,
//   FaHandHoldingHeart
// } from "react-icons/fa";

// export default function PatientDashboardHomePageView() {
//   const searchParams = useSearchParams();
  
//   // ইউআরএল থেকে ডাইনামিক বুকিং ডাটা রিসিভ করা হচ্ছে
//   const doctorName = searchParams.get("doctorName") || "Dr. Nusrat Jahan"; 
//   const specialty = searchParams.get("specialty") || "GYNECOLOGIST";
//   const amount = searchParams.get("amount") || "80";
//   const date = searchParams.get("date") || "06/10/2026"; 
//   const time = searchParams.get("time") || "02:00 PM";

//   // ডাক্তারের নাম অনুযায়ী ইমেজ ডাইনামিক করা
//   const isNusrat = doctorName.toLowerCase().includes("nusrat");
//   const doctorImage = isNusrat 
//     ? "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
//     : "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300";

//   return (
//     <div className="space-y-6 p-6 max-w-7xl mx-auto text-slate-800">
      
//       {/* ওয়েলকাম ব্যানার */}
//       <div className="bg-emerald-800 text-white p-6 rounded-3xl shadow-sm relative overflow-hidden">
//         <h1 className="text-2xl font-bold">Welcome back, Rahim! 👋</h1>
//         <p className="text-sm text-emerald-100/80 mt-1">Your medical control panel is live.</p>
//       </div>

//       {/* স্ট্যাটাস কার্ডস */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
//           <p className="text-xs text-slate-400 font-bold uppercase">Total Booked</p>
//           <p className="text-xl font-black text-slate-800 mt-1">1 Appointment</p>
//         </div>
//         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
//           <p className="text-xs text-slate-400 font-bold uppercase">Total Expenses</p>
//           <p className="text-xl font-black text-slate-800 mt-1">${amount} USD</p>
//         </div>
//         <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
//           <p className="text-xs text-slate-400 font-bold uppercase">Payment Status</p>
//           <p className="text-emerald-600 text-sm font-bold mt-1 flex items-center gap-1">
//             <FaCheckCircle /> 100% Secured Paid
//           </p>
//         </div>
//       </div>

//       {/* বুক করা ডাক্তারের ডাইনামিক লাইভ কার্ড */}
//       <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
//         <h2 className="text-lg font-bold text-slate-900 mb-4">Your Active Consultation</h2>
        
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
          
//           {/* ডক্টর প্রোফাইল */}
//           <div className="flex items-center gap-4">
//             <img src={doctorImage} alt={doctorName} className="w-16 h-16 rounded-xl object-cover ring-4 ring-slate-100" />
//             <div>
//               <div className="flex items-center gap-2">
//                 <h3 className="text-base font-bold text-slate-800">{doctorName}</h3>
//                 <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
//                   {specialty}
//                 </span>
//               </div>
//               <p className="text-xs text-slate-500 mt-0.5">Square Hospital, Dhaka</p>
//             </div>
//           </div>

//           {/* শিডিউল */}
//           <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
//             <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
//               <FaCalendarAlt className="text-emerald-600" />
//               <span>{date}</span>
//             </div>
//             <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
//               <FaClock className="text-blue-500" />
//               <span>{time}</span>
//             </div>
//           </div>

//           {/* পেমেন্ট ইনফো */}
//           <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
//             <div>
//               <p className="text-[10px] text-slate-400 font-bold uppercase">Paid Fee</p>
//               <p className="text-base font-black text-slate-800">${amount}</p>
//             </div>
//             <span className="px-3 py-1 text-xs font-bold bg-emerald-500 text-white rounded-xl flex items-center gap-1">
//               <FaCheckCircle size={10} /> PAID
//             </span>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }