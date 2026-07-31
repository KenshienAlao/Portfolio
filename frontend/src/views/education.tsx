import { EDUCATION } from "@/config/education";
import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

export function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeader
          path="~/education"
          command="git log --reverse"
          title="Education"
          description="My academic journey and the milestones that shaped my path in technology."
        />

        <ol className="relative mt-14 ml-3 space-y-8 border-l border-border">
          {EDUCATION.map((item) => (
            <li key={`${item.school}-${item.years}`} className="relative pl-8">
              <span className="absolute -left-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-accent">
                <GraduationCap className="h-3.5 w-3.5" />
              </span>

              <div className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-bold text-text-primary">
                    {item.school}
                  </h3>
                  <span className="w-fit shrink-0 rounded-md bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                    {item.years}
                  </span>
                </div>

                <p className="mt-1 font-mono text-sm font-semibold text-text-secondary">
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
    </section>
  );
}
