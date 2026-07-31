"use client";

import { SETUP_ITEMS } from "@/config/setup";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Setup() {
  return (
    <section
      id="setup"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Setup
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
              The tools I use for development, design, and productivity.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SETUP_ITEMS.map((item) => {
              const values = Array.isArray(item.value)
                ? item.value
                : [item.value];
              const downloads = Array.isArray(item.download)
                ? item.download
                : [item.download];
              const lightImages = Array.isArray(item.image.light)
                ? item.image.light
                : [item.image.light];
              const darkImages = Array.isArray(item.image.dark)
                ? item.image.dark
                : [item.image.dark];

              return (
                <div
                  key={item.category}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-3 min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
                        {item.category}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        {values.map((v, i) => (
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
                          className="self-start rounded-lg bg-accent text-white hover:bg-accent/90 shadow-sm shadow-accent/10"
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
                      {lightImages.map((src, idx) => (
                        <div
                          key={`${src}-${idx}`}
                          className="relative h-10 w-10 rounded-lg border border-border bg-background flex items-center justify-center p-2"
                        >
                          <Image
                            src={src}
                            alt="Tool icon"
                            width={24}
                            height={24}
                            className="absolute inset-0 m-auto h-5 w-5 object-contain dark:opacity-0"
                          />
                          {darkImages[idx] && (
                            <Image
                              src={darkImages[idx]}
                              alt="Tool icon"
                              width={24}
                              height={24}
                              className="absolute inset-0 m-auto h-5 w-5 object-contain opacity-0 dark:opacity-100"
                            />
                          )}
                        </div>
                      ))}
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
