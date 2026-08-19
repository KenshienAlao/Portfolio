"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { SectionHeader } from "@/components/section-header";
import { useProjectPublic } from "@/hooks/admin/use-project-admin";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";
import { FiArrowUpRight } from "react-icons/fi";

export function Projects() {
  const { data: projects, isPending: projectIsPending } = useProjectPublic();

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <SectionHeader
          path="~/projects"
          command="ls -la"
          title="Projects"
          description="Selected work showcasing full-stack development, UI design, and problem solving."
        />

        {(!projects || projects.length === 0) && !projectIsPending ? (
          <div className="mt-14 flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-dashed border-border bg-surface/50">
            <h3 className="font-mono text-base font-bold text-text-primary">
              No projects available
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Check back later for updates to this section.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projectIsPending
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <ProjectCardSkeleton key={idx} />
                ))
              : projects?.map(
                  (
                    { id, title, description, image, tags, github, demo },
                    idx,
                  ) => (
                    <article
                      key={id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface hover:border-accent/40"
                    >
                      <div className="relative aspect-video overflow-hidden border-b border-border">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                          priority={idx === 0}
                          loading={idx === 0 ? "eager" : "lazy"}
                          fetchPriority={idx === 0 ? "high" : "auto"}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <h3 className="font-mono text-base font-bold text-text-primary">
                          {title}
                        </h3>

                        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
                          {description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto flex gap-2 pt-2">
                          <Button
                            type="button"
                            asChild
                            size="sm"
                            variant="outline"
                            className="rounded-lg border-border text-text-primary hover:border-accent/50 hover:bg-background"
                          >
                            <a
                              href={github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gap-2"
                            >
                              <FaGithub className="h-4 w-4" /> Code
                            </a>
                          </Button>
                          {demo && (
                            <Button
                              type="button"
                              asChild
                              size="sm"
                              className="rounded-lg bg-accent text-on-accent hover:bg-accent/90"
                            >
                              <a
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gap-1.5"
                              >
                                Demo <FiArrowUpRight className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </article>
                  ),
                )}
          </div>
        )}
      </div>
    </section>
  );
}
