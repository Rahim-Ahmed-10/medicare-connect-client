"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Turbopack এর সেফটি এবং এরর এড়াতে স্ট্যান্ডার্ড ও ইউনিভার্সাল আইকন ব্যবহার করা হয়েছে
import { 
  FaChevronLeft, 
  FaStethoscope, 
  FaBriefcase, 
  FaHospital, 
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaFileMedical
} from "react-icons/fa";

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // ফর্ম ইন্টারঅ্যাকশন স্টেট
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [symptoms, setSymptoms] = useState("");

  useEffect(() => {
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
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error loading doctor details:", error);
        setIsLoading(false);
      });
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-sm font-medium text-slate-500 tracking-wider">Loading Profile Layout...</div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center max-w-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-2">No Record Found</h2>
          <p className="text-sm text-slate-500 mb-6">The specialist physician profile matrix could not be resolved.</p>
          <button 
            onClick={() => router.push("/find-doctors")}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 py-12 text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Navigation */}
        <Link 
          href="/find-doctors" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 mb-8 transition-colors"
        >
          <FaChevronLeft className="text-[10px]" /> Back to Specialist List
        </Link>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Doctor Credentials & Feedback */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unique Profile Matrix Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-200/60">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                
                {/* Styled Avatar Frame */}
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 p-1 flex-shrink-0">
                  <img 
                    src={doctor.profileImage || "https://via.placeholder.com/400"} 
                    alt={doctor.doctorName}
                    className="w-full h-full object-cover rounded-xl object-top"
                  />
                </div>

                {/* Main Information Stack */}
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-indigo-100">
                      {doctor.specialization || "General Specialist"}
                    </span>
                    <h1 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
                      {doctor.doctorName}
                    </h1>
                  </div>

                  {/* Icon Metadata Row */}
                  <div className="space-y-2 text-sm text-slate-700 pt-1">
                    <p className="flex items-center justify-center sm:justify-start gap-2.5">
                      <FaStethoscope className="text-slate-500 text-xs flex-shrink-0" />
                      <span><strong className="text-slate-900 font-bold">Qualifications:</strong> {doctor.qualifications}</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2.5">
                      <FaBriefcase className="text-slate-500 text-xs flex-shrink-0" />
                      <span><strong className="text-slate-900 font-bold">Experience:</strong> {doctor.experience} Active Practice</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2.5">
                      <FaHospital className="text-slate-500 text-xs flex-shrink-0" />
                      <span><strong className="text-slate-900 font-bold">Affiliation:</strong> {doctor.hospitalName}</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2.5">
                      <FaMoneyBillWave className="text-slate-500 text-xs flex-shrink-0" />
                      <span><strong className="text-slate-900 font-bold">Base Premium Fee:</strong> ${doctor.consultationFee || "130"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Unique Clinical Ledger Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-200/60 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Patient Response Summary</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-400">0.0</span>
                <span className="text-xs text-slate-500 font-bold font-mono uppercase tracking-wider">No Feedbacks Logged</span>
              </div>
              <p className="text-xs italic text-slate-500 border-t border-slate-200 pt-3">
                Appointments securely cleared via checkout channels are eligible to initialize review protocols.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE: Interactive Configuration Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-300 space-y-6 lg:sticky lg:top-8">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Booking Portal</h2>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Synchronize your calendar scheduler, preferred shifts, and symptomatic conditions.
              </p>
            </div>

            {/* Clinic Active Slots Row */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-slate-500 tracking-widest uppercase">Operational Workdays</span>
              <div className="flex flex-wrap gap-1">
                {doctor.availableDays?.map((day, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-800 font-semibold text-[11px] px-2.5 py-1 rounded-md border border-slate-300">
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Booking Handler Form */}
            <form action="/api/subscription" method="POST" className="space-y-4">
              
              <input type="hidden" name="doctorName" value={doctor.doctorName} />
              <input type="hidden" name="consultationFee" value={doctor.consultationFee} />
              <input type="hidden" name="selectedSlot" value={selectedSlot} />

              {/* Date Config */}
            <div className="space-y-1.5">
  <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 tracking-wider uppercase">
    <FaCalendarAlt className="text-indigo-600" /> Select Date Target
  </label>
  <input 
    type="date"
    required
    name="appointmentDate"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="w-full bg-slate-50 hover:bg-slate-100/70 border-2 border-slate-300 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-600/10 transition-all text-slate-900 placeholder-slate-500
    [&::-webkit-calendar-picker-indicator]:opacity-100 
    [&::-webkit-calendar-picker-indicator]:cursor-pointer 
    [&::-webkit-calendar-picker-indicator]:filter 
    [&::-webkit-calendar-picker-indicator]:invert-[10%] 
    [&::-webkit-calendar-picker-indicator]:hover:scale-110"
  />
</div>

              {/* Custom Radio/Grid Dynamic Time Selector */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 tracking-wider uppercase">
                  <FaClock className="text-indigo-600" /> Allocated Shifts
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availableSlots?.map((slot, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                        selectedSlot === slot 
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md" 
                          : "bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-slate-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Unique Textarea Segment */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 tracking-wider uppercase">
                  <FaFileMedical className="text-indigo-600" /> Symptoms Ledger
                </label>
                <textarea 
                  name="symptomsDescription"
                  rows="3"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Summarize present conditions, pain metrics, or session check-up intents..."
                  className="w-full bg-slate-50 hover:bg-slate-100/70 border-2 border-slate-300 focus:border-indigo-600 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-4 focus:ring-indigo-600/10 transition-all text-slate-900 resize-none placeholder-slate-500 leading-relaxed"
                ></textarea>
              </div>

              {/* Complete Secure Action Button */}
              <button
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.99] shadow-md shadow-indigo-600/20 text-xs uppercase tracking-wider mt-4"
              >
                Dispatch Booking (${doctor.consultationFee || "130"})
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}