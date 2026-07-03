"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 

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
      const res = await authClient.signUp.email({
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
          
          // 🎯 ম্যাজিক লাইন: router.push-এর বদলে হার্ড রিফ্রেশ করে হোম পেজে পাঠানো হচ্ছে
          // এর ফলে ব্রাউজারের সেশন স্টেট সম্পূর্ণ রিফ্রেশ হবে এবং নেভবার সাথে সাথে আপডেট হবে।
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

  // ২. গুগল দিয়ে সাইন আপ হ্যান্ডেলার
  // const handleGoogleSignUp = async () => {
  //   setError("");
  //   setGoogleLoading(true);
  //   try {
  //     await authClient.signIn.social({
  //       provider: "google",
  //       callbackURL: "/", // গুগল লগইন শেষে এই ইউআরএল-এ ব্যাক করবে
  //       // 🌟 Better-Auth-এর লেটেস্ট নিয়ম অনুযায়ী কাস্টম ফিল্ড এভাবে পাস করতে হয়
  //       userAdditionalFields: {
  //         role: formData.role,
  //         status: formData.role === "doctor" ? "unverified" : "active",
  //         plan: "free"
  //       }
  //     });
  //   } catch (err) {
  //     setError("Google sign up failed. Please try again.");
  //     console.error(err);
  //     setGoogleLoading(false);
  //   }
  // };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
          <p className="text-sm text-slate-500 mt-2">Join MediCare Connect today</p>
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
          
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm text-slate-900 bg-white transition-colors"
            />
          </div>

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

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Photo URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm text-slate-900 bg-white transition-colors"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Register As</label>
            <div className="grid grid-cols-3 gap-2">
              {/* Patient */}
              <label className={`flex items-center justify-center py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === "patient" ? "border-blue-600 bg-blue-50/50 text-blue-700 font-semibold" : "border-slate-200 text-slate-600 text-xs"}`}>
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={formData.role === "patient"}
                  onChange={handleChange}
                  className="sr-only"
                />
                Patient
              </label>

              {/* Doctor */}
              <label className={`flex items-center justify-center py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === "doctor" ? "border-blue-600 bg-blue-50/50 text-blue-700 font-semibold" : "border-slate-200 text-slate-600 text-xs"}`}>
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={formData.role === "doctor"}
                  onChange={handleChange}
                  className="sr-only"
                />
                Doctor
              </label>

              {/* Admin */}
              <label className={`flex items-center justify-center py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === "admin" ? "border-purple-600 bg-purple-50/50 text-purple-700 font-semibold" : "border-slate-200 text-slate-600 text-xs"}`}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                  className="sr-only"
                />
                Admin
              </label>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-sm text-slate-900 bg-white transition-colors"
            />
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">
              Must be at least 6 characters, include 1 number and 1 special character.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-100 transition-all cursor-pointer flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed text-sm mt-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-slate-150"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-semibold tracking-wider">Or register with</span>
          <div className="flex-grow border-t border-slate-150"></div>
        </div>

        

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}