"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Utensils, ArrowUpRight, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    number: "01",
    icon: Leaf,
    title: "Handpicked Freshness",
    subtitle: "Sourced directly from local farms. Every jar is packed with 100% real fruits and roasted nuts for an unforgettable taste.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Pure & Natural",
    subtitle: "No artificial colors, flavors, or harmful chemicals. Just pure, wholesome ingredients you can confidently feed your family.",
  },
  {
    number: "03",
    icon: Utensils,
    title: "Crafted with Love",
    subtitle: "Freshly crafted in small batches following our heritage recipes. We ensure every spoonful brings a smile to your face.",
  },
];

export default function TrustStrip() {
  return (
    <section className="w-full bg-[#FDFBF7] text-stone-900 py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle gradient wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-1/2 left-0 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 lg:mb-24 pb-16 border-b border-stone-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="px-5 py-2 rounded-full bg-white border border-stone-200 shadow-sm mb-8 inline-flex items-center gap-2"
          >
            <ShieldCheck size={16} className="text-brand-orange" />
            <span className="text-sm font-bold tracking-widest uppercase text-stone-600">Our Guarantee</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-stone-900 max-w-3xl"
          >
            Why thousands choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">
              Happy Food
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-500 text-lg mt-6 max-w-md"
          >
            Three simple promises behind every jar we make.
          </motion.p>
        </div>

        {/* Feature Rows */}
        <div className="flex flex-col divide-y divide-stone-200">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-12 py-10 lg:py-12"
              >
                {/* Number */}
                <span className="font-display font-black text-6xl lg:text-7xl text-stone-200 group-hover:text-brand-orange/40 transition-colors duration-500 leading-none">
                  {item.number}
                </span>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} className="text-brand-orange" strokeWidth={2} />
                    <h4 className="font-display font-bold text-2xl lg:text-3xl tracking-tight text-stone-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-stone-500 text-base lg:text-lg leading-relaxed max-w-2xl">
                    {item.subtitle}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex w-14 h-14 rounded-full border border-stone-200 items-center justify-center shrink-0 group-hover:border-brand-orange group-hover:bg-brand-orange transition-all duration-300 justify-self-end">
                  <ArrowUpRight
                    size={20}
                    className="text-stone-400 group-hover:text-white transition-all duration-300 group-hover:rotate-45"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
