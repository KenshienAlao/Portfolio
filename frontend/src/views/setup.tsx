import { type SetupCategory, type SetupItem } from "@/service/setup.service";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { FiArrowUpRight } from "react-icons/fi";
import { ReactNode } from "react";
import Link from "next/link";

export function Setup({ setups }: { setups: SetupCategory[] | null }) {
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
          {!categories || categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-dashed border-border bg-surface/50">
              <h3 className="font-mono text-base font-bold text-text-primary">
                No setup items available
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                Check back later for updates to this section.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map((cat: SetupCategory) => {
                const items = cat.items ?? [];
                const subButtons: ReactNode[] = [];
                for (const tool of items) {
                  if (tool.subValue && tool.subDownload) {
                    subButtons.push(
                      <Button
                        type="button"
                        key={tool.id}
                        asChild
                        size="sm"
                        className="self-start rounded-lg bg-accent text-on-accent hover:bg-accent/90 shadow-sm shadow-accent/10 text-xs font-mono"
                      >
                        <Link
                          href={tool.subDownload}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tool.subValue}
                        </Link>
                      </Button>,
                    );
                  }
                }

                return (
                  <div
                    key={cat.id}
                    className="group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-accent">
                          {cat.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        {items.map((tool: SetupItem, i: number) => (
                          <span
                            key={tool.id}
                            className="inline-flex items-center gap-1.5"
                          >
                            {tool.imageLight && (
                              <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
                                <Image
                                  src={tool.imageLight}
                                  alt={tool.value}
                                  width={20}
                                  height={20}
                                  unoptimized={
                                    tool.imageLight.startsWith("http") ||
                                    tool.imageLight.startsWith("blob:")
                                  }
                                  style={{ width: "auto", height: "auto" }}
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
                                    style={{ width: "auto", height: "auto" }}
                                    className="object-contain hidden dark:block"
                                  />
                                )}
                              </span>
                            )}

                            {tool.download ? (
                              <Link
                                href={tool.download}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-0.5 text-base font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
                              >
                                {tool.value}
                                <FiArrowUpRight className="w-3 h-3 text-text-secondary" />
                              </Link>
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
                    {subButtons.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {subButtons}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
