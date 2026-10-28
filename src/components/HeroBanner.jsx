"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  // 3D Motion values for mouse movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative bg-slate-950 overflow-hidden min-h-[calc(100vh-4rem)] flex items-center w-full [perspective:1000px]">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-cyan-500/15 rounded-full filter blur-[120px] pointer-events-none animate-pulse delay-1000" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-950/60 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold tracking-wide border border-blue-800/40 backdrop-blur-sm">
              ✨ Your Health, Our Priority
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
              Your Journey to <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                Better Health
              </span> Starts Here
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Connect with trusted doctors, book instant appointments, and manage your medical records all in one secure, seamless platform. No long queues, no hassle.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                href="/find-doctors" 
                className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Find a Doctor
              </Link>
              <Link 
                href="/about" 
                className="w-full sm:w-auto text-center bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-xl border border-slate-800 hover:border-slate-700 shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right Column - 3D Card Interactive Container */}
          <motion.div 
            className="lg:col-span-5 flex justify-center relative [perspective:1000px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[420px] aspect-square lg:max-w-none transition-all duration-200 ease-linear cursor-pointer"
            >
              {/* Badge 1 (Floating 3D Layer) */}
              <div 
                style={{ transform: "translateZ(60px)" }}
                className="absolute -top-4 -left-4 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 z-30 transition-transform duration-300 ease-out"
              >
                <div className="w-9 h-9 bg-emerald-950/80 border border-emerald-800/50 rounded-xl flex items-center justify-center text-lg">✅</div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Verification</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-100">100% Certified Doctors</p>
                </div>
              </div>

              {/* Badge 2 (Floating 3D Layer) */}
              <div 
                style={{ transform: "translateZ(80px)" }}
                className="absolute -bottom-4 -right-4 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 z-30 transition-transform duration-300 ease-out"
              >
                <div className="w-9 h-9 bg-rose-950/80 border border-rose-800/50 rounded-xl flex items-center justify-center text-lg">⏰</div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Waiting Time</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-100">Reduced by 75%</p>
                </div>
              </div>

              {/* Base Image Container with 3D Depth */}
              <div 
                style={{ transform: "translateZ(30px)" }}
                className="w-full h-full rounded-3xl bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-slate-800 p-[2px] shadow-2xl relative overflow-hidden group"
              >
                <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" 
                    alt="Healthcare Professional" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}