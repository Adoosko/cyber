"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative py-8 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,99,248,0.03),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center"
        >
          <p className="text-white/60 text-sm">
            © 2024 PHOTON Bezpečnosť. Všetky práva vyhradené.
          </p>
          <p className="text-white/40 text-sm mt-2">
            Vytvoril{" "}
            <a
              href="https://github.com/adrianfinik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Adrián Finik
            </a>
          </p>
        </motion.div>
      </div>

      {/* Bottom border with scanning effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B63F8]/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </footer>
  );
};

export default Footer;
