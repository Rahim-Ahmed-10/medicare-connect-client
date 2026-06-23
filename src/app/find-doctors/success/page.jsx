import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaCheckCircle, FaEnvelope, FaCalendarCheck, FaArrowRight, FaUserAlt } from 'react-icons/fa'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  // Stripe থেকে সেশন রিট্রিভ করার সময় metadata-ও চলে আসে
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, metadata } = session
  const customerEmail = customer_details?.email

  // 🚀 আপনার রাউট থেকে পাঠানো মেটাডাটা এখানে পাবেন
  const userId = metadata?.userId
  const priceId = metadata?.PRICE_ID

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 antialiased text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.04)] border border-slate-100 text-center space-y-6 relative overflow-hidden">
          
          {/* Top Decorative Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>

          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 text-5xl shadow-sm">
              <FaCheckCircle className="animate-pulse" />
            </div>
          </div>

          {/* Header Texts */}
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Appointment Booked!
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Your co-pay validation was successfully processed.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Content Message Info with Metadata */}
          <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-3.5 border border-slate-200/60 text-xs sm:text-sm leading-relaxed">
            <p className="flex items-start gap-2.5 text-slate-700">
              <FaEnvelope className="text-indigo-600 text-base mt-0.5 flex-shrink-0" />
              <span>
                A confirmation ledger and digital receipt have been dispatched to <strong className="text-slate-900 font-bold break-all">{customerEmail}</strong>.
              </span>
            </p>

            {/* মেটাডাটা থেকে প্রাপ্ত ইউজার আইডি ডিসপ্লে (প্রয়োজন হলে ডাটাবেজেও সেভ করতে পারেন) */}
            {userId && (
              <p className="flex items-start gap-2.5 text-slate-700">
                <FaUserAlt className="text-indigo-600 text-base mt-0.5 flex-shrink-0" />
                <span>
                  Registered Patient Reference Account ID: <code className="bg-slate-200 px-1 py-0.5 rounded text-xs text-indigo-700 font-mono font-bold">{userId}</code>
                </span>
              </p>
            )}

            <p className="flex items-start gap-2.5 text-slate-700">
              <FaCalendarCheck className="text-indigo-600 text-base mt-0.5 flex-shrink-0" />
              <span>
                Please check your inbox instructions on how to access the clinic queue presentation dashboard.
              </span>
            </p>
          </div>

          {/* Footer Support Desk */}
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Encountering any issues? Connect directly with our helpdesk at{' '}
            <a href="mailto:support@example.com" className="text-indigo-600 hover:underline font-bold">
              support@example.com
            </a>.
          </p>

          {/* Action Navigation Button */}
          <div className="pt-2">
            <Link 
              href="/find-doctors"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 group"
            >
              Return to Directory 
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    )
  }
}