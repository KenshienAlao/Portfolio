import "@/app/globals.css";
export const metadata = {
  title: "Kenshien Alao",
  description: "Portfolio of Kenshien Alao",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
