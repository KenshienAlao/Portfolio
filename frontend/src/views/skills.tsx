"use client";

import { useState } from "react";
import { type Skill } from "@/service/skill.service";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionHeader } from "@/components/section-header";

export function Skills({ skills }: { skills: Skill[] | null }) {
  const groupedSkills = (() => {
    if (!skills) return {};
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      const cat = skill.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});
  })();

  const categories = ["All", ...Object.keys(groupedSkills)];
  const [active, setActive] = useState("All");

  const visibleSkills: Record<string, Skill[]> =
    active === "All"
      ? groupedSkills
      : { [active]: groupedSkills[active] ?? [] };

  return (
    <section
      id="skills"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <SectionHeader
          path="~/skills"
          command="npm ls --global"
          title="Skills"
          description="Tools and technologies I work with across the stack."
        />

        <div className="mt-12 space-y-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs font-semibold transition-colors",
                  active === cat
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border bg-transparent text-text-secondary hover:border-accent/50 hover:text-text-primary",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(visibleSkills).map(([category, items]) => (
              <div
                key={category}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-accent/40"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill: Skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-text-primary"
                    >
                      <div className="relative flex h-4 w-4 shrink-0">
                        {skill.imageLight ? (
                          <Image
                            src={skill.imageLight}
                            alt={skill.name}
                            fill
                            sizes="32px"
                            unoptimized={skill.imageLight.startsWith("http")}
                            className={cn(
                              "absolute inset-0 object-contain",
                              skill.imageDark ? "dark:hidden" : "",
                            )}
                          />
                        ) : null}
                        {skill.imageDark ? (
                          <Image
                            src={skill.imageDark}
                            alt={skill.name}
                            fill
                            sizes="32px"
                            unoptimized={skill.imageDark.startsWith("http")}
                            className="absolute inset-0 object-contain hidden dark:block"
                          />
                        ) : null}
                      </div>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
