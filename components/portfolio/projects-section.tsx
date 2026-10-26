import { ArrowUpRight } from "lucide-react";
import { projects } from "@/app/data/projects";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import { SocialIcon } from "./profile-section";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-slate-200 bg-slate-50/70 px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal once={false}>
          <SectionHeading
            title="Projects I've Contributed To"
            description="A collection of digital products and web applications I've helped bring to life through frontend engineering, full-stack development, and collaborative problem-solving."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={(index % 2) * 0.08}
              className="h-full"
              once={false}
            >
              <article className="group flex h-full flex-col rounded-2xl border border-slate-950 bg-white p-6 text-slate-950 transition-colors duration-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex shrink-0 gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="flex size-9 items-center justify-center rounded-full border border-slate-500 text-slate-700 transition-colors group-hover:border-slate-400 group-hover:text-white hover:border-white hover:bg-white hover:text-slate-950"
                      >
                         <SocialIcon name={""} />
                      </a>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${project.title}`}
                      className="flex size-9 items-center justify-center rounded-full border border-slate-500 text-slate-700 transition-colors group-hover:border-slate-400 group-hover:text-white hover:border-white hover:bg-white hover:text-slate-950"
                    >
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 transition-colors group-hover:text-slate-200">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-slate-800 bg-slate-800 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-slate-950"
                    >
                      {technology}
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
