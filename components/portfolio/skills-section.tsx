import { Code2, Sparkles } from "lucide-react";
import { skills } from "@/app/data/skills";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-b border-slate-200 bg-slate-50/70 px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            title="Technologies & Core Competencies"
            description="A curated set of technologies, frameworks, and development tools I use to build responsive user interfaces, develop full-stack applications, optimize performance, and deliver maintainable software solutions."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal
              key={group.category}
              delay={(index % 3) * 0.07}
              className="h-full"
            >
              <article className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-slate-950 hover:shadow-xl hover:shadow-slate-950/10 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">
                    {group.category}
                  </h3>
                  <span className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-950 group-hover:text-white">
                    {index === 0 ? (
                      <Sparkles className="size-4" />
                    ) : (
                      <Code2 className="size-4" />
                    )}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge-border"
                    >
                      <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-transparent bg-slate-800 px-3.5 py-2 text-xs font-medium text-white transition-colors duration-200 hover:border-slate-800 hover:bg-white hover:text-slate-800 sm:text-sm">
                        {skill}
                      </span>
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
