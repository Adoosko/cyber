"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export const FloatingContactButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@kta.sk";
  const contactPhone =
    process.env.NEXT_PUBLIC_CONTACT_PHONE || "+421 903 123 456";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonBaseStyle =
    "w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 relative overflow-hidden transition-all duration-300";

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 md:hidden">
          {/* Phone Button */}
          <motion.a
            href={`tel:${contactPhone}`}
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 100 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`${buttonBaseStyle} bg-[#1a1a1a]/80 hover:bg-[#0B63F8]/90 hover:border-[#0B63F8]/30`}
          >
            <Phone className="w-5 h-5 text-white/90" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          {/* Email Button */}
          <motion.a
            href={`mailto:${contactEmail}`}
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 100 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.1 }}
            className={`${buttonBaseStyle} bg-[#1a1a1a]/80 hover:bg-[#0B63F8]/90 hover:border-[#0B63F8]/30`}
          >
            <Mail className="w-5 h-5 text-white/90" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
};
