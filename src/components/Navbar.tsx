"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Odbornosť", href: "#expertise" },
  { name: "Služby", href: "#services" },
  { name: "Cenník", href: "#pricing" },
  { name: "Kontakt", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsOverWhiteSection(entry.target.classList.contains("bg-white"));
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".bg-white").forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "py-4 bg-black/80 backdrop-blur-lg border-b border-white/[0.08]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center overflow-hidden border border-white/20 relative">
                  <Image
                    src="/logo.png"
                    alt="KTA Logo"
                    width={32}
                    height={32}
                    className="relative z-10"
                  />
                  {/* Animated scanner line */}
                  <motion.div
                    className="absolute w-full h-[1px] bg-[#0B63F8]/30"
                    animate={{
                      top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
                <motion.div className="absolute -inset-[2px] bg-white/20 blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-white tracking-wider">
                  KTA
                </span>
                <span className="text-[10px] text-white/70 tracking-[0.2em] uppercase">
                  Kybernetická Technická Asociácia
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative group py-2 ${
                    isOverWhiteSection
                      ? "text-black/60 hover:text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="text-[15px] text-white/80 group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0B63F8] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1, ease: "easeOut" },
                }}
                className="hidden md:flex px-6 py-2.5 text-black bg-white hover:bg-white/90 relative group"
              >
                {/* Button content */}
                <span className="relative z-10 text-[15px] font-medium flex items-center">
                  <span>Získať Prístup</span>
                  <motion.span
                    className="ml-2 text-[#0B63F8]"
                    animate={{
                      x: [0, 3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 text-white/90 group overflow-hidden"
              >
                {/* Animated hamburger lines with better positioning and transitions */}
                <div className="relative w-5 h-3.5 flex flex-col justify-between">
                  <motion.div
                    animate={
                      mobileMenuOpen
                        ? {
                            rotate: 45,
                            y: 6,
                            width: "100%",
                            backgroundColor: "#fff",
                          }
                        : {
                            rotate: 0,
                            y: 0,
                            width: "100%",
                            backgroundColor: "currentColor",
                          }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-0.5 bg-current origin-center rounded-full"
                  />
                  <motion.div
                    animate={
                      mobileMenuOpen
                        ? {
                            opacity: 0,
                            x: -10,
                            backgroundColor: "#fff",
                          }
                        : {
                            opacity: 1,
                            x: 0,
                            backgroundColor: "currentColor",
                          }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-0.5 bg-current w-3/4 rounded-full"
                  />
                  <motion.div
                    animate={
                      mobileMenuOpen
                        ? {
                            rotate: -45,
                            y: -6,
                            width: "100%",
                            backgroundColor: "#fff",
                          }
                        : {
                            rotate: 0,
                            y: 0,
                            width: "85%",
                            backgroundColor: "currentColor",
                          }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-0.5 bg-current rounded-full"
                  />
                </div>

                {/* Hover effect - subtle glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    boxShadow: [
                      "0 0 0 1px rgba(11,99,248,0.2) inset",
                      "0 0 0 2px rgba(11,99,248,0.3) inset",
                      "0 0 0 1px rgba(11,99,248,0.2) inset",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Animated corner accents */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 border-[#0B63F8]/40 transition-colors duration-300 group-hover:border-[#0B63F8]/60 ${
                      i === 0
                        ? "top-0 left-0 border-t border-l"
                        : i === 1
                        ? "top-0 right-0 border-t border-r"
                        : i === 2
                        ? "bottom-0 left-0 border-b border-l"
                        : "bottom-0 right-0 border-b border-r"
                    }`}
                    animate={{
                      opacity: mobileMenuOpen ? [0.8, 1, 0.8] : [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-0 overflow-hidden opacity-20"
                  animate={{
                    backgroundPosition: ["0% 0%", "0% 100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 0%, #0B63F8 50%, transparent 100%)",
                    backgroundSize: "100% 200%",
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom border with scanning effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B63F8]/50 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-[73px] p-6 bg-black/95 backdrop-blur-xl border-b border-[#0B63F8]/10 md:hidden z-40"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-white/80 hover:text-white py-2 transition-colors duration-200 ${"text-white"}`}
                >
                  {item.name}
                </Link>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMobileMenuOpen(false)}
                className={`mt-4 w-full py-3 px-4 bg-[#0B63F8]/10 hover:bg-[#0B63F8]/20 rounded border border-[#0B63F8]/20 text-white transition-colors duration-200 ${"bg-white text-black"}`}
              >
                Získať Prístup
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
