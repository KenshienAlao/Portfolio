// ===================================
// opening
// ===================================

// container
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

// item
export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

// ===================================
// infinite
// ===================================

// floating
export const floatingVariants = {
  // hide
  smoothHidden: { opacity: 0 },
  openingLeft: { opacity: 0, x: 100 },
  openingRight: { opacity: 0, x: -100 },
  // visible
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 5,
      ease: "easeInOut",
    },
  },
  smoothVisible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  // animation
  upAndDown: {
    y: [0, -40, 0, 40, 0],
    transition: {
      duration: 5, // the higher the slower
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  downAndUp: {
    y: [0, 40, 0, -40, 0],
    transition: {
      duration: 5, // the higher the slower
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  smoothFloating: {
    y: [0, -100, 0, 100, 0],
    transition: {
      duration: 5, // the higher the slower
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// spinning
export const spinningVariants = {
  bigger: { opacity: 0, scale: 0.5 },
  smaller: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 2,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.5,
    },
  },
};
