"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [change, setChange] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setChange(true);
      document.documentElement.classList.add("dark");
    } else {
      setChange(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (isDark) => {
    setChange(isDark);
    if (isDark) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ change, setChange: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
