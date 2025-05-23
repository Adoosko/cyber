"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Základný",
    price: "199€",
    description: "Pre malé firmy a začínajúce podniky",
    features: [
      "Základný bezpečnostný audit",
      "Firewall monitoring",
      "Email ochrana",
      "24/7 základná podpora",
      "Mesačné reporty",
      "Až 5 užívateľov",
    ],
  },
  {
    name: "Business",
    price: "499€",
    description: "Pre stredné firmy s vyššími nárokmi",
    features: [
      "Pokročilý bezpečnostný audit",
      "Real-time monitoring",
      "DLP riešenie",
      "24/7 prioritná podpora",
      "Týždenné reporty",
      "Až 20 užívateľov",
      "Penetračné testovanie",
      "Incident response plán",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Na mieru",
    description: "Pre veľké spoločnosti s komplexnými potrebami",
    features: [
      "Kompletný bezpečnostný audit",
      "24/7 SOC monitoring",
      "Vlastné DLP riešenie",
      "Dedikovaný support tím",
      "Real-time reporty",
      "Neobmedzený počet užívateľov",
      "Pravidelné pen-testy",
      "Incident response tím",
      "Security awareness tréning",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/[0.02] mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-black/40" />
            <span className="text-sm text-black/80 font-medium">Cenník</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
          >
            Vyberte Si Plán
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-black/60 max-w-2xl mx-auto"
          >
            Flexibilné plány prispôsobené potrebám vašej firmy. Všetky plány
            zahŕňajú prístup k našim základným bezpečnostným funkciám.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative p-8 rounded-2xl border ${
                plan.isPopular
                  ? "bg-black text-white border-black"
                  : "bg-black/[0.02] hover:bg-black/[0.04] border-black/10"
              } transition-colors group`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-medium bg-white text-black border border-black/10">
                  Najpopulárnejší
                </div>
              )}

              <div className="mb-8">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.isPopular ? "text-white" : "text-black"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mb-4 ${
                    plan.isPopular ? "text-white/80" : "text-black/60"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      plan.isPopular ? "text-white" : "text-black"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.price !== "Na mieru" && (
                    <span
                      className={
                        plan.isPopular ? "text-white/60" : "text-black/60"
                      }
                    >
                      /mesiac
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`p-0.5 rounded-full mt-1 ${
                        plan.isPopular ? "bg-white/20" : "bg-black/10"
                      }`}
                    >
                      <Check
                        className={`w-4 h-4 ${
                          plan.isPopular ? "text-white" : "text-black"
                        }`}
                      />
                    </div>
                    <span
                      className={
                        plan.isPopular ? "text-white/90" : "text-black/80"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 px-6 rounded-lg font-medium transition-all active:scale-[0.98] ${
                  plan.isPopular
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/90"
                }`}
              >
                Vybrať Plán
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-black/60 mb-4">Potrebujete špeciálne riešenie?</p>
          <a
            href="#contact"
            className="text-black hover:text-black/80 font-medium transition-colors"
          >
            Kontaktujte nás pre individuálnu ponuku →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
