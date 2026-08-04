import { Project } from "@/hooks/admin/use-project-admin";
import api from "@/lib/api";
import { ApiReponse } from "@/lib/ApiResponse";

export const projectService = {
  getPublic: async (): Promise<ApiReponse<Project[]>> => {
    const res = await api.get("/api/project");
    return res.data;
  },
  getAdmin: async (): Promise<ApiReponse<Project[]>> => {
    const res = await api.get("/api/project/admin");
    return res.data;
  },
  addProject: async (data: FormData): Promise<ApiReponse<Project>> => {
    const res = await api.post("/api/project/admin/add-project", data);
    return res.data;
  },
  editProject: async ({
    id,
    data,
  }: {
    id: number;
    data: FormData;
  }): Promise<ApiReponse<Project>> => {
    const res = await api.patch(`/api/project/admin/edit-project/${id}`, data);
    return res.data;
  },
  deleteProjectById: async (id: number): Promise<ApiReponse> => {
    const res = await api.delete(`/api/project/admin/delete-project/${id}`);
    return res.data;
  },
};
