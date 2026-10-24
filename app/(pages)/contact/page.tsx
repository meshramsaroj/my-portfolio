
import type { Metadata } from "next";
import ContactSection from "@/components/portfolio/contact-section";
import PortfolioFooter from "@/components/portfolio/portfolio-footer";

export const metadata: Metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch to discuss projects and opportunities.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <main>
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}