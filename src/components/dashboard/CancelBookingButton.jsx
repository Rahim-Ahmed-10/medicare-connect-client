"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CancelBookingButton({ bookingId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Appointment canceled successfully!");
        router.refresh(); // ফ্রন্টএন্ড পেজটি অটো রিফ্রেশ হয়ে ডাটা আপডেট করে দেবে
      } else {
        toast.error(data.error || "Failed to cancel");
      }
    } catch (error) {
      console.error("Cancel request failed:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="bg-transparent border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 disabled:opacity-50 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
    >
      {loading ? "Canceling..." : "Cancel"}
    </button>
  );
}