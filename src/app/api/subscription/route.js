import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    // 📥 ফ্রন্টএন্ড থেকে ডাটা রিসিভ করা
    const body = await request.json();
    const { doctorName, specialty, appointmentDate, selectedSlot, consultationFee, symptomsDescription } = body;

    // ইউজার সেশন চেক করা
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;

    // 🔒 সিকিউরিটি চেক: ইউজার লগইন না থাকলে পেমেন্ট সেশন তৈরি করতে দেবে না
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    // 💰 স্ট্রাইপের সেন্ট (cents) কনভার্সন
    const amountInCents = Math.round(Number(consultationFee || 20) * 100); 

    // 🎯 ইউআরএল কুয়েরি স্ট্রিং (সাকসেস পেজে রিড করার জন্য)
    const queryParams = `doctorName=${encodeURIComponent(doctorName || '')}&specialty=${encodeURIComponent(specialty || '')}&date=${encodeURIComponent(appointmentDate || '')}&time=${encodeURIComponent(selectedSlot || '')}&symptomsDescription=${encodeURIComponent(symptomsDescription || '')}&amount=${consultationFee || '20'}`;

    // Create Checkout Sessions 
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email, // অলরেডি ভেরিফাইড ইউজার
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Medical Consultation - ${doctorName || 'Doctor'}`,
              description: `Specialty: ${specialty || 'General Clinical'}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      // 📊 মেটাডাটা (যা ওয়েবহুক বা স্ট্রাইপ ড্যাশবোর্ডে ট্র্যাক করা যাবে)
      metadata: {
        userId: user.id,
        userEmail: user.email,
        doctorName: doctorName || "",
        specialty: specialty || "",
        appointmentDate: appointmentDate || "",
        appointmentTime: selectedSlot || "",
        amount: consultationFee || "20",
        symptomsDescription: symptomsDescription || "" 
      },
      mode: 'payment', 
      success_url: `${origin}/find-doctors/success?session_id={CHECKOUT_SESSION_ID}&${queryParams}`,
      cancel_url: `${origin}/find-doctors`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (err) {
    console.error("Stripe Session Error Backend:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}