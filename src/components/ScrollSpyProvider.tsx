"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ReactNode } from "react";

const sections = ["hero", "expertise", "services", "pricing", "contact"];

export function ScrollSpyProvider({ children }: { children: ReactNode }) {
  // Initialize scroll spy
  useScrollSpy(sections);

  return <>{children}</>;
}
