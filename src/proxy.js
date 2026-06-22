import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers"; 
import { auth } from "./lib/auth";

export async function proxy(request) {
   const session = await auth.api.getSession({
    headers: await headers()
   }) 
    
   if(session?.user?.role == "patient" && session?.user?.plan == "free") {
    return NextResponse.redirect(new URL('/find-doctors', request.url))
   }

   if(!session){
    return NextResponse.redirect(new URL('/signin', request.url))
   }

}

export const config = {
    matcher: ['/profile', '/dashboard/patient']
}
