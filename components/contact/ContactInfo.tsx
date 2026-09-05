"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Smartphone, Mail } from "lucide-react";

export default function ContactInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-brand-charcoal/5 border border-black/[0.03] h-full"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold text-brand-charcoal mb-2">Come Say Hello.</h3>
        <p className="text-brand-charcoal/70 text-base">We are always excited to talk about good food.</p>
      </div>

      <div className="space-y-6">

        {/* Address */}
        <motion.div variants={itemVariants} className="flex gap-4 group cursor-default">
          <div className="relative w-11 h-11 rounded-[14px] bg-white shadow-md shadow-black/5 border border-black/[0.04] flex items-center justify-center flex-shrink-0 group-hover:shadow-xl group-hover:shadow-brand-orange/20 group-hover:-translate-y-1 transition-all duration-300 text-brand-charcoal group-hover:text-brand-orange overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MapPin size={20} strokeWidth={2} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="group-hover:translate-x-1 transition-transform duration-300">
            <h4 className="font-bold text-brand-charcoal mb-1 text-base group-hover:text-brand-orange transition-colors duration-300">Address</h4>
            <p className="text-brand-charcoal/70 leading-relaxed text-sm max-w-[250px]">
              SLK FOOD PROCESSING<br />
              12/645-647, Poovattuparamba,<br />
              Kozhikode - 673008,<br />
              Kerala (INDIA)
            </p>
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div variants={itemVariants} className="flex gap-4 group cursor-pointer">
          <div className="relative w-11 h-11 rounded-[14px] bg-white shadow-md shadow-black/5 border border-black/[0.04] flex items-center justify-center flex-shrink-0 group-hover:shadow-xl group-hover:shadow-brand-green/20 group-hover:-translate-y-1 transition-all duration-300 text-brand-charcoal group-hover:text-brand-green overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Phone size={20} strokeWidth={2} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="group-hover:translate-x-1 transition-transform duration-300">
            <h4 className="font-bold text-brand-charcoal mb-1 text-base group-hover:text-brand-green transition-colors duration-300">Phone</h4>
            <a href="tel:+914952492176" className="text-brand-charcoal/70 group-hover:text-brand-charcoal transition-colors text-sm">
              +91 495 249 2176
            </a>
          </div>
        </motion.div>

        {/* Mobile */}
        <motion.div variants={itemVariants} className="flex gap-4 group cursor-pointer">
          <div className="relative w-11 h-11 rounded-[14px] bg-white shadow-md shadow-black/5 border border-black/[0.04] flex items-center justify-center flex-shrink-0 group-hover:shadow-xl group-hover:shadow-brand-green/20 group-hover:-translate-y-1 transition-all duration-300 text-brand-charcoal group-hover:text-brand-green overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Smartphone size={20} strokeWidth={2} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="group-hover:translate-x-1 transition-transform duration-300">
            <h4 className="font-bold text-brand-charcoal mb-1 text-base group-hover:text-brand-green transition-colors duration-300">Mobile</h4>
            <a href="tel:+919633157770" className="text-brand-charcoal/70 group-hover:text-brand-charcoal transition-colors text-sm">
              96 33 15 77 70
            </a>
          </div>
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants} className="flex gap-4 group cursor-pointer">
          <div className="relative w-11 h-11 rounded-[14px] bg-white shadow-md shadow-black/5 border border-black/[0.04] flex items-center justify-center flex-shrink-0 group-hover:shadow-xl group-hover:shadow-blue-500/20 group-hover:-translate-y-1 transition-all duration-300 text-brand-charcoal group-hover:text-blue-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Mail size={20} strokeWidth={2} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="min-w-0 group-hover:translate-x-1 transition-transform duration-300">
            <h4 className="font-bold text-brand-charcoal mb-1 text-base group-hover:text-blue-500 transition-colors duration-300">Email</h4>
            <a href="mailto:hello@happyfoodproducts.com" className="text-brand-charcoal/70 group-hover:text-brand-charcoal transition-colors text-sm break-words inline-block">
              hello@happyfoodproducts.com
            </a>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
