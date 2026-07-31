import { CONTACT_LINKS } from "@/config/contanct";
import { Code2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/15 bg-surface/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <div className="hidden items-center gap-2.5 md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <Code2 className="h-4 w-4 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-text-primary">
                Ken
              </span>
              <span className="text-[11px] text-text-secondary/60">
                Developer &amp; Student
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {CONTACT_LINKS.map(({ value, href, icon: Icon }) => (
              <a
                key={`footer-${value}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary/60 hover:bg-surface/80 hover:text-accent"
                aria-label={value}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p
            className="text-xs text-text-secondary/50"
            suppressHydrationWarning
          >
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
