"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-[85rem] relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center w-full"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-brand-orange" />
              <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-sm">Get in Touch</span>
              <span className="w-12 h-[2px] bg-brand-orange" />
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-display font-black text-brand-charcoal leading-[1.05] mb-8 tracking-tight"
            >
              Let's Talk About <br />
              <span className="text-brand-orange">Something</span> <span className="text-brand-green">Delicious.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-brand-charcoal/70 font-medium leading-relaxed max-w-3xl"
            >
              Have a question about our products, need some help, or want to work with Happy Food? We'd love to hear from you.
            </motion.p>
          </motion.div>

        </div>
      </div>
      
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-brand-orange/5 via-transparent to-transparent rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
    </section>
  );
}
