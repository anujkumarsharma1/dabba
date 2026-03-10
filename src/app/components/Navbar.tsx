import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Changed to framer-motion for standard compatibility
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sport', href: '#sport' },
    { name: 'Live', href: '#live' },
    { name: 'Cybersport', href: '#cybersport' },
    { name: 'Slots', href: '#slots' },
    { name: 'Fast betting', href: '#fast-betting' },
    { name: 'Games', href: '#games' },
    { name: 'Speedraces', href: '#speedraces' },
    { name: 'Promo', href: '#promo', className: 'text-red-500' },
  ];

  // The custom F1 style button based on the provided CodePen
  const RegisterButton = ({ className = "" }) => (
    <a
      href="#register"
      className={cn(
        "group relative inline-flex items-center justify-center px-8 py-2 font-poppins font-bold text-xs uppercase tracking-tighter text-white transition-all duration-300",
        className
      )}
    >
      {/* The Beveled Background (Chassis look) */}
      <div className="absolute inset-0 bg-red-600 skew-x-[-20deg] group-hover:bg-red-500 transition-colors shadow-[4px_4px_0px_#450a0a] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none" />

      {/* Button Content */}
      <span className="relative z-10 italic flex items-center gap-2">
        Register Now
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </span>
    </a>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-red-600/20' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border border-white/20 group-hover:border-red-500 transition-colors">
            <span className="font-orbitron font-bold text-red-500 text-lg">F1</span>
          </div>
          <span className="font-poppins font-bold text-xl tracking-wide text-white">
            F1.Bet
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "font-poppins text-sm font-medium transition-colors hover:text-white relative group",
                link.className ? link.className : "text-gray-400"
              )}
            >
              {link.name}
              {!link.className && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
              )}
            </a>
          ))}

          <a
            href="#signin"
            className="px-6 py-2 text-white font-poppins font-semibold text-sm hover:text-red-500 transition-all"
          >
            Sign In
          </a>

          {/* New Register Button Integrated Here */}
          <RegisterButton />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-red-600/30 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-poppins text-lg font-medium transition-colors hover:text-white",
                    link.className ? link.className : "text-gray-400"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <a
                  href="#signin"
                  className="w-full py-3 border border-zinc-700 text-center text-white font-poppins font-bold rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <RegisterButton className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};