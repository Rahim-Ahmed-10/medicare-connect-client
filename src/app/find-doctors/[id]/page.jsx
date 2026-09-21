"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; 

import { 
  FaChevronLeft, 
  FaStethoscope, 
  FaBriefcase, 
  FaHospital, 
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaFileMedical,
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaUserMd,
  FaInfoCircle,
  FaLock,
  FaCalendarPlus
} from "react-icons/fa";

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form Interaction States
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  // Next 7 Days Quick Selection Generator
  const [upcomingDates, setUpcomingDates] = useState([]);

  // Extract Better Auth Client Token
  const token = authClient.useSession()?.data?.session?.token || authClient.token?.();

  useEffect(() => {
    // Generate next 7 days for quick date pick
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split("T")[0],
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" })
      });
    }
    setUpcomingDates(dates);
    setSelectedDate(dates[0].fullDate);

    fetch("/doctors.json")
      .then((res) => res.json())
      .then((data) => {
        const doctorIndex = parseInt(params.id);
        if (data && data[doctorIndex]) {
          setDoctor(data[doctorIndex]);
          if (data[doctorIndex].availableSlots?.length > 0) {
            setSelectedSlot(data[doctorIndex].availableSlots[0]);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading doctor details:", error);
        setIsLoading(false);
      });
  }, [params.id]);

  // Fee calculation metrics
  const baseFee = parseFloat(doctor?.consultationFee || "130");
  const serviceFee = 5.00;
  const totalAmount = (baseFee + serviceFee).toFixed(2);

  // Submit Handler for Stripe Checkout Flow
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedSlot) {
      alert("Please select both Date and Slot!");
      return;
    }

    const bookingPayload = {
      doctorName: doctor?.doctorName || "Unknown Doctor",
      specialty: doctor?.specialization || "General Specialist",
      consultationFee: totalAmount,
      appointmentDate: selectedDate,
      selectedSlot: selectedSlot,
      symptomsDescription: symptoms || "No symptoms logged."
    };

    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token?.token || token}` 
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to initiate payment session.");
      }
    } catch (error) {
      console.error("❌ Network Request Error:", error);
      alert("Something went wrong. Please check your console.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#080C14]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <FaStethoscope className="text-blue-400 absolute text-base animate-pulse" />
          </div>
          <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Connecting to Specialist Matrix...</div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#080C14] px-4">
        <div className="bg-[#0F172A]/80 border border-slate-800 p-8 rounded-3xl shadow-2xl text-center max-w-sm backdrop-blur-xl">
          <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaUserMd className="text-xl" />
          </div>
          <h2 className="text-base font-bold text-slate-200 mb-1">Doctor Not Found</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">The requested physician profile could not be located in our clinical registry.</p>
          <button 
            onClick={() => router.push("/find-doctors")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-lg shadow-blue-600/25"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 font-sans antialiased py-10 selection:bg-blue-500 selection:text-white">
      
      {/* Ambient Radial Background Glows */}
      <div className="fixed top-20 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <Link 
          href="/find-doctors" 
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-blue-400 mb-6 transition-colors group"
        >
          <FaChevronLeft className="text-[9px] group-hover:-translate-x-1 transition-transform" /> Back to Specialist Directory
        </Link>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Physician Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Profile Glass Card */}
            <div className="bg-[#0F172A]/70 rounded-3xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                
                {/* Glowing Avatar */}
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-slate-800 flex-shrink-0 shadow-2xl shadow-blue-500/10">
                  <img 
                    src={doctor.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop"} 
                    alt={doctor.doctorName}
                    className="w-full h-full object-cover rounded-[14px] bg-[#0B0F19] object-top"
                  />
                  <div className="absolute bottom-2 right-2 bg-emerald-500 text-slate-950 p-1 rounded-full text-[10px] shadow-lg border border-slate-950" title="Verified Practitioner">
                    <FaCheckCircle />
                  </div>
                </div>

                <div className="flex-1 space-y-3 min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-block bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-blue-500/20">
                      {doctor.specialization || "General Specialist"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Available Today
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {doctor.doctorName}
                  </h1>

                  <div className="space-y-2 text-xs text-slate-300 pt-1">
                    <p className="flex items-center justify-center sm:justify-start gap-2.5">
                      <FaStethoscope className="text-blue-400 text-xs flex-shrink-0" />
                      <span className="truncate"><strong className="text-slate-100 font-medium">Qualifications:</strong> {doctor.qualifications}</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2.5">
                      <FaBriefcase className="text-blue-400 text-xs flex-shrink-0" />
                      <span>Experience: <strong className="text-slate-100 font-medium">{doctor.experience} Active Clinical Practice</strong></span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2.5">
                      <FaHospital className="text-blue-400 text-xs flex-shrink-0" />
                      <span className="truncate">{doctor.hospitalName}</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2.5">
                      <FaMoneyBillWave className="text-emerald-400 text-xs flex-shrink-0" />
                      <span>Consultation Fee: <strong className="text-emerald-400 font-bold">${baseFee} USD</strong></span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Verification Badge */}
            <div className="bg-[#0F172A]/40 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <FaShieldAlt className="text-base" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Instant Clinical Confirmation</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Encrypted video session link generated immediately upon booking clearance.</p>
                </div>
              </div>
              <FaLock className="text-slate-600 text-sm hidden sm:block" />
            </div>

            {/* Reviews Summary */}
            <div className="bg-[#0F172A]/70 rounded-3xl p-6 border border-slate-800/80 space-y-3 backdrop-blur-xl">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Verified Feedback</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-100">4.9</span>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">(124 Consultations Logged)</span>
              </div>
              <p className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 leading-relaxed">
                "Dr. {doctor.doctorName.split(" ")[1] || "Doctor"} was extremely attentive during our virtual session. Highly recommended for accurate diagnosis."
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Ultra-Premium Booking Panel */}
          <div className="lg:col-span-5 bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl space-y-6 lg:sticky lg:top-8">
            
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  Step 1 of 2
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <FaClock className="text-[10px]" /> Real-time Slot Sync
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mt-2">Book Consultation</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Choose a quick date pill or click "Custom Date" for future scheduling.
              </p>
            </div>

            {/* Premium Date Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
                  <FaCalendarAlt className="text-blue-400 text-xs" /> Appointment Date
                </label>
                <button
                  type="button"
                  onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
                  className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 transition-all cursor-pointer"
                >
                  <FaCalendarPlus className="text-[9px]" /> {showCustomDatePicker ? "Hide Picker" : "Custom Date"}
                </button>
              </div>

              {/* Conditional Custom Date Input */}
              {showCustomDatePicker ? (
                <div className="bg-[#0B0F19] p-3 rounded-2xl border border-blue-500/30 animate-fadeIn">
                  <span className="text-[10px] text-slate-400 block mb-1">Pick any date from calendar:</span>
                  <input 
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#131B2E] border border-slate-700 focus:border-blue-500 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none transition-all color-scheme-dark"
                  />
                </div>
              ) : (
                /* Dynamic Quick Pills */
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 pt-1">
                  {upcomingDates.map((d, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDate(d.fullDate)}
                      className={`flex flex-col items-center py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                        selectedDate === d.fullDate
                          ? "bg-gradient-to-b from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 font-bold scale-105"
                          : "bg-[#0B0F19] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider">{d.dayName}</span>
                      <span className="text-xs font-black my-0.5">{d.dayNum}</span>
                      <span className="text-[8px] opacity-70">{d.month}</span>
                    </button>
                  ))}
                </div>
              )}
              
              <div className="text-[10px] text-slate-400 text-right">
                Selected: <span className="text-blue-400 font-mono font-bold">{selectedDate}</span>
              </div>
            </div>

            {/* Shift Timing Selector */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300 tracking-wider uppercase">
                <FaClock className="text-blue-400 text-xs" /> Available Shifts
              </label>
              <div className="grid grid-cols-2 gap-2">
                {doctor.availableSlots?.map((slot, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedSlot === slot 
                        ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30" 
                        : "bg-[#0B0F19] text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedSlot === slot ? "bg-white" : "bg-slate-600"}`} />
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms Input */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300 tracking-wider uppercase">
                <FaFileMedical className="text-blue-400 text-xs" /> Symptoms / Health Notes
              </label>
              <textarea 
                name="symptomsDescription"
                rows={2}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., High fever, persistent cough, or general checkup..."
                className="w-full bg-[#0B0F19] border border-slate-800 focus:border-blue-500/60 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Premium Cost Breakdown */}
            <div className="bg-[#0B0F19] p-3.5 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Physician Fee</span>
                <span>${baseFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span className="flex items-center gap-1">Platform Service Fee <FaInfoCircle className="text-[10px] text-slate-600" /></span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-slate-100 text-sm">
                <span>Total Payable</span>
                <span className="text-emerald-400">${totalAmount} USD</span>
              </div>
            </div>

            {/* Submit CTA */}
            <form onSubmit={handleSubmit}>
              <button
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-600/25 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout (${totalAmount})</span>
              </button>
            </form>

            <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <FaLock className="text-[9px]" /> Powered by Stripe Secure Billing
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}