import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Stripe SDK ইনিশিয়ালাইজেশন
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const body = await req.json()

    // ফ্রন্টএন্ড থেকে পাঠানো ডাটা রিসিভ
    const { 
      doctorName = "Doctor Consultation", 
      specialty = "Specialist", 
      appointmentDate, 
      selectedSlot, 
      consultationFee 
    } = body

    // Safe amount parsing (সেন্ট বা পয়সা হিসেবে রূপান্তর)
    const numericFee = parseFloat(consultationFee) || 130
    const unitAmount = Math.round(numericFee * 100)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Stripe Checkout Session তৈরি
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${doctorName} - Clinical Consultation`,
              description: `Specialty: ${specialty} | Date: ${appointmentDate || 'TBD'} | Time: ${selectedSlot || 'TBD'}`,
              images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      
      // সাকসেস হলে ড্যাশবোর্ডে রিডাইরেক্ট হবে
      success_url: `${baseUrl}/find-doctors/success?session_id={CHECKOUT_SESSION_ID}&doctorName=${encodeURIComponent(doctorName)}&specialty=${encodeURIComponent(specialty)}&date=${encodeURIComponent(appointmentDate || '')}&time=${encodeURIComponent(selectedSlot || '')}&amount=${numericFee}`,
      
      cancel_url: `${baseUrl}/find-doctors`,
    })

    // Stripe Checkout URL সরাসরি ফ্রন্টএন্ডে পাঠানো
    return NextResponse.json({ id: session.id, url: session.url })

  } catch (error) {
    console.error("❌ Stripe Checkout Session Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}