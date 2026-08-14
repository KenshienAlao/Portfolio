"use client";

import { type Setup } from "@/service/setup.service";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { useSetupPublic } from "@/hooks/admin/use-setup-admin";

export function Setup() {
  const { data: setups } = useSetupPublic();

  const items = setups ?? [];

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
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item: Setup) => {
              const values = item.values ?? [];
              const downloads = item.downloads ?? [];

              return (
                <div
                  key={item.category}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-3 min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                        {item.category}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        {values.map((v: string, i: number) => (
                          <span
                            key={v}
                            className="inline-flex items-center gap-1"
                          >
                            {downloads[i] ? (
                              <a
                                href={downloads[i]!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-lg font-bold tracking-tight text-text-primary"
                              >
                                {v}
                                <ArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
                              </a>
                            ) : (
                              <span className="text-lg font-bold tracking-tight text-text-primary">
                                {v}
                              </span>
                            )}
                            {i < values.length - 1 && (
                              <span className="ml-1 text-border select-none">
                                /
                              </span>
                            )}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>

                      {item.subValue && item.subDownload && (
                        <Button
                          asChild
                          size="sm"
                          className="self-start rounded-lg bg-accent text-on-accent hover:bg-accent/90 shadow-sm shadow-accent/10"
                        >
                          <a
                            href={item.subDownload}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.subValue}
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.imageLight && (
                        <div className="relative h-10 w-10 rounded-lg border border-border bg-background flex items-center justify-center p-2">
                          <Image
                            src={item.imageLight}
                            alt="Tool icon"
                            width={24}
                            height={24}
                            unoptimized={
                              item.imageLight.startsWith("http") ||
                              item.imageLight.startsWith("blob:")
                            }
                            className="absolute inset-0 m-auto h-5 w-5 object-contain dark:opacity-0"
                          />
                          {item.imageDark && (
                            <Image
                              src={item.imageDark}
                              alt="Tool icon"
                              width={24}
                              height={24}
                              unoptimized={
                                item.imageDark.startsWith("http") ||
                                item.imageDark.startsWith("blob:")
                              }
                              className="absolute inset-0 m-auto h-5 w-5 object-contain opacity-0 dark:opacity-100"
                            />
                          )}
                        </div>
                      )}
                    </div>
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
