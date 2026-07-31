import { NAV_PAGES } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeTogglerButton } from "./theme-toggle";

type NavProps = {
  currentPath: string;
  setCurrentPage: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
};

const navKeys = Object.keys(NAV_PAGES.LINKS) as Array<
  keyof typeof NAV_PAGES.LINKS
>;

export function Navigation({
  currentPath,
  setCurrentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavProps) {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 10;
    }
    return false;
  });
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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

  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const activeEl = nav.querySelector<HTMLElement>('[aria-current="page"]');
    if (!activeEl) return;

    Object.assign(indicator.style, {
      width: `${activeEl.offsetWidth}px`,
      left: `${activeEl.offsetLeft}px`,
      opacity: "1",
    });
  }, [currentPath]);

  const go = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <nav
            className={cn(
              "relative flex items-center justify-end rounded-2xl border px-3 py-2 md:justify-between",
              scrolled
                ? "border-border/20 bg-background/80 shadow-lg shadow-black/4 backdrop-blur-2xl dark:shadow-black/15"
                : "border-border/10 bg-surface/40 shadow-sm backdrop-blur-xl",
            )}
          >
            <div ref={navRef} className="relative hidden items-center md:flex">
              <div
                ref={indicatorRef}
                className="absolute top-0 h-full rounded-xl bg-accent/10 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{
                  opacity: 0,
                  transform: "translateZ(0)",
                }}
              />

              {navKeys.map((key, i) => {
                const page = NAV_PAGES.LINKS[key];
                const Icon = NAV_PAGES.ICONS[key];
                const active = currentPath === page.toLowerCase();
                return (
                  <Link
                    key={page}
                    href={`#${page.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(page);
                    }}
                    className={cn(
                      "group relative z-10 flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold tracking-wide",
                      "rounded-xl",
                      active
                        ? "text-accent"
                        : "text-text-secondary hover:text-text-primary",
                    )}
                    aria-current={active ? "page" : undefined}
                    style={{
                      animationDelay: `${i * 40}ms`,
                    }}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          active
                            ? "scale-110"
                            : "group-hover:scale-110 group-hover:-rotate-3",
                        )}
                      />
                    )}
                    <span>{page}</span>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent",
                        active
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0",
                      )}
                    />
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
                  <Menu className="h-4 w-4" />
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
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {navKeys.map((key, i) => {
            const page = NAV_PAGES.LINKS[key];
            const Icon = NAV_PAGES.ICONS[key];
            const active = currentPath === page.toLowerCase();
            return (
              <button
                type="button"
                key={page}
                onClick={() => go(page)}
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
                  />
                )}
                <span>{page}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
