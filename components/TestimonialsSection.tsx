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
    bgColor: "bg-orange-100",
    color: "text-orange-700",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Fitness Enthusiast",
    content: "Finally found a peanut butter that's truly crunchy and has no added sugar. It's been a game-changer for my post-workout smoothies. Premium quality you can actually taste.",
    avatar: "RV",
    bgColor: "bg-blue-100",
    color: "text-blue-700",
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Home Chef",
    content: "The Mango Pickle is simply divine! It has that authentic, traditional flavor that's so hard to find in store-bought pickles these days. It pairs perfectly with hot parathas.",
    avatar: "AD",
    bgColor: "bg-green-100",
    color: "text-green-700",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-[#1a1a1a] relative overflow-hidden" id="testimonials">
      
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 flex flex-col relative group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
                <Quote size={64} className="rotate-180" />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Content */}
              <p className="text-gray-700 font-medium text-lg md:text-xl leading-relaxed mb-10 relative z-10 grow">
                "{testimonial.content}"
              </p>

              {/* Customer Profile */}
              <div className="flex items-center gap-4 mt-auto relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${testimonial.bgColor} ${testimonial.color}`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-none mb-1">{testimonial.name}</h4>
                  <p className="text-sm font-medium text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
