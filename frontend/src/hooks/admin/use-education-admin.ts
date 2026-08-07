import { ApiReponse } from "@/lib/ApiResponse";
import { educationService } from "@/service/education.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const educationKey = ["education"];

export interface Education {
  id: number;
  school: string;
  degree: string;
  yearStart: string;
  yearEnd: string;
  description: string;
  location: string;
}

interface propsQuery {
  queryFn: () => Promise<ApiReponse<Education[]>>;
  queryKey: string[];
}

//#region query

function useEducation({ queryKey, queryFn }: propsQuery) {
  return useQuery<ApiReponse<Education[]>, Error, Education[]>({
    queryKey,
    queryFn,
    select: (res) => res.data! ?? [],
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}

export const useEducationPublic = () => {
  return useEducation({
    queryKey: [...educationKey, "public"],
    queryFn: educationService.getPublic,
  });
};

export const useEducationAdmin = () => {
  return useEducation({
    queryKey: [...educationKey, "admin"],
    queryFn: educationService.getAdmin,
  });
};

//#endregion

//#region mutation
export const useAddEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: educationService.addEducation,

    onMutate: async (formData: FormData) => {
      await queryClient.cancelQueries({ queryKey: [...educationKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Education[]>>([
        ...educationKey,
        "admin",
      ]);

      const tempEducation: Education = {
        id: -Date.now(),
        school: (formData.get("school") as string) ?? "Untitled",
        degree: (formData.get("degree") as string) ?? "Untitled",
        yearStart: (formData.get("yearStart") as string) ?? "Untitled",
        yearEnd: (formData.get("yearEnd") as string) ?? "Untitled",
        description: (formData.get("description") as string) ?? "Untitled",
        location: (formData.get("location") as string) ?? "Untitled",
      };

      queryClient.setQueryData<ApiReponse<Education[]>>(
        [...educationKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: [...old.data, tempEducation],
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...educationKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: educationKey });
    },
  });
};

export const useDeleteEducationById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: educationService.deleteEducationById,

    onMutate: async (deletedId: number) => {
      await queryClient.cancelQueries({ queryKey: [...educationKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Education[]>>([
        ...educationKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<Education[]>>(
        [...educationKey, "admin"],
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
        queryClient.setQueryData([...educationKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: educationKey });
    },
  });
};

//#endregion
