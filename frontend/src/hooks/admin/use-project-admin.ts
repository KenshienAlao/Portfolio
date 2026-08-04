import { ApiReponse } from "@/lib/ApiResponse";
import { projectService } from "@/service/project.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
}

interface props {
  queryKey: string[];
  queryFn: () => Promise<ApiReponse<Project[]>>;
}

const projectKey = ["project"];

//#region query
function useProject({ queryKey, queryFn }: props) {
  return useQuery<ApiReponse<Project[]>, Error, Project[]>({
    queryKey,
    queryFn,
    select: (res) => res.data! ?? [],
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProjectPublic() {
  return useProject({
    queryKey: [...projectKey, "public"],
    queryFn: projectService.getPublic,
  });
}
export function useProjectAdmin() {
  return useProject({
    queryKey: [...projectKey, "admin"],
    queryFn: projectService.getAdmin,
  });
}

//#endregion

//#region mutation
export const useDeleteProjectById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.deleteProjectById,

    onMutate: async (deletedId: number) => {
      await queryClient.cancelQueries({ queryKey: [...projectKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Project[]>>([
        ...projectKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<Project[]>>(
        [...projectKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.filter((p) => p.id !== deletedId),
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _id, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...projectKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectKey });
    },
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.addProject,

    onMutate: async (formData: FormData) => {
      await queryClient.cancelQueries({ queryKey: [...projectKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Project[]>>([
        ...projectKey,
        "admin",
      ]);

      const tagsRaw = formData.get("tags") as string;

      const tempProject: Project = {
        id: -Date.now(),
        title: (formData.get("title") as string) ?? "Untitled",
        image: URL.createObjectURL(formData.get("image") as Blob) || "",
        description: (formData.get("description") as string) ?? "",
        tags: tagsRaw ? tagsRaw.split(",").map((t) => t.trim()) : [],
        github: (formData.get("github") as string) ?? "",
        demo: (formData.get("demo") as string) || null,
      };

      queryClient.setQueryData<ApiReponse<Project[]>>(
        [...projectKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: [...old.data, tempProject],
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...projectKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectKey });
    },
  });
};

export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.editProject,
    onMutate: async ({ id, data }: { id: number; data: FormData }) => {
      await queryClient.cancelQueries({ queryKey: [...projectKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Project[]>>([
        ...projectKey,
        "admin",
      ]);

      const tagsRaw = data.get("tags") as string;
      const imageFile = data.get("image");

      const existProject = prevData?.data?.find((p) => p.id === id);

      const tempProjecEdit: Project = {
        id,
        title: data.get("title") as string,
        image:
          imageFile instanceof File && imageFile.size > 0
            ? URL.createObjectURL(imageFile)
            : existProject?.image || "",
        description: data.get("description") as string,
        tags: tagsRaw.split(",").map((t) => t.trim()),
        github: data.get("github") as string,
        demo: data.get("demo") as string,
      };

      queryClient.setQueryData<ApiReponse<Project[]>>(
        [...projectKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.map((p) => (p.id === id ? tempProjecEdit : p)),
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...projectKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectKey });
    },
  });
};

//#endregion
