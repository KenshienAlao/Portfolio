"use client";

import { useState, useEffect } from "react";

export function useToggle() {
  const [change, setChange] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setChange(theme === "dark");
  }, []);

  useEffect(() => {
    if (change) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [change]);

  return { change, setChange};
}
