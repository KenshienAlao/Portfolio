"use client";

import { createContext, useState, useEffect } from "react";
import { useMounted } from "@/hooks/useMounteed";

export const LoadingContext = createContext({
  loading: true,
  setLoading: (loading: boolean) => {},
});

/**
 * @param {React.ReactNode} children - children
 * @returns {JSX.Element} loading provider
 */

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { mounted } = useMounted();

  useEffect(() => {
    if (mounted) {
      setLoading(false);
    }
  }, [mounted]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
