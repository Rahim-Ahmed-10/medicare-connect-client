"use client";
import Link from "next/link";
import { 
  FaUserShield, 
  FaBriefcaseMedical, 
  FaChartLine, 
  FaArrowRight 
} from "react-icons/fa"; 

export default function FeaturesSection() {
  const highlights = [
    {
      title: "Comprehensive Security Vault",
      desc: "Your data privacy is guarded with multi-layer encryption. Profile information and historical logs stay entirely safe under decentralized registry controls.",
      icon: <FaUserShield className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "Integrated Prescription Cabin",
      desc: "Instantly fetch authentic digital prescriptions generated straight from the clinical supervisor panels right onto your active viewport.",
      icon: <FaBriefcaseMedical className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Live Server Log Synced",
      desc: "Experience zero latency. Scheduling shifts, appointments status updates, and doctor validations process seamlessly via automated ecosystem channels.",
      icon: <FaChartLine className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    // 🎯 থিমের ব্যাকগ্রাউন্ড কালার (#0D1527) ফিক্সড রাখা হয়েছে
    <div className="w-full bg-[#0D1527] pb-24 px-4 sm:pt-36 sm:px-6 lg:px-8 font-sans text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* মেইন স্প্লিট গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-16">
          
          {/* 💻 বামপাশ: ৫ কলাম জুড়ে প্রিমিয়াম ভিজ্যুয়াল প্রিভিউカード */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-[#111A31] via-[#1E293B] to-[#0D1527] p-8 rounded-[3rem] border border-slate-800/80 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-purple-400 bg-purple-950/50 border border-purple-800/30 px-3 py-1 rounded-full">
                  System Core
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xl font-black text-white tracking-tight">The Next-Gen Unified Control Panel</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  A multi-role administrative system bridging verified doctors, real-time patients registry, and direct executive analytics inside a seamless interface.
                </p>
              </div>

              {/* মিনি ড্যাশবোর্ড স্ট্যাট উইজেট */}
              <div className="bg-[#0D1527]/90 rounded-2xl p-4 border border-slate-800/60 space-y-3">
                <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
                  <span>Server Status</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Operational
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  {/* 🎨 গ্রাফিকাল বারটিকে ব্র্যান্ড থিম অনুযায়ী ব্যাকগ্রাউন্ড ব্লু কালার টোনে সেট করা হয়েছে */}
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[92%] rounded-full"></div>
                </div>
              </div>

              {/* 🎯 Access Gateway বাটন - এটিকে বুকিং বাটনের মেইন ব্র্যান্ড ব্লু (#1B62FD) কালারে ম্যাচ করা হয়েছে */}
              <Link href="/login" className="w-full block text-center bg-[#1B62FD] hover:bg-[#1554E2] text-white font-bold py-3.5 px-4 rounded-2xl text-xs shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] cursor-pointer tracking-wider">
                Access Gateway
              </Link>
            </div>
          </div>

          {/* 📝 ডানপাশ: ৭ কলাম জুড়ে মিনিমাল হাইলাইটস */}
          <div className="lg:col-span-7 space-y-8">
            <div className="max-w-xl">
              {/* 🎨 থিমের সাথে মিল রেখে টেক্সট কালার (#1B62FD) এর লাইট ভেরিয়েন্ট করা হয়েছে */}
              <span className="text-xs font-black text-[#3B82F6] uppercase tracking-widest block mb-1">Ecosystem Architecture</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
                Engineered for Fluid Operational Speed
              </h2>
            </div>

            {/* হাইলাইট লিস্ট */}
            <div className="space-y-6">
              {highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-5 p-5 rounded-2xl hover:bg-[#111A31]/50 border border-transparent hover:border-slate-800/60 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#111A31] border border-slate-800 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    {/* 🎨 হোভার টেক্সট কালারটিকে ব্র্যান্ড গ্লোয়িং ব্লু (#3B82F6) তে ম্যাচ করা হয়েছে */}
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#3B82F6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              {/* 🎨 ডকুমেন্টেশন অ্যারো আইকন কালারটি থিমের সাথে ম্যাচ করা হয়েছে */}
              <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white tracking-wider uppercase transition-colors cursor-pointer">
                Read Documentation <FaArrowRight className="text-[#3B82F6]" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}