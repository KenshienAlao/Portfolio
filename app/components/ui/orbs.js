"use client";

// lib
import { motion } from "framer-motion";

// ui
import { floatingVariants } from "@/app/utils/animation";

// ===================================
// orbs
// ===================================

// green orb
export function GreenOrbIcon({ top, bottom, left, right }) {
  // set position styles
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
  };

  // return green orb
  return (
    <motion.div
      variants={floatingVariants}
      initial="openingRight"
      animate={["visible", "downAndUp"]}
      style={positionStyles}
      className="pointer-events-none absolute size-96 rounded-full bg-green-500/30 blur-3xl"
    />
  );
}

// blue orb
export function BlueOrbIcon({ top, bottom, left, right }) {
  // set position styles
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
  };

  // return blue orb
  return (
    <motion.div
      variants={floatingVariants}
      initial="openingLeft"
      animate={["visible", "upAndDown"]}
      style={positionStyles}
      className="pointer-events-none absolute size-96 rounded-full bg-blue-500/30 blur-3xl"
    />
  );
}
