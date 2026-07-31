import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/config/projects";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Projects
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
              Projects that showcase my skills in full-stack development, UI
              design, and problem solving.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map(
              ({ id, title, description, image, tags, github, demo }) => (
                <article
                  key={id}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <div className="relative aspect-video overflow-hidden border-b border-border">
                    <Image
                      src={image}
                      alt={title}
                      width={500}
                      height={500}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="text-base font-bold text-text-primary">
                      {title}
                    </h3>

                    <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-2 flex gap-2">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-lg border-border text-text-primary hover:bg-background"
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
                          asChild
                          size="sm"
                          className="rounded-lg bg-accent text-white hover:bg-accent/90"
                        >
                          <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-1.5"
                          >
                            Demo <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
