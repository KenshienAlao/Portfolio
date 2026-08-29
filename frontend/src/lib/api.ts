import { API_ROUTES } from "@/config/api-routes";
import axios, { AxiosError } from "axios";

export class SessionExpiredError extends Error {
  constructor() {
    super("Session expired");
    this.name = "SessionExpiredError";
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default api;

api.interceptors.response.use(
  (res) => {
    if (res.data?.success === false) {
      throw new Error(res.data.message);
    }
    12;
    return res;
  },
  async (error: AxiosError<{ message?: string }>) => {
    const req = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      req &&
      !req._retry
    ) {
      req._retry = true;

      try {
        await api.post(`${API_ROUTES.AUTH.REFRESH}`);
        return api(req);
      } catch {
        if (typeof window !== "undefined") {
          window.location.href = `/?clear_session=true`;
          return;
        }

        throw new SessionExpiredError();
      }
    }

    throw new Error(error.response?.data?.message ?? error.message);
  },
);
