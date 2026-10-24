"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import PortfolioHeader from "./portfolio-header";
import { navigation, type SectionId } from "./navigation";

export default function SiteNavigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentSection: SectionId =
    pathname === "/contact" ? "contact" : activeSection;

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 12);

    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = navigation
      .filter(({ id }) => id !== "contact")
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id as SectionId);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <PortfolioHeader
        activeSection={currentSection}
        isScrolled={isScrolled}
        menuOpen={menuOpen}
        onNavigate={setActiveSection}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
      />
    </MotionConfig>
  );
}
