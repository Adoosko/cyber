"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@kta.sk";

  return (
    <footer className="relative py-12 overflow-hidden bg-black">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white text-lg font-semibold">O Spoločnosti</h3>
            <div className="space-y-2">
              <p className="text-white/60">KTA, s.r.o.</p>
              <p className="text-white/60">Kybernetická Technická Asociácia</p>
              <p className="text-white/60">IČO: 48058076</p>
              <p className="text-white/60">Informačné technológie</p>
              <p className="text-white/60">Bratislavský kraj</p>
              <div className="pt-2">
                <p className="text-white/60">Sídlo spoločnosti:</p>
                <p className="text-white/60">
                  Smolenická 3135/3 851 05 Bratislava
                </p>
                <p className="text-white/60">Slovenská republika</p>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white text-lg font-semibold">Služby</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#expertise"
                  className="text-white/60 hover:text-white/80 transition-colors"
                >
                  Odbornosť
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/60 hover:text-white/80 transition-colors"
                >
                  Služby
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-white/60 hover:text-white/80 transition-colors"
                >
                  Cenník
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white text-lg font-semibold">Kontakt</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#contact"
                  className="text-white/60 hover:text-white/80 transition-colors"
                >
                  Kontaktný formulár
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-white/60 hover:text-white/80 transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
              <li>
                <p className="text-white/60">
                  Ochrana osobných údajov: Vaše údaje spracúvame v súlade s GDPR
                  a používame ich len na odpoveď na vašu správu.
                </p>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10"
        >
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 KTA, s.r.o. Všetky práva vyhradené.
          </p>
          <p className="text-white/40 text-sm">
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
