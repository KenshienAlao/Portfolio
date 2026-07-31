import { Button } from "@/components/ui/button";
import { NAV_PAGES } from "@/config/navigation.config";
import { ArrowRight } from "lucide-react";

export function Hero({ changePage }: { changePage: (page: string) => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-73px)] flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              Web Developer
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight text-text-primary md:text-7xl">
              Kenshie Alao
            </h1>
          </div>

          <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed md:text-lg">
            I help small and medium businesses establish a strong online
            presence through modern, professional websites that attract
            customers and drive measurable results.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-2">
            <Button
              onClick={() => changePage(NAV_PAGES.LINKS.PROJECTS)}
              size="lg"
              className="w-full rounded-full bg-accent px-8 text-white hover:bg-accent/90 active:scale-95 sm:w-auto"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => changePage(NAV_PAGES.LINKS.CONTACT)}
              size="lg"
              variant="outline"
              className="w-full rounded-full border-border bg-transparent px-8 text-text-primary hover:bg-surface active:scale-95 sm:w-auto"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
