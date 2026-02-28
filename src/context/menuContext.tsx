"use client";
import { createContext } from "react";
import { useMenuHandle } from "@/hooks/useMenuHandle";

export const MenuContext = createContext({
  isOpen: false,
  handleMenu: () => {},
});

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, handleMenu } = useMenuHandle();

  return (
    <MenuContext.Provider value={{ isOpen, handleMenu }}>
      {children}
    </MenuContext.Provider>
  );
}
