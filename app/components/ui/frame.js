"use client";

// lib
import { motion } from "framer-motion";

// ===================================
// frame
// ===================================

// spinning frame
export function SpinningFrame({ top, bottom, left, right }) {
  // set position styles
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: [0, 360] }}
      transition={{
        opacity: { duration: 1, delay: 0.5 },
        rotate: { duration: 10, ease: "linear", repeat: Infinity },
      }}
      style={positionStyles}
      className="border-accent/20 absolute -inset-3 -z-6 rotate-10 rounded-2xl border-8"
    />
  );
}
