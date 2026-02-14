// ui
import { motion } from "framer-motion";

// animation
import { floatingVariants } from "@/app/components/ui/animation";

// ===================================
// utilities { HOME }
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

// ===================================
// icons
// ===================================

// sun
export function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M3 12h2.25m.386-6.364 1.591-1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

// moon
export function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
}

// menu
export function MenuIcon() {
  return (
    <svg height="28" viewBox="0 -960 960 960" width="28" fill="currentColor">
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
}
