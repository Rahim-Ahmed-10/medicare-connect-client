"use client";
import { useState } from "react";
import { FaHeartbeat, FaChevronDown } from "react-icons/fa"; // 🎯 সব আইকন 'fa' প্যাকেজ থেকে নেওয়া হলো

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Are the doctors on MediCare Connect verified?",
      answer: "Yes, absolutely. We have a strict verification process. Every specialist must provide their valid BMDC registration number and institutional background before getting approved."
    },
    {
      id: 2,
      question: "How do I join a live video consultation?",
      answer: "Once you select a doctor and complete the secure payment, you will see a 'Join Call' button in your patient dashboard. You can consult directly from your browser or mobile phone."
    },
    {
      id: 3,
      question: "Can I order medicines without a prescription?",
      answer: "For general wellness and over-the-counter (OTC) medicines, you do not need a prescription. However, for specialized or regulated drugs, a valid prescription is mandatory."
    }
  ];

  return (
    // 🎯 মেইন ব্যাকগ্রাউন্ড আপনার পেজের সাথে মিলিয়ে #0D1527 করা হলো
    <div className="w-full bg-[#0D1527] pb-24 px-4 sm:px-6 lg:px-8 font-sans text-slate-200">
      {/* 🎯 ভেতরের মেইন কার্ডটিকেও ডার্ক থিমে রূপান্তর করা হয়েছে */}
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#111A31] to-[#0D1527] rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-800/60">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          {/* ছোট ব্যাজটি ডার্ক পেজের গ্লো থিমে সাজানো */}
          <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-xs tracking-wide uppercase bg-[#0D1527] px-4 py-2 rounded-full border border-purple-900/30">
            <FaHeartbeat className="w-4 h-4 text-rose-500 animate-pulse" />
            Have Questions?
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b border-slate-800/60 pb-4">
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className={`w-full flex justify-between items-center text-left py-3 font-bold transition-colors text-sm md:text-base cursor-pointer ${
                  openFaq === faq.id ? "text-purple-400" : "text-slate-200 hover:text-purple-400"
                }`}
              >
                <span>{faq.question}</span>
                <FaChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${openFaq === faq.id ? "rotate-180 text-purple-400" : ""}`} />
              </button>
              
              {/* অ্যানিমেশন সহ ড্রপডাউন কন্টেন্ট */}
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? "max-h-40 mt-2" : "max-h-0"}`}>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed bg-[#0D1527]/60 p-4 rounded-xl border border-slate-800/40">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}