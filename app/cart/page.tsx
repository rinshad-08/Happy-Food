"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "../../lib/products";
import { useCart } from "../../lib/cart-context";

const parsePrice = (price: string) => Number(price.replace(/[^0-9.]/g, "")) || 0;

export default function CartPage() {
  const { items, increment, decrement, removeFromCart } = useCart();

  const cartProducts = items
    .map((item) => {
      const product = allProducts.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const subtotal = cartProducts.reduce((sum, p) => sum + parsePrice(p.price) * p.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 500 ? 49 : 0;
  const total = subtotal + shipping;

  if (cartProducts.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="w-20 h-20 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-300" />
        </div>
        <h1 className="font-display text-3xl font-bold text-black mb-3">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-sm">
          Looks like you haven't added anything yet. Explore our jams, peanut butters, and pickles.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white font-semibold text-sm hover:bg-black transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] pb-24">
      <div className="container mx-auto px-6 lg:px-12 pt-16 mt-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-black mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} className="mr-2" /> Continue Shopping
        </Link>

        <h1 className="font-display text-4xl lg:text-5xl font-bold text-black tracking-tight mb-10">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {cartProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <Link href={`/products/${product.id}`} className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 cursor-pointer">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain drop-shadow-md"
                      sizes="96px"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 text-left">
                    <Link href={`/products/${product.id}`} className="cursor-pointer">
                      <h3 className="font-display font-semibold text-gray-900 truncate hover:text-brand-orange transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-2">{product.subtitle}</p>
                    <span className="font-bold text-gray-900">{product.price}</span>
                    <span className="text-xs text-gray-500"> / {product.unit}</span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1.5 shrink-0">
                    <button
                      onClick={() => decrement(product.id)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">{product.quantity}</span>
                    <button
                      onClick={() => increment(product.id)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Line Total (desktop) */}
                  <span className="hidden sm:block w-20 text-right font-bold text-gray-900 shrink-0">
                    ₹{(parsePrice(product.price) * product.quantity).toLocaleString("en-IN")}
                  </span>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove item"
                    className="text-gray-300 hover:text-red-500 transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            layout
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:sticky lg:top-28"
          >
            <h2 className="font-display text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="flex flex-col gap-3 text-sm mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-brand-orange">
                  Add ₹{(500 - subtotal).toLocaleString("en-IN")} more for free shipping
                </p>
              )}
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-gray-100 mb-6">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString("en-IN")}</span>
            </div>

            <button className="w-full py-4 rounded-full bg-[#1a1a1a] hover:bg-black text-white font-semibold text-sm shadow-md transition-colors active:scale-95 cursor-pointer">
              Proceed to Checkout
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
