"use client";

import { useState } from "react";
import { SkillItem, SKILLS } from "@/config/skills";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Skills
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto">
              Tools and technologies I work with across the stack.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold border",
                  active === cat
                    ? "bg-accent text-white border-accent"
                    : "bg-transparent text-text-secondary border-border hover:border-text-secondary hover:text-text-primary",
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
                className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
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
