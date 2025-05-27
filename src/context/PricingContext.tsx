"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface PricingContextType {
  selectedPlan: string | null;
  setSelectedPlan: (plan: string | null) => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <PricingContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
}
