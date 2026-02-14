import "@/app/globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";

export const metadata = {
  title: "Kenshien Alao",
  description: "Portfolio of Kenshien Alao",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
