import { CONTACT_LINKS } from "@/config/contanct";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/15 bg-surface/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <div className="hidden items-center gap-2 font-mono text-sm md:flex">
            <span className="font-bold text-accent">$</span>
            <span className="font-bold tracking-tight text-text-primary">
              kenshien
            </span>
            <span className="text-text-secondary">
              | Developer &amp; Student
            </span>
          </div>

          <div className="flex items-center gap-1">
            {CONTACT_LINKS.map(({ value, href, icon: Icon }) => (
              <Link
                key={`footer-${value}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-surface/80 hover:text-accent"
                aria-label={value}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <p
            className="text-xs text-text-secondary font-medium"
            suppressHydrationWarning
          >
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
