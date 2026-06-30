import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation"; // 🎯 রিডাইরেক্ট করার জন্য এটি লাগবে
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }) {
  // ১. নেক্সট জেএস-এর কুকিজ পাস করে সার্ভার সাইড সেশন গেট করা
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const user = session?.user || null;
  const userRole = user?.role || "patient";
  console.log(session) 

  // ২. 🎯 ফিক্স ১ (সার্ভার সাইড রাউট প্রোটেকশন): 
  // যদি কোনো ইউজার শুধু '/dashboard' এ আসে, তাকে তার রোল অনুযায়ী সঠিক পেজে পাঠিয়ে দেবে
  // এতে ইউজার মঙ্গোডিবিতে ডক্টর হলে সে আর পেশেন্ট পেজে আটকে থাকবে না
  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <div className="flex h-screen bg-[#090D16] overflow-hidden font-sans">
      
      {/* 💻 বামপাশে ডাইনামিক সাইডবার */}
      <DashboardSidebar role={userRole} user={user} />

      {/* 🛠️ ডানপাশের অংশ */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        
        {/* 🎯 ফিক্স ২: উপরে ডাইনামিক নববারে প্রপস পাস করা */}
        {/* আপনার নতুন কোড অনুযায়ী এখানে role={userRole} পাঠানো নিশ্চিত করা হলো */}
        <DashboardNavbar role={userRole} user={user} />

        {/* 📝 মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 text-white bg-[#0D1527]">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}