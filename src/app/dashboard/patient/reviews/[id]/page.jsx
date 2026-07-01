"use client";

import { useSearchParams } from 'next/navigation';
import { useState, Suspense, use } from 'react';
import { FaStar } from 'react-icons/fa';
import { useSession } from "@/lib/auth-client"; 

function ReviewFormContent({ params }) {
  // ১. প্রমিজ থেকে আইডি আনর‍্যাপ করা (Next.js 15+ এর রিকোয়ারমেন্ট)
  const resolvedParams = use(params);
  const doctorId = resolvedParams.id;
  
  const searchParams = useSearchParams();
  const doctorName = searchParams.get('doctor');

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // ২. রিভিউ ডাটা (এখানে email যোগ করা হয়েছে যাতে ড্যাশবোর্ড কাউন্ট কাজ করে)
    const reviewData = {
      patientId: session?.user?.id, 
      patientName: session?.user?.name,
      email: session?.user?.email, // ড্যাশবোর্ড কাউন্টের জন্য ইমেইল আবশ্যক
      doctorId: doctorId,
      doctorName: doctorName,
      rating,
      comment: reviewText, // সার্ভার কোডের সাথে মিল রাখার জন্য 'comment' ব্যবহার করা হয়েছে
      createdAt: new Date().toISOString()
    };

    try {
      // ৩. এপিআই কল (আপনার সার্ভার রাউটের সাথে সামঞ্জস্যপূর্ণ)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        alert("Review submitted successfully!");
        setReviewText("");
      } else {
        const errorData = await res.json();
        alert("Failed: " + (errorData.message || "Error submitting review"));
      }
    } catch (error) {
      console.error(error);
      alert("Network Error! Check your server connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070a13] p-6 text-white">
      <form onSubmit={handleSubmit} className="bg-[#0f172a] p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Rate {doctorName || "Doctor"}</h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className={star <= rating ? "text-yellow-400" : "text-slate-600"}>
              <FaStar size={24} />
            </button>
          ))}
        </div>
        <textarea 
          required
          className="w-full bg-[#111a31] border border-slate-700 p-3 rounded-xl text-white mb-4 outline-none"
          rows="4"
          placeholder="Share your experience..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button disabled={submitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl transition">
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default function ReviewPage({ params }) {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <ReviewFormContent params={params} />
    </Suspense>
  );
}