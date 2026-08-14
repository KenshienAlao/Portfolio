import api from "@/lib/api";
import { ApiReponse } from "@/lib/ApiResponse";

export interface TLogin {
  code: string;
  password: string;
}

export const AuthService = {
  login: async (data: TLogin): Promise<ApiReponse> => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
  },
};
