"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaImage, 
  FaUserNurse, 
  FaUserGear, 
  FaUserCheck, 
  FaShieldHalved, 
  FaArrowLeft,
  FaGoogle
} from "react-icons/fa6";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "", // Photo URL
    role: "patient", // Default role: patient, doctor, or admin
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // পাসওয়ার্ড ভ্যালিডেশন চেক
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
    return minLength && hasNumber && hasSpecialChar;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // ১. সাধারণ ইমেইল/পাসওয়ার্ড সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password || !formData.image) {
      setError("Please fill in all fields, including the Photo URL.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long, contain at least one number, and one special character.");
      return;
    }

    setLoading(true);
    try {
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image,
        role: formData.role,
        status: formData.role === "doctor" ? "unverified" : "active",
        plan: 'free'
      }, {
        onSuccess: () => {
          setSuccess(`Account created successfully as ${formData.role}! 🎉 Redirecting...`);
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Something went wrong.");
        }
      });
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-950 py-10 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Main Split Container */}
      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* 🔐 LEFT PANEL: Register Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 bg-slate-900/90 flex flex-col justify-center space-y-5">
          
          <div className="text-center lg:text-left space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Create Account
            </h3>
            <p className="text-slate-400 text-sm">
              Join MediCare Connect today and manage your healthcare.
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
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaUser className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Photo URL */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Photo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaImage className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Register As
              </label>
              <div className="grid grid-cols-3 gap-2">
                
                {/* Patient Option */}
                <label className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border cursor-pointer transition-all ${formData.role === "patient" ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold" : "border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800/80"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="patient"
                    checked={formData.role === "patient"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <FaUserCheck className="text-xs" />
                  <span className="text-xs">Patient</span>
                </label>

                {/* Doctor Option */}
                <label className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border cursor-pointer transition-all ${formData.role === "doctor" ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold" : "border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800/80"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="doctor"
                    checked={formData.role === "doctor"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <FaUserNurse className="text-xs" />
                  <span className="text-xs">Doctor</span>
                </label>

                {/* Admin Option */}
                <label className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border cursor-pointer transition-all ${formData.role === "admin" ? "border-purple-500 bg-purple-500/10 text-purple-400 font-bold" : "border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800/80"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <FaUserGear className="text-xs" />
                  <span className="text-xs">Admin</span>
                </label>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
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
              <p className="text-[11px] text-slate-500 leading-normal">
                Min. 6 chars, with at least 1 number & 1 special character.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-600/20 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm active:scale-[0.99] mt-2"
            >
              {loading ? "Creating Account..." : "SIGN UP"}
            </button>
          </form>

          {/* Footer Mobile Link */}
          <p className="text-center text-xs text-slate-500 lg:hidden pt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>

        </div>

        {/* 🚀 RIGHT PANEL: Hero Side (One of us?) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden order-first lg:order-last">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff15_0%,transparent_60%)] pointer-events-none" />

          {/* Top Tag */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/20">
              <FaShieldHalved className="text-cyan-200" />
              MediCare Connect
            </div>
          </div>

          {/* Center Text & Link */}
          <div className="my-10 lg:my-0 relative z-10 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                One of us ?
              </h2>
              <p className="text-cyan-100/80 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                If you already have an account, just sign in. We've missed you!
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 backdrop-blur-md transition-all text-sm group"
              >
                <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
                Sign In Now
              </Link>
            </div>
          </div>

          {/* Bottom Footer Text */}
          <div className="relative z-10 text-xs text-cyan-200/60 hidden lg:block">
            © MediCare Portal. All Rights Reserved.
          </div>
        </div>

      </div>
    </div>
  );
}