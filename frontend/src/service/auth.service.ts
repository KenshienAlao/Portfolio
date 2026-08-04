import api from "@/lib/api";
import { ApiReponse } from "@/lib/ApiResponse";
import { TLogin } from "@/views/login";

export const AuthService = {
  login: async (data: TLogin): Promise<ApiReponse> => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
  },
};
