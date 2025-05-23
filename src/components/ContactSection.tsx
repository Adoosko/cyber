"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

interface ContactInfo {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: "Telefón",
    value: "+421 903 123 456",
    color: "#00A3FF",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@cybersecurity.sk",
    color: "#FF4D4D",
  },
  {
    icon: MapPin,
    title: "Adresa",
    value: "Hlavná 123, 831 01 Bratislava",
    color: "#A855F7",
  },
];

const ContactInfoCard = ({ icon: Icon, title, value, color }: ContactInfo) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08]"
  >
    <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}10` }}>
      <Icon className="w-6 h-6" style={{ color }} />
    </div>
    <div>
      <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
      <p className="text-white/60">{value}</p>
    </div>
  </motion.div>
);

export const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24 bg-black overflow-hidden">
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

        {/* Radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,163,255,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.03),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Column - Contact Form */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] backdrop-blur-sm mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#00A3FF]" />
              <span className="text-sm text-white">Kontaktujte Nás</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Poďme Spolu Chrániť Vašu Digitálnu Budúcnosť
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-white/60 mb-12"
            >
              Vyplňte formulár a náš tím vás bude kontaktovať do 24 hodín s
              personalizovaným riešením pre vaše potreby.
            </motion.p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <label
                    className="block text-white/80 mb-2 text-sm"
                    htmlFor="name"
                  >
                    Meno a Priezvisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-colors"
                    placeholder="Zadajte vaše meno"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <label
                    className="block text-white/80 mb-2 text-sm"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-colors"
                    placeholder="vas@email.sk"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <label
                  className="block text-white/80 mb-2 text-sm"
                  htmlFor="subject"
                >
                  Predmet
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-colors"
                  placeholder="Téma vašej správy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <label
                  className="block text-white/80 mb-2 text-sm"
                  htmlFor="message"
                >
                  Správa
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-colors resize-none"
                  placeholder="Napíšte vašu správu..."
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                type="submit"
                className="w-full md:w-auto px-8 py-4 rounded-lg bg-[#00A3FF] text-white font-medium hover:bg-[#0082CC] transition-colors"
              >
                Odoslať Správu
              </motion.button>
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:w-[400px] space-y-6">
            {contactInfo.map((info) => (
              <ContactInfoCard key={info.title} {...info} />
            ))}

            {/* Map or Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] aspect-video"
            >
              <div className="w-full h-full rounded-lg bg-black/30 flex items-center justify-center">
                <span className="text-white/40">
                  Mapa bude čoskoro dostupná
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
