"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";


/**
 * @returns {TSX.Element} ThemeToggle component
 */

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed right-5 bottom-5 z-50">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <Sun size={50} /> : <Moon size={50} />}
      </button>
    </div>
  );
}
