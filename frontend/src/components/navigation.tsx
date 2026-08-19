import Link from "next/link";
import { ThemeTogglerButton } from "./theme-toggle";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { ROUTES } from "@/config/routes";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 py-3">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <nav className="relative flex items-center justify-between rounded-2xl border border-border/15 bg-background/85 px-3 py-2 shadow-xs backdrop-blur-xl transition-colors">
          <Link
            href={ROUTES.AUTH.LOGIN}
            className="flex items-center gap-2 pl-1 font-mono text-sm font-bold tracking-tight text-text-primary"
            aria-label="Login"
          >
            <span className="text-accent">$</span>
            <span>kenshien</span>
            <span className="text-accent">_</span>
          </Link>

          <DesktopNav />

          <div className="flex items-center gap-1.5">
            <ThemeTogglerButton className="h-9 w-9 rounded-xl border-border/10 text-sm" />
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
}
