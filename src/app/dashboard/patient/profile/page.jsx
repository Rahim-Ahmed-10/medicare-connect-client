import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // 🔐 আপনার প্রজেক্টের সেশন ইম্পোর্ট
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkerAlt, FaSave } from "react-icons/fa";

export default async function PatientProfilePage() {
  // ১. সেশন থেকে লগইন থাকা ইউজারের ডাটা নেওয়া
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen font-sans text-slate-300">
      
      {/* 🔝 হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white tracking-tight">My Profile</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal identity configuration, contact details, and account security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 👤 বাম পাশের কার্ড: প্রোফাইল প্রিভিউ */}
        <div className="md:col-span-1 bg-[#0D1321] border border-white/[0.06] p-6 rounded-2xl shadow-xl flex flex-col items-center text-center h-fit">
          <div className="relative w-24 h-24 mb-4 rounded-full bg-blue-600/10 border-2 border-blue-500/30 flex items-center justify-center overflow-hidden">
            {user?.image ? (
              <img 
                src={user.image} 
                alt={user.name || "Patient"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-blue-400 text-4xl" />
            )}
          </div>
          
          <h2 className="text-base font-bold text-white">{user?.name || "Patient Name"}</h2>
          <span className="inline-block bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-blue-500/20 mt-2">
            ROLE: PATIENT
          </span>
          
          <div className="w-full border-t border-white/[0.04] mt-4 pt-4 text-left space-y-2">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Account ID</div>
            <div className="font-mono text-[10px] text-slate-400 bg-white/[0.02] p-2 rounded-lg border border-white/[0.04] break-all">
              {user?.id || "usr_mock_6a3bbf15"}
            </div>
          </div>
        </div>

        {/* 📝 ডান পাশের কার্ড: প্রোফাইল এডিট ফর্ম */}
        <div className="md:col-span-2 bg-[#0D1321] border border-white/[0.06] p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.04] pb-2">
            Personal Ledger Information
          </h3>

          <form className="space-y-4">
            
            {/* নাম ও ইমেইল (সেশন থেকে ডাইনামিক লোড) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 mb-1.5 block">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                  <input 
                    type="text" 
                    defaultValue={user?.name || ""} 
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                  <input 
                    type="email" 
                    defaultValue={user?.email || ""} 
                    disabled
                    className="w-full bg-white/[0.01] border border-white/[0.04] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-500 cursor-not-allowed"
                    placeholder="yourname@domain.com"
                  />
                </div>
              </div>
            </div>

            {/* ফোন নম্বর এবং ব্লাড গ্রুপ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                  <input 
                    type="text" 
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="+880 17xx-xxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 mb-1.5 block">Blood Group</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                  <select className="w-full bg-[#0D1321] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer appearance-none">
                    <option value="">Select Blood Group</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* বর্তমান ঠিকানা */}
            <div>
              <label className="text-[11px] font-bold uppercase text-slate-400 mb-1.5 block">Residential Address</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3.5 top-3 text-slate-500 text-xs" />
                <textarea 
                  rows="3"
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                  placeholder="Enter your detailed home address..."
                ></textarea>
              </div>
            </div>

            {/* সাবমিট বাটন */}
            <div className="flex justify-end pt-2 border-t border-white/[0.04]">
              <button 
                type="button" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <FaSave /> Save Changes
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}