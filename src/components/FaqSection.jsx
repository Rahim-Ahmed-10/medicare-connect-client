"use client";
import { useState } from "react";
import { FaHeartPulse, FaChevronDown } from "react-icons/fa6";

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
    <div className="w-full bg-[#818386] pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 text-[#9A00D7] font-bold text-xs tracking-wide uppercase bg-purple-50 px-4 py-1.5 rounded-full">
            <FaHeartPulse className="w-4 h-4" />
            Have Questions?
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b border-slate-100 pb-4">
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center text-left py-3 font-bold text-slate-800 hover:text-[#7A1FA2] transition-colors text-sm md:text-base cursor-pointer"
              >
                <span>{faq.question}</span>
                <FaChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openFaq === faq.id ? "rotate-180 text-[#7A1FA2]" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? "max-h-40 mt-2" : "max-h-0"}`}>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed bg-slate-50 p-4 rounded-xl">
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