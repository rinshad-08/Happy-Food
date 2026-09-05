"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedAddToCartButton from "./AnimatedAddToCartButton";
import RollingBottle3D from "./RollingBottle3D";

const products = [
  {
    id: 1,
    title: "Classic Mixed Fruit Jam",
    subtitle: "MIXED FRUIT",
    description: "A perfect blend of fresh tropical and berry fruits. Sweet, tangy, and absolutely delightful on morning toast.",
    price: "₹199",
    color: "#fecaca", // red-200
    accent: "text-red-600",
    bgAccent: "bg-red-600",
    image: "/images/ca1.png",
    modelUrl: "/3d3/Classic-Mixed-Fruit-Jam.glb",
    rating: "4.8",
    reviews: "1.2k",
    tags: ["Real Fruits", "No Preservatives", "Vegan"],
  },
  {
    id: 2,
    title: "Extra Crunchy Peanut Butter",
    subtitle: "PEANUT",
    description: "Made with 100% premium Saurashtra peanuts. High protein, no added sugar, and packed with crunchy goodness.",
    price: "₹299",
    color: "#fed7aa", // orange-200
    accent: "text-orange-600",
    bgAccent: "bg-orange-600",
    image: "/images/ca2.png",
    modelUrl: "/3d3/Extra-Crunchy-Peanut-Butter.glb",
    rating: "4.9",
    reviews: "3.5k",
    tags: ["High Protein", "0g Added Sugar", "Gluten-Free"],
  },
  {
    id: 3,
    title: "Spicy Mango Pickle",
    subtitle: "MANGO",
    description: "Traditional grandmother's recipe using sun-ripened mangoes and authentic hand-ground Indian spices.",
    price: "₹149",
    color: "#bbf7d0", // green-200
    accent: "text-green-700",
    bgAccent: "bg-green-700",
    image: "/images/ca3.png",
    modelUrl: "/3d3/mango-pickle.glb",
    rating: "4.7",
    reviews: "890",
    tags: ["Authentic Recipe", "Sun-Ripened", "Hand-Ground Spices"],
  },
  {
    id: 4,
    title: "Dark Choc Peanut Butter",
    subtitle: "DARK CHOC",
    description: "Decadent dark chocolate mixed with our smooth peanut butter. The ultimate guilt-free dessert spread.",
    price: "₹349",
    color: "#fed7aa", // amber-200
    accent: "text-amber-800",
    bgAccent: "bg-amber-800",
    image: "/images/c4.png",
    modelUrl: "/3d3/peanut-butter-choco.glb",
    rating: "4.9",
    reviews: "4.1k",
    tags: ["Rich Cocoa", "High Protein", "No Palm Oil"],
  },
  {
    id: 5,
    title: "Happy Strawberry Jam",
    subtitle: "STRAWBERRY",
    description: "Made with real farm-fresh strawberries. A sweet, delightful spread perfect for your morning toast or desserts.",
    price: "₹189",
    color: "#fbcfe8", // pink-200
    accent: "text-pink-600",
    bgAccent: "bg-pink-600",
    image: "/images/strawberry-jam.png",
    modelUrl: "/3d3/Happy-Strawberry-Jam.glb",
    rating: "4.8",
    reviews: "2.2k",
    tags: ["Farm Fresh", "100% Organic", "Kid's Favorite"],
  },
];

export default function BestsellersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 === products.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const activeProduct = products[currentIndex];

  const textVariants = {
    enter: (direction: number) => ({
      y: 50,
      opacity: 0,
      filter: "blur(10px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      y: -50,
      opacity: 0,
      filter: "blur(10px)",
    }),
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: activeProduct.color }}
    >

      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <AnimatePresence mode="popLayout">
          <motion.h1
            key={activeProduct.id}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -100 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-[15vw] leading-none text-white/30 whitespace-nowrap tracking-tighter will-change-transform"
          >
            {activeProduct.subtitle}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* R3F Persistent Canvas Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <RollingBottle3D currentIndex={currentIndex} direction={direction} activeProduct={activeProduct} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full h-[700px] flex items-center perspective-[2000px]">

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 h-full justify-center  absolute inset-0 will-change-transform"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) nextSlide();
              else if (swipe > 10000) prevSlide();
            }}
          >

            {/* 3D Image Container Placeholder */}
            {/* Maintains layout for Flexbox while the actual 3D bottle is rendered via R3F in the background */}
            <div className="w-full lg:w-[45%] h-[300px] lg:h-[500px] relative flex items-center justify-center pointer-events-none">
              {/* Floating Price Sticker */}
              <motion.div
                key={`price-${activeProduct.id}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -8, 0], // Continuous float
                }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  type: "spring",
                  bounce: 0.6,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.0
                  }
                }}
                className="absolute top-10 right-10 lg:top-16 lg:right-16 w-24 h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center z-20 pointer-events-auto will-change-transform"
              >
                {/* Red Jagged SVG Background */}
                <svg className="absolute inset-0 w-full h-full text-[#dc2626] drop-shadow-[0_10px_25px_rgba(220,38,38,0.5)]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 L57 9 L68 5 L73 15 L84 14 L86 25 L97 27 L95 38 L100 48 L93 57 L97 68 L86 72 L84 83 L73 83 L68 93 L57 89 L50 98 L43 89 L32 93 L27 83 L16 83 L14 72 L3 68 L7 57 L0 48 L5 38 L3 27 L14 25 L16 14 L27 15 L32 5 L43 9 Z" />
                </svg>

                {/* Text Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-white text-center transform -rotate-3 mt-1">
                  <span className="text-[10px] lg:text-[12px] font-black leading-none tracking-widest drop-shadow-sm uppercase">ONLY</span>
                  <span className="text-[22px] lg:text-[32px] font-black leading-none drop-shadow-sm my-0.5">{activeProduct.price}</span>
                </div>
              </motion.div>
            </div>

            {/* Typography & Actions */}
            <div className="w-full lg:w-[50%] flex flex-col justify-center text-center lg:text-left px-4 lg:px-0">

              <motion.div
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start flex-wrap w-full max-w-xl mx-auto lg:mx-0">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] text-white shadow-lg ${activeProduct.bgAccent}`}>
                    BESTSELLER
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/40 text-brand-charcoal text-xs font-bold tracking-wider backdrop-blur-md border border-white/50 flex items-center gap-1.5 shadow-sm">
                    <Star size={14} className="fill-amber-400 text-amber-400" /> {activeProduct.rating} ({activeProduct.reviews} reviews)
                  </span>
                  <span className="text-brand-charcoal/60 font-bold tracking-widest text-sm ml-auto">
                    0{activeProduct.id} — 0{products.length}
                  </span>
                </div>
              </motion.div>

              <motion.h3
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-display text-5xl lg:text-7xl font-black text-brand-charcoal mb-4 leading-[1.05] tracking-tight drop-shadow-sm"
              >
                {activeProduct.title}
              </motion.h3>

              <motion.div
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start"
              >
                {activeProduct.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] uppercase tracking-wider font-bold text-brand-charcoal/70 bg-black/5 px-3 py-1 rounded-full border border-black/10 shadow-sm">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.p
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="text-lg lg:text-xl text-brand-charcoal/80 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
              >
                {activeProduct.description}
              </motion.p>

              <motion.div
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <AnimatedAddToCartButton bgAccent={activeProduct.bgAccent} />
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/70 backdrop-blur-md text-brand-charcoal font-bold text-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] active:scale-95 group border border-white/50">
                  View Details
                  <ArrowRight size={20} className="transform transition-transform group-hover:translate-x-2" />
                </button>
              </motion.div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Navigation & Progress */}
      <div className="absolute bottom-8 lg:bottom-12 left-0 right-0 z-20 flex justify-center">
        <div className="flex items-center gap-4 bg-white/40 backdrop-blur-lg p-2.5 rounded-full border border-white/50 shadow-xl">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-brand-charcoal hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2.5 px-2">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => {
                  if (index === currentIndex) return;
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-1.5 rounded-full relative overflow-hidden transition-all duration-500 cursor-pointer ${index === currentIndex ? "w-10 sm:w-12 bg-black/10" : "w-2 sm:w-2 bg-black/20 hover:bg-black/30"}`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    className={`absolute top-0 left-0 h-full ${activeProduct.bgAccent}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    key={`progress-${currentIndex}`}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-brand-charcoal hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

    </section>
  );
}
