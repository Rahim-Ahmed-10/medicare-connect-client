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
    <div className="w-full bg-[#818386] pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-[#0D1B2A] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/10 text-white">
          
          {/* Background subtle decoration */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#7A1FA2]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Column: App Download Info */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[#9A00D7] font-bold text-xs tracking-wide uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10 mx-auto lg:mx-0">
                <FaHeartPulse className="w-4 h-4 animate-pulse" />
                MediCare Mobile App Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Take Care of Your Health <br />
                <span className="text-[#9A00D7]">Anytime, Anywhere.</span>
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
            <div className="bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10 space-y-4">
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
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#9A00D7] text-xs placeholder-slate-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#6A1B9A] hover:bg-[#4A148C] text-white font-bold py-3.5 px-6 rounded-xl text-xs tracking-wide transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap shadow-lg shadow-purple-900/20"
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