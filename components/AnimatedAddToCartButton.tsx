"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { toast } from "@/lib/toast";

interface AnimatedAddToCartButtonProps {
  bgAccent: string;
}

export default function AnimatedAddToCartButton({ bgAccent }: AnimatedAddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "loading">("idle");

  const handleClick = () => {
    // If already loading, ignore clicks
    if (state === "loading") return;

    // Transition to loading
    setState("loading");

    // Trigger the beautiful toast exactly when the item lands in the cart
    setTimeout(() => {
      toast("Cart Added");
    }, 1000);

    // The total animation takes about 1.5 seconds to drive off.
    // At 2 seconds, we reset directly back to idle (sliding back in from left).
    setTimeout(() => {
      setState("idle");
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-full sm:w-[220px] h-[60px] rounded-full text-white font-bold text-lg shadow-xl group transition-transform active:scale-95 ${bgAccent} ${state !== "idle" ? "pointer-events-none" : ""}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* The Text */}
        <motion.span
          animate={{ opacity: state === "idle" ? 1 : 0, scale: state === "idle" ? 1 : 0.95 }}
          transition={{ duration: 0.3, delay: state === "idle" ? 0.2 : 0 }}
          className="absolute z-10 pl-10" // Increased offset for better gap
        >
          Add to Cart
        </motion.span>

        {/* The Stretchy Funnel (Bulge) */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: state === "loading" ? [0, 1, 1, 0] : 0 }}
          transition={{ times: [0, 0.2, 0.6, 0.8], duration: 1, ease: "easeInOut" }}
          className={`absolute top-0 -mt-[10px] left-1/2 -translate-x-1/2 w-10 h-4 rounded-t-full origin-bottom ${bgAccent.includes('brand-orange') ? 'bg-brand-orange' : bgAccent.includes('brand-green') ? 'bg-brand-green' : 'bg-brand-charcoal'}`}
        />

        {/* The Dropping Item */}
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.5 }}
          animate={state === "loading" ? { 
            y: [-50, -10, 5], 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5] 
          } : { y: -50, opacity: 0 }}
          transition={{ times: [0, 0.4, 0.7], duration: 1, ease: "easeIn" }}
          className="absolute left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-4 h-4 bg-white rounded-[4px] shadow-sm flex items-center justify-center">
            <span className="w-2 h-2 bg-brand-charcoal rounded-full" />
          </div>
        </motion.div>

        {/* The Shopping Cart Icon */}
        <motion.div
          initial={{ x: "-52px", opacity: 1 }}
          animate={
            state === "loading" ? { 
              x: ["-38px", "0px", "0px", "120px"], 
              opacity: [1, 1, 1, 0] 
            } : { x: ["-100px", "-52px"], opacity: [0, 1] } // Slides in from left on reset
          }
          transition={{ 
            times: state === "loading" ? [0, 0.2, 0.7, 1] : undefined, 
            duration: state === "loading" ? 1.5 : 0.6, 
            ease: state === "loading" ? "easeInOut" : "easeOut" 
          }}
          className="absolute z-20 flex items-center justify-center"
        >
          <div className="relative">
            <ShoppingCart size={22} className={state === "idle" ? "transition-transform group-hover:scale-110" : ""} />
            {/* The red badge that appears after the catch */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: state === "loading" ? [0, 0, 1, 1] : 0 }}
              transition={{ times: [0, 0.6, 0.7, 1], duration: 1.5 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white/20"
            />
          </div>
        </motion.div>

      </div>
    </button>
  );
}
