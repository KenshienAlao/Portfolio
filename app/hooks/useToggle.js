"use client";

import { useState, useEffect } from "react";

export function useToggle() {
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
      console.log(change);
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      console.log(change);
    }
  }, [change]);

  return { change, setChange };
}
