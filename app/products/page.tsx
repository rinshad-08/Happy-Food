"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "../../lib/products";
import ProductCardAddToCart from "../../components/ProductCardAddToCart";
import { useCart } from "../../lib/cart-context";
import SortDropdown from "../../components/SortDropdown";

const CATEGORIES = ["All", "Jam", "Peanut Butter", "Pickle", "Combo Pack"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const parsePrice = (price: string) => Number(price.replace(/[^0-9.]/g, "")) || 0;

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortValue>("featured");

  const toggleWishlist = (id: number) => setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));

  const visibleProducts = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? allProducts
        : allProducts.filter((product) => product.category === activeCategory);

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return filtered;
  }, [activeCategory, sortBy]);

  return (
    <main className="min-h-screen bg-[#f8faf9] pb-24 relative overflow-hidden">
      {/* Floating Ingredients Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8faf9] opacity-70">
        {[
          { emoji: "🍓", size: "text-6xl", top: "5%", left: "5%", delay: 0, duration: 20 },
          { emoji: "🥜", size: "text-8xl", top: "30%", left: "80%", delay: 2, duration: 25 },
          { emoji: "🥭", size: "text-7xl", top: "60%", left: "15%", delay: 5, duration: 22 },
          { emoji: "🍫", size: "text-5xl", top: "15%", left: "60%", delay: 1, duration: 18 },
          { emoji: "🍇", size: "text-7xl", top: "80%", left: "70%", delay: 4, duration: 24 },
          { emoji: "🍓", size: "text-5xl", top: "45%", left: "30%", delay: 3, duration: 21 },
          { emoji: "🥜", size: "text-6xl", top: "10%", left: "90%", delay: 6, duration: 19 },
          { emoji: "🥭", size: "text-8xl", top: "90%", left: "40%", delay: 2, duration: 26 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} opacity-[0.08] pointer-events-none select-none drop-shadow-sm`}
            style={{ top: item.top, left: item.left }}
            animate={{ y: [0, -100, 0], rotate: [0, 45, -45, 0], x: [0, 50, -50, 0] }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div className=" mt-8">
            <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-black mb-4 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight">
              All Products
            </h1>
            <p className="text-gray-500 mt-3 text-lg font-medium max-w-xl">
              Discover our complete range of 100% natural, incredibly delicious jams and protein-packed peanut butters.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  activeCategory === category
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <SortDropdown options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
        </div>

        <p className="text-sm text-gray-500 font-medium mb-6">
          Showing {visibleProducts.length} of {allProducts.length} products
        </p>

        {/* Product Grid */}
        {visibleProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-24">No products found in this category.</p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {visibleProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white rounded-[2rem] p-6 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 relative group"
              >
                {/* Product Image */}
                <div className="relative w-full h-56 mb-6 flex items-center justify-center">
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
                    className="absolute top-0 right-0 p-2.5 rounded-full bg-white/90 backdrop-blur shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all z-30 cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} className={wishlist[product.id] ? "fill-red-500 text-red-500" : ""} />
                  </button>
                </div>

                {/* Product Info */}
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-1 leading-tight">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-500 font-medium mb-2">
                  {product.subtitle}
                </p>

                <div className="flex items-center justify-center gap-1.5 mb-4">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews.toLocaleString("en-IN")})</span>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    / {product.unit}
                  </span>
                </div>

                {/* Add to Cart + View More Buttons */}
                <div className="w-full mt-auto h-12 relative z-30 flex items-center gap-0 group-hover:gap-2 transition-all duration-300">
                  <div className="flex-1 h-full min-w-0">
                    <ProductCardAddToCart onAdd={() => addToCart(product.id)} />
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
        )}
      </div>
    </main>
  );
}
