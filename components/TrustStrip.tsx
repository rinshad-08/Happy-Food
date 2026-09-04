"use client";

import { motion } from "framer-motion";
import { Plane, CreditCard, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    icon: Plane,
    title: "India Wide Shipping",
    subtitle: "Fast & reliable delivery anywhere in India. Carefully packaged to ensure freshness.",
    gradient: "from-amber-400 to-orange-500",
    shadow: "hover:shadow-orange-500/20",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    delay: 0.1,
  },
  {
    icon: CreditCard,
    title: "Easy Online Payment",
    subtitle: "Seamless checkout using UPI, digital wallets, and all major credit/debit cards.",
    gradient: "from-emerald-400 to-teal-500",
    shadow: "hover:shadow-teal-500/20",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    delay: 0.2,
  },
  {
    icon: ShieldCheck,
    title: "Secured Payments",
    subtitle: "100% encrypted and safe transactions. Your privacy and security is our top priority.",
    gradient: "from-rose-400 to-red-500",
    shadow: "hover:shadow-red-500/20",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    delay: 0.3,
  },
];

export default function TrustStrip() {
  return (
    <section className="w-full bg-[#FDFBF7] text-stone-800 py-32 relative overflow-hidden">
      {/* Soft Organic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-multiply" />
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-stone-900 tracking-tight"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Happy?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-stone-600 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            Experience the finest quality jams and spreads with unmatched service, secure payments, and farm-fresh delivery.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                className={`flex flex-col items-center text-center group p-10 rounded-3xl bg-white border border-stone-200/60 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:border-stone-300 ${item.shadow} hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]`}
              >
                {/* Hover Gradient Glow inside card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                {/* Icon Container */}
                <div className="relative mb-8 mt-4">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 rounded-full`} />
                  <div className={`relative z-10 w-20 h-20 rounded-full ${item.iconBg} flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 shadow-sm border border-black/5`}>
                    <Icon size={32} className={`${item.iconColor} transition-transform duration-500 group-hover:scale-110`} strokeWidth={2} />
                  </div>
                </div>

                <h4 className="font-display font-black text-2xl lg:text-3xl text-stone-900 mb-4 tracking-tight">
                  {item.title}
                </h4>
                
                <p className="text-stone-600 font-medium text-lg leading-relaxed group-hover:text-stone-800 transition-colors duration-300">
                  {item.subtitle}
                </p>
                
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
