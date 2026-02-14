"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [change, setChange] = useState(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      return theme === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (change) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [change]);

  return (
    <ThemeContext.Provider value={{ change, setChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
