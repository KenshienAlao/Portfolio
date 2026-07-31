"use client";

import { useState } from "react";
import { SkillItem, SKILLS } from "@/config/skills";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionHeader } from "@/components/section-header";

export default function Skills() {
  const categories = ["All", ...Object.keys(SKILLS)];
  const [active, setActive] = useState("All");

  const visibleSkills: Record<string, SkillItem[]> =
    active === "All"
      ? SKILLS
      : { [active]: SKILLS[active as keyof typeof SKILLS] ?? [] };

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
                  "rounded-full border px-4 py-1.5 font-mono text-xs font-semibold",
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
                  {items.map((skill: SkillItem) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-text-primary"
                    >
                      <div className="relative flex h-4 w-4 shrink-0">
                        <Image
                          src={skill.image.light}
                          alt={skill.name}
                          width={16}
                          height={16}
                          className="absolute inset-0 object-contain dark:opacity-0"
                        />
                        <Image
                          src={skill.image.dark}
                          alt={skill.name}
                          width={16}
                          height={16}
                          className="absolute inset-0 object-contain opacity-0 dark:opacity-100"
                        />
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
