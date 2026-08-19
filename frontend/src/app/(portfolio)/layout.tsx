import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
