import 'server-only'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// স্ট্রাইপ ইনিশিয়েলাইজেশন
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    // ফ্রন্টএন্ড (View Details & Book পেজ) থেকে পাঠানো ডক্টরের ইনফো, ডেট, টাইম রিসিভ করা
    const { doctorName, specialty, date, time, amount } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${doctorName} - Appointment Consultation`,
              description: `Specialty: ${specialty} | Date: ${date} | Time: ${time}`,
            },
            unit_amount: amount * 100, // স্ট্রাইপ সেন্ট (Cent) হিসেবে হিসাব করে, তাই ১০০ দিয়ে গুন
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      
      // 🚀 এই সাকসেস ইউআরএল-ই ফ্রন্টএন্ড ড্যাশবোর্ডে ডাইনামিক ডাটা পাস করবে
      // আপনার Stripe.checkout.sessions.create-এর ভেতর success_url-টি এমন হবে:
success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/find-doctors/success?doctorName=${encodeURIComponent(doctorName)}&specialty=${encodeURIComponent(specialty)}&date=${date}&time=${time}&amount=${amount}`,
      
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/find-doctors`,
    })

    return NextResponse.json({ id: session.id })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}