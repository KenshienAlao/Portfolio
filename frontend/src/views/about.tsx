"use client";

import { SectionHeader } from "@/components/section-header";
import { useProjectPublic } from "@/hooks/admin/use-project-admin";
import { FaStar } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { PiFolderOpenFill } from "react-icons/pi";

const STACK = ["React", "Next.js", "TypeScript", "Spring Boot", "PostgreSQL"];

export function About() {
  const { data: projects } = useProjectPublic();

  const HIGHLIGHTS = {
    STATS: [
      {
        label: "Years of Experience",
        value: `${Math.max(1, new Date().getFullYear() - 2024)}+`,
      },
      {
        label: "Projects Completed",
        value: projects?.length ?? (
          <div className="h-7 w-8 animate-pulse rounded-md bg-muted-foreground/15" />
        ),
      },
      { label: "Tech Stack Focus", value: "NextJS" },
    ],
    ICONS: [FaStar, PiFolderOpenFill, FiLayers],
  } as const;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <SectionHeader
          path="~/about"
          command="cat about.md"
          title="About Me"
          description="A developer who cares about clean interfaces, reliable backends, and software that solves real problems."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <div className="mb-6 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-accent/40" />
                <span className="h-3 w-3 rounded-full bg-accent/70" />
                <span className="ml-3 font-mono text-xs text-text-secondary">
                  about.md
                </span>
              </div>
              <div className="space-y-5 text-base leading-relaxed text-text-secondary">
                <p>
                  I&apos;m a web developer passionate about building modern web
                  applications.
                </p>

                <p>
                  I focus on creating responsive user interfaces, reliable
                  backend systems, and clean, maintainable code.
                </p>
              </div>
              <div className="mt-8">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                  core stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {STACK.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-background px-3 py-1 font-mono text-xs font-medium text-text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            {HIGHLIGHTS.STATS.map(({ label, value }, i) => {
              const Icon = HIGHLIGHTS.ICONS[i];
              return (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-accent/40"
                >
                  {Icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <div className="text-2xl font-extrabold text-text-primary">
                      {value}
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                      {label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
