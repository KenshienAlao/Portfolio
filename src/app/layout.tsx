import type { Metadata } from "next";
import "./globals.css";
import { MenuProvider } from "@/context/menuContext";
import { ThemeProvider } from "next-themes";
import { LoadingProvider } from "@/context/loadingContext";

/**
 * @param {string} title - Title of the page
 * @param {string} description - Description of the page
 * @returns {Metadata} - Metadata of the page
 */

export const metadata: Metadata = {
  title: "Kenshien",
  description: "Portfolio of Kenshien",
};

/**
 * @param {React.ReactNode} children - Children of the page
 * @returns {TSX.Element} - Root layout
 */


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <LoadingProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <MenuProvider>{children}</MenuProvider>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
