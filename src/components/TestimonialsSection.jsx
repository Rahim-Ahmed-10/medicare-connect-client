"use client";
import { FaStar, FaQuoteLeft, FaHeartbeat } from "react-icons/fa"; // 🎯 সব আইকন 'fa' প্যাকেজ থেকে নেওয়া হলো

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
    // 🎯 মেইন ব্যাকগ্রাউন্ড আপনার পেজের সাথে মিলিয়ে #0D1527 করা হলো এবং ওপরে-নিচে পর্যাপ্ত প্যাডিং দেওয়া হয়েছে
    <div className="w-full bg-[#0D1527] py-24 px-4 sm:px-6 lg:px-8 font-sans text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center pt-16 max-w-2xl mx-auto mb-16 space-y-3">
          {/* ছোট ব্যাজটি ডার্ক পেজের গ্লো থিমে সাজানো */}
          <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-xs tracking-wide uppercase bg-[#111A31] px-4 py-2 rounded-full border border-purple-900/30">
            <FaHeartbeat className="w-4 h-4 text-rose-500 animate-pulse" />
            Patient Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            What Our Patients Say
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Discover how MediCare Connect is making healthcare accessible and trusted for thousands of families.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-gradient-to-b from-[#111A31] to-[#0D1527] rounded-[2.5rem] p-8 shadow-2xl border border-slate-800/60 flex flex-col justify-between relative group hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Quote Icon - ডার্ক মোডে অপাসিটি কমিয়ে ব্যাকগ্রাউন্ডে সেট করা */}
              <div className="absolute top-6 right-8 text-slate-800 group-hover:text-purple-500/10 transition-colors">
                <FaQuoteLeft className="w-10 h-10" />
              </div>

              <div className="space-y-4 relative z-10">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic font-medium">
                  "{review.comment}"
                </p>
              </div>

              {/* User Profile Info */}
              <div className="flex items-center gap-3 mt-8 pt-5 border-t border-slate-800/80 relative z-10">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 group-hover:border-purple-400 transition-colors">
                  <img 
                    src={review.image} 
                    srcSet={review.image}
                    alt={review.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">{review.name}</h4>
                  <p className="text-slate-500 text-[11px] font-semibold tracking-wide uppercase mt-0.5">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}