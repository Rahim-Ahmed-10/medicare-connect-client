import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // 🔐 Better Auth সেশন
import PatientReviewsClient from "@/components/dashboard/PatientReviewsClient";


export default async function PatientReviewsPage() {
  // ১. সেশন থেকে লগইন থাকা ইউজারের ডাটা নেওয়া
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user || null;
  let selectedDoctors = [];

  // ২. সরাসরি আপনার বুকিং বা সিলেক্টেড ডক্টরস এপিআই থেকে ডাটা আনা
  if (user?.email) {
    try {
      const res = await fetch(`http://localhost:8085/api/bookings?email=${user.email}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          selectedDoctors = result.data; // মঙ্গোডিবি থেকে আসা আপনার সিলেক্টেড ডক্টরস/বুকিংস
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch selected doctors for reviews:", error);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen font-sans text-slate-300">
      
      {/* 🔝 হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white tracking-tight">Review Your Selected Doctors</h1>
        <p className="text-xs text-slate-400 mt-1">
          Provide ratings and clinical feedback for the medical practitioners you have interacted with or selected.
        </p>
      </div>

      {/* ক্লায়েন্ট ভিউ কম্পোনেন্ট, যেখানে আপনার সিলেক্ট করা ডাক্তারদের পাঠানো হচ্ছে */}
      <PatientReviewsClient selectedDoctors={selectedDoctors} userEmail={user?.email} />

    </div>
  );
}