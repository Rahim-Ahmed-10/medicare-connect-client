"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50/50 overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide border border-blue-100/50">
              ✨ Your Health, Our Priority
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 leading-[1.15] tracking-tight">
              Your Journey to <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Better Health
              </span> Starts Here
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connect with trusted doctors, book instant appointments, and manage your medical records all in one secure, seamless platform. No long queues, no hassle.
            </p>

            {/* Call-to-Action (CTA) Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                href="/find-doctors" 
                className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Find a Doctor
              </Link>
              <Link 
                href="/about" 
                className="w-full sm:w-auto text-center bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl border border-slate-200 shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Healthcare Illustration/Image */}
          <motion.div 
            className="lg:col-span-5 flex justify-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full max-w-[450px] aspect-square lg:max-w-none">
              {/* Decorative Card 1 */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 z-20 animate-bounce [animation-duration:3s]">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">✅</div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Verification</p>
                  <p className="text-sm font-bold text-slate-800">100% Certified Doctors</p>
                </div>
              </div>

              {/* Decorative Card 2 */}
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 z-20 animate-bounce [animation-duration:4s]">
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-xl">⏰</div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Waiting Time</p>
                  <p className="text-sm font-bold text-slate-800">Reduced by 75%</p>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-1.5 shadow-2xl relative overflow-hidden group">
                <div className="w-full h-full bg-white rounded-[20px] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" 
                    alt="Healthcare Professional" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}