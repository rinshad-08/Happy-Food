"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "../lib/products";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(q) || product.subtitle.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] bg-brand-charcoal/60 backdrop-blur-sm flex items-start justify-center px-6 pt-28 sm:pt-36"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <Search size={20} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for jams, peanut butters, pickles..."
                className="flex-1 outline-none text-base text-brand-charcoal placeholder:text-gray-400"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="text-gray-400 hover:text-brand-charcoal transition-colors cursor-pointer shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim() === "" ? (
                <p className="text-center text-sm text-gray-400 py-10 px-6">
                  Start typing to search our products.
                </p>
              ) : results.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-10 px-6">
                  No products found for &ldquo;{query}&rdquo;.
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="relative w-14 h-14 shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-semibold text-sm text-brand-charcoal truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-gray-500">{product.subtitle}</p>
                        </div>
                        <span className="font-bold text-sm text-brand-charcoal shrink-0">
                          {product.price}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
