"use client";

import { ContactSection } from "@/components/ContactSection";
import { CyberExcellenceSection } from "@/components/CyberExcellenceSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { PricingSection } from "@/components/PricingSection";
import { ServicesSection } from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <ExpertiseSection />
      <ServicesSection />
      <CyberExcellenceSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
