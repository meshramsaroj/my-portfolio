import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Mail,
  Phone,
} from "lucide-react";
import { contactDetails, socialMediaLinks } from "@/app/data/otherLinks";
import Reveal from "./reveal";
import TypewriterHeading from "./typewriter-heading";
import SectionButton from "./section-button";

function SocialIcon({ name }: { name: string }) {
  if (name === "LinkedIn") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10H5.67v8h2.67v-8Zm-.03-2.5a1.55 1.55 0 1 0-3.1 0 1.55 1.55 0 0 0 3.1 0ZM18.34 13.4c0-2.42-1.29-3.55-3.01-3.55a2.6 2.6 0 0 0-2.35 1.29V10h-2.67v8h2.67v-4.22c0-1.11.21-2.19 1.59-2.19 1.36 0 1.37 1.28 1.37 2.26V18h2.67l-.27-4.6Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
    >
      <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.78 2.17 3.15 1.53.1-.72.4-1.22.7-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.77 10.77 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z" />
    </svg>
  );
}

export default function ProfileSection() {
  return (
    <section
      id="home"
      className="scroll-mt-24 border-b border-slate-200 px-5 sm:px-8"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <Reveal className="mx-auto w-full max-w-md lg:max-w-none">
          <div>
            <div className="relative mx-auto aspect-square w-full max-w-[28rem] rounded-full bg-slate-100 p-3 sm:p-4">
              <div className="relative size-full overflow-hidden rounded-full border border-slate-200 bg-slate-200">
                <Image
                  src="/profile-image.jpg"
                  alt="Portrait of Saroj Meshram, senior software engineer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover object-[center_25%]"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-3">
              <span className="rounded-full border border-slate-700 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
                Senior Software Engineer
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {["React.js", "Next.js", "TypeScript", "Node.js", "Express.js"].map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-slate-700 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 sm:text-sm"
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {socialMediaLinks.map((social) => {
                return (
                  <Link
                    key={social.title}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit my ${social.title} profile (opens in a new tab)`}
                    title={social.title}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-slate-800 hover:bg-white hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                  >
                    <SocialIcon name={social.title} />
                    {social.title}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-3">
              {contactDetails.map((detail) => {
                if (detail.name === "Email") {
                  return (
                    <span
                      key="email"
                      title={detail.value}
                      className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-800 bg-slate-800 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:border-slate-800 hover:bg-white hover:text-slate-800 sm:text-sm"
                    >
                      <Mail className="size-4 shrink-0" aria-hidden="true" />
                      <span className="break-all">{detail.value}</span>
                    </span>
                  );
                }

                const phoneNumbers = detail.value
                  .split("/")
                  .map((number) => number.trim());

                return (
                  <div
                    key="phone-numbers"
                    className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-slate-800 bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-slate-800 hover:bg-white hover:text-slate-800"
                  >
                    <Phone className="size-4 shrink-0" aria-hidden="true" />
                    {phoneNumbers.map((phoneNumber, index) => (
                      <span key={phoneNumber} className="inline-flex gap-2">
                        {index > 0 && (
                          <span aria-hidden="true" className="text-slate-400">
                            /
                          </span>
                        )}
                        <span>
                          {phoneNumber}
                        </span>
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            A little about me
          </p>
          <TypewriterHeading />

          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              With 6+ years of experience in web development, I specialize in
              building modern, responsive, and high-performance applications
              using React.js, Next.js, TypeScript, and JavaScript. I also work
              with Node.js, Express.js, REST APIs, and MongoDB to bring frontend
              experiences and backend functionality together.
            </p>
            <p>
              I enjoy creating reusable UI architectures, solving complex
              problems, improving application performance, and building
              products that are both user-friendly and maintainable. Beyond
              writing code, I value clean code, collaborative problem-solving,
              code reviews, and sharing knowledge with fellow developers.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              6+ years of experience
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <SectionButton
              href="/contact"
              className="group h-11 rounded-full border border-slate-800 bg-slate-800 px-5 text-white transition-all hover:-translate-y-0.5 hover:border-slate-800 hover:bg-white hover:text-slate-800"
            >
              Contact me
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </SectionButton>
            <SectionButton
              href="/#projects"
              className="group h-11 rounded-full border border-slate-800 bg-slate-800 px-5 text-white transition-all hover:-translate-y-0.5 hover:border-slate-800 hover:bg-white hover:text-slate-800"
            >
              Explore my work
              <ArrowDownRight className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </SectionButton>
            <a
              href="/Saroj_Meshram_Resume_React_Node.pdf"
              download
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-slate-800 bg-slate-800 px-5 text-sm font-medium text-white transition-colors hover:border-slate-800 hover:bg-white hover:text-slate-800"
            >
              Download resume
              <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
