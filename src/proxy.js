import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // শুধু ড্যাশবোর্ড রাউটগুলোর জন্য চেক রান হবে
  if (pathname.startsWith("/dashboard")) {
    
    // 🎯 টোকেন কুকি থেকে সরাসরি সেশন টোকেন রিড করার নিরাপদ উপায়
    const sessionToken = 
      request.cookies.get("better-auth.session_token")?.value || 
      request.cookies.get("__secure_better-auth.session_token")?.value;

    // যদি কোনো সেশন টোকেন না থাকে, তবে ইউজারকে লগইন পেজে রিডাইরেক্ট করুন
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 🎯 Better Auth API থেকে সার্ভার-সাইড সেশন এবং ইউজার ডাটা ফেচ করা
    try {
      const res = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: {
          // রিকোয়েস্টের কুকি হেডারটি সরাসরি ফরওয়ার্ড করে দেওয়া হলো
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (res.ok) {
        const session = await res.json();
        const user = session?.user;
        const userRole = user?.role || "patient";

        // ১. ডাক্তার যদি ভুল করে পেশেন্ট ড্যাশবোর্ডে ঢোকার চেষ্টা করে, তবে তাকে ডাক্তারের ড্যাশবোর্ডে পাঠান
        if (pathname.startsWith("/dashboard/patient") && userRole === "doctor") {
          return NextResponse.redirect(new URL("/dashboard/doctor", request.url));
        }

        // ২. পেশেন্ট যদি ডাক্তার ড্যাশবোর্ডে ঢোকার চেষ্টা করে, তাকে পেশেন্ট ড্যাশবোর্ডে পাঠান
        if (pathname.startsWith("/dashboard/doctor") && userRole === "patient") {
          return NextResponse.redirect(new URL("/dashboard/patient", request.url));
        }

        // ৩. শুধু /dashboard পাথে হিট করলে রোল অনুযায়ী সঠিক ড্যাশবোর্ডে পাঠান
        if (pathname === "/dashboard" || pathname === "/dashboard/") {
          return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
        }
      }
    } catch (error) {
      console.error("Auth middleware error:", error);
    }
  }

  return NextResponse.next();
}

// যে পাথগুলোতে এই মিডলওয়্যারটি ট্রিগার হবে
export const config = {
  matcher: ["/dashboard/:path*"],
};