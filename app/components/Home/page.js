"use client";

import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-green-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-blue-500/5 blur-3xl" />

      <motion.div
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-dvh max-w-7xl flex-col items-center justify-center px-6 md:flex-row md:justify-between"
      >
        <div className="z-10 flex flex-col items-center text-center md:items-start md:text-left">
          <motion.p
            variants={itemVariants}
            className="text-accent mb-2 text-lg font-medium tracking-wide uppercase transition-all"
          >
            Frontend Developer
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl"
          >
            Hi, I'm{" "}
            <span className="text-accent tracking-wider transition-all">
              Kenshien
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mb-10 max-w-lg text-lg leading-relaxed md:text-xl"
          >
            I build modern, responsive web apps with clean UI and smooth user
            experience. Specializing in React and Next.js.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <button className="bg-accent cursor-pointer rounded-full px-8 py-3 font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95">
              View Projects
            </button>
            <button className="bg-accent cursor-pointer rounded-full px-8 py-3 font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95">
              Get in Touch
            </button>
          </motion.div>
        </div>

        {/* profile section */}
        <motion.div
          variants={containerVariants}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="relative mt-16 md:mt-0"
        >
          <div className="relative size-64 overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-2xl transition-all duration-500 hover:rotate-0 md:size-80">
            <img
              src="/profile/me.png"
              alt="Kenshien"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -inset-4 -z-10 rounded-2xl border-2 border-green-500/20 md:rotate-6" />
        </motion.div>
      </motion.div>
    </div>
  );
}
