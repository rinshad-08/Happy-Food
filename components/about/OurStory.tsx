"use client";

import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-[#FAFAF9] relative z-20 overflow-hidden"
    >
      {/* Very soft, premium ambient background elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-brand-orange/5 via-transparent to-transparent rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-brand-green/5 via-transparent to-transparent rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-6 max-w-[85rem]">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Text Side - takes up 7 columns for better typography line length */}
          <div className="flex flex-col justify-center order-2 lg:order-1 lg:col-span-7">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-16 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange font-bold uppercase tracking-[0.25em] text-sm">About Us</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-brand-charcoal mb-10 leading-[1.1] tracking-tight">
                <span className="text-brand-orange">From Humble</span><br />
                Beginnings to<br />
                Trusted Taste.
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Decorative quote mark for premium editorial feel */}
              <span className="absolute -top-10 -left-8 text-8xl text-brand-orange/10 font-serif leading-none select-none">"</span>
              <p className="text-xl md:text-2xl text-brand-charcoal/80 mb-8 leading-relaxed font-medium">
                Founded in 1975, the HAPPY brand has grown into a household name through its commitment to quality and innovation. 
              </p>
              <p className="text-lg md:text-xl text-brand-charcoal/70 mb-8 leading-relaxed">
                This journey began with two visionary brothers, <strong className="text-brand-charcoal font-bold">Mr. M. Basheer</strong> and <strong className="text-brand-charcoal font-bold">Mr. M. Khalid</strong>, who started in 1978 with pickles, syrups, and vinegar under the brand GULZAR.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg md:text-xl text-brand-charcoal/70 mb-12 leading-relaxed border-l-2 border-brand-orange/20 pl-6">
                Their dedication paved the way for innovative products like RTS beverages and a wide range of food items, all created with customer satisfaction at heart. The business is now led by the next generation—<strong className="text-brand-charcoal font-bold">Mohammed Salih, Suhaib, and Salmanul Faris</strong>—carrying forward the legacy of keeping everyone Happy.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6"
            >
              <div className="flex -space-x-4">
                <div className="w-14 h-14 rounded-full border-4 border-[#FAFAF9] bg-white flex items-center justify-center font-bold text-brand-charcoal shadow-sm">1975</div>
                <div className="w-14 h-14 rounded-full border-4 border-[#FAFAF9] bg-brand-orange flex items-center justify-center text-white font-bold shadow-sm">45+</div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-brand-charcoal uppercase tracking-widest">Years of</span>
                <span className="text-sm font-semibold text-brand-orange uppercase tracking-widest">Excellence</span>
              </div>
            </motion.div>
          </div>

          {/* Visual Side - takes up 5 columns */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, scale: 0.95, x: 20 },
              visible: { 
                opacity: 1, 
                scale: 1,
                x: 0,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="order-1 lg:order-2 relative aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center group lg:col-span-5"
          >
            {/* Soft backdrop glow to make the logo pop without a hard card */}
            <div className="absolute inset-0 bg-white rounded-full blur-[80px] opacity-60 scale-75 transition-transform duration-1000 group-hover:scale-100 group-hover:opacity-80" />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="relative w-4/5 h-4/5 flex items-center justify-center mix-blend-multiply z-10"
            >
               <motion.div
                 animate={{ y: [-10, 10, -10] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="relative w-full h-full"
               >
                 <Image 
                   src="/logo/happy-logo.webp" 
                   alt="Happy Food Products Logo" 
                   fill
                   className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                   sizes="(max-width: 768px) 100vw, 40vw"
                   priority
                 />
               </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
