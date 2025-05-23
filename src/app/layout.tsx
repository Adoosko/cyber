import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PHOTON | Advanced Cybersecurity Solutions",
  description: "Protect Your Digital Presence with Real-Time Threat Detection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navbar />
        <main className="relative">
          <SmoothScroll>{children}</SmoothScroll>
          {/* Global background gradient */}
          <div className="fixed inset-0 -z-50 bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,99,248,0.06),rgba(0,0,0,0)_50%)]" />
          </div>
        </main>
      </body>
    </html>
  );
}
