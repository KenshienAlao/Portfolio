"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function ThemeTogglerButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleThemeToggle = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 500);
  };

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-surface/30 text-text-secondary hover:bg-surface hover:text-text-primary shadow-xs",
        !mounted && "pointer-events-none opacity-0",
        className,
      )}
      aria-label="Toggle theme"
    >
      {mounted && (
        <div>
          {resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4 text-yellow-400" />
          ) : (
            <Moon className="h-4 w-4 text-blue-500" />
          )}
        </div>
      )}
    </button>
  );
}

export { ThemeTogglerButton };
