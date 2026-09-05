"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, ChevronRight, Truck, Leaf, ShieldCheck, Star, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { allProducts } from "../../../lib/products";
import ProductCardAddToCart from "../../../components/ProductCardAddToCart";
import { useCart } from "../../../lib/cart-context";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = allProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();

  const [wishlisted, setWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="font-display text-3xl font-bold text-black mb-3">Product not found</h1>
        <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or may have been removed.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white font-semibold text-sm hover:bg-black transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </main>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f8faf9] pb-24">
      <div className="container mx-auto px-6 lg:px-12 pt-16 mt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-10">
          <Link href="/" className="hover:text-black transition-colors cursor-pointer">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-black transition-colors cursor-pointer">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center h-[26rem] lg:h-[32rem]"
          >
            <div className="relative w-full h-full p-10">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain drop-shadow-xl"
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
              />
            </div>
            <button
              onClick={() => setWishlisted((prev) => !prev)}
              aria-label="Add to wishlist"
              className="absolute top-6 right-6 p-3 rounded-full bg-white/90 backdrop-blur shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <Heart size={20} className={wishlisted ? "fill-red-500 text-red-500" : ""} />
            </button>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-sm font-semibold text-brand-orange uppercase tracking-wide mb-3">
              {product.subtitle}
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews.toLocaleString("en-IN")} reviews)</span>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-3xl font-bold text-gray-900">{product.price}</span>
              <span className="text-base font-medium text-gray-500">/ {product.unit}</span>
            </div>

            <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg">
              Made with 100% natural ingredients and no artificial preservatives, {product.title.toLowerCase()} brings authentic, home-style taste to your table — crafted in small batches to lock in freshness and flavor in every jar.
            </p>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-full px-3 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="flex-1 h-14">
                <ProductCardAddToCart
                  onAdd={() => {
                    addToCart(product.id, quantity);
                    setQuantity(1);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Leaf size={20} className="text-brand-green shrink-0" />
                <span className="text-sm font-medium text-gray-600">100% Natural</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-brand-green shrink-0" />
                <span className="text-sm font-medium text-gray-600">No Preservatives</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-brand-green shrink-0" />
                <span className="text-sm font-medium text-gray-600">Fast Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-200">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-black tracking-tight mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="group bg-white rounded-3xl p-5 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-full h-32 sm:h-40 mb-4">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-gray-900 mb-1 leading-tight line-clamp-2">
                    {related.title}
                  </h3>
                  <span className="font-bold text-sm text-gray-900">{related.price}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
