"use client";

import { useEffect } from "react";

export function useScrollToSaved(loading) {
  useEffect(() => {
    // run after loading is complete
    if (!loading) return;

    // prevent browser's default scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const savedSectionId = localStorage.getItem("currentSection");
    if (!savedSectionId || savedSectionId === "home") return;

    // poll for the section element to exist (handles dynamic imports)
    let attempts = 0;
    const maxAttempts = 20; // 10 = 1 seconds

    const checkAndScroll = () => {
      // get the saved section
      const savedSection = document.getElementById(savedSectionId);

      if (savedSection) {
        // if found scroll to it
        // using requestAnimationFrame for instant scrolling
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedSection.offsetTop - 100,
            behavior: "instant",
          });
        });
      } else if (attempts < maxAttempts) {
        // if not found, try again
        attempts++;
        setTimeout(checkAndScroll, 100);
      }
    };

    // checking after a small initial delay
    setTimeout(checkAndScroll, 100);
  }, [loading]);
}
