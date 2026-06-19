"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client"; // আপনার সঠিক পাথ অনুযায়ী নিশ্চিত করুন

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

  // ১. ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন
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
        callbackURL: "/", // লগইন সফল হলে কোন পেজে যাবে (যেমন: হোম পেজ বা ড্যাশবোর্ড)
      });

      console.log("Sign In Response:", res);

      if (res?.error) {
        setError(res.error.message || "Invalid email or password.");
      } else {
        setSuccess("Logged in successfully! 🚀 Redirecting...");
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ২. গুগল দিয়ে সামাজিক লগইন (Social Login)
  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/", // গুগল লগইন শেষে রিডাইরেক্ট ইউআরএল
      });
    } catch (err) {
      setError("Google sign in failed. Please try again.");
      console.error("Google Auth Error:", err);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-2">Log in to your MediCare Connect account</p>
        </div>

        {/* Alert Notifications */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm font-medium">
            ✅ {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm text-slate-900 bg-white transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm text-slate-900 bg-white transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-100 transition-all cursor-pointer flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed text-sm mt-2"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-semibold tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* 🌟 সুন্দর এবং প্রিমিয়াম গুগল বাটন */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm group"
        >
          {/* 🌟 ৪-কালার অরিজিনাল Google SVG আইকন */}
          <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.58z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.32 14.24A7.16 7.16 0 0 1 4.91 12c0-.79.13-1.57.41-2.24V6.61H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.39l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"
            />
          </svg>
          <span className="text-slate-600 font-semibold group-hover:text-slate-800 transition-colors">
            {googleLoading ? "Connecting Google..." : "Google"}
          </span>
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}