import { headers } from "next/headers";
import { auth } from "@/lib/auth"; 
import PatientReviewsClient from "@/components/dashboard/PatientReviewsClient";

export default async function PatientReviewsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user || null;
  let selectedDoctors = [];

  if (user?.email) {
    try {
      const res = await fetch(`http://localhost:8085/api/bookings?email=${user.email}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success) { 
          selectedDoctors = result.data; 
        }
      }
    } catch (error) {
      console.error("❌ Error fetching:", error);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen text-slate-300">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Review Your Selected Doctors</h1>
      </div>
      
      {/* 🎯 এখন আর এখান থেকে কোনো টোকেন পাঠানো হচ্ছে না */}
      <PatientReviewsClient selectedDoctors={selectedDoctors} userEmail={user?.email} />
    </div>
  );
}