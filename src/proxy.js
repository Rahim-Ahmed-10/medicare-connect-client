import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // প্রটেক্টেড পাথ নির্ধারণ
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isProtectedFindDoctors = pathname.startsWith("/find-doctors");

  if (isDashboardRoute || isProtectedFindDoctors) {
    // Better Auth কুকি নামগুলো চেক করা হচ্ছে
    const sessionToken = 
      request.cookies.get("better-auth.session_token")?.value || 
      request.cookies.get("__Secure-better-auth.session_token")?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
      const res = await fetch(`${baseUrl}/api/auth/get-session`, {
        headers: { cookie: request.headers.get("cookie") || "" },
      });

      if (!res.ok) return NextResponse.redirect(new URL("/login", request.url));

      const session = await res.json();
      const userRole = session?.user?.role;

      if (isDashboardRoute) {
        if (pathname.startsWith("/dashboard/patient") && userRole === "doctor") 
          return NextResponse.redirect(new URL("/dashboard/doctor", request.url));
        if (pathname.startsWith("/dashboard/doctor") && userRole === "patient") 
          return NextResponse.redirect(new URL("/dashboard/patient", request.url));
        if (pathname === "/dashboard" || pathname === "/dashboard/") 
          return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/find-doctors/:path*"],
};