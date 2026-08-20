"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import { FiMenu } from "react-icons/fi";
import { FaX } from "react-icons/fa6";

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const drawerOverlay = isOpen && (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex h-full w-72 flex-col border-l border-border/15 bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/10 px-5 py-4">
          <span className="text-sm font-bold tracking-wider text-text-secondary uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface/60 text-text-secondary hover:bg-surface hover:text-text-primary"
            aria-label="Close menu"
          >
            <FaX className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-surface/80 hover:text-text-primary",
                )}
                aria-current={active ? "page" : undefined}
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
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/10 text-text-secondary",
          isOpen
            ? "bg-accent/10 text-accent"
            : "bg-surface/60 hover:bg-surface hover:text-text-primary",
        )}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <FiMenu className="h-4 w-4" aria-hidden="true" />
      </button>

      {mounted && createPortal(drawerOverlay, document.body)}
    </div>
  );
}
