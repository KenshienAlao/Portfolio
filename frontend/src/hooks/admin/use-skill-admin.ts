import { ApiReponse } from "@/lib/ApiResponse";
import { skillService, type Skill } from "@/service/skill.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const skillKey = ["skill"];

export type { Skill };

interface propsQuery {
  queryFn: () => Promise<ApiReponse<Skill[]>>;
  queryKey: string[];
  staleTime?: number;
}

function useSkill({
  queryKey,
  queryFn,
  staleTime = 1000 * 60 * 5,
}: propsQuery) {
  return useQuery<ApiReponse<Skill[]>, Error, Skill[]>({
    queryKey,
    queryFn,
    select: (res) => res.data! ?? [],
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime,
  });
}

export const useSkillPublic = () => {
  return useSkill({
    queryKey: [...skillKey, "public"],
    queryFn: skillService.getPublic,
    staleTime: Infinity,
  });
};

export const useSkillAdmin = () => {
  return useSkill({
    queryKey: [...skillKey, "admin"],
    queryFn: skillService.getAdmin,
  });
};

export const useAddSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: skillService.addSkill,

    onMutate: async (formData: FormData) => {
      await queryClient.cancelQueries({ queryKey: [...skillKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Skill[]>>([
        ...skillKey,
        "admin",
      ]);

      const imageLightField = formData.get("imageLight");
      const imageDarkField = formData.get("imageDark");

      const tempSkill: Skill = {
        id: -Date.now(),
        name: (formData.get("name") as string) ?? "Untitled",
        category: (formData.get("category") as string) ?? "Untitled",
        imageLight:
          imageLightField instanceof File && imageLightField.size > 0
            ? URL.createObjectURL(imageLightField)
            : "",
        imageDark:
          imageDarkField instanceof File && imageDarkField.size > 0
            ? URL.createObjectURL(imageDarkField)
            : "",
      };

      console.log("temp: ", tempSkill);

      queryClient.setQueryData<ApiReponse<Skill[]>>(
        [...skillKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: [...old.data, tempSkill],
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...skillKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: skillKey });
    },
  });
};

export const useDeleteSkillById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: skillService.deleteSkillById,

    onMutate: async (deletedId: number) => {
      await queryClient.cancelQueries({ queryKey: [...skillKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Skill[]>>([
        ...skillKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<Skill[]>>(
        [...skillKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.filter((e) => e.id !== deletedId),
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...skillKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: skillKey });
    },
  });
};

export const useEditSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      skillService.editSkillById(id, data),
    onMutate: async ({ id, data }: { id: number; data: FormData }) => {
      await queryClient.cancelQueries({ queryKey: [...skillKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Skill[]>>([
        ...skillKey,
        "admin",
      ]);
      const imageFileLight = data.get("imageLight");
      const imageFileDark = data.get("imageDark");

      const existSkill = prevData?.data?.find((s) => s.id === id);
      const tempSkillEdit: Skill = {
        id,
        name: data.get("name") as string,
        category: data.get("category") as string,
        imageLight:
          imageFileLight instanceof File && imageFileLight.size > 0
            ? URL.createObjectURL(imageFileLight)
            : existSkill?.imageLight || "",
        imageDark:
          imageFileDark instanceof File && imageFileDark.size > 0
            ? URL.createObjectURL(imageFileDark)
            : existSkill?.imageDark || "",
      };

      queryClient.setQueryData<ApiReponse<Skill[]>>(
        [...skillKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.map((e) => (e.id === id ? tempSkillEdit : e)),
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...skillKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: skillKey });
    },
  });
};
