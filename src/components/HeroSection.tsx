"use client";

import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

// --- FloatingLines (Data Stream Style) ---
const FloatingLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={`line-${i}`}
        initial={{ opacity: 0, x: -150 }}
        animate={{
          opacity: [0.03, 0.1, 0.03],
          x: ["-10%", "110%"],
        }}
        transition={{
          duration: 7 + Math.random() * 6,
          delay: i * 0.25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[1px] w-[100px] sm:w-[150px] bg-gradient-to-r from-transparent via-[#0B63F8]/20 to-transparent"
        style={{
          top: `${Math.random() * 100}%`,
          left: `-${Math.random() * 50 + 50}px`,
          transform: `rotate(${Math.random() * 60 - 30}deg)`,
        }}
      />
    ))}
  </div>
);

// --- GridPattern ---
const GridPattern = () => (
  <>
    {/* Main grid */}
    <div
      className="absolute inset-0 opacity-[0.07] -z-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
    {/* Larger grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.05] -z-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
        `,
        backgroundSize: "160px 160px",
      }}
    />
    {/* Radial gradient overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_50%)] -z-20" />

    {/* Animated scanning grid line - Vertical */}
    <motion.div
      className="absolute inset-0 -z-20"
      animate={{
        backgroundPosition: ["0px 0px", "40px 0px"],
      }}
      transition={{
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "40px 100%",
      }}
    />

    {/* Animated scanning grid line - Horizontal */}
    <motion.div
      className="absolute inset-0 -z-20"
      animate={{
        backgroundPosition: ["0px 0px", "0px 40px"],
      }}
      transition={{
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "100% 40px",
      }}
    />

    {/* Grid highlight spots */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`highlight-${i}`}
        className="absolute w-[200px] h-[200px] opacity-[0.02] -z-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 4,
          delay: i * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${25 + i * 25}%`,
          top: `${30 + (i % 2) * 20}%`,
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)",
        }}
      />
    ))}

    {/* Animated gradient overlay */}
    <motion.div
      className="absolute inset-0 opacity-[0.03] -z-20"
      animate={{
        background: [
          "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        ],
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />

    {/* Subtle noise texture overlay */}
    <div
      className="absolute inset-0 opacity-[0.015] -z-20 mix-blend-soft-light"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 2000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  </>
);

// --- HolographicCore ---
const HolographicCore = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  const coreX = useTransform(
    mouseX,
    (val) =>
      (val / (typeof window !== "undefined" ? window.innerWidth : 1) - 0.5) * 30
  );
  const coreY = useTransform(
    mouseY,
    (val) =>
      (val / (typeof window !== "undefined" ? window.innerHeight : 1) - 0.5) *
      30
  );

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-56 h-56 md:w-80 md:h-80 opacity-5 -z-10"
      style={{ x: "-50%", y: "-50%", translateX: coreX, translateY: coreY }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(11,99,248,0.15) 0%, rgba(11,99,248,0.03) 35%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

// --- ScanningLine ---
const ScanningLine = () => (
  <motion.div
    className="absolute top-0 left-0 w-full h-[1px] bg-[#0B63F8]/40 shadow-[0_0_10px_3px_rgba(11,99,248,0.25)] -z-10"
    initial={{ y: "-100%" }}
    animate={{ y: ["-5%", "105%"] }}
    transition={{
      duration: 6,
      repeat: Infinity,
      repeatDelay: 4,
      ease: "easeInOut",
    }}
  />
);

// --- NEW: Infinity Moving Logos ---
const companyLogos = [
  // Replace with actual SVG logo components or <img> tags with transparent PNGs
  { name: "NovaCore", placeholder: "NC" },
  { name: "QuantumLeap", placeholder: "QL" },
  { name: "AetherNet", placeholder: "AN" },
  { name: "Synapse Inc.", placeholder: "SI" },
  { name: "StellarDef", placeholder: "SD" },
  { name: "CygnusSys", placeholder: "CS" },
];

const InfinityLogos = () => {
  const duplicatedLogos = [...companyLogos, ...companyLogos]; // Duplicate for seamless loop

  return (
    <div className="relative w-full overflow-hidden group">
      {/* Optional: Fades on the sides to enhance the infinite effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

      <motion.div
        className="flex flex-nowrap"
        animate={{ x: ["0%", "-100%"] }} // Moves the duplicated set
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30, // Adjust duration for speed
            ease: "linear",
          },
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 w-40 sm:w-48 h-20 sm:h-24 p-4 mx-3 sm:mx-5 flex items-center justify-center
                       rounded-xl border border-white/10 bg-white/5 backdrop-blur-md 
                       hover:bg-white/10 transition-all duration-300"
            // Glassmorphism: bg-white/5, backdrop-blur-md
          >
            {/* Replace with actual logo image or SVG */}
            <span className="text-white/50 text-lg font-medium group-hover:text-white/70 transition-colors">
              {logo.name}
              {/* <img src={`/logos/${logo.name}.svg`} alt={logo.name} className="h-8 sm:h-10 max-w-full" /> */}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main HeroSection Component ---
export const HeroSection = () => {
  const headlineText = "Predvídať. Chrániť. ";

  const priorityText = "Dominovať.";

  const headlineChars = headlineText.split("").map((char, i) => (
    <motion.span
      key={`headline-${char}-${i}`}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.025 }}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));

  const priorityChars = priorityText.split("").map((char, i) => (
    <motion.span
      key={`priority-${char}-${i}`}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: headlineText.length * 0.025 + i * 0.035,
      }}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-[150px] pb-[80px] sm:pt-[100px] sm:pb-[60px] overflow-hidden bg-black text-white">
      {/* Background Elements Wrapper - important for z-index context */}
      <div className="absolute inset-0 z-0">
        {" "}
        {/* Parent for all background elements */}
        <GridPattern />
        <HolographicCore />
        <FloatingLines />
        <ScanningLine />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center flex-grow">
        {" "}
        {/* Added flex-grow */}
        <div className="max-w-4xl mx-auto text-center flex-grow flex flex-col justify-center">
          {" "}
          {/* Centering content vertically */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-6 sm:mb-8 relative z-10 leading-tight sm:leading-none">
            {headlineChars}
            <span className="relative inline-flex">
              <span className="text-[#0B63F8]">{priorityChars}</span>
              <motion.span
                className="absolute inset-0 text-[#0B63F8] opacity-50 blur-lg"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {priorityText}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-white/70 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Prinášame inovatívne stratégie kybernetickej bezpečnosti a pokročilú
            ochranu pre bezpečnú digitálnu budúcnosť.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* --- Button 1: Primary Action (e.g., Request Security Audit) --- */}
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0px 0px 30px -5px rgba(11,99,248,0.6), 0px 0px 20px -10px rgba(11,99,248,0.4)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.97,
                boxShadow: "0px 0px 15px -5px rgba(11,99,248,0.4)",
                transition: { duration: 0.1, ease: "easeInOut" },
              }}
              className="relative group w-full sm:w-auto px-8 py-3.5 rounded-xl 
                         bg-gradient-to-br from-[#0B63F8] to-[#0747A6]
                         text-white font-semibold text-base overflow-hidden
                         border border-blue-500/30 shadow-lg"
            >
              {/* Subtle inner Bevel / Highlight for depth */}
              <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Animated Shine Effect */}
              <motion.div
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br 
                           from-transparent via-white/30 to-transparent opacity-0 
                           group-hover:opacity-30 pointer-events-none"
                animate={{
                  rotate: [0, 360],
                  x: ["-50%", "50%", "-50%"],
                }}
                transition={{
                  rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                  x: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                  },
                }}
              />

              {/* Content */}
              <span className="relative z-10 flex items-center justify-center">
                Vyžiadať Bezpečnostný Audit
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 3, 0, -3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  <ArrowRightCircleIcon className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>

            {/* --- Button 2: Secondary Action (e.g., Discover Our Platform) --- */}
            <motion.button
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(11,99,248,0.6)",
                boxShadow: "0px 0px 20px -8px rgba(11,99,248,0.3)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.97,
                borderColor: "rgba(11,99,248,0.4)",
                transition: { duration: 0.1, ease: "easeInOut" },
              }}
              className="relative group w-full sm:w-auto px-8 py-3.5 rounded-xl
                         bg-white/5 backdrop-blur-md 
                         text-white/90 hover:text-white 
                         font-semibold text-base overflow-hidden
                         border border-white/10 hover:border-blue-500/40 shadow-md transition-colors duration-300"
            >
              {/* Subtle Corner Accents (Optional) */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`corner-${i}`}
                  className="absolute w-3 h-3 border-[#0B63F8]/0 group-hover:border-[#0B63F8]/70 transition-colors duration-300"
                  style={{
                    ...(i === 0 && {
                      top: -1,
                      left: -1,
                      borderTopWidth: "2px",
                      borderLeftWidth: "2px",
                      borderTopLeftRadius: "0.7rem",
                    }),
                    ...(i === 1 && {
                      top: -1,
                      right: -1,
                      borderTopWidth: "2px",
                      borderRightWidth: "2px",
                      borderTopRightRadius: "0.7rem",
                    }),
                    ...(i === 2 && {
                      bottom: -1,
                      left: -1,
                      borderBottomWidth: "2px",
                      borderLeftWidth: "2px",
                      borderBottomLeftRadius: "0.7rem",
                    }),
                    ...(i === 3 && {
                      bottom: -1,
                      right: -1,
                      borderBottomWidth: "2px",
                      borderRightWidth: "2px",
                      borderBottomRightRadius: "0.7rem",
                    }),
                  }}
                  initial={{ opacity: 0 }}
                  animate={
                    // Using variants for group-hover effect on opacity
                    // This is a bit tricky inline. For complex group hover states, CSS or variants on parent is better.
                    // For simplicity, let's make it appear directly.
                    // If you need it to animate on group hover, you'd typically use variants on the parent 'group'
                    // or more complex CSS. Let's make it appear with the button's initial animation for now.
                    { opacity: 1 } // Simplified: appears with button. For group-hover opacity, use CSS or parent variants.
                  }
                  transition={{ delay: 0.1 + i * 0.05 }} // This transition is for the initial appearance
                />
              ))}

              {/* Content */}
              <span className="relative z-10 flex items-center justify-center">
                Objavte Našu Platformu
              </span>
              {/* Optional: Subtle animated glare on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-20 pointer-events-none"
                // Using variants to ensure animation plays only on actual hover
                variants={{
                  initial: { x: "-100%", opacity: 0 },
                  hover: {
                    x: "100%",
                    opacity: 0.2,
                    transition: {
                      x: {
                        type: "tween",
                        ease: "linear",
                        duration: 0.8,
                        delay: 0.1,
                      },
                      opacity: { duration: 0.3 },
                    },
                  },
                }}
                initial="initial" // Start with the 'initial' variant
                whileHover="hover" // Animate to 'hover' variant when the parent 'group' is hovered
              />
            </motion.button>
          </motion.div>
        </div>
        {/* Trusted By Section - NEW Infinity Moving Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="w-full mt-24 sm:mt-32 md:mt-36 relative" // Takes full width for the scroller
        >
          <p className="text-sm text-white/50 mb-10 text-center tracking-wider uppercase">
            Dôverujú Nám Lídri & Inovátori
          </p>
          <InfinityLogos />
        </motion.div>
      </div>
      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B63F8]/15 to-transparent" />
    </section>
  );
};

export default HeroSection;
