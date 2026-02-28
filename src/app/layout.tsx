import type { Metadata } from "next";
import "./globals.css";
import { MenuProvider } from "@/context/menuContext";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Kenshien",
  description: "Portfolio of Kenshien",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system">
          <MenuProvider>{children}</MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
