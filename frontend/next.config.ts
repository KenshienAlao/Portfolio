import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    optimizePackageImports: [
      "react-icons",
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/fi",
      "react-icons/lu",
      "react-icons/io5",
      "@tanstack/react-query",
      "next-themes",
    ],
  },

  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
  },
};

export default nextConfig;
