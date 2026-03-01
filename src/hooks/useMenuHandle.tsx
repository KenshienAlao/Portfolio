"use client";
import { useState } from "react";

/**
 * @returns {boolean} - Whether the menu is open
 * @returns {function} - Function to handle the menu
 */

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
