"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Food Blogger",
    content: "The Classic Mixed Fruit Jam takes me straight back to my childhood. The perfect balance of sweet and tangy, without any artificial aftertaste. Absolutely love it on my morning toast!",
    avatar: "PS",
    accent: "hover:border-orange-400",
    accentText: "text-orange-400",
    accentBg: "bg-orange-400/10",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Fitness Enthusiast",
    content: "Finally found a peanut butter that's truly crunchy and has no added sugar. Premium quality you can actually taste.",
    avatar: "RV",
    accent: "hover:border-blue-400",
    accentText: "text-blue-400",
    accentBg: "bg-blue-400/10",
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Home Chef",
    content: "The Mango Pickle is simply divine! It has that authentic, traditional flavor that's so hard to find in store-bought pickles these days. It pairs perfectly with hot parathas.",
    avatar: "AD",
    accent: "hover:border-emerald-400",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-400/10",
  },
  {
    id: 4,
    name: "Karan Mehta",
    role: "New Dad",
    content: "No preservatives, no nasties — exactly what I look for now that I'm reading every label. My toddler loves it too.",
    avatar: "KM",
    accent: "hover:border-rose-400",
    accentText: "text-rose-400",
    accentBg: "bg-rose-400/10",
  },
  {
    id: 5,
    name: "Sneha Iyer",
    role: "Nutritionist",
    content: "I recommend the No Added Sugar Peanut Butter to my clients all the time. Great macros, honest ingredient list, and it actually tastes good — rare combination.",
    avatar: "SI",
    accent: "hover:border-amber-400",
    accentText: "text-amber-400",
    accentBg: "bg-amber-400/10",
  },
  {
    id: 6,
    name: "Farhan Ali",
    role: "College Student",
    content: "The combo packs are a lifesaver for hostel life. Great value and every jar tastes homemade.",
    avatar: "FA",
    accent: "hover:border-violet-400",
    accentText: "text-violet-400",
    accentBg: "bg-violet-400/10",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden" id="testimonials">
      {/* Decorative Background blur */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">Loved by Thousands</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-2xl leading-tight"
          >
            Don't just take our word for it.
          </motion.h2>
        </div>

        {/* Wall of Love — editorial blockquotes */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-12 [column-fill:_balance]">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className={`group break-inside-avoid mb-12 pl-6 border-l-2 border-white/10 ${t.accent} transition-colors duration-300`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="font-display text-lg text-white/85 leading-relaxed mb-6">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.accentBg} flex items-center justify-center font-bold text-xs ${t.accentText} shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm leading-none mb-1">{t.name}</h4>
                  <p className="text-xs font-medium text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
