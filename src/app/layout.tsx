import { CookieConsent } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";
import { ScrollSpyProvider } from "@/components/ScrollSpyProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PricingProvider } from "@/context/PricingContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KTA | Kybernetická Technická Asociácia",
  description:
    "Profesionálne služby kybernetickej bezpečnosti a poradenstvo v súlade so zákonom NIS2. Kybernetická Technická Asociácia - Váš partner pre digitálnu bezpečnosť.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <PricingProvider>
          <ScrollSpyProvider>
            <Navbar />
            <main className="relative">
              <SmoothScroll>{children}</SmoothScroll>
              {/* Global background gradient */}
              <div className="fixed inset-0 -z-50 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,99,248,0.06),rgba(0,0,0,0)_50%)]" />
              </div>
            </main>
            <CookieConsent />
          </ScrollSpyProvider>
        </PricingProvider>
      </body>
    </html>
  );
}
