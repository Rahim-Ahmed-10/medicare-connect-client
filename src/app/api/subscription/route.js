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
    const { doctorName, specialty, appointmentDate, selectedSlot, consultationFee, symptomsDescription } = body;

    // ইউজার সেশন চেক করা
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;

    // 💰 স্ট্রাইপের সেন্ট (cents) কনভার্সন এবং সেফটিチェック
    const amountInCents = Math.round(Number(consultationFee || 20) * 100); 

    // 🎯 ইউআরএল কুয়েরি স্ট্রিং তৈরি (সাকসেস পেজে রিড করার জন্য - এখানে ব্র্যাকেট এবং ভেরিয়েবল ফিক্স করা হয়েছে)
    const queryParams = `doctorName=${encodeURIComponent(doctorName || '')}&specialty=${encodeURIComponent(specialty || '')}&date=${encodeURIComponent(appointmentDate || '')}&time=${encodeURIComponent(selectedSlot || '')}&symptomsDescription=${encodeURIComponent(symptomsDescription || '')}&amount=${consultationFee || '20'}`;

    // Create Checkout Sessions 
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
        amount: consultationFee || "20",
        symptomsDescription: symptomsDescription || "" // 👈 এখানে স্ট্রিং বাদে ডাইনামিক ভেরিয়েবল পাস করা হলো
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