import { HIGHLIGHTS } from "@/config/highlights";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              About Me
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
          </div>

          <div className="mx-auto max-w-3xl space-y-10">
            <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
              <p>
                I&apos;m a developer focused on building modern web
                applications, business websites, and landing pages that are
                fast, scalable, and easy to maintain.
              </p>
              <p>
                My main stack includes{" "}
                <strong className="font-semibold text-text-primary">
                  React, Next.js, TypeScript, Spring Boot, and PostgreSQL
                </strong>
                . I enjoy creating clean user interfaces and reliable backend
                systems.
              </p>
              <p>
                I believe great software should be simple to use, perform well,
                and solve real problems for both businesses and users.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.STATS.map(({ label, value }, i) => {
                const Icon = HIGHLIGHTS.ICONS[i];
                return (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface p-6 text-center"
                  >
                    {Icon && (
                      <div className="rounded-lg bg-accent/10 p-2.5 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                    )}
                    <div className="text-3xl font-extrabold text-text-primary">
                      {value}
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
