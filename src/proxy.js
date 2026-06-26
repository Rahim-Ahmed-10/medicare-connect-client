import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export default async function proxy(request) {
  try {
    // সেশন রিড করার সেফ পদ্ধতি
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const { pathname } = request.nextUrl;

    // 🔒 ১. ইউজার যদি লগইন ছাড়া ড্যাশবোর্ডের কোনো পেজে ঢোকার চেষ্টা করে, তাকে সাইন-ইন পেজে পাঠানো হবে
    if (!session) {
      if (pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
      return NextResponse.next(); // ড্যাশবোর্ড ছাড়া অন্য পাবলিক পেজ হলে দেখতে দেওয়া হবে
    }

    // 🩺 ২. ইউজার যদি রোল অনুযায়ী 'patient' হয়
    if (session?.user?.role === "patient") {
      // সে যদি কোনোভাবে ডক্টর ড্যাশবোর্ডে ঢোকার চেষ্টা করে (ধরা যাক /dashboard/doctor)
      // তাকে তার নিজের সঠিক ড্যাশবোর্ডে (/dashboard/patient) রিডাইরেক্ট করে দেওয়া হবে
      if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/patient')) {
        return NextResponse.redirect(new URL('/dashboard/patient', request.url));
      }
    }

    // সব কন্ডিশন পার হলে রিকোয়েস্ট নরমালি পাস হবে
    return NextResponse.next();
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.next(); // এরর আসলেও যেন পুরো সাইট ক্র্যাশ না করে
  }
}