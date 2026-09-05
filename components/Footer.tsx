"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const HoverLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="group relative text-[#A3A3A3] hover:text-white transition-colors duration-300 inline-block">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  return (
    <footer className="bg-[#2A2A2A] text-white pt-20 pb-8 overflow-hidden relative">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange via-brand-green to-brand-orange opacity-50" />

      <div className="container mx-auto px-6 max-w-[85rem]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10"
        >
          {/* Column 1 */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">Happy Food Products</h4>
            <p className="text-[#A3A3A3] leading-relaxed text-sm">
              Happy brings you jams, peanut butters, and pickles crafted with care, rooted in Kerala's rich food traditions. Every jar is made to spread authentic taste and everyday happiness.
            </p>
          </motion.div>

          {/* Column 2 */}
          <motion.div variants={itemVariants} className="lg:col-span-1 lg:ml-auto">
            <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">Locate Us</h4>
            <div className="text-[#A3A3A3] text-sm space-y-4">
              <p className="leading-relaxed">
                SLK FOOD PROCESSING<br />
                12/645-647, Poovattuparamba,<br />
                Kozhikode - 673008, Kerala (INDIA)
              </p>
              <p>Phone : +91 495 249 2176</p>
              <p>Mobile : 96 33 15 77 70</p>
              <p>Mail id : hello@happyfoodproducts.com</p>
            </div>
          </motion.div>

          {/* Column 3 */}
          <motion.div variants={itemVariants} className="lg:ml-auto">
            <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">Policies</h4>
            <ul className="space-y-4 text-sm">
              <li><HoverLink href="#">Terms & Conditions</HoverLink></li>
              <li><HoverLink href="#">Shipping Policy</HoverLink></li>
              <li><HoverLink href="#">Refund Policy</HoverLink></li>
              <li><HoverLink href="#">Privacy Policy</HoverLink></li>
            </ul>
          </motion.div>

          {/* Column 4 */}
          <motion.div variants={itemVariants} className="lg:ml-auto">
            <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">Main Menu</h4>
            <ul className="space-y-4 text-sm">
              <li><HoverLink href="/">Home</HoverLink></li>
              <li><HoverLink href="/products">Products</HoverLink></li>
              <li><HoverLink href="/about">About Us</HoverLink></li>
              <li><HoverLink href="/contact">Contact</HoverLink></li>
            </ul>
          </motion.div>

          {/* Column 5 */}
          <motion.div variants={itemVariants} className="lg:ml-auto">
            <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">Happy</h4>
            <ul className="space-y-4 text-sm">
              <li><HoverLink href="/products#jam">Jam</HoverLink></li>
              <li><HoverLink href="/products#peanut-butter">Peanut Butter</HoverLink></li>
              <li><HoverLink href="/products#pickle">Pickle</HoverLink></li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-white/50 text-xs text-center">
            © 2026, Happy Food Products.
            <span className="mx-2">|</span>
            Developed by{" "}
            <a
              href="https://techbrein.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              TechBrein
            </a>
          </div>

          {/* Payment Icons (CSS Recreations for premium look) */}
          <div className="flex gap-2">
            <div className="w-10 h-6 bg-[#006FCF] rounded flex items-center justify-center font-bold text-[8px] text-white">AMEX</div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center overflow-hidden">
              <div className="w-3 h-3 rounded-full bg-[#EB001B] -mr-1 mix-blend-multiply" />
              <div className="w-3 h-3 rounded-full bg-[#F79E1B] mix-blend-multiply" />
            </div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center overflow-hidden">
              <div className="w-3 h-3 rounded-full bg-[#EB001B] -mr-1 opacity-90" />
              <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90" />
            </div>
            <div className="w-10 h-6 bg-[#000000] rounded flex items-center justify-center font-bold text-[9px] text-white italic">
              Pay
            </div>
            <div className="w-10 h-6 bg-white rounded flex items-center justify-center font-bold text-[#1434CB] text-[10px] italic">
              VISA
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
