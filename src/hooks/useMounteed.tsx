import { useEffect, useState } from "react";

/**
 * @returns {boolean} - Whether the component is mounted and all assets are fully loaded
 */

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if the page has already loaded all assets (like images/CSS)
    if (document.readyState === "complete") {
      setMounted(true);
    } else {
      // If it's still loading (e.g. slow WiFi), wait for the "load" event
      const handleLoad = () => setMounted(true);
      window.addEventListener("load", handleLoad);

      // Cleanup listener
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return { mounted, setMounted };
}
