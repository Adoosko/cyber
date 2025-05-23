"use client";

import {
  ChartBarIcon,
  CogIcon,
  CommandLineIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const services = [
  {
    icon: ChartBarIcon,
    title: "AI-Powered Threat Detection",
    description:
      "Advanced machine learning algorithms that continuously learn and adapt to evolving threats in real-time.",
    features: [
      "Self-Learning AI",
      "Behavioral Analytics",
      "Autonomous Response",
    ],
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise Immune System",
    description:
      "Creating a self-defending digital ecosystem that identifies and neutralizes threats before they can cause damage.",
    features: [
      "Adaptive Defense",
      "Proactive Protection",
      "Digital Antibodies",
    ],
  },
  {
    icon: CommandLineIcon,
    title: "Attack Surface Management",
    description:
      "Comprehensive visibility and control over your entire digital infrastructure with AI-driven insights.",
    features: ["24/7 Monitoring", "Risk Analytics", "Threat Mapping"],
  },
  {
    icon: CogIcon,
    title: "Autonomous Response",
    description:
      "Self-healing security system that automatically contains and mitigates threats in real-time.",
    features: ["Instant Action", "Smart Containment", "Zero Trust"],
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

export const Solutions = () => {
  return (
    <section className="py-20 bg-[#030014] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-[#1a0b2e]/30 via-transparent to-transparent" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(168,85,247) 1px, transparent 1px), linear-gradient(to bottom, rgb(168,85,247) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={cardVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 bg-gradient-animate text-glow"
          >
            Intelligent Defense Solutions
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="text-gray-300/90 text-center mb-16 text-lg max-w-3xl mx-auto"
          >
            Next-generation cybersecurity powered by self-learning AI
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group card-hover photon-effect glass rounded-xl p-8 relative overflow-hidden"
              >
                {/* Card Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-500/5 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-500/10 transition-colors">
                      <service.icon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-400/90 mb-6 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-3 py-1 bg-purple-500/5 text-purple-300/90 text-sm rounded-full group-hover:bg-purple-500/10 group-hover:text-purple-300 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
