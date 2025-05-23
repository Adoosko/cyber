"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  color: string;
}

const footerSections: FooterSection[] = [
  {
    title: "Služby",
    links: [
      { label: "Sieťové Riešenia", href: "#" },
      { label: "Penetračné Testovanie", href: "#" },
      { label: "Servisné Zmluvy", href: "#" },
      { label: "Firewall Riešenia", href: "#" },
      { label: "DLP Riešenia", href: "#" },
      { label: "Zálohovacie Služby", href: "#" },
    ],
  },
  {
    title: "Spoločnosť",
    links: [
      { label: "O Nás", href: "#" },
      { label: "Kariéra", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Novinky", href: "#" },
      { label: "Partneri", href: "#" },
      { label: "Certifikácie", href: "#" },
    ],
  },
  {
    title: "Podpora",
    links: [
      { label: "Kontakt", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Dokumentácia", href: "#" },
      { label: "Technická Podpora", href: "#" },
      { label: "Status Služieb", href: "#" },
      { label: "Nahlásiť Problém", href: "#" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#", color: "#1877F2" },
  { icon: Instagram, href: "#", color: "#E4405F" },
  { icon: Twitter, href: "#", color: "#1DA1F2" },
  { icon: Linkedin, href: "#", color: "#0A66C2" },
];

const contactInfo = [
  { icon: Phone, text: "+421 903 123 456" },
  { icon: Mail, text: "info@cybersecurity.sk" },
  { icon: MapPin, text: "Hlavná 123, 831 01 Bratislava" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/[0.08] overflow-hidden">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,163,255,0.03),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo.png"
                  alt="CyberSecurity"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-white/60 mb-8 max-w-md">
                Poskytujeme komplexné kybernetické zabezpečenie pre firmy každej
                veľkosti. Chránime vaše dáta, systémy a digitálnu budúcnosť.
              </p>
              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-white/60"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-medium mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2024 CyberSecurity. Všetky práva vyhradené.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                  style={{ color: social.color }}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Ochrana Súkromia
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Podmienky Používania
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
