"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Basic controlled form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request for the UI (Replace this with actual API call later)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Optional: Reset form after a few seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 5000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-brand-charcoal/5 border border-black/[0.03] h-full flex flex-col"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold text-brand-charcoal mb-2">Send us a Message</h3>
        <p className="text-brand-charcoal/70 text-base">We'd love to hear from you. Fill out the form below.</p>
      </div>

      <div className="relative overflow-hidden min-h-[350px]">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-bold text-brand-charcoal ml-1">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-5 py-3 rounded-xl bg-brand-cream/50 border border-black/5 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all duration-300 text-brand-charcoal text-sm"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-bold text-brand-charcoal ml-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-5 py-3 rounded-xl bg-brand-cream/50 border border-black/5 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all duration-300 text-brand-charcoal text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-sm font-bold text-brand-charcoal ml-1">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-5 py-3 rounded-xl bg-brand-cream/50 border border-black/5 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all duration-300 text-brand-charcoal text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-bold text-brand-charcoal ml-1">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your enquiry..."
                  className="w-full px-5 py-3 rounded-xl bg-brand-cream/50 border border-black/5 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all duration-300 text-brand-charcoal resize-none text-sm"
                />
              </div>

              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="relative w-full md:w-auto px-8 py-3.5 mt-2 rounded-xl bg-brand-orange text-white font-bold text-base flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/40 transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Sleek color sweep overlay */}
                <motion.div 
                  className="absolute inset-0 bg-black/15 origin-left"
                  initial={{ scaleX: 0 }}
                  variants={{ hover: { scaleX: 1 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin relative z-10" size={18} />
                    <span className="relative z-10">Sending...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <motion.div
                      variants={{
                        hover: { x: 4, y: -4, rotate: 10 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="relative z-10"
                    >
                      <Send size={16} />
                    </motion.div>
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-brand-green/5 rounded-[2rem] border border-brand-green/10"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-brand-green text-white flex items-center justify-center mb-5 shadow-lg shadow-brand-green/20"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              <h4 className="text-2xl font-display font-bold text-brand-charcoal mb-2">Thanks for reaching out!</h4>
              <p className="text-brand-charcoal/70 text-base max-w-sm mx-auto">
                Your message is on its way to the Happy Food team. 🍓 <br/>We'll get back to you shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
