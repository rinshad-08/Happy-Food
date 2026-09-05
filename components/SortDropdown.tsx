"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export interface SortOption<T extends string> {
  value: T;
  label: string;
}

export default function SortDropdown<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly SortOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-3 min-w-[200px] px-5 py-2.5 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected?.label}
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="absolute right-0 z-40 mt-2 w-full min-w-[220px] bg-white rounded-2xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] border border-gray-100 p-1.5 overflow-hidden"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-brand-orange/10 text-brand-orange"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                    {isSelected && <Check size={15} className="shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
