import { Education } from "@/hooks/admin/use-education-admin";
import api from "@/lib/api";
import { ApiReponse } from "@/lib/ApiResponse";
import { number } from "zod";

export const educationService = {
  getPublic: async (): Promise<ApiReponse<Education[]>> => {
    const res = await api.get("/api/education");
    return res.data;
  },
  getAdmin: async (): Promise<ApiReponse<Education[]>> => {
    const res = await api.get("/api/education/admin");
    return res.data;
  },

  addEducation: async (data: FormData): Promise<ApiReponse<Education>> => {
    const res = await api.post("/api/education/admin/add-education", data);
    return res.data;
  },

  deleteEducationById: async (educationId: number): Promise<ApiReponse> => {
    const res = await api.delete(
      `/api/education/admin/delete-education/${educationId}`,
    );
    return res.data;
  },

  editEducationById: async (
    educationId: number,
    data: FormData,
  ): Promise<ApiReponse<Education>> => {
    const res = await api.patch(
      `/api/education/admin/edit-education/${educationId}`,
      data,
    );
    return res.data;
  },
};
