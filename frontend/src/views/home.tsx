import { Button } from "@/components/ui/button";
import { NAV_PAGES } from "@/config/navigation.config";
import { ArrowRight, Code2, Zap, Layers, Accessibility } from "lucide-react";

const CAPABILITIES = [
  { icon: Code2, label: "Develop" },
  { icon: Layers, label: "Design" },
  { icon: Zap, label: "Optimize" },
  { icon: Accessibility, label: "Accessible" },
];

export function Hero({ changePage }: { changePage: (page: string) => void }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div
        className="glow-accent pointer-events-none absolute -top-24 left-1/2 h-105 w-105 -translate-x-1/2 opacity-70"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <p className="slide-up flex items-center gap-2 font-mono text-xs text-accent sm:text-sm">
            <span className="text-text-secondary">~/kenshien</span>
            <span className="text-text-secondary">$</span>
            <span>whoami</span>
          </p>

          <h1 className="slide-up stagger-1 mt-4 text-5xl font-extrabold leading-[0.95] tracking-tight text-text-primary text-balance sm:text-6xl md:text-7xl">
            Kenshien
            <br />
            <span className="text-accent">Alao</span>
          </h1>

          <p className="slide-up stagger-2 mt-5 font-mono text-sm text-text-secondary sm:text-base">
            Web Developer | Helping Businesses Grow Online
          </p>

          <p className="slide-up stagger-3 mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg text-pretty">
            I help businesses grow their online presence by building modern web
            applications and high-converting landing pages that are fast,
            responsive, and designed to turn visitors into customers.
          </p>

          <p className="slide-up stagger-4 mt-6 font-mono text-sm text-accent">
            <span className="caret">&gt; building for the web</span>
          </p>

          <div className="slide-up stagger-5 mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => changePage(NAV_PAGES.LINKS.PROJECTS)}
              size="lg"
              className="w-full rounded-full bg-accent px-8 font-semibold text-on-accent hover:bg-accent/90 active:scale-95 sm:w-auto"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              type="button"
              onClick={() => changePage(NAV_PAGES.LINKS.CONTACT)}
              size="lg"
              variant="outline"
              className="w-full rounded-full border-border bg-transparent px-8 font-semibold text-text-primary hover:border-accent/50 hover:bg-surface active:scale-95 sm:w-auto"
            >
              Get in Touch
            </Button>
          </div>

          <div className="slide-up stagger-6 mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border/60 pt-6">
            {CAPABILITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
