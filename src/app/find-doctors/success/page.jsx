import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import SuccessUI from './SuccessUI';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['payment_intent']
  });

  const { status, customer_details: { email: customerEmail }, metadata } = session;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete' && metadata) {
    try {
      const serverUrl = 'http://localhost:8085';
      
      // 🚀 এখানে স্ট্রাইপের মেটাডেটার হুবহু কী (Key) ব্যবহার করতে হবে
      await fetch(`${serverUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: customerEmail, // অথবা metadata.userEmail
          userId: metadata.userId,
          doctorName: metadata.doctorName,
          specialty: metadata.specialty,
          date: metadata.appointmentDate,  // 👈 'appointmentDate' মিলিয়ে দেওয়া হলো
          time: metadata.appointmentTime,  // 👈 'appointmentTime' মিলিয়ে দেওয়া হলো
          amount: metadata.amount,
        }),
      });
    } catch (dbError) {
      console.error("Express DB Save Error:", dbError);
    }

    return (
      <SuccessUI 
        customerEmail={customerEmail} 
        amount={session.amount_total / 100} 
        transactionId={session.payment_intent?.id || session_id}
      />
    );
  }
}