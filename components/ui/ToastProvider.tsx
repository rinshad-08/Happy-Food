"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { ToastEventDetail } from "@/lib/toast";

export default function ToastProvider() {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: string }[]>([]);

  useEffect(() => {
    const handleAddToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastEventDetail>;
      const { message, type = "success" } = customEvent.detail;
      const id = Date.now();
      
      setToasts((prev) => [...prev, { id, message, type }]);

      // Auto dismiss after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    document.addEventListener("show-toast", handleAddToast);
    return () => document.removeEventListener("show-toast", handleAddToast);
  }, []);

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto flex items-center gap-3 px-5 py-3.5 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-white/50"
          >
            <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0">
              <Check size={18} strokeWidth={3} />
            </div>
            <span className="text-brand-charcoal font-semibold text-sm mr-2">{toast.message}</span>
            <button 
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
