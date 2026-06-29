"use client";
import React, { useState } from 'react';
import { FaEnvelope, FaPhoneFlip, FaLocationDot, FaPaperPlane } from "react-icons/fa6";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Data:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
   
    <div className="min-h-screen bg-[#0D1527]  sm:pt-16 md:pt-21 pb-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-16">
          <span className="text-xs font-black text-[#3B82F6] uppercase tracking-widest block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect With Our Support Team
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Have questions about appointments, medical reports, or technical issues? Drop us a message and our team will reply shortly.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 📞 Left Column: Contact Details (5 Columns) */}
          <div className="lg:col-span-5 bg-[#0F1A36] rounded-[2.5rem] p-8 border border-slate-800/60 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white tracking-tight">Contact Information</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reach out to us directly through our official channels or visit our physical desk.
              </p>
            </div>

            {/* Info Items */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex gap-4 items-center p-4 rounded-2xl bg-[#0D1527]/60 border border-slate-800/40">
                <div className="w-10 h-10 rounded-xl bg-[#111A31] border border-slate-800 flex items-center justify-center text-[#3B82F6] shrink-0 shadow-md">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Us</p>
                  <p className="text-xs font-semibold text-slate-200">support@medicare.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-center p-4 rounded-2xl bg-[#0D1527]/60 border border-slate-800/40">
                <div className="w-10 h-10 rounded-xl bg-[#111A31] border border-slate-800 flex items-center justify-center text-[#22D3EE] shrink-0 shadow-md">
                  <FaPhoneFlip className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Call Hotline</p>
                  <p className="text-xs font-semibold text-slate-200">+880 1234-567890</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-center p-4 rounded-2xl bg-[#0D1527]/60 border border-slate-800/40">
                <div className="w-10 h-10 rounded-xl bg-[#111A31] border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0 shadow-md">
                  <FaLocationDot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Our Location</p>
                  <p className="text-xs font-semibold text-slate-200">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* 📝 Right Column: Contact Form (7 Columns) */}
          <div className="lg:col-span-7 bg-[#0F1A36] rounded-[2.5rem] p-8 border border-slate-800/60 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-[#0D1527] text-white focus:outline-none focus:border-[#3B82F6] text-xs placeholder-slate-600 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-[#0D1527] text-white focus:outline-none focus:border-[#3B82F6] text-xs placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-[#0D1527] text-white focus:outline-none focus:border-[#3B82F6] text-xs placeholder-slate-600 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Your Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-[#0D1527] text-white focus:outline-none focus:border-[#3B82F6] text-xs placeholder-slate-600 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1B62FD] hover:bg-[#1554E2] text-white font-bold py-3.5 px-8 rounded-xl text-xs tracking-wide transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-blue-500/10"
                >
                  Send Message <FaPaperPlane className="w-3 h-3" />
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;