"use client";

import { usePricing } from "@/context/PricingContext";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import Script from "next/script";
import { useEffect, useState } from "react";

// Update the type definition for reCAPTCHA v2
declare global {
  interface Window {
    grecaptcha: {
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      render: (container: string | HTMLElement, parameters: object) => number;
    };
  }
}

interface ContactInfo {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
}

const contactInfo: ContactInfo[] = [
  // {
  //   icon: Phone,
  //   title: "Telefón",
  //   value: "+421 903 123 456",
  //   color: "#00A3FF",
  // },
  {
    icon: Mail,
    title: "Email",
    value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@kta.sk",
    color: "#FF4D4D",
  },
  {
    icon: MapPin,
    title: "Adresa",
    value: "Smolenická 3135/3 851 05 Bratislava",
    color: "#A855F7",
  },
];

const ContactInfoCard = ({ icon: Icon, title, value, color }: ContactInfo) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.08] transition-colors group"
  >
    <div
      className="p-3 rounded-xl transition-colors"
      style={{
        backgroundColor: `${color}10`,
        transition: "background-color 0.3s ease",
      }}
    >
      <Icon
        className="w-6 h-6 transition-transform group-hover:scale-110"
        style={{ color }}
      />
    </div>
    <div>
      <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
      <p className="text-white/60 group-hover:text-white/80 transition-colors">
        {value}
      </p>
    </div>
  </motion.div>
);

export const ContactSection = () => {
  const { selectedPlan } = usePricing();
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedPlan) {
      setSubject(`Záujem o balík: ${selectedPlan}`);
    }
  }, [selectedPlan]);

  const handleRecaptchaLoad = () => {
    try {
      // Verify that we have the site key
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        throw new Error("reCAPTCHA site key is not configured");
      }

      setIsRecaptchaLoaded(true);
      setRecaptchaError(null);
      console.log("✅ reCAPTCHA loaded successfully");
    } catch (error) {
      console.error("❌ reCAPTCHA initialization error:", error);
      setRecaptchaError(
        error instanceof Error
          ? error.message
          : "Failed to initialize reCAPTCHA"
      );
    }
  };

  const handleRecaptchaError = () => {
    setRecaptchaError(
      "Failed to load reCAPTCHA. Please refresh the page and try again."
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      console.log("🔄 Starting form submission...");

      if (!isRecaptchaLoaded) {
        throw new Error("reCAPTCHA not loaded yet");
      }

      const token = window.grecaptcha.getResponse();

      if (!token) {
        setFormError("Prosím, potvrďte že nie ste robot.");
        return;
      }

      console.log("🔄 Verifying reCAPTCHA...");
      const verifyResponse = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const verifyData = await verifyResponse.json();
      console.log("📊 Verification result:", verifyData);

      if (!verifyData.success) {
        setFormError(
          "Nepodarilo sa overiť, že nie ste robot. Skúste to znova."
        );
        window.grecaptcha.reset();
        return;
      }

      console.log("✅ reCAPTCHA verification successful");
      console.log("🔄 Proceeding with email...");

      // Create email content
      const emailSubject = encodeURIComponent(
        subject || "Kontaktný formulár KTA"
      );
      const emailBody = encodeURIComponent(message);
      const contactEmail =
        process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@kta.sk";

      // Create URLs for different email clients
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${emailSubject}&body=${emailBody}`;
      const mailtoUrl = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;

      // Show email client selection dialog
      const clientChoice = window.confirm(
        "Chcete otvoriť Gmail? Kliknite 'OK' pre Gmail alebo 'Zrušiť' pre predvolený emailový klient."
      );

      if (clientChoice) {
        window.open(gmailUrl, "_blank");
      } else {
        window.location.href = mailtoUrl;
      }

      // Reset form after successful submission
      setMessage("");
      window.grecaptcha.reset();
    } catch (error) {
      console.error("❌ Form submission error:", error);
      setFormError("Nastala chyba pri odosielaní. Skúste to znova neskôr.");
      if (isRecaptchaLoaded) {
        window.grecaptcha.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug output for development
  useEffect(() => {
    console.log(
      "Current reCAPTCHA site key:",
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    );
  }, []);

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?hl=sk`}
        onLoad={handleRecaptchaLoad}
        onError={handleRecaptchaError}
        strategy="afterInteractive"
      />

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
                Napíšte nám správu a my vás budeme kontaktovať do 24 hodín.
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-colors hover:bg-white/[0.08]"
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
                    required
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-[#00A3FF] transition-colors resize-none hover:bg-white/[0.08]"
                    placeholder="Napíšte vašu správu..."
                  />
                </motion.div>

                {/* reCAPTCHA container with error handling */}
                {recaptchaError ? (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-500 text-sm">{recaptchaError}</p>
                  </div>
                ) : (
                  <div
                    className="g-recaptcha mt-4"
                    data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    data-theme="dark"
                    data-size="normal"
                  />
                )}

                {formError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {formError}
                  </motion.p>
                )}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  type="submit"
                  disabled={
                    isSubmitting || !isRecaptchaLoaded || !!recaptchaError
                  }
                  className="w-full md:w-auto px-8 py-4 rounded-lg bg-[#00A3FF] text-white font-medium hover:bg-[#0082CC] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}
                  {isSubmitting ? "Odosielam..." : "Odoslať Správu"}
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
                className="p-6 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] aspect-video hover:bg-white/[0.08] transition-colors"
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
    </>
  );
};

export default ContactSection;
