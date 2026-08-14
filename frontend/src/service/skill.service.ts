import api from "@/lib/api";
import { ApiReponse } from "@/lib/ApiResponse";

export interface Skill {
  id: number;
  name: string;
  category: string;
  imageLight: string;
  imageDark?: string;
}

export const skillService = {
  getPublic: async (): Promise<ApiReponse<Skill[]>> => {
    const res = await api.get("/api/skill");
    return res.data;
  },
  getAdmin: async (): Promise<ApiReponse<Skill[]>> => {
    const res = await api.get("/api/skill/admin");
    return res.data;
  },

  addSkill: async (data: FormData): Promise<ApiReponse<Skill>> => {
    const res = await api.post("/api/skill/admin/add-skill", data);
    return res.data;
  },

  deleteSkillById: async (skillId: number): Promise<ApiReponse> => {
    const res = await api.delete(`/api/skill/admin/delete-skill/${skillId}`);
    return res.data;
  },

  editSkillById: async (
    skillId: number,
    data: FormData,
  ): Promise<ApiReponse<Skill>> => {
    data.delete("id");
    const res = await api.patch(`/api/skill/admin/edit-skill/${skillId}`, data);
    return res.data;
  },
};
