"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "./scroll-to-section";
import { navigation, type SectionId } from "./navigation";

type PortfolioHeaderProps = {
  activeSection: SectionId;
  isScrolled: boolean;
  menuOpen: boolean;
  onNavigate: (section: SectionId) => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

export default function PortfolioHeader({
  activeSection,
  isScrolled,
  menuOpen,
  onNavigate,
  onToggleMenu,
  onCloseMenu,
}: PortfolioHeaderProps) {
  const navLinks = (mobile = false) =>
    navigation.map((item) => {
      const isActive = activeSection === item.id;

      return (
        <Link
          key={item.id}
          href={item.href}
          aria-current={isActive ? "location" : undefined}
          onClick={(event) => {
            scrollToSection(event, item.href);
            onNavigate(item.id);
            if (mobile) onCloseMenu();
          }}
          className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
            isActive
              ? "text-slate-950"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="active-navigation"
              className="absolute inset-0 rounded-full bg-white"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </Link>
      );
    });

  return (
    <header
      className={`sticky top-0 z-50 border-b text-white backdrop-blur-xl transition-colors duration-300 ${
        isScrolled
          ? "border-slate-700/80 bg-slate-800/80"
          : "border-slate-700 bg-slate-800/95"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/#home"
          onClick={(event) => {
            scrollToSection(event, "/#home");
            onNavigate("home");
            onCloseMenu();
          }}
          className="group flex items-center gap-2.5 font-semibold tracking-tight text-white"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950 transition-transform group-hover:-rotate-6">
            SM
          </span>
          <span className="text-base">Saroj Meshram</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-slate-700 bg-slate-900 p-1 md:flex">
          {navLinks()}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-700 bg-slate-800 md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8"
            >
              {navLinks(true)}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
