import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, MessageSquare } from "lucide-react";
import { CONTACT_LINKS } from "@/config/contanct";

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

          <div className="grid gap-4 md:grid-cols-2 items-stretch">
            <div className="flex flex-col gap-3">
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
            </div>

            <div className="flex flex-col justify-center items-center rounded-xl border border-border bg-surface p-8 text-center">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-text-primary tracking-tight">
                Available for Opportunities
              </h3>
              <p className="mb-7 text-sm text-text-secondary leading-relaxed max-w-sm">
                I&apos;m currently looking for freelance projects, full-time
                roles, and exciting collaborations. Let&apos;s build something
                amazing together.
              </p>
              <Button
                asChild
                size="lg"
                className="w-full rounded-lg bg-accent text-white hover:bg-accent/90 active:scale-95 gap-2"
              >
                <a
                  href="mailto:kenshienworkacc@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="h-4 w-4" />
                  Send me an Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
