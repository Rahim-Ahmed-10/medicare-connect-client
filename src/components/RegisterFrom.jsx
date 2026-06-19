"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client"; // আপনার সঠিক পাথ অনুযায়ী নিশ্চিত করুন

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
  const [googleLoading, setGoogleLoading] = useState(false); // গুগল লোডিং স্টেট

  // পাসওয়ার্ড ভ্যালিডেশন চেক
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
    return minLength && hasNumber && hasSpecialChar;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // ইনপুট চেঞ্জ হলে এরর রিমুভ হবে
  };

  // ১. সাধারণ ইমেইল/পাসওয়ার্ড সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("Submitting Form Data:", formData);

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
      const res = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image,
        data: {
          role: formData.role,
          status: formData.role === "doctor" ? "unverified" : "active",
        }
      });

      console.log("Better Auth Response:", res);

      if (res?.error) {
        setError(res.error.message || "Something went wrong.");
      } else {
        setSuccess(`Account created successfully as ${formData.role}! 🎉 Redirecting...`);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🌟 ২. গুগল দিয়ে সাইন আপ হ্যান্ডেলার
  const handleGoogleSignUp = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const res = await signUp.social({
        provider: "google",
        callbackURL: "/", // সফল লগইন শেষে ড্যাশবোর্ড বা হোম পেজের রুট
        data: {
          role: formData.role,
          status: formData.role === "doctor" ? "unverified" : "active",
        }
      });
      console.log("Google Sign Up Response:", res);
    } catch (err) {
      setError("Google sign up failed. Please try again.");
      console.error(err);
      setGoogleLoading(false);
    }
  };

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

          {/* Role Selection (Patient / Doctor / Admin) */}
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

        {/* 🌟 সুন্দর এবং প্রিমিয়াম গুগল বাটন */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm group"
        >
          {/* 🌟 গুগল ব্র্যান্ড গাইডলাইনের অরিজিনাল ৪ কালার SVG আইকন */}
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
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}