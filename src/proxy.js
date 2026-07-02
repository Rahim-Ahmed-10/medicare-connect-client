import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // ১. যে পাথগুলোতে প্রটেকশন প্রয়োজন
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isProtectedFindDoctors = pathname.startsWith("/find-doctors");

  if (isDashboardRoute || isProtectedFindDoctors) {
    
    // কুকি থেকে টোকেন চেক করা
    const sessionToken = 
      request.cookies.get("better-auth.session_token")?.value || 
      request.cookies.get("__secure_better-auth.session_token")?.value;

    // যদি টোকেন না থাকে, সরাসরি লগইন পেজে পাঠিয়ে দিন
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ২. টোকেন থাকলে সেশন ভ্যালিডেশন (রোল চেক করার জন্য)
    try {
      const res = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: { cookie: request.headers.get("cookie") || "" },
      });

      if (!res.ok) {
        // সেশন ইনভ্যালিড হলে লগইন পেজে পাঠান
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const session = await res.json();
      const userRole = session?.user?.role;

      // ড্যাশবোর্ডের জন্য রোল বেসড রিডাইরেক্ট লজিক (আপনার আগের কোড)
      if (isDashboardRoute) {
        if (pathname.startsWith("/dashboard/patient") && userRole === "doctor") return NextResponse.redirect(new URL("/dashboard/doctor", request.url));
        if (pathname.startsWith("/dashboard/doctor") && userRole === "patient") return NextResponse.redirect(new URL("/dashboard/patient", request.url));
        if (pathname === "/dashboard" || pathname === "/dashboard/") return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// ম্যাচার আপডেট করুন
export const config = {
  matcher: ["/dashboard/:path*", "/find-doctors/:path*"],
};