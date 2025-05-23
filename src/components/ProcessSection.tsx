"use client";

import {
  ChartBarSquareIcon,
  MagnifyingGlassIcon,
  PresentationChartBarIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MagnifyingGlassIcon,
    title: "Assess",
    description:
      "Comprehensive security assessment of your infrastructure and potential vulnerabilities.",
  },
  {
    icon: PresentationChartBarIcon,
    title: "Strategize",
    description:
      "Develop a tailored security strategy aligned with your business objectives.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Implement",
    description:
      "Deploy advanced security solutions and establish robust defense mechanisms.",
  },
  {
    icon: ChartBarSquareIcon,
    title: "Monitor",
    description: "Continuous monitoring and optimization of security measures.",
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

export const ProcessSection = () => {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
              Our Process
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              A systematic approach to securing your digital assets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent transform -translate-y-1/2 z-0" />
                )}

                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 border-2 border-cyan-500"
                  >
                    <step.icon className="w-12 h-12 text-cyan-400" />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {step.title}
                  </h3>

                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-16 text-center">
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to strengthen your cybersecurity posture? Let us help you
              protect your digital assets with our proven process.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-cyan-500 text-gray-900 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
