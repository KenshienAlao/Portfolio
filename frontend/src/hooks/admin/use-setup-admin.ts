import { ApiReponse } from "@/lib/ApiResponse";
import {
  setupService,
  type SetupCategory,
  type SetupItem,
} from "@/service/setup.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const setupKey = ["setup"];

export type { SetupCategory, SetupItem };
export type Setup = SetupCategory;

interface PropsQuery {
  queryFn: () => Promise<ApiReponse<SetupCategory[]>>;
  queryKey: string[];
  staleTime?: number;
}

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

function useSetup({
  queryKey,
  queryFn,
  staleTime = DEFAULT_STALE_TIME,
}: PropsQuery) {
  return useQuery<ApiReponse<SetupCategory[]>, Error, SetupCategory[]>({
    queryKey,
    queryFn,
    select: (res) => res.data ?? [],
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime,
  });
}

export const useSetupAdmin = () => {
  return useSetup({
    queryKey: [...setupKey, "admin"],
    queryFn: setupService.getAdmin,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setupService.addCategory,

    onMutate: async (newCategoryData) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<SetupCategory[]>>([
        ...setupKey,
        "admin",
      ]);

      const tempCategory: SetupCategory = {
        id: -Date.now(),
        category: newCategoryData.category,
        description: newCategoryData.description,
        items: [],
      };

      queryClient.setQueryData<ApiReponse<SetupCategory[]>>(
        [...setupKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: [...old.data, tempCategory],
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

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { category: string; description: string };
    }) => setupService.editCategory(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<SetupCategory[]>>([
        ...setupKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<SetupCategory[]>>(
        [...setupKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.map((cat) =>
              cat.id === id
                ? {
                    ...cat,
                    category: data.category || cat.category,
                    description: data.description || cat.description,
                  }
                : cat,
            ),
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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setupService.deleteCategory,

    onMutate: async (deletedCategoryId: number) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<SetupCategory[]>>([
        ...setupKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<SetupCategory[]>>(
        [...setupKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.filter((cat) => cat.id !== deletedCategoryId),
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

export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setupService.addItem,

    onMutate: async (formData: FormData) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<SetupCategory[]>>([
        ...setupKey,
        "admin",
      ]);

      const categoryId = Number(formData.get("categoryId"));
      const imageLightField = formData.get("imageLight");
      const imageDarkField = formData.get("imageDark");

      const tempItem: SetupItem = {
        id: -Date.now(),
        categoryId,
        value: (formData.get("value") as string) || "Untitled Item",
        download: (formData.get("download") as string) || "",
        imageLight:
          imageLightField instanceof File && imageLightField.size > 0
            ? URL.createObjectURL(imageLightField)
            : "",
        imageDark:
          imageDarkField instanceof File && imageDarkField.size > 0
            ? URL.createObjectURL(imageDarkField)
            : undefined,
        subValue: (formData.get("subValue") as string) || undefined,
        subDownload: (formData.get("subDownload") as string) || undefined,
      };

      queryClient.setQueryData<ApiReponse<SetupCategory[]>>(
        [...setupKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.map((cat) =>
              cat.id === categoryId
                ? {
                    ...cat,
                    items: [...(cat.items ?? []), tempItem],
                  }
                : cat,
            ),
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

export const useEditItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      setupService.editItem(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<SetupCategory[]>>([
        ...setupKey,
        "admin",
      ]);

      const targetCategoryId = data.get("categoryId")
        ? Number(data.get("categoryId"))
        : undefined;
      const imageLightField = data.get("imageLight");
      const imageDarkField = data.get("imageDark");

      // Find existing item to preserve images if not updated
      let existingItem: SetupItem | undefined;
      let currentCategoryId: number | undefined;

      if (prevData?.data) {
        searchItem: for (const cat of prevData.data) {
          if (!cat.items) continue;
          for (const item of cat.items) {
            if (item.id === id) {
              existingItem = item;
              currentCategoryId = cat.id;
              break searchItem;
            }
          }
        }
      }

      const tempItemEdit: SetupItem = {
        id,
        categoryId: targetCategoryId ?? currentCategoryId,
        value: (data.get("value") as string) || existingItem?.value || "",
        download:
          (data.get("download") as string) || existingItem?.download || "",
        imageLight:
          imageLightField instanceof File && imageLightField.size > 0
            ? URL.createObjectURL(imageLightField)
            : existingItem?.imageLight || "",
        imageDark:
          imageDarkField instanceof File && imageDarkField.size > 0
            ? URL.createObjectURL(imageDarkField)
            : existingItem?.imageDark,
        subValue: (data.get("subValue") as string) || existingItem?.subValue,
        subDownload:
          (data.get("subDownload") as string) || existingItem?.subDownload,
      };

      queryClient.setQueryData<ApiReponse<SetupCategory[]>>(
        [...setupKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;

          // If moved to a different category
          if (
            targetCategoryId &&
            currentCategoryId &&
            targetCategoryId !== currentCategoryId
          ) {
            return {
              ...old,
              data: old.data.map((cat) => {
                if (cat.id === currentCategoryId) {
                  return {
                    ...cat,
                    items: (cat.items ?? []).filter((item) => item.id !== id),
                  };
                }
                if (cat.id === targetCategoryId) {
                  return {
                    ...cat,
                    items: [...(cat.items ?? []), tempItemEdit],
                  };
                }
                return cat;
              }),
            };
          }

          // Same category edit
          return {
            ...old,
            data: old.data.map((cat) => ({
              ...cat,
              items: (cat.items ?? []).map((item) =>
                item.id === id ? tempItemEdit : item,
              ),
            })),
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

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setupService.deleteItem,

    onMutate: async (deletedItemId: number) => {
      await queryClient.cancelQueries({ queryKey: [...setupKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<SetupCategory[]>>([
        ...setupKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<SetupCategory[]>>(
        [...setupKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.map((cat) => ({
              ...cat,
              items: (cat.items ?? []).filter(
                (item) => item.id !== deletedItemId,
              ),
            })),
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
