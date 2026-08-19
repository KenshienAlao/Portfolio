import { QueryProvider } from "@/provider/query-provider";
import { Login } from "@/views/login";

export default function LoginPage() {
  return (
    <QueryProvider>
      <Login />
    </QueryProvider>
  );
}
