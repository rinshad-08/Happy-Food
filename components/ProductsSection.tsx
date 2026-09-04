"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { allProducts } from "../lib/products";

export default function ProductsSection() {
  // Store cart quantities per product ID
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: 1 }));
  };

  const increment = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = (id: number) => {
    setCart((prev) => {
      const newQty = prev[id] - 1;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <section className="w-full py-20 bg-[#f8faf9] relative overflow-hidden" id="products">
      {/* Floating Ingredients Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8faf9]">
        {[
          { emoji: "🍓", size: "text-6xl", top: "10%", left: "5%", delay: 0, duration: 20 },
          { emoji: "🥜", size: "text-8xl", top: "40%", left: "80%", delay: 2, duration: 25 },
          { emoji: "🥭", size: "text-7xl", top: "70%", left: "15%", delay: 5, duration: 22 },
          { emoji: "🍫", size: "text-5xl", top: "20%", left: "60%", delay: 1, duration: 18 },
          { emoji: "🍇", size: "text-7xl", top: "80%", left: "70%", delay: 4, duration: 24 },
          { emoji: "🍓", size: "text-5xl", top: "50%", left: "30%", delay: 3, duration: 21 },
          { emoji: "🥜", size: "text-6xl", top: "15%", left: "90%", delay: 6, duration: 19 },
          { emoji: "🥭", size: "text-8xl", top: "85%", left: "40%", delay: 2, duration: 26 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} opacity-[0.08] pointer-events-none select-none drop-shadow-sm`}
            style={{ top: item.top, left: item.left }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 45, -45, 0],
              x: [0, 50, -50, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
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
            const quantity = cart[product.id] || 0;
            const inCart = quantity > 0;

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
                    className="absolute top-0 right-0 p-2.5 rounded-full bg-white/90 backdrop-blur shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all z-10"
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

                {/* Add to Cart Button Logic */}
                <div className="w-full mt-auto h-12">
                  <AnimatePresence mode="wait">
                    {!inCart ? (
                      <motion.button
                        key="add"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => addToCart(product.id)}
                        className="w-full h-full rounded-full bg-[#1a1a1a] hover:bg-black text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:scale-105"
                      >
                        <Plus size={18} />
                        Add to Cart
                      </motion.button>
                    ) : (
                      <motion.div
                        key="controls"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full rounded-full bg-[#0a4d3c] text-white flex items-center justify-between px-2"
                      >
                        <button
                          onClick={() => decrement(product.id)}
                          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold">{quantity}</span>
                        <button
                          onClick={() => increment(product.id)}
                          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
