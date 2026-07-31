import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import { CONTACT_LINKS } from "@/config/contanct";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Get in Touch
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Looking for a developer? I&apos;m available for freelance
              projects, internships, and full-time opportunities.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 items-start">
            <div className="flex flex-col gap-3">
              <a
                href="mailto:kenshienworkacc@gmail.com"
                className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 hover:border-border/60"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <ExternalLink className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-0.5">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-text-primary truncate">
                    kenshienworkacc@gmail.com
                  </p>
                </div>
              </a>

              {CONTACT_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 hover:border-border/60"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-0.5">
                        {link.label}
                      </p>
                      <p className="text-sm font-semibold text-text-primary truncate">
                        {link.value}
                      </p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-text-secondary shrink-0" />
                  </a>
                );
              })}

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-xl border-border text-text-primary hover:bg-surface active:scale-95 gap-2"
              >
                <a href="/resume.pdf" download>
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
