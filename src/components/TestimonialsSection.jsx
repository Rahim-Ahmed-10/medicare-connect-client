"use client";
import { FaStar, FaQuoteLeft, FaHeartPulse } from "react-icons/fa6";

export default function TestimonialsSection() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Patient (Pediatrics Care)",
      rating: 5,
      comment: "The online consultation for my daughter was seamless. The doctor was extremely patient, and the digital prescription arrived instantly in my dashboard!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "David Miller",
      role: "Patient (Cardiology)",
      rating: 5,
      comment: "Highly professional service! Getting a specialist opinion via video call saved me hours of travel. The medicine delivery was also prompt and hassle-free.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Patient (General Health)",
      rating: 5,
      comment: "MediCare Connect has completely changed how I manage my family's healthcare. Accurate information, secure portals, and brilliant doctors overall.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="w-full bg-[#818386] pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-[#9A00D7] font-bold text-xs tracking-wide uppercase bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <FaHeartPulse className="w-4 h-4" />
            Patient Stories
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D1B2A] tracking-tight">
            What Our Patients Say
          </h2>
          <p className="text-slate-700 text-xs">
            Discover how MediCare Connect is making healthcare accessible and trusted for thousands of families.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 flex flex-col justify-between relative group hover:shadow-2xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-slate-100 group-hover:text-purple-50 transition-colors">
                <FaQuoteLeft className="w-8 h-8" />
              </div>

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User Profile Info */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-slate-400 text-[10px] font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}