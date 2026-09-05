"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChevronRight, Heart, Eye } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { allProducts } from "../lib/products";
import { useCart } from "../lib/cart-context";
import { ShoppingCart, Check, Loader2 } from "lucide-react";

function AddToCartInteraction({ onAdd }: { onAdd: () => void }) {
  const [state, setState] = useState<"idle" | "loading" | "added">("idle");

  const handleClick = () => {
    if (state === "loading" || state === "added") return;
    setState("loading");
    onAdd();
    setTimeout(() => {
      setState("added");
    }, 1000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px -5px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      className="relative w-full h-full rounded-full bg-[#1a1a1a] hover:bg-black text-white font-semibold text-sm overflow-hidden shadow-md cursor-pointer"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex items-center justify-center gap-2 w-full absolute"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </motion.div>
          )}

          {state === "loading" && (
            <motion.div
              key="loading"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex items-center justify-center w-full absolute"
            >
              <Loader2 size={18} className="animate-spin" />
            </motion.div>
          )}

          {state === "added" && (
            <motion.div
              key="added"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex items-center justify-center gap-1.5 w-full absolute"
            >
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
              >
                <Check size={18} />
              </motion.div>
              <span>Added</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export default function ProductsSection() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 80, clipPath: "inset(10% 5% 10% 5% round 40px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-24 bg-[#FDFBF7] relative overflow-hidden" 
      id="products"
    >
      {/* Immersive Flavor-Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />
        
        {/* Strawberry / Rose Aura */}
        <motion.div 
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} 
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] bg-gradient-to-br from-red-400/10 via-rose-300/10 to-transparent rounded-[40%_60%_70%_30%] blur-[100px]" 
        />
        {/* Peanut / Amber Aura */}
        <motion.div 
          animate={{ rotate: [360, 0], scale: [1, 1.3, 1] }} 
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[80%] h-[80%] bg-gradient-to-tr from-amber-400/10 via-orange-300/10 to-transparent rounded-[60%_40%_30%_70%] blur-[120px]" 
        />
        {/* Mango / Emerald Aura */}
        <motion.div 
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-emerald-400/5 rounded-full blur-[140px]" 
        />

        {/* Elegant Floating Ingredients */}
        {[
          { emoji: "🍓", size: "text-6xl", top: "10%", left: "5%", delay: 0, duration: 25 },
          { emoji: "🥜", size: "text-8xl", top: "40%", left: "80%", delay: 2, duration: 30 },
          { emoji: "🥭", size: "text-7xl", top: "70%", left: "15%", delay: 5, duration: 28 },
          { emoji: "🍫", size: "text-5xl", top: "20%", left: "60%", delay: 1, duration: 22 },
          { emoji: "🌿", size: "text-7xl", top: "80%", left: "70%", delay: 4, duration: 32 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} opacity-[0.06] blur-[2px] pointer-events-none select-none`}
            style={{ top: item.top, left: item.left }}
            animate={{
              y: [0, -80, 0],
              rotate: [0, 90, 180, 360],
              x: [0, 40, -40, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "linear",
              delay: item.delay,
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-center mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-black tracking-tight">
            Today's Fresh Picks
          </h2>

          <Link href="/products" className="flex items-center gap-4 bg-[#1a1a1a] hover:bg-black text-white px-5 py-2.5 rounded-full transition-colors group">
            <span className="font-medium text-sm ml-2">Show All</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black group-hover:scale-105 transition-transform">
              <ChevronRight size={18} strokeWidth={3} />
            </div>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.slice(0, 4).map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 relative group"
              >
                {/* Product Image */}
                <div className="relative w-full h-48 mb-6 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-0 right-0 p-2.5 rounded-full bg-white/90 backdrop-blur shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all z-10 cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} className={wishlist[product.id] ? "fill-red-500 text-red-500" : ""} />
                  </button>
                </div>

                {/* Product Info */}
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-1 leading-tight">
                  {product.title}
                </h3>

                <p className="text-xs text-gray-500 font-medium mb-4">
                  {product.subtitle}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    / {product.unit}
                  </span>
                </div>

                {/* Add to Cart + View More Buttons */}
                <div className="w-full mt-auto h-12 relative z-30 flex items-center gap-0 group-hover:gap-2 transition-all duration-300">
                  <div className="flex-1 h-full min-w-0">
                    <AddToCartInteraction onAdd={() => addToCart(product.id)} />
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="h-full w-0 group-hover:w-12 overflow-hidden rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer"
                    aria-label="View more"
                  >
                    <Eye size={18} className="shrink-0" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
