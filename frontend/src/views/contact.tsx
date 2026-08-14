import { Button } from "@/components/ui/button";
import { CONTACT_LINKS } from "@/config/contanct";
import { SectionHeader } from "@/components/section-header";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import { FiDownload, FiExternalLink } from "react-icons/fi";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <SectionHeader
          path="~/contact"
          command="./say-hello.sh"
          title="Get in Touch"
          description="Looking for a developer? I'm available for freelance projects, internships, and full-time opportunities."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-3">
            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 hover:border-accent/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="mb-0.5 font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                      {link.label}
                    </p>
                    <p className="truncate text-sm font-semibold text-text-primary">
                      {link.value}
                    </p>
                  </div>
                  <FiExternalLink className="h-3.5 w-3.5 shrink-0 text-text-secondary" />
                </a>
              );
            })}

            <Button
              type="button"
              asChild
              size="lg"
              variant="outline"
              className="w-full gap-2 rounded-2xl border-border text-text-primary hover:border-accent/50 hover:bg-surface active:scale-95"
            >
              <Link href="/resume.pdf" download>
                <FiDownload className="h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
