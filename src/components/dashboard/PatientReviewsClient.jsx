"use client";

import { useState } from "react";
import { FaStar, FaRegCommentDots, FaUserMd, FaCalendarAlt, FaPen } from "react-icons/fa";
import { toast } from "react-toastify";

export default function PatientReviewsClient({ selectedDoctors, userEmail }) {
  const [submittingId, setSubmittingId] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  // ⭐️ রেটিং হ্যান্ডলার
  const handleRatingChange = (docId, value) => {
    setRatings((prev) => ({ ...prev, [docId]: value }));
  };

  // 📝 কমেন্ট হ্যান্ডলার
  const handleCommentChange = (docId, value) => {
    setComments((prev) => ({ ...prev, [docId]: value }));
  };

  // 🚀 রিভিউ এক্সপ্রেস ব্যাকএন্ডে সেভ করার হ্যান্ডলার
  const handleSubmitReview = async (e, doc) => {
    e.preventDefault();
    const docId = doc._id;
    
    const rating = ratings[docId] || 5;
    const comment = comments[docId] || "";

    if (!comment.trim()) {
      toast.warning("✍️ Please write a quick comment before submitting your feedback.");
      return;
    }

    setSubmittingId(docId);

    const reviewPayload = {
      email: userEmail,
      bookingId: docId,
      doctorName: doc.doctorName,
      specialty: doc.specialty,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0] // আজকের ডেট ফরম্যাট YYYY-MM-DD
    };

    try {
      // ⚠️ মনে করে আপনার Express সার্ভারের সঠিক পোর্ট ও এন্ডপয়েন্ট (রুট) চেক করে নিবেন
      const response = await fetch("http://localhost:8085/api/reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewPayload),
      });

      // হেডার চেক করা জেসন রেসপন্স কিনা (HTML এরর হ্যান্ডেল করার জন্য)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, the server didn't respond with JSON! Check your route config.");
      }

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(`🎉 Feedback successfully submitted for ${doc.doctorName}!`);
        setComments((prev) => ({ ...prev, [docId]: "" })); // ক্লিয়ার কমেন্ট বক্স
      } else {
        toast.error(result.message || "Failed to submit review inside database.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong! Check connection.");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* 📊 কাউন্টার স্ট্যাটাস */}
      <div className="bg-[#0D1321] border border-white/[0.06] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center text-sm border border-blue-500/20">
            <FaRegCommentDots />
          </div>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Available Consultations</div>
            <div className="text-[10px] text-slate-400">Select an appointment below to append your ledger review.</div>
          </div>
        </div>
        <div className="text-xl font-black text-blue-400 px-3 py-1 bg-blue-500/15 rounded-md border border-blue-500/20">
          {selectedDoctors?.length || 0}
        </div>
      </div>

      {/* 📋 সিলেক্টেড ডক্টরস লিস্ট গ্রিড */}
      {selectedDoctors?.length === 0 ? (
        <div className="text-center py-16 bg-[#0D1321] border border-white/[0.06] rounded-2xl">
          <div className="w-12 h-12 bg-white/[0.04] text-slate-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaUserMd className="text-xl" />
          </div>
          <p className="text-xs text-slate-400 font-bold">No selected doctors found.</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Please book a practitioner via your appointment dashboard first.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {selectedDoctors.map((doc) => {
            const currentRating = ratings[doc._id] || 5;
            return (
              <div 
                key={doc._id} 
                className="bg-[#0D1321] border border-white/[0.06] p-5 rounded-2xl shadow-xl transition-all hover:border-blue-500/20"
              >
                {/* ডাক্তার ইনফো ও ডেট */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <FaUserMd className="text-lg" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-white tracking-wide">{doc.doctorName}</h3>
                      <p className="text-[10px] text-blue-400 font-bold uppercase mt-0.5">{doc.specialty || "General Health"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/[0.04] self-start sm:self-center">
                    <FaCalendarAlt className="text-[9px]" />
                    <span>Session Date: {doc.date || "Recent"}</span>
                  </div>
                </div>

                {/* রিভিউ ও রেটিং ফর্ম */}
                <form onSubmit={(e) => handleSubmitReview(e, doc)} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.01] p-3 rounded-xl border border-white/[0.03]">
                    
                    {/* ডাইনামিক ইন্টারঅ্যাক্টিভ স্টার সিলেকশন */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assign Score Metrics</span>
                      <div className="flex items-center gap-1 text-base cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            onClick={() => handleRatingChange(doc._id, star)}
                            className={`transition-colors active:scale-90 ${
                              star <= currentRating ? "text-amber-400" : "text-white/[0.08]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* সাবমিট বাটন */}
                    <button
                      type="submit"
                      disabled={submittingId === doc._id}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold text-[11px] px-4 py-2 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 self-end sm:self-center cursor-pointer"
                    >
                      <FaPen className="text-[9px]" />
                      {submittingId === doc._id ? "Posting..." : "Post Review"}
                    </button>
                  </div>

                  {/* কমেন্ট ইনপুট বক্স */}
                  <div>
                    <textarea
                      rows="2"
                      value={comments[doc._id] || ""}
                      onChange={(e) => handleCommentChange(doc._id, e.target.value)}
                      placeholder={`Write an honest testimonial profile regarding your experience with ${doc.doctorName}...`}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-blue-500/40 transition-all resize-none"
                    ></textarea>
                  </div>
                </form>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}