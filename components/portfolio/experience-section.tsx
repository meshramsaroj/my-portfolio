import { BriefcaseBusiness } from "lucide-react";
import { experience } from "@/app/data/experiance";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-slate-200 px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            title="My Professional Journey"
            description="A journey of building impactful web applications, solving engineering challenges, and collaborating with teams to deliver reliable software solutions."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {experience.map((job, index) => (
            <Reveal
              key={`${job.company}-${job.period}`}
              delay={(index % 2) * 0.08}
              className="h-full"
            >
              <article className="h-full overflow-hidden rounded-2xl border border-slate-800 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/20">
                <div className="flex items-start justify-between gap-4 bg-slate-700 p-6 text-white sm:p-7">
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      {job.period}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-slate-300">
                      {job.company}
                      <span className="text-slate-400"> · {job.location}</span>
                    </p>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                    <BriefcaseBusiness className="size-5" />
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <ul className="space-y-3">
                    {job.points.slice(0, 6).map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-6 text-slate-600"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-950" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
