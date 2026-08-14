import { ApiReponse } from "@/lib/ApiResponse";
import { setupService, type Setup } from "@/service/setup.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const setupKey = ["setup"];

export type { Setup };

interface PropsQuery {
  queryFn: () => Promise<ApiReponse<Setup[]>>;
  queryKey: string[];
  staleTime?: number;
}

function useSetup({
  queryKey,
  queryFn,
  staleTime = 1000 * 60 * 5,
}: PropsQuery) {
  return useQuery<ApiReponse<Setup[]>, Error, Setup[]>({
    queryKey,
    queryFn,
    select: (res) => res.data ?? [],
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime,
  });
}

export const useSetupPublic = () => {
  return useSetup({
    queryKey: [...setupKey, "public"],
    queryFn: setupService.getPublic,
    staleTime: Infinity,
  });
};

export const useSetupAdmin = () => {
  return useSetup({
    queryKey: [...setupKey, "admin"],
    queryFn: setupService.getAdmin,
  });
};

export const useAddSetup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setupService.addSetup,

    onMutate: async (formData: FormData) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Setup[]>>([
        ...setupKey,
        "admin",
      ]);

      const imageLightField = formData.get("imageLight");
      const imageDarkField = formData.get("imageDark");

      const valuesRaw = (formData.get("values") as string) || "";
      const downloadsRaw = (formData.get("downloads") as string) || "";

      const tempSetup: Setup = {
        id: -Date.now(),
        category: (formData.get("category") as string) ?? "Untitled",
        description: (formData.get("description") as string) ?? "",
        values: valuesRaw
          ? valuesRaw.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        downloads: downloadsRaw
          ? downloadsRaw.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        subValue: (formData.get("subValue") as string) || undefined,
        subDownload: (formData.get("subDownload") as string) || undefined,
        imageLight:
          imageLightField instanceof File && imageLightField.size > 0
            ? URL.createObjectURL(imageLightField)
            : "",
        imageDark:
          imageDarkField instanceof File && imageDarkField.size > 0
            ? URL.createObjectURL(imageDarkField)
            : undefined,
      };

      queryClient.setQueryData<ApiReponse<Setup[]>>(
        [...setupKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: [...old.data, tempSetup],
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...setupKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: setupKey });
    },
  });
};

export const useDeleteSetupById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setupService.deleteSetupById,

    onMutate: async (deletedId: number) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Setup[]>>([
        ...setupKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<Setup[]>>(
        [...setupKey, "admin"],
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
        queryClient.setQueryData([...setupKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: setupKey });
    },
  });
};

export const useEditSetup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      setupService.editSetupById(id, data),

    onMutate: async ({ id, data }: { id: number; data: FormData }) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Setup[]>>([
        ...setupKey,
        "admin",
      ]);

      const imageFileLight = data.get("imageLight");
      const imageFileDark = data.get("imageDark");
      const existSetup = prevData?.data?.find((s) => s.id === id);

      const valuesRaw = data.get("values") as string;
      const downloadsRaw = data.get("downloads") as string;

      const tempSetupEdit: Setup = {
        id,
        category: (data.get("category") as string) || existSetup?.category || "",
        description:
          (data.get("description") as string) || existSetup?.description || "",
        values: valuesRaw
          ? valuesRaw.split(",").map((s) => s.trim()).filter(Boolean)
          : existSetup?.values || [],
        downloads: downloadsRaw
          ? downloadsRaw.split(",").map((s) => s.trim()).filter(Boolean)
          : existSetup?.downloads || [],
        subValue: (data.get("subValue") as string) || existSetup?.subValue,
        subDownload:
          (data.get("subDownload") as string) || existSetup?.subDownload,
        imageLight:
          imageFileLight instanceof File && imageFileLight.size > 0
            ? URL.createObjectURL(imageFileLight)
            : existSetup?.imageLight || "",
        imageDark:
          imageFileDark instanceof File && imageFileDark.size > 0
            ? URL.createObjectURL(imageFileDark)
            : existSetup?.imageDark,
      };

      queryClient.setQueryData<ApiReponse<Setup[]>>(
        [...setupKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.map((e) => (e.id === id ? tempSetupEdit : e)),
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...setupKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: setupKey });
    },
  });
};
