"use client";

import { usePricing } from "@/context/PricingContext";
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
    name: "Bezplatný balík",
    price: "0€",
    description: "Zistenie povinností podľa zákona NIS2",
    features: [
      "Bezplatné poradenstvo k zákonu 69/2018 (NIS2)",
      "Pomoc s vyplnením oznamovacieho formulára pre NBÚ",
      "Všeobecné informácie o právnej úprave",
      "Základná orientácia v požiadavkách zákona",
    ],
  },
  {
    name: "Základ",
    price: "190€",
    description: "Pre najmenšie subjekty",
    features: [
      "Základné spracovanie kyberbezpečnostnej dokumentácie",
      "Vymenovanie externého MKB",
      "Vedenie záznamov o činnostiach",
      "Pravidelná komunikácia s vedením organizácie",
      "Vypracovanie základnej analýzy rizík",
    ],
  },
  {
    name: "Štandard",
    price: "290€",
    description: "Pre malé firmy",
    features: [
      "Všetko z Balíka 1",
      "Vypracovanie a aktualizácia bezpečnostnej politiky",
      "Plán školení pre zamestnancov",
      "Monitoring dodávateľských zmlúv",
      "Revízia smerníc a reakčných postupov",
    ],
    isPopular: true,
  },
  {
    name: "Komplex",
    price: "490€",
    description: "Pre firmy so širšími aktivitami a vyšším rizikom",
    features: [
      "Všetko z Balíkov 1 a 2",
      "Vypracovanie komplexnej dokumentácie ISMS",
      "Podpora pri testoch zraniteľnosti",
      "Pravidelné mesačné reporty a odporúčania",
      "Účasť na kontrolách NBÚ / auditná podpora",
      "Individuálne konzultácie a asistencia",
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
  const { selectedPlan, setSelectedPlan } = usePricing();

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    // Scroll to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                  Odporúčaný
                </div>
              )}

              <div>
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
                <div className="flex items-baseline gap-1 mb-6">
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
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full py-4 px-6 rounded-lg font-medium transition-all active:scale-[0.98] ${
                  selectedPlan === plan.name
                    ? "bg-[#00A3FF] text-white hover:bg-[#0082CC]"
                    : plan.isPopular
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/90"
                }`}
              >
                {selectedPlan === plan.name ? "Vybraný Plán" : "Vybrať Plán"}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Riešenia na mieru
            </h3>
            <p className="text-black/60 mb-4">
              V prípade špecifických požiadaviek (napr. pôsobnosť vo viacerých
              krajinách, vysoká úroveň rizika, cloudové služby, školy, štátne
              inštitúcie a pod.) radi pripravíme individuálnu ponuku.
            </p>
            <div className="mt-8 p-6 rounded-xl bg-black/[0.02] border border-black/10">
              <h4 className="text-xl font-bold text-black mb-2">
                Produkty navyše
              </h4>
              <p className="text-black/60">
                Dodanie ďalších služieb ako napríklad GAP analýza, penetračné
                testy a podobne vykonávame od 290€ / 1 človekodeň
              </p>
            </div>
            <p className="mt-8 text-sm text-black/40">
              Uvedené ceny sú bez DPH.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
