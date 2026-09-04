"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "#about" },
    { name: "Our Story", href: "#story" },
    { name: "Contact", href: "#contact" },
  ];

  const staggerMenuItems = {
    closed: { opacity: 0, y: -20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 4.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          isScrolled ? "py-4 px-4 sm:px-8" : "py-6 px-6 sm:px-12"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between relative transition-all duration-500 ease-[0.16,1,0.3,1] ${
            isScrolled
              ? "max-w-5xl bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-6 py-3"
              : "max-w-7xl bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-50 flex-shrink-0 group">
            <motion.div
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.4 }}
              className="font-display font-bold text-2xl tracking-tight text-brand-orange flex items-center"
            >
              Happy
              <span className="text-brand-charcoal transition-colors group-hover:text-brand-orange">
                Food
              </span>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-2 h-2 rounded-full bg-brand-green ml-1 mb-1"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2" onMouseLeave={() => setHoveredIndex(null)}>
              {navLinks.map((link, i) => (
                <div
                  key={link.name}
                  className="relative group px-4 py-2"
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                  }}
                >
                  {/* Fluid Hover Pill */}
                  {hoveredIndex === i && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-brand-orange/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-semibold text-brand-charcoal transition-colors hover:text-brand-orange"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 relative z-50">
            {[Search, User].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(234, 88, 12, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-brand-charcoal transition-colors"
                aria-label={i === 0 ? "Search" : "Account"}
              >
                <Icon size={18} />
              </motion.button>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-5 py-2.5 bg-brand-charcoal text-white rounded-full font-semibold flex items-center gap-2 hover:bg-brand-orange transition-colors relative"
            >
              <ShoppingCart size={16} />
              <span className="text-sm">Cart</span>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-brand-green text-white text-[10px] rounded-full flex items-center justify-center shadow-sm"
              >
                2
              </motion.span>
            </motion.button>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-4 z-50">
            <button className="text-brand-charcoal relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 bg-brand-cream rounded-full flex flex-col justify-center items-center gap-[4px] relative overflow-hidden"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 6 : 0,
                }}
                className="w-5 h-[2px] bg-brand-charcoal block rounded-full"
              />
              <motion.span
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  x: mobileMenuOpen ? 20 : 0,
                }}
                className="w-5 h-[2px] bg-brand-charcoal block rounded-full"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -6 : 0,
                }}
                className="w-5 h-[2px] bg-brand-charcoal block rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0)" }}
            animate={{ clipPath: "circle(150% at 100% 0)" }}
            exit={{ clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-brand-charcoal z-40 flex flex-col pt-32 px-6 pb-10"
          >
            {/* Background Decoration */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-brand-orange/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/10 blur-[100px] rounded-full" />

            <nav className="flex flex-col gap-6 flex-grow relative z-10">
              {navLinks.map((link, i) => (
                <div key={link.name}>
                  <motion.div
                    custom={i}
                    variants={staggerMenuItems}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display text-4xl md:text-5xl font-bold text-white hover:text-brand-orange transition-colors flex items-center justify-between"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 mt-auto pt-10 border-t border-white/10 flex gap-4"
            >
              <button className="flex-1 py-4 bg-white/10 rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                <Search size={20} />
                Search
              </button>
              <button className="flex-1 py-4 bg-brand-orange rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors">
                <User size={20} />
                Sign In
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
