"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const testimonial = {
  quote:
    "CyberNova's proactive approach to cybersecurity has transformed our digital defense strategy. Their expertise and cutting-edge solutions provide us with peace of mind in an increasingly complex threat landscape.",
  author: "Sarah Chen",
  position: "CTO, TechForward Solutions",
  rating: 5,
};

const stats = [
  { value: "99.9%", label: "Threat Detection Rate" },
  { value: "24/7", label: "Active Monitoring" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "<15min", label: "Response Time" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const TrustSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Testimonial */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100 0H0V100H100V0Z" fill="currentColor" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 100L100 0H0V100Z"
                  fill="cyan"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-200 mb-6 relative">
                <span className="absolute -left-4 -top-4 text-4xl text-cyan-500/20">
                  &ldquo;
                </span>
                {testimonial.quote}
                <span className="absolute -right-4 -bottom-4 text-4xl text-cyan-500/20">
                  &rdquo;
                </span>
              </blockquote>

              <div>
                <div className="font-semibold text-white">
                  {testimonial.author}
                </div>
                <div className="text-cyan-400">{testimonial.position}</div>
              </div>
            </div>
          </motion.div>

          {/* Trusted By Section */}
          <motion.div variants={itemVariants} className="mt-20 text-center">
            <h3 className="text-2xl font-semibold text-white mb-8">
              Trusted By Industry Leaders
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-800/50 p-6 rounded-lg">
                  <div className="h-12 flex items-center justify-center">
                    <div className="w-32 h-8 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
