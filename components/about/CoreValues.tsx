"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Zap, Globe } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No artificial anything. If we can't pronounce it, we don't use it. Nature provides the best ingredients.",
    color: "bg-green-100",
    iconColor: "text-brand-green"
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every recipe is crafted with care, tested hundreds of times to ensure maximum flavor and nutritional value.",
    color: "bg-red-100",
    iconColor: "text-red-500"
  },
  {
    icon: Zap,
    title: "Energy Boosting",
    description: "Our foods are designed to give you sustained, clean energy throughout the day without the crash.",
    color: "bg-orange-100",
    iconColor: "text-brand-orange"
  },
  {
    icon: Globe,
    title: "Planet Friendly",
    description: "From sustainable sourcing to eco-friendly packaging, we care about the Earth as much as we care about you.",
    color: "bg-blue-100",
    iconColor: "text-blue-500"
  }
];

export default function CoreValues() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } as const;

  return (
    <section className="py-24 md:py-32 bg-brand-cream relative z-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal mb-4">
              What We <span className="text-brand-green">Stand For</span>
            </h2>
            <p className="text-lg text-brand-charcoal/70 max-w-2xl mx-auto">
              These aren't just words on a wall. These are the principles that guide every decision we make.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 relative group overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-6 relative z-10`}>
                <value.icon className={`w-7 h-7 ${value.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-bold text-brand-charcoal mb-4 relative z-10">{value.title}</h3>
              <p className="text-brand-charcoal/70 leading-relaxed relative z-10">
                {value.description}
              </p>

              {/* Decorative hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
