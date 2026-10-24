import { GraduationCap } from "lucide-react";
import { education } from "@/app/data/education";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-b border-slate-200 px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            title="Education"
            description="The academic foundations behind my work in software engineering."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal
              key={`${item.institution}-${item.duration}`}
              delay={index * 0.08}
              className="h-full"
            >
              <article className="group flex h-full gap-5 rounded-2xl border border-slate-800 bg-slate-800 p-6 text-white transition-colors hover:border-slate-950 hover:bg-white hover:text-slate-950 sm:p-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-700 text-white">
                  <GraduationCap className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-300 transition-colors group-hover:text-slate-600">
                    {item.duration}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-slate-200 transition-colors group-hover:text-slate-700">
                    {item.field}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300 transition-colors group-hover:text-slate-600">
                    {item.institution}
                  </p>
                  <p className="mt-4 inline-flex rounded-full bg-slate-700 px-3 py-1.5 text-xs font-medium text-white">
                    {item.score}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
