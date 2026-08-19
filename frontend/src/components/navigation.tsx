"use client";

import { NAV_ITEMS } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeTogglerButton } from "./theme-toggle";
import { ROUTES } from "@/config/routes";
import { FiMenu } from "react-icons/fi";
import { FaX } from "react-icons/fa6";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <nav
            className={cn(
              "relative flex items-center justify-between rounded-2xl border px-3 py-2 transition-colors duration-300",
              scrolled
                ? "border-border/20 bg-background/80 shadow-lg shadow-black/4 backdrop-blur-2xl dark:shadow-black/15"
                : "border-border/10 bg-surface/40 shadow-sm backdrop-blur-xl",
            )}
          >
            <Link
              href={ROUTES.AUTH.LOGIN}
              className="flex items-center gap-2 pl-1 font-mono text-sm font-bold tracking-tight text-text-primary"
              aria-label="Login"
            >
              <span className="text-accent">$</span>
              <span>kenshien</span>
              <span className="text-accent">_</span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                const active =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "group relative flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold tracking-wide rounded-xl transition-all duration-200",
                      active
                        ? "bg-accent/10 text-accent"
                        : "text-text-secondary hover:bg-surface/60 hover:text-text-primary",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          active
                            ? "scale-110"
                            : "group-hover:scale-110 group-hover:-rotate-3",
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <ThemeTogglerButton className="h-9 w-9 rounded-xl border-border/10 text-sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/10 text-text-secondary md:hidden",
                  mobileMenuOpen
                    ? "bg-accent/10 text-accent"
                    : "bg-surface/60 hover:bg-surface hover:text-text-primary",
                )}
                aria-label="Toggle menu"
              >
                <span className="absolute">
                  <FiMenu className="h-4 w-4" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className="h-18" />

      <div
        className={cn(
          "fixed inset-0 z-60 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed right-0 top-0 z-70 flex h-full w-72 flex-col border-l border-border/10 bg-background/95 backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border/10 px-5 py-4">
          <span className="text-sm font-bold tracking-wider text-text-secondary uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface/60 text-text-secondary hover:bg-surface hover:text-text-primary"
            aria-label="Close menu"
          >
            <FaX className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map(({ label, href, icon: Icon }, i) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold",
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-surface/80 hover:text-text-primary",
                  mobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0",
                )}
                aria-current={active ? "page" : undefined}
                style={{
                  transitionDelay: mobileMenuOpen ? `${150 + i * 50}ms` : "0ms",
                }}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-r-full bg-accent",
                    active ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0",
                  )}
                />
                {Icon && (
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5 transition-transform duration-200",
                      active ? "" : "group-hover:scale-110",
                    )}
                    aria-hidden="true"
                  />
                )}
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
