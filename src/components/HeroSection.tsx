"use client";

import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo } from "react";

// --- Optimized Constants ---
const Z_INDICES = {
  BACKGROUND: -30,
  GRID: -20,
  EFFECTS: -10,
  CONTENT: 10,
  OVERLAY: 20,
} as const;

const ANIMATION_CONFIG = {
  FLOATING_LINES_COUNT: 6, // Reduced from 12
  GRID_HIGHLIGHTS_COUNT: 2, // Reduced from 3
  MOUSE_THROTTLE_MS: 16, // ~60fps
} as const;

// --- Throttle utility ---
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  return (...args: any[]) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    }
  };
};

// --- Optimized FloatingLines ---
const FloatingLines = () => {
  const lineElements = useMemo(
    () =>
      [...Array(ANIMATION_CONFIG.FLOATING_LINES_COUNT)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          initial={{ opacity: 0, x: -150 }}
          animate={{
            opacity: [0.03, 0.08, 0.03],
            x: ["-10%", "110%"],
          }}
          transition={{
            duration: 8 + Math.random() * 4, // Slightly longer duration
            delay: i * 0.4, // Increased delay between animations
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[1px] w-[120px] sm:w-[150px] bg-gradient-to-r from-transparent via-[#0B63F8]/15 to-transparent"
          style={{
            top: `${Math.random() * 100}%`,
            left: `-${Math.random() * 50 + 50}px`,
            transform: `rotate(${
              Math.random() * 40 - 20
            }deg) translate3d(0, 0, 0)`,
            willChange: "transform, opacity",
          }}
        />
      )),
    []
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: Z_INDICES.EFFECTS }}
    >
      {lineElements}
    </div>
  );
};

// --- Optimized GridPattern ---
const GridPattern = () => (
  <>
    {/* Static grid layers */}
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        zIndex: Z_INDICES.GRID,
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />

    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        zIndex: Z_INDICES.GRID,
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)
        `,
        backgroundSize: "160px 160px",
      }}
    />

    {/* Optimized radial gradient */}
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_50%)]"
      style={{ zIndex: Z_INDICES.GRID }}
    />

    {/* Reduced grid highlights */}
    {[...Array(ANIMATION_CONFIG.GRID_HIGHLIGHTS_COUNT)].map((_, i) => (
      <motion.div
        key={`highlight-${i}`}
        className="absolute w-[180px] h-[180px] opacity-[0.015]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.015, 0.03, 0.015],
        }}
        transition={{
          duration: 6, // Longer duration
          delay: i * 2, // Increased delay
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          zIndex: Z_INDICES.GRID,
          left: `${30 + i * 40}%`,
          top: `${35 + (i % 2) * 30}%`,
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
        }}
      />
    ))}

    {/* Simplified animated gradient - removed continuous scanning */}
    <motion.div
      className="absolute inset-0 opacity-[0.02]"
      animate={{
        background: [
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)",
          "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)",
        ],
      }}
      transition={{
        duration: 8, // Longer duration
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{
        zIndex: Z_INDICES.GRID,
        transform: "translate3d(0, 0, 0)",
        willChange: "background",
      }}
    />
  </>
);

// --- Optimized HolographicCore ---
const HolographicCore = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const throttledMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }, ANIMATION_CONFIG.MOUSE_THROTTLE_MS),
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
      window.addEventListener("mousemove", throttledMouseMove);
      return () => window.removeEventListener("mousemove", throttledMouseMove);
    }
  }, [mouseX, mouseY, throttledMouseMove]);

  const coreX = useTransform(
    mouseX,
    (val) =>
      (val / (typeof window !== "undefined" ? window.innerWidth : 1) - 0.5) * 20
  );
  const coreY = useTransform(
    mouseY,
    (val) =>
      (val / (typeof window !== "undefined" ? window.innerHeight : 1) - 0.5) *
      20
  );

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 opacity-[0.03]"
      style={{
        x: "-50%",
        y: "-50%",
        translateX: coreX,
        translateY: coreY,
        zIndex: Z_INDICES.EFFECTS,
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(11,99,248,0.12) 0%, rgba(11,99,248,0.02) 35%, transparent 65%)",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
        }}
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

// --- Simplified ScanningLine ---
const ScanningLine = () => (
  <motion.div
    className="absolute top-0 left-0 w-full h-[1px] bg-[#0B63F8]/30 shadow-[0_0_8px_2px_rgba(11,99,248,0.2)]"
    initial={{ y: "-100%" }}
    animate={{ y: ["-5%", "105%"] }}
    transition={{
      duration: 8, // Slower animation
      repeat: Infinity,
      repeatDelay: 6, // Longer delay between repeats
      ease: "easeInOut",
    }}
    style={{
      zIndex: Z_INDICES.EFFECTS,
      transform: "translate3d(0, 0, 0)",
      willChange: "transform",
    }}
  />
);

// --- Optimized InfinityLogos ---
const companyLogos = [
  { name: "NovaCore", placeholder: "NC" },
  { name: "QuantumLeap", placeholder: "QL" },
  { name: "AetherNet", placeholder: "AN" },
  { name: "Synapse Inc.", placeholder: "SI" },
  { name: "StellarDef", placeholder: "SD" },
  { name: "CygnusSys", placeholder: "CS" },
];

const InfinityLogos = () => {
  const duplicatedLogos = useMemo(() => [...companyLogos, ...companyLogos], []);

  return (
    <div className="relative w-full overflow-hidden group">
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"
        style={{ zIndex: Z_INDICES.OVERLAY }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none"
        style={{ zIndex: Z_INDICES.OVERLAY }}
      />

      <motion.div
        className="flex flex-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35, // Slightly slower
            ease: "linear",
          },
        }}
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 w-40 sm:w-48 h-20 sm:h-24 p-4 mx-3 sm:mx-5 flex items-center justify-center
                       rounded-xl border border-white/8 bg-white/3 backdrop-blur-sm 
                       hover:bg-white/6 transition-all duration-300"
            style={{
              transform: "translate3d(0, 0, 0)",
              willChange: "transform, background-color",
            }}
          >
            <span className="text-white/40 text-lg font-medium group-hover:text-white/60 transition-colors duration-300">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Optimized Main HeroSection Component ---
export const HeroSection = () => {
  const headlineText = "Predvídať. Chrániť. ";
  const priorityText = "Dominovať.";

  const headlineChars = useMemo(
    () =>
      headlineText.split("").map((char, i) => (
        <motion.span
          key={`headline-${char}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
          className="inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      )),
    [headlineText]
  );

  const priorityChars = useMemo(
    () =>
      priorityText.split("").map((char, i) => (
        <motion.span
          key={`priority-${char}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: headlineText.length * 0.02 + i * 0.03,
          }}
          className="inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      )),
    [priorityText, headlineText.length]
  );

  const scrollToPricing = useCallback(() => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-[150px] pb-[80px] sm:pt-[100px] sm:pb-[60px] overflow-hidden bg-black text-white"
      style={{
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }}
    >
      {/* Optimized Background Elements */}
      <div
        className="absolute inset-0"
        style={{ zIndex: Z_INDICES.BACKGROUND }}
      >
        <GridPattern />
        <HolographicCore />
        <FloatingLines />
        <ScanningLine />
      </div>

      {/* Content */}
      <div
        className="container mx-auto px-4 sm:px-6 relative flex flex-col items-center flex-grow"
        style={{ zIndex: Z_INDICES.CONTENT }}
      >
        <div className="max-w-4xl pt-12 mx-auto text-center flex-grow flex flex-col justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-6 sm:mb-8 relative leading-tight sm:leading-none">
            {headlineChars}
            <span className="relative inline-flex">
              <span className="text-[#0B63F8]">{priorityChars}</span>
              <motion.span
                className="absolute inset-0 text-[#0B63F8] opacity-40 blur-lg"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ willChange: "opacity" }}
              >
                {priorityText}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-white/70 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ willChange: "transform, opacity" }}
          >
            Prinášame inovatívne stratégie kybernetickej bezpečnosti a pokročilú
            ochranu pre bezpečnú digitálnu budúcnosť.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Primary Button */}
            <motion.button
              onClick={scrollToPricing}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 0px 25px -5px rgba(11,99,248,0.5)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1, ease: "easeInOut" },
              }}
              className="relative group w-full sm:w-auto px-8 py-3.5 rounded-xl 
                         bg-gradient-to-br from-[#0B63F8] to-[#0747A6]
                         text-white font-semibold text-base overflow-hidden
                         border border-blue-500/20 shadow-lg"
              style={{
                transform: "translate3d(0, 0, 0)",
                willChange: "transform, box-shadow",
              }}
            >
              <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-200" />

              <span className="relative flex items-center justify-center">
                Vyžiadať Bezpečnostný Audit
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 2, 0, -2, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRightCircleIcon className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              onClick={scrollToPricing}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(11,99,248,0.4)",
                boxShadow: "0px 0px 15px -8px rgba(11,99,248,0.2)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1, ease: "easeInOut" },
              }}
              className="relative group w-full sm:w-auto px-8 py-3.5 rounded-xl
                         bg-white/3 backdrop-blur-sm 
                         text-white/90 hover:text-white 
                         font-semibold text-base overflow-hidden
                         border border-white/8 hover:border-blue-500/30 shadow-md transition-colors duration-200"
              style={{
                transform: "translate3d(0, 0, 0)",
                willChange: "transform, border-color, box-shadow",
              }}
            >
              <span className="relative flex items-center justify-center">
                Objavte Našu Platformu
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Optimized Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="w-full mt-24 sm:mt-32 md:mt-36 relative"
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-sm text-white/60 mb-10 text-center tracking-wider uppercase">
            Dôverujú Nám Lídri & Inovátori
          </p>
          <InfinityLogos />
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B63F8]/10 to-transparent" />
    </section>
  );
};

export default HeroSection;
