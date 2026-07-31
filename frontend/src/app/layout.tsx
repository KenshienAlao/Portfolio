import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";

export const metadata: Metadata = {
  title: "Kenshie Alao — Web Developer",
  description:
    "Full-stack web developer building fast, modern websites and applications with React, Next.js, TypeScript, Spring Boot, and PostgreSQL.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8f7" },
    { media: "(prefers-color-scheme: dark)", color: "#080b0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
