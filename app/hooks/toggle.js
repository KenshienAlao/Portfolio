"use client";

import { useState, useEffect } from "react";

export default function useToggle() {
  const [change, setChange] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setChange(theme === "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (change) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [change, mounted]);

  return { change, setChange, mounted };
}
