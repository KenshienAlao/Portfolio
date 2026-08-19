import { QueryProvider } from "@/provider/query-provider";
import { DashboardView } from "@/views/dashboard";

export default function Dashboard() {
  return (
    <QueryProvider>
      <DashboardView />
    </QueryProvider>
  );
}
