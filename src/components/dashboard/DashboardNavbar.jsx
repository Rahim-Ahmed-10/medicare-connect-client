"use client";

import { LayoutSideContentLeft, Bell, Magnifier } from "@gravity-ui/icons";
import { 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Avatar,
  Badge
} from "@heroui/react";

export function DashboardNavbar({ onMenuPress }) {
  return (
    <header className="w-full border-b border-default-150 bg-background/60 backdrop-blur-md h-16 flex items-center justify-between px-6 sticky top-0 z-30 transition-all">
      
      {/* 📱 বাম পাশ: মোবাইলের জন্য মেনু বাটন এবং ডেস্কটপের ওয়েলকাম মেসেজ */}
      <div className="flex items-center gap-4">
        {onMenuPress && (
          <Button
            isIconOnly
            variant="flat"
            onPress={onMenuPress}
            className="lg:hidden rounded-xl bg-default-100 hover:bg-default-200 text-default-700"
          >
            <LayoutSideContentLeft size={20} />
          </Button>
        )}
        
        {/* মোবাইল স্ক্রিনের লোগো */}
        <div className="lg:hidden font-black text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
          MediCare
        </div>
        
        {/* ডেস্কটপ স্ক্রিনের সুন্দর গ্রিটিংস */}
        <div className="hidden lg:flex flex-col">
          <h1 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            Welcome back, Rahim <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-[11px] text-default-400 font-medium">
            Your medical control panel is live.
          </p>
        </div>
      </div>

      {/* 🔍 ডান পাশ: সার্চবার, নোটিফিকেশন অ্যালার্ট ও ইউজার প্রোফাইল ড্রপডাউন */}
      <div className="flex items-center gap-3">
        
        {/* সার্চ আইকন বাটন */}
        <Button
          isIconOnly
          variant="light"
          className="rounded-xl text-default-500 hover:bg-default-100 h-10 w-10"
        >
          <Magnifier size={18} />
        </Button>

        {/* নোটিফিকেশন বাটন সাথে রেসপন্সিভ ব্যাজ */}
        <Badge content="" color="danger" shape="circle" size="sm" placement="top-right" className="mr-1 mt-1">
          <Button
            isIconOnly
            variant="light"
            className="rounded-xl text-default-500 hover:bg-default-100 h-10 w-10"
          >
            <Bell size={19} />
          </Button>
        </Badge>

        {/* মিডল ডিভাইডার বার */}
        <div className="h-5 w-[1px] bg-default-200 mx-1 hidden sm:block" />

        {/* 👤 প্রোফাইল ড্রপডাউন মেনু (গ্লাস-মরফিজম ব্লার ব্যাকগ্রাউন্ড সহ) */}
    

      </div>
    </header>
  );
}