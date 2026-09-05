"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/lib/toast";

export default function ProductCardAddToCart({ onAdd }: { onAdd: () => void }) {
  const [state, setState] = useState<"idle" | "loading">("idle");

  const handleClick = () => {
    if (state === "loading") return;
    setState("loading");
    onAdd();
    
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
      className={`relative w-full h-full rounded-full bg-[#1a1a1a] hover:bg-black text-white font-semibold text-sm shadow-md transition-transform active:scale-95 cursor-pointer ${state !== "idle" ? "pointer-events-none" : ""}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* The Text */}
        <motion.span
          animate={{ opacity: state === "idle" ? 1 : 0, scale: state === "idle" ? 1 : 0.95 }}
          transition={{ duration: 0.3, delay: state === "idle" ? 0.2 : 0 }}
          className="absolute z-10 pl-8" // Increased offset for better gap
        >
          Add to Cart
        </motion.span>

        {/* The Stretchy Funnel (Bulge) */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: state === "loading" ? [0, 1, 1, 0] : 0 }}
          transition={{ times: [0, 0.2, 0.6, 0.8], duration: 1, ease: "easeInOut" }}
          className="absolute top-0 -mt-[6px] left-1/2 -translate-x-1/2 w-8 h-3 bg-[#1a1a1a] rounded-t-full origin-bottom"
        />

        {/* The Dropping Item */}
        <motion.div
          initial={{ y: -40, opacity: 0, scale: 0.5 }}
          animate={state === "loading" ? { 
            y: [-40, -10, 5], 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5] 
          } : { y: -40, opacity: 0 }}
          transition={{ times: [0, 0.4, 0.7], duration: 1, ease: "easeIn" }}
          className="absolute left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-3 h-3 bg-white rounded-[3px] shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
          </div>
        </motion.div>

        {/* The Shopping Cart Icon */}
        <motion.div
          initial={{ x: "-42px", opacity: 1 }}
          animate={
            state === "loading" ? { 
              x: ["-30px", "0px", "0px", "100px"], 
              opacity: [1, 1, 1, 0] 
            } : { x: ["-100px", "-42px"], opacity: [0, 1] } // Slides in from left on reset
          }
          transition={{ 
            times: state === "loading" ? [0, 0.2, 0.7, 1] : undefined, 
            duration: state === "loading" ? 1.5 : 0.6, 
            ease: state === "loading" ? "easeInOut" : "easeOut" 
          }}
          className="absolute z-20 flex items-center justify-center"
        >
          <div className="relative">
            <ShoppingCart size={18} />
            {/* The red badge that appears after the catch */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: state === "loading" ? [0, 0, 1, 1] : 0 }}
              transition={{ times: [0, 0.6, 0.7, 1], duration: 1.5 }}
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#1a1a1a]"
            />
          </div>
        </motion.div>

      </div>
    </button>
  );
}
