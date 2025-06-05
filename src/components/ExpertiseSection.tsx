"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Clock,
  Database,
  FileCheck,
  Lock,
  LucideIcon,
  Network,
  ShieldCheck,
} from "lucide-react";
import { useMemo } from "react";

interface ExpertiseArea {
  icon: LucideIcon;
  title: string;
  description: string;
}

// --- Enhanced Animation Constants ---
const SMOOTH_EASINGS = {
  gentle: [0.25, 0.46, 0.45, 0.94],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
} as const;

const ANIMATION_CONFIG = {
  CARD_STAGGER: 0.08,
  HOVER_DURATION: 0.3,
  ICON_SCAN_DURATION: 3,
  BACKGROUND_ROTATION_DURATION: 200,
} as const;

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

// --- Enhanced ExpertiseCard Component ---
const ExpertiseCard = ({
  icon: Icon,
  title,
  description,
  index,
}: ExpertiseCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth mouse following
  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position to rotation values
  const rotateX = useTransform(smoothMouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.9,
        rotateX: 10,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * ANIMATION_CONFIG.CARD_STAGGER,
        ease: SMOOTH_EASINGS.elastic,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        className="relative z-10 h-full p-8 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        whileHover={{
          scale: 1.02,
          y: -8,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B63F8]/[0.02] via-transparent to-[#0B63F8]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(45deg, transparent, rgba(11,99,248,0.1), transparent)",
            opacity: 0,
          }}
          whileHover={{
            opacity: [0, 0.5, 0],
            rotate: [0, 360],
            transition: {
              opacity: { duration: 1, ease: "easeInOut" },
              rotate: { duration: 2, ease: "linear" },
            },
          }}
        />

        {/* Content Container */}
        <div className="relative z-20">
          {/* Enhanced Icon Container */}
          <div className="mb-8">
            <motion.div
              className="w-[72px] h-[72px] rounded-2xl bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden border-2 border-[#0B63F8]/30"
              whileHover={{
                borderColor: "rgba(11,99,248,0.6)",
                boxShadow: "0 0 20px rgba(11,99,248,0.3)",
                transition: { duration: 0.3 },
              }}
              style={{
                willChange: "border-color, box-shadow",
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
              >
                <Icon className="w-8 h-8 text-[#0B63F8]" />
              </motion.div>

              {/* Enhanced scanning line */}
              <motion.div
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#0B63F8]/40 to-transparent"
                animate={{
                  top: ["-10%", "110%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: ANIMATION_CONFIG.ICON_SCAN_DURATION,
                  repeat: Infinity,
                  ease: SMOOTH_EASINGS.gentle,
                  times: [0, 0.1, 0.9, 1],
                  repeatDelay: 2,
                }}
                style={{
                  willChange: "top, opacity",
                  filter: "blur(0.5px)",
                }}
              />

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-[#0B63F8]/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: index * 0.3,
                }}
              />
            </motion.div>
          </div>

          {/* Enhanced Title */}
          <motion.h3
            className="text-[28px] font-semibold text-white mb-4"
            whileHover={{
              color: "rgba(11,99,248,0.9)",
              transition: { duration: 0.3 },
            }}
          >
            {title}
          </motion.h3>

          {/* Enhanced Description */}
          <motion.p
            className="text-[17px] leading-relaxed text-white/60"
            whileHover={{
              color: "rgba(255,255,255,0.8)",
              transition: { duration: 0.3 },
            }}
          >
            {description}
          </motion.p>
        </div>

        {/* Enhanced Hover Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#0B63F8]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            filter: "blur(20px)",
          }}
        />
      </motion.div>

      {/* Enhanced Background Glow */}
      <motion.div
        className="absolute -inset-[2px] bg-gradient-to-b from-[#0B63F8]/20 via-[#0B63F8]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          filter: "blur(15px)",
          willChange: "opacity",
        }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0B63F8]/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5 + index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// --- Enhanced Background Animation Component ---
const AnimatedBackground = () => {
  const backgroundElements = useMemo(
    () => (
      <>
        {/* Rotating gradient */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-20 pointer-events-none"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: ANIMATION_CONFIG.BACKGROUND_ROTATION_DURATION,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "conic-gradient(from 0deg, rgba(11,99,248,0.1) 0%, transparent 50%, rgba(11,99,248,0.05) 100%)",
            willChange: "transform",
          }}
        />

        {/* Floating orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-32 h-32 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(11,99,248,0.1) 0%, transparent 70%)",
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
              filter: "blur(2px)",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: SMOOTH_EASINGS.gentle,
              delay: i * 1.5,
            }}
          />
        ))}
      </>
    ),
    []
  );

  return backgroundElements;
};

// --- Main ExpertiseSection Component ---
export const ExpertiseSection = () => {
  const titleChars = useMemo(
    () =>
      "Poradenstvo".split("").map((char, i) => (
        <motion.span
          key={`title-${char}-${i}`}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: i * 0.05,
            ease: SMOOTH_EASINGS.elastic,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="inline-block"
          style={{
            transformOrigin: "center bottom",
            willChange: "transform, opacity",
          }}
        >
          {char}
        </motion.span>
      )),
    []
  );

  return (
    <section id="expertise" className="relative py-24 bg-black overflow-hidden">
      {/* Enhanced Background Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        animate={{
          opacity: [0.01, 0.03, 0.01],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          willChange: "opacity",
        }}
      />

      {/* Animated Background Elements */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {titleChars}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: SMOOTH_EASINGS.smooth,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="text-lg text-white/60 max-w-3xl mx-auto"
            style={{ willChange: "transform, opacity" }}
          >
            Vstúpte do budúcnosti s istotou, rozvíjajte svoje podnikanie s
            našimi pokročilými technológiami a expertnými poradenskými službami!
          </motion.p>
        </div>

        {/* Enhanced Expertise Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard key={area.title} {...area} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default ExpertiseSection;
