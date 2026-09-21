"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { FiPlusSquare, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;
  
  const userRole = user?.role || "patient";

  const getInitials = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  const pathname = usePathname();
  if (pathname.includes('/dashboard')) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setShowDropdown(false);
          setIsOpen(false);
          setImageError(false);
          window.location.reload();
        },
      },
    });
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <FiPlusSquare className="w-5 h-5 text-white" />
              </div>
              
              <span className="text-2xl font-black text-white tracking-tight">
                Medi<span className="text-blue-500 font-bold">Care</span>
              </span>
            </Link>
          </div>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 font-semibold text-slate-300">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            
            {(!user || userRole === "patient") && (
              <Link href="/find-doctors" className="hover:text-blue-400 transition-colors">Find Doctors</Link>
            )}
            
            <Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
            
            {user && (
              <Link href={`/dashboard/${userRole}`} className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* 3. Auth Buttons / User Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-9 h-9 bg-slate-800 rounded-full animate-pulse"></div>
            ) : !user ? (
              <>
                <Link href="/login" className="text-slate-300 hover:text-blue-400 font-semibold transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2.5 focus:outline-none cursor-pointer group bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/60 transition-all"
                >
                  {user?.image && !imageError ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      onError={() => setImageError(true)}
                      className="w-8 h-8 rounded-full ring-2 ring-blue-500/40 object-cover transition-all group-hover:ring-blue-400"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center font-bold text-xs uppercase transition-all group-hover:bg-blue-900">
                      {getInitials(user?.name)}
                    </div>
                  )}
                  
                  <span className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors max-w-[120px] truncate normal-case">
                    {user?.name}
                  </span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 rounded-xl shadow-2xl py-1.5 border border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="px-4 py-2.5 text-sm text-slate-400 border-b border-slate-800">
                      <p className="font-bold text-slate-100 normal-case">{user?.name}</p>
                      <p className="text-xs truncate text-slate-400 mt-0.5">{user?.email}</p>
                      {user?.role && (
                        <span className="inline-block mt-1.5 text-[10px] uppercase font-extrabold bg-blue-950 text-blue-400 px-2 py-0.5 rounded-md border border-blue-900">
                          {user.role}
                        </span>
                      )}
                    </div>
                    <Link href="/dashboard/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">My Profile</Link>
                    <Link href={`/dashboard/${userRole}`} onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Dashboard</Link>
                    
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-red-950/40 font-bold cursor-pointer border-t border-slate-800 mt-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:bg-slate-800 focus:outline-none cursor-pointer"
            >
              {isOpen ? (
                <FiX className="h-6 w-6 text-slate-200" />
              ) : (
                <FiMenu className="h-6 w-6 text-slate-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1.5 font-semibold text-slate-300 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-800 hover:text-blue-400">Home</Link>
          
          {(!user || userRole === "patient") && (
            <Link href="/find-doctors" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-800 hover:text-blue-400">Find Doctors</Link>
          )}
          
          <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-800 hover:text-blue-400">About Us</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-800 hover:text-blue-400">Contact Us</Link>
          
          {user && (
            <Link href={`/dashboard/${userRole}`} onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-slate-800 hover:text-blue-400">
              Dashboard
            </Link>
          )}
          
          <div className="border-t border-slate-800 pt-3 flex flex-col gap-2">
            {!user ? (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-2 text-slate-300 hover:text-blue-400 font-bold">Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-center bg-blue-600 text-white py-2.5 rounded-xl font-bold shadow-sm">Register</Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  {user?.image && !imageError ? (
                    <img
                      src={user.image}
                      alt="User"
                      onError={() => setImageError(true)}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center font-bold text-sm uppercase">
                      {getInitials(user?.name)}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-100 leading-none normal-case">{user?.name}</p>
                    <p className="text-xs text-slate-400 mt-1 truncate">{user?.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-center bg-red-950/40 text-red-400 py-2.5 rounded-xl font-bold cursor-pointer hover:bg-red-900/50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}