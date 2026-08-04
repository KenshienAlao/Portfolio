import { ApiReponse } from "@/lib/ApiResponse";
import { AuthService } from "@/service/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface props<TData, TVariables> {
  mutationFn: (data: TVariables) => Promise<ApiReponse<TData>>;
  redirect: string;
}

function useAuthMutation<TData, TVariables>({
  mutationFn,
  redirect,
}: props<TData, TVariables>) {
  const router = useRouter();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      router.push(redirect);
    },
    onError: (err) => console.error(err),
  });
}

export const useLoginMutation = () => {
  return useAuthMutation({
    mutationFn: AuthService.login,
    redirect: "/dashboard",
  });
};
