"use client";

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { FaStar } from 'react-icons/fa';

function ReviewFormContent() {
  const searchParams = useSearchParams();
  const doctorName = searchParams.get('doctor'); // ড্যাশবোর্ড থেকে আসা নাম
  const doctorId = searchParams.get('doctorId'); // ড্যাশবোর্ড থেকে আসা আইডি

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const reviewData = {
      doctorId,
      rating,
      reviewText,
      createdAt: new Date().toISOString()
    };

    try {
      // আপনার ব্যাকএন্ড এপিআই এখানে কল হবে
      console.log("Submitting:", reviewData);
      alert("Review submitted for " + doctorName);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070a13] p-6">
      <form onSubmit={handleSubmit} className="bg-[#0f172a] p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-xl">
        <h2 className="text-white text-xl font-bold mb-4">Rate {doctorName || "Doctor"}</h2>
        
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
          placeholder="Share your experience with this doctor..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <button 
          disabled={submitting}
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <ReviewFormContent />
    </Suspense>
  );
}