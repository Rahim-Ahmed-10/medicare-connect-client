import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-[#090D16] overflow-hidden">
      {/* 💻 বামপাশে ফিক্সড সাইডবার */}
      <DashboardSidebar />

      {/* 📋 ডানপাশে মেইন সেকশন (যা টপ-টু-বটম ফ্লেক্স হবে) */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* 顶部 টপ নেভবার */}
        <DashboardNavbar />

        {/* 📝 স্ক্রোলযোগ্য মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-1 overflow-y-auto p-5 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}