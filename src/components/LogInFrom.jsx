"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { 
  FaUser, 
  FaLock, 
  FaGoogle, 
  FaRocket, 
  FaEnvelope, 
  FaShieldHalved, 
  FaArrowRight,
  FaUserGear,
  FaUserDoctor,
  FaUserInjured,
  FaWandMagicSparkles
} from "react-icons/fa6";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Quick Credential Auto-fill Handler
  const handleQuickFill = (email, password) => {
    setFormData({ email, password });
    setError("");
  };

  // 1. Email and Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });

      if (res?.error) {
        setError(res.error.message || "Invalid email or password.");
      } else {
        setSuccess("Logged in successfully! Redirecting...");
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Google Social Login
  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google sign in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#070b14] py-12 px-4 sm:px-6 relative overflow-hidden selection:bg-cyan-500 selection:text-white">
      
      {/* 🌟 Atmospheric Ambient Light Spheres */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/15 rounded-full filter blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/15 rounded-full filter blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full filter blur-[160px] pointer-events-none" />

      {/* 💎 Main Split Container with Gradient Border Glow */}
      <div className="w-full max-w-5xl bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* 🚀 LEFT PANEL: Animated Hero Side */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/60">
          
          {/* Subtle Dynamic Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 shadow-inner">
              <FaShieldHalved className="text-cyan-300 animate-pulse" />
              <span className="tracking-wide">MediCare Connect</span>
            </div>
          </div>

          {/* Center Graphic & Content */}
          <div className="my-10 lg:my-0 relative z-10 space-y-6 text-center lg:text-left">
            <div className="w-20 h-20 mx-auto lg:mx-0 bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-md border border-white/30 rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 group">
              <FaRocket className="text-3xl text-cyan-300 group-hover:scale-110 transition-transform" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Welcome to <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
                  Healthcare 2.0
                </span>
              </h2>
              <p className="text-blue-100/75 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0 font-normal">
                Register today to access specialized doctors, track consultations, and seamlessly manage health records.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-2xl border border-white/25 backdrop-blur-md transition-all duration-300 text-sm group shadow-lg hover:shadow-cyan-500/10 active:scale-95"
              >
                <span>Create an Account</span>
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Bottom Footer Text */}
          <div className="relative z-10 text-[11px] text-blue-200/50 tracking-wider uppercase font-medium hidden lg:block">
            © MediCare Portal. All Rights Reserved.
          </div>
        </div>

        {/* 🔐 RIGHT PANEL: Sign In Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 bg-slate-900/90 flex flex-col justify-center space-y-6">
          
          <div className="text-center lg:text-left space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sign In
            </h3>
            <p className="text-slate-400 text-sm">
              Welcome back! Please enter your account credentials.
            </p>
          </div>

          {/* Alert Notifications */}
          {error && (
            <div className="p-4 bg-red-950/40 border border-red-800/60 text-red-300 rounded-2xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200">
              <span className="text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 rounded-2xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200">
              <span className="text-base">✅</span>
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/70 focus:border-cyan-500 focus:bg-slate-800/90 focus:ring-2 focus:ring-cyan-500/20 rounded-2xl text-sm text-slate-100 placeholder-slate-500 transition-all outline-none font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                  <FaLock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/70 focus:border-cyan-500 focus:bg-slate-800/90 focus:ring-2 focus:ring-cyan-500/20 rounded-2xl text-sm text-slate-100 placeholder-slate-500 transition-all outline-none font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-cyan-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm active:scale-[0.99] mt-2 tracking-wide"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          {/* Social Sign In Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-[11px] uppercase font-bold tracking-wider">
              Or Sign in with social platforms
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-slate-800/40 hover:bg-slate-800/80 text-slate-200 font-semibold py-3 px-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm group"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
            ) : (
              <FaGoogle className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
            )}
            <span>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </span>
          </button>

          {/* Demo Login Credentials Quick Panel */}
          <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl space-y-3 shadow-inner">
            <div className="flex items-center gap-1.5">
              <FaWandMagicSparkles className="text-amber-400 text-xs" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Demo Test Credentials (Click to Auto-fill)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              
              {/* Admin */}
              <button
                type="button"
                onClick={() => handleQuickFill("admin@gmail.com", "Admin!123")}
                className="p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/50 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
                  <FaUserGear className="text-xs" />
                  <span>Admin</span>
                </div>
                <div className="text-slate-400 text-[10px] truncate mt-0.5 group-hover:text-slate-300">
                  admin@gmail.com
                </div>
              </button>

              {/* Patient */}
              <button
                type="button"
                onClick={() => handleQuickFill("kulsum@gmail.com", "Kulsum!123")}
                className="p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/50 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                  <FaUserInjured className="text-xs" />
                  <span>Patient</span>
                </div>
                <div className="text-slate-400 text-[10px] truncate mt-0.5 group-hover:text-slate-300">
                  kulsum@gmail.com
                </div>
              </button>

              {/* Doctor */}
              <button
                type="button"
                onClick={() => handleQuickFill("tanbir@gmail.com", "Tanbir!123")}
                className="p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800/80 hover:border-purple-500/50 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[11px]">
                  <FaUserDoctor className="text-xs" />
                  <span>Doctor</span>
                </div>
                <div className="text-slate-400 text-[10px] truncate mt-0.5 group-hover:text-slate-300">
                  tanbir@gmail.com
                </div>
              </button>

            </div>
          </div>

          {/* Footer Mobile Link */}
          <p className="text-center text-xs text-slate-500 lg:hidden pt-2">
            Don't have an account?{" "}
            <Link href="/register" className="text-cyan-400 font-semibold hover:underline">
              Register Now
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}