import { useCallback } from "react";

export function useScrollToSection(offset = 100) {
  // return a scroll function
  const scrollToSection = useCallback(
    (id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const y = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    },
    [offset],
  );

  return scrollToSection;
}
