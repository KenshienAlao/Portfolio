"use client";

// lib
import { createContext, useContext, useState, useEffect } from "react";

// context
const MountedContext = createContext(false);

export function MountedProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MountedContext.Provider value={mounted}>
      {children}
    </MountedContext.Provider>
  );
}

export function useMounted() {
  return useContext(MountedContext);
}
