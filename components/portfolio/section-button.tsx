"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "./scroll-to-section";

type SectionButtonProps = {
  href: string;
  className: string;
  children: ReactNode;
};

export default function SectionButton({
  href,
  className,
  children,
}: SectionButtonProps) {
  return (
    <Button
      render={<Link href={href} />}
      nativeButton={false}
      onClick={(event) => scrollToSection(event, href)}
      className={className}
    >
      {children}
    </Button>
  );
}
