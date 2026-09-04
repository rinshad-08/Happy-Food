"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Picking the freshest fruits...",
  "Making the finest jams...",
  "Packing with love...",
  "Getting things ready...",
];

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Lock scroll when showing splash screen
    if (show) {
      document.body.style.overflow = "hidden";
    }

    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "auto";
    }, 4800); // Increased by 2 seconds

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1200); // cycles through 4 messages over 4.8 seconds
    return () => clearInterval(interval);
  }, [show]);

  // Generate some random floating particles
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100 - 50, // -50vw to 50vw
    delay: Math.random() * 1.5,
    duration: Math.random() * 2 + 3,
    color: i % 2 === 0 ? "bg-brand-orange/40" : "bg-brand-green/40",
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-cream overflow-hidden will-change-transform"
        >
          {/* Animated Background blobs for extra flavor */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange rounded-full blur-3xl pointer-events-none will-change-transform"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green rounded-full blur-3xl pointer-events-none will-change-transform"
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: "100vh", x: `${p.x}vw`, opacity: 0, rotate: 0 }}
              animate={{ y: "-20vh", opacity: [0, 1, 0], rotate: 360 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute rounded-full pointer-events-none will-change-transform ${p.color}`}
              style={{ width: p.size, height: p.size }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center">
            {/* "Happy" text with individual letter animation */}
            <div className="flex overflow-hidden pb-4">
              {["H", "A", "P", "P", "Y"].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0, rotate: 10 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-7xl md:text-9xl font-display font-black text-brand-orange drop-shadow-md"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Playful smile SVG drawn out */}
            <motion.svg
              initial="hidden"
              animate="visible"
              className="w-24 h-12 md:w-32 md:h-16 text-brand-green drop-shadow-md"
              viewBox="0 0 100 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            >
              <motion.path
                d="M 10 10 Q 50 60 90 10"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.7,
                      duration: 1,
                      ease: "easeInOut"
                    }
                  }
                }}
              />
            </motion.svg>

            {/* Premium Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-8 relative w-48 h-1.5 bg-brand-orange/10 rounded-full overflow-hidden shadow-inner"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.8, ease: "easeInOut" }}
                className="absolute top-0 left-0 bottom-0 bg-brand-orange rounded-full"
                style={{
                  boxShadow: "0 0 10px rgba(234, 88, 12, 0.5)"
                }}
              />
            </motion.div>

            {/* Rotating Messages */}
            <div className="mt-4 h-6 relative overflow-hidden flex items-center justify-center w-80">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute text-brand-charcoal/60 font-sans tracking-[0.2em] uppercase text-xs font-semibold text-center w-full"
                >
                  {loadingMessages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
