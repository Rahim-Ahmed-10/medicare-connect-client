import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#090D16] overflow-hidden font-sans">
      
      {/* 💻 বামপাশে ফিক্সড সাইডবার */}
      <DashboardSidebar />

      {/* 🛠️ ডানপাশের মেইন অংশ (Navbar + Content) */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        
        {/* 顶部 উপরে ফিক্সড নববার */}
        <DashboardNavbar />

        {/* 📝 নিচে স্ক্রোলযোগ্য মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 text-white bg-[#0D1527]">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}