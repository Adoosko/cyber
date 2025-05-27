import { useEffect, useState } from "react";

export const useScrollSpy = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find the current section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const { top, bottom } = element.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        const elementBottom = bottom + window.scrollY;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          if (activeSection !== section) {
            setActiveSection(section);
            // Update URL without causing a page reload
            window.history.replaceState(null, "", `#${section}`);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, activeSection]);

  return activeSection;
};
