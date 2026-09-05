"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-brand-cream pt-20"
    >
      {/* Background shapes for aesthetic */}
      <motion.div
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          rotate: [360, 270, 180, 90, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[100px]"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-4 px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-brand-charcoal/10"
          >
            <span className="text-brand-orange font-bold text-sm uppercase tracking-widest">Our Mission</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-display font-bold text-brand-charcoal leading-tight mb-8"
          >
            Nourishing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-green">
              Body & Soul
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-brand-charcoal/70 max-w-2xl mx-auto font-medium"
          >
            We believe that healthy food shouldn't be boring. It should be vibrant, delicious, and make you feel truly alive.
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative element at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent z-20" />
    </section>
  );
}
