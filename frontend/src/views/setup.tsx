"use client";

import { type SetupCategory, type SetupItem } from "@/service/setup.service";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { useSetupPublic } from "@/hooks/admin/use-setup-admin";

export function Setup() {
  const { data: setups } = useSetupPublic();

  const categories = setups ?? [];

  return (
    <section
      id="setup"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <SectionHeader
          path="~/setup"
          command="cat .config"
          title="Setup"
          description="The tools I use for development, design, and productivity."
        />

        <div className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((cat: SetupCategory) => {
              const items = cat.items ?? [];

              return (
                <div
                  key={cat.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
                >
                  <div className="flex flex-col gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                      {cat.category}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      {items.map((tool: SetupItem, i: number) => (
                        <span
                          key={tool.id}
                          className="inline-flex items-center gap-1.5"
                        >
                          {tool.imageLight && (
                            <span className="relative h-5 w-5 shrink-0 inline-block">
                              <Image
                                src={tool.imageLight}
                                alt={tool.value}
                                width={20}
                                height={20}
                                unoptimized={
                                  tool.imageLight.startsWith("http") ||
                                  tool.imageLight.startsWith("blob:")
                                }
                                className={`object-contain ${
                                  tool.imageDark ? "dark:hidden" : ""
                                }`}
                              />
                              {tool.imageDark && (
                                <Image
                                  src={tool.imageDark}
                                  alt={tool.value}
                                  width={20}
                                  height={20}
                                  unoptimized={
                                    tool.imageDark.startsWith("http") ||
                                    tool.imageDark.startsWith("blob:")
                                  }
                                  className="object-contain hidden dark:block"
                                />
                              )}
                            </span>
                          )}

                          {tool.download ? (
                            <a
                              href={tool.download}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-base font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
                            >
                              {tool.value}
                              <ArrowUpRight className="w-3 h-3 text-text-secondary" />
                            </a>
                          ) : (
                            <span className="text-base font-bold tracking-tight text-text-primary">
                              {tool.value}
                            </span>
                          )}

                          {i < items.length - 1 && (
                            <span className="ml-1 text-border select-none">
                              /
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-text-secondary leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {items.some((tool) => tool.subValue && tool.subDownload) && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {items
                        .filter((tool) => tool.subValue && tool.subDownload)
                        .map((tool) => (
                          <Button
                            key={tool.id}
                            asChild
                            size="sm"
                            className="self-start rounded-lg bg-accent text-on-accent hover:bg-accent/90 shadow-sm shadow-accent/10 text-xs font-mono"
                          >
                            <a
                              href={tool.subDownload}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {tool.subValue}
                            </a>
                          </Button>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
