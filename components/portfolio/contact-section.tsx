import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Reveal from "./reveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-[calc(100svh-4.5rem)] scroll-mt-24 items-center px-5 py-20 sm:px-8 sm:py-24"
    >
      <Reveal className="w-full">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Contact
          </p>
          <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Have something good in mind?
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-300">
                I’m always glad to hear about thoughtful products, interesting
                challenges, and opportunities to build something useful
                together.
              </p>
            </div>
            <Link
              href="/#home"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-slate-950 md:self-auto"
            >
              Back to top <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
