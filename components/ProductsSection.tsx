"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Plus, Minus, ChevronRight, Heart, Eye, ShoppingCart, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "../lib/products";
import { useCart } from "../lib/cart-context";

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
      className="relative w-48 h-12 md:h-14 rounded-full bg-[#2A2A2A] hover:bg-black text-white font-medium text-sm md:text-base overflow-hidden shadow-md cursor-pointer pointer-events-auto transition-colors"
      aria-label="Add to cart"
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
              <ShoppingCart size={18} />
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
              <Loader2 size={20} className="animate-spin" />
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
                <Check size={20} />
              </motion.div>
              <span>Added</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

function EditorialProduct({ product, index, scrollYProgress, toggleWishlist, wishlist, addToCart, total, nextProduct }: any) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;

  const transitionDuration = 0.08;

  const fadeInStart = start - transitionDuration;
  const fadeInEnd = start;
  const fadeOutStart = end - transitionDuration;
  const fadeOutEnd = end;

  const opacityInput = [
    index === 0 ? 0 : fadeInStart,
    index === 0 ? 0 : fadeInEnd,
    index === total - 1 ? 1 : fadeOutStart,
    index === total - 1 ? 1 : fadeOutEnd
  ];

  const opacityOutput = [0, 1, 1, 0];
  const rawOpacity = useTransform(scrollYProgress, opacityInput, opacityOutput);

  // Spring config tailored for premium, cinematic feel (like cubic-bezier 0.76, 0, 0.24, 1)
  const springConfig = { stiffness: 150, damping: 30, mass: 1.2 };

  const opacity = useSpring(rawOpacity, { stiffness: 200, damping: 30 });

  // ----------------------------------------------------
  // TEXT & DETAILS ANIMATION: Subtle vertical movement
  // ----------------------------------------------------
  const rawTextY = useTransform(scrollYProgress, opacityInput, [30, 0, 0, -30]);
  const textY = useSpring(rawTextY, springConfig);

  // ----------------------------------------------------
  // IMAGE ANIMATION: Cinematic Diagonal Movement
  // Outgoing: Top Left (-45vw, -45vh, scale 0.65, rotate -8deg)
  // Incoming: Bottom Right (35vw, 35vh, scale 0.65, rotate 8deg)
  // ----------------------------------------------------
  const rawImageX = useTransform(scrollYProgress, opacityInput, ["35vw", "0vw", "0vw", "-45vw"]);
  const rawImageY = useTransform(scrollYProgress, opacityInput, ["35vh", "0vh", "0vh", "-45vh"]);
  const rawImageScale = useTransform(scrollYProgress, opacityInput, [0.65, 1, 1, 0.65]);
  const rawImageRotate = useTransform(scrollYProgress, opacityInput, [8, 0, 0, -8]);

  const imageX = useSpring(rawImageX, springConfig);
  const imageY = useSpring(rawImageY, springConfig);
  const imageScale = useSpring(rawImageScale, springConfig);
  const imageRotate = useSpring(rawImageRotate, springConfig);

  const [isVisible, setIsVisible] = useState(index === 0);

  opacity.on("change", (latest) => {
    setIsVisible(latest > 0.01);
  });

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col md:flex-row pointer-events-none"
      style={{
        opacity,
        pointerEvents: isVisible ? "auto" : "none",
        zIndex: isVisible ? 10 : 0
      }}
    >
      {/* CENTER COLUMN: Massive Product Image & Subtitle */}
      <div className="w-full md:flex-1 flex flex-col items-center justify-center relative order-1 md:order-1 pt-6 md:pt-0">

        {/* Elegant Product Hero: Cinematic Diagonal Animation Layer */}
        <motion.div
          className="w-full h-[35vh] md:h-[55vh] relative flex items-center justify-center"
          style={{ x: imageX, y: imageY, scale: imageScale, rotate: imageRotate }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain drop-shadow-[0_45px_35px_rgba(0,0,0,0.2)]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </motion.div>

        {/* Cinematic Subtitle Area */}
        <motion.div className="mt-2 md:mt-12 text-center max-w-sm px-6" style={{ y: textY }}>
          <h3 className="font-display text-xl md:text-3xl font-semibold text-gray-800 mb-1 leading-tight">
            {product.title}
          </h3>
          <p className="text-gray-500 text-xs md:text-base">
            {product.subtitle}
          </p>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: Details, Pricing, Next Product Preview */}
      <motion.div
        className="w-full md:w-1/3 lg:w-1/4 flex flex-col justify-start md:justify-center items-center md:items-end text-center md:text-right order-2 md:order-2 relative mt-4 md:mt-0"
        style={{ y: textY }}
      >

        {/* Premium Pricing Block */}
        <div className="mb-6 md:mb-14 pt-2 md:pt-0 flex flex-col items-center md:items-end">
          <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-1 md:mb-3">
            Premium Quality
          </div>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-4xl md:text-7xl font-medium text-gray-900 tracking-tighter">
              {product.price}
            </span>
            <span className="text-sm md:text-lg font-medium text-gray-500">
              / {product.unit}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4 pointer-events-auto">
          <button
            onClick={() => toggleWishlist(product.id)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-[0_8px_20px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-[0_8px_20px_rgb(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label={`Add ${product.title} to wishlist`}
          >
            <Heart size={22} className={wishlist[product.id] ? "fill-red-500 text-red-500" : ""} />
          </button>

          <AddToCartInteraction onAdd={() => addToCart(product.id)} />
        </div>

        {/* MOBILE Progress Indicator (Inline flow to prevent awkward gap) */}
        <div className="md:hidden mt-8 md:mt-0 text-sm font-bold tracking-widest text-gray-400 font-display bg-white/60 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm">
          <span className="text-gray-900">0{index + 1}</span> / 0{total}
        </div>

        {/* BOTTOM RIGHT: Next Product Thumbnail (Desktop) */}
        <div className="absolute bottom-8 right-0 hidden md:flex flex-col items-center md:items-end opacity-70 group hover:opacity-100 transition-opacity">
          {nextProduct ? (
            <>
              <div className="w-28 h-28 md:w-32 md:h-32 relative mb-4 group-hover:-translate-y-2 transition-transform duration-500">
                <Image src={nextProduct.image} fill className="object-contain drop-shadow-2xl" alt="Next product" />
              </div>
              <div className="text-sm font-bold tracking-widest text-gray-400 font-display">
                <span className="text-gray-900">0{index + 1}</span> / 0{total}
              </div>
            </>
          ) : (
            <div className="text-sm font-bold tracking-widest text-gray-400 font-display mb-8">
              <span className="text-gray-900">0{index + 1}</span> / 0{total}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const products = allProducts.slice(0, 4);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "#FAF3F3", // Jam
      "#FDF8F0", // Peanut Butter
      "#F2FAF4", // Mango
      "#FDF6F0", // Choco Peanut
      "#FDF6F0",
    ]
  );

  return (
    <motion.section
      ref={containerRef}
      className="w-full relative h-[400vh]"
      id="products"
    >
      <motion.div
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col md:flex-row px-4 md:px-16 lg:px-24"
        style={{ backgroundColor }}
      >
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        {/* LEFT COLUMN: Static Editorial Introduction */}
        <div className="w-full md:w-1/3 lg:w-1/4 h-auto md:h-full flex flex-col justify-start md:justify-center items-center md:items-start text-center md:text-left z-50 pointer-events-auto pt-8 md:pt-0 relative">

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 tracking-tight leading-tight mb-4 md:mb-8 mt-2 md:mt-0">
            Today's Fresh Picks
          </h2>

          <p className="text-gray-500 text-sm md:text-base font-medium mb-6 md:mb-10 max-w-sm leading-relaxed hidden md:block">
            It’s not just about great taste. It’s about stepping into the kitchen and instantly feeling delighted, nourished, and completely yourself. Crafted to elevate your everyday meals.
          </p>

          <Link
            href="/products"
            className="group flex items-center gap-2 md:gap-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 px-4 py-2 md:px-6 md:py-3 rounded-full transition-all shadow-sm"
          >
            <span className="font-medium text-xs md:text-sm">Show All Recipes</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Decorative Brand Icons */}
          <div className="absolute bottom-12 left-0 hidden md:flex items-center gap-8 text-gray-400">
            <Heart size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
            <Eye size={20} className="hover:text-gray-900 cursor-pointer transition-colors" />
            <span className="font-semibold font-display text-lg hover:text-gray-900 cursor-pointer transition-colors">HF</span>
          </div>
        </div>

        {/* CENTER & RIGHT COLUMNS: Animated Product Story */}
        <div className="flex-1 w-full relative">
          {products.map((product, index) => (
            <EditorialProduct
              key={product.id}
              product={product}
              index={index}
              total={products.length}
              scrollYProgress={scrollYProgress}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              addToCart={addToCart}
              nextProduct={products[index + 1]}
            />
          ))}
        </div>

      </motion.div>
    </motion.section>
  );
}
