"use client";

import { useEffect, useState } from "react";

export function useScrollSpy() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // get all sections
      const sections = document.querySelectorAll("section");

      // get scroll position
      const scrollY = window.scrollY;

      // loop through all sections
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        // if the section is in view, set it as active
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActive(section.id);
          localStorage.setItem("currentSection", section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return active;
}
