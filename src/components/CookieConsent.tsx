"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50"
        >
          <div className="p-6 rounded-2xl bg-white/[0.05] backdrop-blur-lg border border-white/[0.08] shadow-xl">
            <p className="text-white/80 text-sm mb-4">
              Táto stránka používa cookies na zlepšenie používateľského zážitku.
              Používame len nevyhnutné cookies pre základné fungovanie stránky.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0B63F8]/20 hover:bg-[#0B63F8]/30 rounded-lg border border-[#0B63F8]/30 transition-colors"
              >
                Rozumiem
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
