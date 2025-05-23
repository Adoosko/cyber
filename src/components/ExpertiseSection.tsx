"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Database,
  FileCheck,
  Lock,
  LucideIcon,
  Network,
  ShieldCheck,
} from "lucide-react";

interface ExpertiseArea {
  icon: LucideIcon;
  title: string;
  description: string;
}

const expertiseAreas: ExpertiseArea[] = [
  {
    icon: ShieldCheck,
    title: "Bezpečnosť",
    description:
      "Poskytujeme expertné poradenstvo na posilnenie bezpečnostného rámca vašej organizácie, zabezpečujúc odolnosť voči vyvíjajúcim sa kybernetickým hrozbám.",
  },
  {
    icon: Lock,
    title: "Súkromie",
    description:
      "Naše poradenské služby v oblasti ochrany súkromia vám pomáhajú efektívne navigovať komplexnými predpismi o ochrane údajov.",
  },
  {
    icon: FileCheck,
    title: "Certifikovaní Odborníci",
    description:
      "Poskytujeme expertné poradenstvo na posilnenie bezpečnostného rámca vašej organizácie s certifikovanými špecialistami.",
  },
  {
    icon: Database,
    title: "Informačná Bezpečnosť",
    description:
      "Poskytujeme poradenstvo pri budovaní ISMS rámcov, zabezpečujúc, že vaše dáta zostávajú bezpečné a v súlade so štandardmi.",
  },
  {
    icon: Network,
    title: "Ochrana Údajov",
    description:
      "Naše PDMS riešenia vás vedú pri ochrane osobných údajov, dosahujúc plný súlad s predpismi o ochrane súkromia.",
  },
  {
    icon: Clock,
    title: "Kontinuita Podnikania",
    description:
      "S BCMS poradenstvom zabezpečujeme, že vaše obchodné operácie zostávajú odolné aj počas nepredvídaných narušení alebo kríz.",
  },
];

interface ExpertiseCardProps extends ExpertiseArea {
  index: number;
}

const ExpertiseCard = ({
  icon: Icon,
  title,
  description,
  index,
}: ExpertiseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative z-10 h-full p-8 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden">
        {/* Content Container */}
        <div className="relative z-20">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-[72px] h-[72px] rounded-2xl bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden border-2 border-[#0B63F8]/30">
              <Icon className="w-8 h-8 text-[#0B63F8]" />
              {/* Scanning line */}
              <motion.div
                className="absolute w-full h-[1px] bg-[#0B63F8]/20"
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
          </div>

          {/* Title */}
          <h3 className="text-[28px] font-semibold text-white mb-4">{title}</h3>

          {/* Description */}
          <p className="text-[17px] leading-relaxed text-white/60">
            {description}
          </p>
        </div>

        {/* Hover Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B63F8]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Background Glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-[#0B63F8]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
    </motion.div>
  );
};

export const ExpertiseSection = () => {
  return (
    <section id="expertise" className="relative py-24 bg-black overflow-hidden">
      {/* Background Grid Pattern */}
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Poradenstvo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-3xl mx-auto"
          >
            Vstúpte do budúcnosti s istotou, rozvíjajte svoje podnikanie s
            našimi pokročilými technológiami a expertnými poradenskými službami!
          </motion.p>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard key={area.title} {...area} index={index} />
          ))}
        </div>

        {/* Interactive Elements */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 pointer-events-none"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 150,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(11,99,248,0.1) 0%, transparent 70%)",
          }}
        />
      </div>
    </section>
  );
};

export default ExpertiseSection;
