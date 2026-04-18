import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Menu, X, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Conference", path: "/conference" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Donate", path: "/donate" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 rounded-none ${
          isScrolled ? "bg-[rgba(255,255,255,0.08)] backdrop-blur-md border-b border-[rgba(255,255,255,0.15)] py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo2.png" alt="Joyouth Logo" className="w-10 h-10 object-contain drop-shadow-lg" />
            <span className="font-display font-extrabold text-2xl tracking-tighter text-gradient">
              JOYOUTH
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-colors hover:text-[#6366f1] ${
                  location.pathname === link.path ? "text-[#6366f1]" : "text-text-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/volunteer"
              className="btn-primary text-base px-6 py-2.5"
            >
              Donate Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050810]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-display font-bold tracking-widest uppercase ${
                  location.pathname === link.path ? "text-gradient text-glow" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.15)] pt-12 pb-8 mt-20 relative overflow-hidden">
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <img src="/logo2.png" alt="Joyouth Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                <span className="font-display font-extrabold text-2xl tracking-tighter text-gradient">JOYOUTH</span>
              </Link>
              <p className="text-text-muted text-sm leading-relaxed max-w-md mb-6">
                Empowering Youth, Transforming Communities. A futuristic approach to NGO initiatives, driving positive change through mentorship, training, and community engagement.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1877F2]/80 hover:border-[#1877F2]/50 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1DA1F2]/80 hover:border-[#1DA1F2]/50 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#E1306C]/80 hover:border-[#E1306C]/50 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0A66C2]/80 hover:border-[#0A66C2]/50 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white uppercase tracking-wider text-xs">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-text-muted hover:text-white hover:underline text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white uppercase tracking-wider text-xs">Contact Us</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>Founder: Akanzagisi Norbert (Norlin)</li>
                <li>Phone: 0598286081</li>
                <li><a href="mailto:Joyouth.org.gh@gmail.com" className="hover:text-[#6366f1] transition-colors">Joyouth.org.gh@gmail.com</a></li>
                <li className="pt-2">
                  <a href="https://chat.whatsapp.com/FZkk23I4cEz8s5SBrYklet?mode=gi_t" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300">
                    Join our WhatsApp Group -&gt;
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[rgba(255,255,255,0.15)] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted">
            <p>&copy; 2026 Joyouth Organization. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#6366f1]">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
