import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // ১. প্রটেকশন পাথসমূহ
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isProtectedFindDoctors = pathname.startsWith("/find-doctors");

  // ২. যদি প্রটেকটেড রাউটে যাওয়ার চেষ্টা করে
  if (isDashboardRoute || isProtectedFindDoctors) {
    
    // টোকেন চেক
    const sessionToken = 
      request.cookies.get("better-auth.session_token")?.value || 
      request.cookies.get("__secure_better-auth.session_token")?.value;
      
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ৩. সেশন ভ্যালিডেশন
    try {
      // ভার্সেলে NEXT_PUBLIC_SITE_URL এনভায়রনমেন্ট ভেরিয়েবল সেট করা বাধ্যতামূলক
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
      
      const res = await fetch(`${baseUrl}/api/auth/get-session`, {
        headers: { cookie: request.headers.get("cookie") || "" },
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const session = await res.json();
      const userRole = session?.user?.role;

      // ৪. ড্যাশবোর্ড রোল-বেসড রিডাইরেক্ট
      if (isDashboardRoute) {
        if (pathname.startsWith("/dashboard/patient") && userRole === "doctor") 
          return NextResponse.redirect(new URL("/dashboard/doctor", request.url));
        if (pathname.startsWith("/dashboard/doctor") && userRole === "patient") 
          return NextResponse.redirect(new URL("/dashboard/patient", request.url));
        
        // শুধু /dashboard পাথে হিট করলে রোল অনুযায়ী সঠিক ড্যাশবোর্ডে পাঠান
        if (pathname === "/dashboard" || pathname === "/dashboard/") 
          return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
      }

    } catch (error) {
      console.error("Middleware Auth Error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// ৫. ম্যাচিং পাথ (কোন পাথগুলোতে এটি কাজ করবে)
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/find-doctors/:path*"
  ],
};