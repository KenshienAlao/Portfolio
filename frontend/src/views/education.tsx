import { EDUCATION } from "@/config/education";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section
      id="education"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-3xl">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Education
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
              My academic journey and the milestones that shaped my path in
              technology.
            </p>
          </div>

          <ol className="relative ml-3 space-y-10 border-l border-border">
            {EDUCATION.map((item) => (
              <li key={`${item.school}-${item.years}`} className="relative pl-8">
                <span className="absolute -left-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-accent">
                  <GraduationCap className="h-3.5 w-3.5" />
                </span>

                <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-base font-bold text-text-primary">
                      {item.school}
                    </h3>
                    <span className="shrink-0 rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      {item.years}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-text-secondary">
                    {item.degree}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
