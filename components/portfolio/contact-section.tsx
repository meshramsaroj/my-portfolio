import { Download, Mail, Phone, Sparkles } from "lucide-react";
import { contactDetails } from "@/app/data/otherLinks";
import Link from "next/link";
import Reveal from "./reveal";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="h-full">
          <div className="relative flex h-full min-h-[30rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-800 p-7 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full border border-white/10"
            />

            <div className="relative">
              <span className="skill-badge-border">
                <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-slate-800 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Get in touch
                </span>
              </span>
              <h1 className="mt-8 max-w-md text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Let&apos;s Connect and Create Something Great.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                I&apos;m open to exciting job opportunities, meaningful collaborations, and innovative project ideas. If you&apos;re looking for a developer to join your team, have an interesting idea to discuss, or would simply like to connect, feel free to reach out. I&apos;d love to hear from you!
              </p>
              <Link
                href="/Saroj_Meshram_Resume_React_Node.pdf"
                download
                className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full border border-slate-600 bg-slate-700 px-5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-slate-800"
              >
                Download resume
                <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>

            <div className="relative mt-12 space-y-3">
              {contactDetails.map((detail) => {
                if (detail.name === "Email") {
                  return (
                    <div
                      key={detail.name}
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                        <Mail className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-slate-400">
                          Email
                        </span>
                        <span className="mt-1 block break-all text-sm font-medium text-white">
                          {detail.value}
                        </span>
                      </span>
                    </div>
                  );
                }

                return detail.value.split("/").map((number) => {
                  const phoneNumber = number.trim();

                  return (
                    <div
                      key={number}
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                        <Phone className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-slate-400">
                          Phone
                        </span>
                        <span className="mt-1 block text-sm font-medium text-white">
                          {phoneNumber}
                        </span>
                      </span>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <div className="h-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-10">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Your message
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Tell me what you have in mind.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Fill out the form and I&apos;ll get back to you as soon as I
                can.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
