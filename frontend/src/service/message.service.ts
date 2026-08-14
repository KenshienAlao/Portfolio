import api from "@/lib/api";
import { ApiReponse } from "@/lib/ApiResponse";

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SendMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const messageService = {
  sendMessage: async (
    payload: SendMessagePayload,
  ): Promise<ApiReponse<Message>> => {
    const res = await api.post("/api/message", payload);
    return res.data;
  },

  getAdminMessages: async (): Promise<ApiReponse<Message[]>> => {
    const res = await api.get("/api/message/admin");
    return res.data;
  },

  toggleRead: async (messageId: number): Promise<ApiReponse<Message>> => {
    const res = await api.patch(`/api/message/admin/${messageId}/toggle-read`);
    return res.data;
  },

  deleteMessage: async (messageId: number): Promise<ApiReponse<void>> => {
    const res = await api.delete(`/api/message/admin/${messageId}`);
    return res.data;
  },
};
