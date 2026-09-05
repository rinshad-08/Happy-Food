"use client";

import { motion, Variants } from "framer-motion";

export default function Loading() {
  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 1,
      },
    },
  };

  const happyText = "Happy".split("");
  const foodText = "Food".split("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDFBF7] backdrop-blur-md">
      <div className="flex flex-col items-center">
        
        {/* Animated Logo */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="font-display font-black text-4xl md:text-5xl tracking-tight flex items-center"
        >
          {/* Happy (Orange) */}
          <div className="flex text-brand-orange">
            {happyText.map((char, index) => (
              <motion.span key={`happy-${index}`} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </div>
          
          {/* Food (Charcoal) */}
          <div className="flex text-brand-charcoal ml-2">
            {foodText.map((char, index) => (
              <motion.span key={`food-${index}`} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </div>

          {/* Bouncing Dot */}
          <motion.div
            variants={letterVariants}
            className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-brand-green ml-2 self-end mb-2"
          />
        </motion.div>

        {/* Pulsing Text */}
        <motion.p 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 text-stone-400 font-sans tracking-widest uppercase text-xs font-bold"
        >
          Tasting the goodness...
        </motion.p>

      </div>
    </div>
  );
}
