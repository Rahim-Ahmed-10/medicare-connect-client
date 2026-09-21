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
  FaArrowRight 
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-950 py-10 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Main Split Container */}
      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* 🚀 LEFT PANEL: Animated Welcome Side */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff15_0%,transparent_60%)] pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/20">
              <FaShieldHalved className="text-cyan-300" />
              MediCare Connect Secure Auth
            </div>
          </div>

          {/* Center Graphic & Text */}
          <div className="my-10 lg:my-0 relative z-10 space-y-6 text-center lg:text-left">
            <div className="w-20 h-20 mx-auto lg:mx-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <FaRocket className="text-3xl text-cyan-300 animate-pulse" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                New Here?
              </h2>
              <p className="text-blue-100/80 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                Register today to access specialized doctors, track consultations, and seamlessly manage health records.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 backdrop-blur-md transition-all text-sm group"
              >
                Create an Account
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Bottom Footer Text */}
          <div className="relative z-10 text-xs text-blue-200/60 hidden lg:block">
            © MediCare Portal. All Rights Reserved.
          </div>
        </div>

        {/* 🔐 RIGHT PANEL: Sign In Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 bg-slate-900/90 flex flex-col justify-center space-y-6">
          
          <div className="text-center lg:text-left space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sign In
            </h3>
            <p className="text-slate-400 text-sm">
              Welcome back! Please enter your details below.
            </p>
          </div>

          {/* Alert Notifications */}
          {error && (
            <div className="p-3.5 bg-red-950/50 border border-red-800/80 text-red-300 rounded-2xl text-xs font-medium flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="p-3.5 bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 rounded-2xl text-xs font-medium flex items-center gap-2">
              ✅ {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaLock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm active:scale-[0.99] mt-2"
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
          </form>

          {/* Social Sign In Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase font-bold tracking-wider">
              Or Sign in with social platforms
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-semibold py-3 px-4 rounded-xl border border-slate-700/80 shadow-md hover:border-slate-600 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm group"
          >
            <FaGoogle className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
            <span>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </span>
          </button>

          {/* Demo Login Credentials Quick Panel */}
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Demo Test Credentials (Click to fill)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              
              {/* Admin */}
              <button
                type="button"
                onClick={() => handleQuickFill("admin@gmail.com", "Admin!123")}
                className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-colors"
              >
                <div className="text-cyan-400 font-bold text-[11px]">Admin</div>
                <div className="text-slate-400 text-[10px] truncate">admin@gmail.com</div>
              </button>

              {/* Patient */}
              <button
                type="button"
                onClick={() => handleQuickFill("kulsum@gmail.com", "Kulsum!123")}
                className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-colors"
              >
                <div className="text-emerald-400 font-bold text-[11px]">Patient</div>
                <div className="text-slate-400 text-[10px] truncate">kulsum@gmail.com</div>
              </button>

              {/* Doctor */}
              <button
                type="button"
                onClick={() => handleQuickFill("tanbir@gmail.com", "Tanbir!123")}
                className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-colors"
              >
                <div className="text-purple-400 font-bold text-[11px]">Doctor</div>
                <div className="text-slate-400 text-[10px] truncate">tanbir@gmail.com</div>
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