"use client";

import {
  LockClosedIcon,
  ServerIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const threats = [
  {
    icon: ShieldExclamationIcon,
    title: "Advanced Persistent Threats",
    description:
      "Sophisticated attacks that evade traditional security measures through prolonged and targeted methods.",
  },
  {
    icon: LockClosedIcon,
    title: "Ransomware Evolution",
    description:
      "Next-generation ransomware utilizing AI and machine learning to exploit vulnerabilities.",
  },
  {
    icon: ServerIcon,
    title: "Supply Chain Attacks",
    description:
      "Compromising trusted third-party vendors and software to infiltrate secure networks.",
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const ThreatLandscape = () => {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-400"
          >
            The Evolving Threat Landscape
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-center mb-12 text-lg"
          >
            Stay ahead of emerging cybersecurity challenges in an ever-evolving
            digital world
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {threats.map((threat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-colors"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                  <threat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {threat.title}
                </h3>
                <p className="text-gray-400">{threat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
