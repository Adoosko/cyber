"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Database,
  Lock,
  LucideIcon,
  Network,
  Server,
  Shield,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: {
    text: string;
    color: string;
  };
}

interface ServiceCardProps extends Service {
  index: number;
}

const services: Service[] = [
  {
    icon: Network,
    title: "Sieťové Riešenia",
    description:
      "Komplexné služby na zabezpečenie a optimalizáciu vašej sieťovej infraštruktúry, zaisťujúce stabilné a bezpečné pripojenie.",
    cta: {
      text: "Bezpečné Pripojenie",
      color: "bg-[#00A3FF] text-[#00A3FF]",
    },
  },
  {
    icon: Shield,
    title: "Penetračné Testovanie",
    description:
      "Simulované kybernetické útoky a detailné bezpečnostné hodnotenia na efektívne odhalenie a riešenie zraniteľností.",
    cta: {
      text: "Nájsť & Opraviť Zraniteľnosti",
      color: "bg-[#FF4D4D] text-[#FF4D4D]",
    },
  },
  {
    icon: Server,
    title: "Servisné Zmluvy",
    description:
      "Pravidelné monitorovanie a proaktívne podporné služby na udržanie zdravia a bezpečnosti vašej IT infraštruktúry.",
    cta: {
      text: "Proaktívna Ochrana",
      color: "bg-[#FFB800] text-[#FFB800]",
    },
  },
  {
    icon: Lock,
    title: "Firewall Riešenia",
    description:
      "Pokročilé implementácie firewallov na ochranu vašej siete pred neoprávneným prístupom a kybernetickými hrozbami.",
    cta: {
      text: "Ochrana Siete",
      color: "bg-[#00FF85] text-[#00FF85]",
    },
  },
  {
    icon: Database,
    title: "DLP Riešenia",
    description:
      "Nástroje a politiky na prevenciu úniku dát a zabezpečenie citlivých informácií pred neoprávneným prístupom.",
    cta: {
      text: "Zabezpečenie Dát",
      color: "bg-[#A855F7] text-[#A855F7]",
    },
  },
  {
    icon: Cloud,
    title: "Zálohovacie Služby",
    description:
      "Spoľahlivé riešenia zálohovania a obnovy dát na bezpečnú ochranu a efektívnu obnovu kritických informácií.",
    cta: {
      text: "Zálohovanie & Obnova",
      color: "bg-white text-white",
    },
  },
];

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  cta,
  index,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div
        className={`relative z-10 h-full p-8 rounded-2xl border border-white/[0.08] overflow-hidden
        bg-gradient-to-br from-black/80 via-black/90 to-black/95
        backdrop-blur-xl
        before:absolute before:inset-0 before:bg-gradient-to-br ${cta.color.replace(
          "text-",
          "before:from-"
        )}/[0.08] before:to-transparent
      `}
      >
        {/* Icon */}
        <div className="mb-6">
          <div className="w-[72px] h-[72px] flex items-center justify-center relative">
            <Icon className="w-9 h-9 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-[28px] font-semibold text-white mb-4 leading-tight">
            {title}
          </h3>
          <p className="text-[17px] leading-relaxed text-white/60 mb-6">
            {description}
          </p>
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full bg-opacity-10 ${cta.color}`}
          >
            <span className={`text-sm font-medium`}>{cta.text}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,99,248,0.05),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Ako Zabezpečujeme Vašu Budúcnosť
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Komplexné riešenia prispôsobené vašim jedinečným potrebám. Naše
            služby sú navrhnuté na zvýšenie efektivity, zlepšenie výkonu a
            podporu rastu.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
