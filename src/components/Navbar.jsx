"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { FiPlusSquare, FiMenu, FiX, FiLogOut, FiAlertTriangle, FiUser, FiLayout, FiChevronRight, FiLoader } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Pop-up modal states
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const userRole = user?.role || "patient";

  const pathname = usePathname();

  // Hide Navbar on Dashboard routes
  if (pathname.includes('/dashboard')) {
    return null;
  }

  const getInitials = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setShowDropdown(false);
          setIsOpen(false);
          setImageError(false);
          setShowLogoutModal(false);
          setIsLoggingOut(false);
          window.location.reload();
        },
      },
    });
  };

  // Helper function to check active state
  const isActive = (path) => pathname === path;

  // Navigation Links Array
  const navLinks = [
    { name: "Home", href: "/" },
    ...((!user || userRole === "patient") ? [{ name: "Find Doctors", href: "/find-doctors" }] : []),
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    ...(user ? [{ name: "Dashboard", href: `/dashboard/${userRole}` }] : []),
  ];

  return (
    <>
      <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* 1. Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all duration-300">
                  <FiPlusSquare className="w-5 h-5 text-white" />
                </div>
                
                <span className="text-2xl font-black text-white tracking-tight">
                  Medi<span className="text-blue-500 font-bold">Care</span>
                </span>
              </Link>
            </div>

            {/* 2. Desktop Navigation Links (With Active Indicator) */}
            <div className="hidden md:flex items-center space-x-1.5 font-medium text-slate-300">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 ${
                      active
                        ? "text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 shadow-sm"
                        : "hover:text-white hover:bg-slate-800/50 text-slate-300"
                    }`}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* 3. Auth Buttons / User Profile Dropdown */}
            <div className="hidden md:flex items-center gap-4">
              {isPending ? (
                <div className="w-9 h-9 bg-slate-800/80 rounded-full animate-pulse border border-slate-700/50"></div>
              ) : !user ? (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-slate-300 hover:text-white font-semibold text-sm px-3 py-2 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2.5 focus:outline-none cursor-pointer group bg-slate-900/90 hover:bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-200"
                  >
                    {user?.image && !imageError ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        onError={() => setImageError(true)}
                        className="w-8 h-8 rounded-full ring-2 ring-blue-500/30 object-cover transition-all group-hover:ring-blue-500/80"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-950 text-blue-400 border border-blue-800/80 flex items-center justify-center font-bold text-xs uppercase">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors max-w-[120px] truncate">
                      {user?.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 border border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="px-4 py-3 border-b border-slate-800/80">
                        <p className="font-bold text-slate-100 text-sm truncate">{user?.name}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email}</p>
                        {user?.role && (
                          <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/20">
                            {user.role}
                          </span>
                        )}
                      </div>

                      <div className="py-1">
                        <Link 
                          href="/dashboard/profile" 
                          onClick={() => setShowDropdown(false)} 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
                        >
                          <FiUser className="text-slate-400" /> My Profile
                        </Link>
                        <Link 
                          href={`/dashboard/${userRole}`} 
                          onClick={() => setShowDropdown(false)} 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
                        >
                          <FiLayout className="text-slate-400" /> Dashboard
                        </Link>
                      </div>

                      <div className="border-t border-slate-800/80 pt-1">
                        <button 
                          onClick={() => {
                            setShowDropdown(false);
                            setShowLogoutModal(true);
                          }} 
                          className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 font-semibold cursor-pointer transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <FiLogOut /> Logout
                          </span>
                          <FiChevronRight className="text-xs opacity-60" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4. Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:bg-slate-800/80 focus:outline-none"
              >
                {isOpen ? <FiX className="h-6 w-6 text-slate-200" /> : <FiMenu className="h-6 w-6 text-slate-200" />}
              </button>
            </div>
          </div>
        </div>

        {/* 5. Mobile Drawer Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-800/80 bg-slate-950 px-4 pt-3 pb-5 space-y-2 shadow-2xl">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                </Link>
              );
            })}

            <div className="border-t border-slate-800/80 pt-3 mt-2">
              {!user ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-2.5 text-slate-300 hover:text-white font-semibold text-sm bg-slate-900 rounded-xl border border-slate-800">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="text-center bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm shadow-md">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    {user?.image && !imageError ? (
                      <img src={user.image} alt="User" onError={() => setImageError(true)} className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center font-bold text-xs uppercase">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-sm font-bold text-slate-100">{user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setShowLogoutModal(true);
                    }} 
                    className="w-full bg-red-500/10 border border-red-500/20 text-red-400 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* 🔴 6. PREMIUM MODERN LOGOUT POPUP MODAL */}
      {showLogoutModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => !isLoggingOut && setShowLogoutModal(false)}
        >
          <div 
            className="bg-slate-900/95 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow Effect */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Icon */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-500/20 to-orange-500/10 border border-red-500/30 text-red-400 mx-auto shadow-inner">
              <FiAlertTriangle className="w-7 h-7" />
            </div>

            {/* Modal Text */}
            <div className="text-center space-y-1.5 relative">
              <h3 className="text-xl font-bold text-white tracking-tight">Log Out Confirmation</h3>
              <p className="text-xs text-slate-400 leading-relaxed px-2">
                Are you sure you want to end your session? You will need to log back in to access your dashboard.
              </p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1 relative">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs transition-all border border-slate-700/60 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogoutConfirm}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/25 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" />
                    <span>Logging out...</span>
                  </>
                ) : (
                  "Yes, Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}