import "@/app/globals.css";
// provider
import { ThemeProvider } from "@/app/context/ThemeContext";
import { MountedProvider } from "@/app/context/MountedContext";
import { LoadingProvider } from "@/app/context/LoadingContext";

// ui
import { GlobalLoading } from "@/app/components/ui/GlobalLoading";

export const metadata = {
  title: "Kenshien Alao",
  description: "Portfolio of Kenshien Alao",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem("theme");
                  var isDark = storedTheme === "dark";
                  if (isDark) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <MountedProvider>
            <LoadingProvider>
              <GlobalLoading />
              {children}
            </LoadingProvider>
          </MountedProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
