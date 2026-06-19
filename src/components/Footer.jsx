"use client";
import Link from "next/link";
// 🌟 react-icons থেকে প্রফেশনাল এবং প্রিমিয়াম আইকনগুলো নিয়ে আসা হয়েছে
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FiMapPin, FiMail, FiPhoneCall } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Logo & Vision */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                MediCare<span className="text-cyan-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connecting patients with top-tier healthcare professionals instantly. Empowering you to take control of your health journey seamlessly.
            </p>
            
            {/* 🌟 প্রিমিয়াম সোশ্যাল মিডিয়া আইকনস (React Icons) */}
            <div className="flex space-x-3 pt-2">
              {/* Facebook */}
              <a 
                href="#" 
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:-translate-y-1 transition-all duration-200 group"
              >
                <FaFacebookF className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              
              {/* Twitter (X) */}
              <a 
                href="#" 
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white hover:border-sky-400 hover:-translate-y-1 transition-all duration-200 group"
              >
                <FaTwitter className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              
              {/* Linkedin */}
              <a 
                href="#" 
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white hover:border-blue-600 hover:-translate-y-1 transition-all duration-200 group"
              >
                <FaLinkedinIn className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 tracking-wide">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400">→</span>
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400">→</span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 tracking-wide">Contact Info</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              {/* ম্যাপ পিন আইকন */}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/60 flex items-center justify-center shrink-0 border border-slate-800">
                  <FiMapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="leading-relaxed">123 Healthcare Ave, Suite 500, New York, NY 10001</span>
              </li>
              {/* মেইল আইকন */}
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/60 flex items-center justify-center shrink-0 border border-slate-800">
                  <FiMail className="w-4 h-4 text-cyan-400" />
                </div>
                <a href="mailto:support@medicareconnect.com" className="hover:text-cyan-400 transition-colors truncate">
                  support@medicareconnect.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Hotline */}
          <div className="bg-gradient-to-b from-slate-800/40 to-slate-800/10 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
            <h3 className="text-red-400 font-bold text-lg mb-2 flex items-center gap-2">
              {/* অ্যানিমেটেড ফোন কল আইকন */}
              <FiPhoneCall className="w-5 h-5 animate-pulse text-red-400" /> 
              Emergency Hotline
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Available 24/7 for urgent medical assistance and critical guidance.
            </p>
            <a 
              href="tel:10666" 
              className="block text-center bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-950/30 transition-all text-xl tracking-wider hover:scale-[1.02] duration-200"
            >
              10666
            </a>
          </div>

        </div>

        {/* Bottom Bar (Copyright) */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MediCare Connect. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}