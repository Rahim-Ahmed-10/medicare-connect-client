"use client";
import { useState } from "react";
import { FaHeartPulse, FaGooglePlay, FaApple, FaEnvelope } from "react-icons/fa6";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    // 🎨 ব্যাকগ্রাউন্ড পরিবর্তন করে ডার্ক থিম (#0D1527) এর সাথে মিলানো হয়েছে
    <div className="w-full bg-[#0D1527] pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 🎨 ইনার বক্সের ব্যাকগ্রাউন্ড রিচ ডার্ক (#0F1A36) এবং বর্ডার কালার সেট করা হয়েছে */}
        <div className="bg-[#0F1A36] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800 text-white">
          
          {/* Background subtle decoration */}
          {/* 🎨 ব্লার ব্যাকগ্রাউন্ডের গ্লো কালার ব্লু এবং সায়ান শেডে পরিবর্তন করা হয়েছে */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Column: App Download Info */}
            <div className="space-y-6 text-center lg:text-left">
              {/* 🎨 ব্যাজের টেক্সট কালার গ্লোয়িং ব্লু (#3B82F6) এবং বর্ডার অ্যাডজাস্ট করা হয়েছে */}
              <div className="inline-flex items-center gap-2 text-[#3B82F6] font-bold text-xs tracking-wide uppercase bg-blue-500/5 px-4 py-2 rounded-full border border-blue-500/10 mx-auto lg:mx-0">
                <FaHeartPulse className="w-4 h-4 animate-pulse" />
                MediCare Mobile App Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Take Care of Your Health <br />
                {/* 🎨 বেগুনি টেক্সট পরিবর্তন করে ব্র্যান্ড সায়ান কালার দেওয়া হয়েছে */}
                <span className="text-[#22D3EE]">Anytime, Anywhere.</span>
              </h2>
              <p className="text-slate-400 text-xs max-w-md mx-auto lg:mx-0 leading-relaxed">
                Download the MediCare Connect app to book instant video consultations, track your digital e-prescriptions, and order medicines with one tap.
              </p>
              
              {/* App Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-2xl transition-all active:scale-95 cursor-pointer">
                  <FaGooglePlay className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Get it on</p>
                    <p className="text-xs font-bold -mt-0.5">Google Play</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-2xl transition-all active:scale-95 cursor-pointer">
                  <FaApple className="w-5 h-5 text-slate-200" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Download on the</p>
                    <p className="text-xs font-bold -mt-0.5">App Store</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Newsletter Subscription */}
            <div className="bg-[#0D1527]/50 p-6 md:p-8 rounded-[2rem] border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold tracking-tight">Subscribe to Healthy Headlines</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Join our newsletter to receive weekly expert medical updates, allergy alerts, and specialized health tips directly to your inbox.
              </p>

              {subscribed ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold rounded-2xl text-center text-xs">
                  🎉 Thank you for subscribing to MediCare Connect!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                  <div className="relative flex-grow">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    {/* 🎨 ইনপুট ফিল্ডের বর্ডার ও ফোকাস কালার ডার্ক থিমের উপযোগী করা হয়েছে */}
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-800 bg-[#0F1A36] text-white focus:outline-none focus:border-[#3B82F6] text-xs placeholder-slate-500"
                    />
                  </div>
                  {/* 🎨 সাবস্ক্রাইব বাটনের কালার পরিবর্তন করে মেইন ব্র্যান্ড ব্লু (#1B62FD) করা হয়েছে */}
                  <button
                    type="submit"
                    className="bg-[#1B62FD] hover:bg-[#1554E2] text-white font-bold py-3.5 px-6 rounded-xl text-xs tracking-wide transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap shadow-lg shadow-blue-500/10"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}