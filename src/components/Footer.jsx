import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Logo & Vision */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                MediCare<span className="text-cyan-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connecting patients with top-tier healthcare professionals instantly. Empowering you to take control of your health journey seamlessly.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <span className="text-sm font-semibold">Fb</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all">
                <span className="text-sm font-semibold">Tw</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all">
                <span className="text-sm font-semibold">In</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-cyan-400 transition-colors">Find Doctors</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">📍</span>
                <span>123 Healthcare Ave, Suite 500, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✉️</span>
                <a href="mailto:support@medicareconnect.com" className="hover:text-cyan-400">support@medicareconnect.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Hotline */}
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
            <h3 className="text-red-400 font-bold text-lg mb-2 flex items-center gap-2">
              🚨 Emergency Hotline
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Available 24/7 for urgent medical assistance and critical guidance.
            </p>
            <a 
              href="tel:10666" 
              className="block text-center bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-900/20 transition-all text-xl tracking-wider"
            >
              10666
            </a>
          </div>

        </div>

        {/* Bottom Bar (Copyright) */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MediCare Connect. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}