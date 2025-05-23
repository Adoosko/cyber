"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Database,
  Lock,
  Server,
  Shield,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface StatCard {
  icon: React.ElementType;
  text: string;
}

interface ExcellenceSection {
  badge: string;
  title: string;
  description: string;
  image: string;
  color: string;
  stats: StatCard[];
}

const sections: ExcellenceSection[] = [
  {
    badge: "Cloudová Infraštruktúra",
    title: "Bezproblémová Cloudová Integrácia",
    description:
      "Využite silu cloudových technológií na škálovanie vašich operácií, zvýšenie bezpečnosti a podporu inovácií. Zažite efektivitu ako nikdy predtým.",
    image: "/cloud.avif",
    color: "#A855F7",
    stats: [
      { icon: Clock, text: "99.9% Dostupnosť" },
      { icon: Lock, text: "Zabezpečené Úložisko" },
      { icon: TrendingUp, text: "Škálovateľné Riešenia" },
      { icon: Database, text: "1TB+ Dát Denne" },
    ],
  },
  {
    badge: "Kybernetická Bezpečnosť",
    title: "Pokročilá Ochrana Systémov",
    description:
      "Komplexné zabezpečenie vašich systémov s využitím najnovších technológií a postupov. Nepretržitý monitoring a okamžitá reakcia na hrozby.",
    image: "/security.avif",
    color: "#00A3FF",
    stats: [
      { icon: Shield, text: "24/7 Monitoring" },
      { icon: Lock, text: "256-bit Šifrovanie" },
      { icon: Database, text: "0 Únikov Dát" },
      { icon: Server, text: "99.9% Úspešnosť" },
    ],
  },
  {
    badge: "Digitálna Transformácia",
    title: "Inovatívne Riešenia Budúcnosti",
    description:
      "Transformujte svoje podnikanie pomocou najmodernejších digitálnych technológií. Automatizácia, AI a smart riešenia pre váš rast.",
    image: "/innovation.avif",
    color: "#FF4D4D",
    stats: [
      { icon: TrendingUp, text: "100+ Inovácií" },
      { icon: Server, text: "AI Integrácia" },
      { icon: Database, text: "Smart Analýza" },
      { icon: Clock, text: "Rýchla Adaptácia" },
    ],
  },
];

const StatCard = ({
  icon: Icon,
  text,
  color,
}: StatCard & { color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] backdrop-blur-sm"
  >
    <Icon className="w-5 h-5" style={{ color }} />
    <span className="text-sm text-white">{text}</span>
  </motion.div>
);

const ExcellenceBlock = ({
  section,
  index,
}: {
  section: ExcellenceSection;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-12 py-20 ${
        !isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <div className="flex-1 w-full">
        {/* Enterprise Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] backdrop-blur-sm mb-8"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: section.color }}
          />
          <span className="text-sm text-white">{section.badge}</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {section.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/60 mb-8 max-w-2xl"
        >
          {section.description}
        </motion.p>

        {/* Stats Grid */}
        <div className="flex flex-wrap gap-4">
          {section.stats.map((stat) => (
            <StatCard key={stat.text} {...stat} color={section.color} />
          ))}
        </div>
      </div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: isEven ? 20 : -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="lg:flex-1 w-full lg:w-auto"
      >
        <div className="relative aspect-square max-w-[500px] mx-auto">
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-contain"
            priority={index === 0}
          />
        </div>
      </motion.div>

      {/* Section Background Gradient */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${section.color}, transparent 70%)`,
        }}
      />
    </div>
  );
};

export const CyberExcellenceSection = () => {
  return (
    <section id="expertise" className="relative py-24 overflow-hidden">
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
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Kybernetická Excelentnosť
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-white/60 max-w-3xl mx-auto"
          >
            Preskúmajte našu škálu služieb navrhnutých na ochranu vašich
            digitálnych aktív
          </motion.p>
        </div>

        {/* Excellence Blocks */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <ExcellenceBlock
              key={section.title}
              section={section}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CyberExcellenceSection;
