"use client";
import { useState } from "react";

export function useMenuHandle() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    handleMenu,
  };
}
