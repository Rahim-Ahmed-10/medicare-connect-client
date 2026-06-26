import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    // 📥 ফ্রন্টএন্ড থেকে পাঠানো সম্পূর্ণ ডাটা রিসিভ করা
    const body = await request.json();
    const { doctorName, specialty, appointmentDate, selectedSlot, consultationFee } = body;

    // ইউজার সেশন চেক করা
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;

    // 💰 স্ট্রাইপের সেন্ট (cents) কনভার্সন এবং সেফটি চেক
    const amountInCents = Math.round(Number(consultationFee || 20) * 100); 

    // 🎯 ইউআরএল কুয়েরি স্ট্রিং তৈরি (সাকসেস পেজে রিড করার জন্য)
    const queryParams = `doctorName=${encodeURIComponent(doctorName || '')}&specialty=${encodeURIComponent(specialty || '')}&date=${encodeURIComponent(appointmentDate || '')}&time=${encodeURIComponent(selectedSlot || '')}&amount=${consultationFee || '20'}`;

    // Create Checkout Sessions 
    // 🔥 price_id এর বদলে এখানে dynamic price_data ব্যবহার করা হয়েছে
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Medical Consultation - ${doctorName || 'Doctor'}`,
              description: `Specialty: ${specialty || 'General Clinical'}`,
            },
            unit_amount: amountInCents, // ডাইনামিক ফি এখানে পাস হচ্ছে
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user?.id || "guest_user",
        userEmail: user?.email || "guest_email",
        doctorName: doctorName || "",
        specialty: specialty || "",
        appointmentDate: appointmentDate || "",
        appointmentTime: selectedSlot || "",
        amount: consultationFee || "20"
      },
      mode: 'payment', // 💡 যেহেতু এটি ওয়ান-টাইম অ্যাপয়েন্টমেন্ট ফি, তাই 'subscription' এর বদলে 'payment' ব্যবহার করা বেস্ট প্র্যাকটিস
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