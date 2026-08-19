"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/navigation.config";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
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
  );
}
