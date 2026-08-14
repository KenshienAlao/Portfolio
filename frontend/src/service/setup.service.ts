import api from "@/lib/api";
import { ApiReponse } from "@/lib/ApiResponse";

export interface Setup {
  id: number;
  category: string;
  imageLight: string;
  imageDark?: string;
  values: string[];
  description: string;
  downloads: string[];
  subValue?: string;
  subDownload?: string;
}

export const setupService = {
  getPublic: async (): Promise<ApiReponse<Setup[]>> => {
    const res = await api.get("/api/setup");
    return res.data;
  },

  getAdmin: async (): Promise<ApiReponse<Setup[]>> => {
    const res = await api.get("/api/setup/admin");
    return res.data;
  },

  addSetup: async (data: FormData): Promise<ApiReponse<Setup>> => {
    const res = await api.post("/api/setup/admin/add-setup", data);
    return res.data;
  },

  deleteSetupById: async (setupId: number): Promise<ApiReponse> => {
    const res = await api.delete(`/api/setup/admin/delete-setup/${setupId}`);
    return res.data;
  },

  editSetupById: async (
    setupId: number,
    data: FormData,
  ): Promise<ApiReponse<Setup>> => {
    data.delete("id");
    const res = await api.patch(`/api/setup/admin/edit-setup/${setupId}`, data);
    return res.data;
  },
};
