import { ApiReponse } from "@/lib/ApiResponse";
import {
  messageService,
  type Message,
  type SendMessagePayload,
} from "@/service/message.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { Message, SendMessagePayload };

const messageKey = ["message"];

export const useSendMessageMutation = () => {
  return useMutation({
    mutationFn: (payload: SendMessagePayload) =>
      messageService.sendMessage(payload),
  });
};

export const useMessagesAdmin = () => {
  return useQuery<ApiReponse<Message[]>, Error, Message[]>({
    queryKey: [...messageKey, "admin"],
    queryFn: messageService.getAdminMessages,
    select: (res) => res.data ?? [],
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};

export const useDeleteMessageById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: number) =>
      messageService.deleteMessage(messageId),

    onMutate: async (deletedId: number) => {
      await queryClient.cancelQueries({ queryKey: [...messageKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Message[]>>([
        ...messageKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<Message[]>>(
        [...messageKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.filter((m) => m.id !== deletedId),
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...messageKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: messageKey });
    },
  });
};

export const useToggleMessageRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: number) => messageService.toggleRead(messageId),

    onMutate: async (messageId: number) => {
      await queryClient.cancelQueries({ queryKey: [...messageKey, "admin"] });

      const prevData = queryClient.getQueryData<ApiReponse<Message[]>>([
        ...messageKey,
        "admin",
      ]);

      queryClient.setQueryData<ApiReponse<Message[]>>(
        [...messageKey, "admin"],
        (old) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: old.data.map((m) =>
              m.id === messageId ? { ...m, isRead: !m.isRead } : m,
            ),
          };
        },
      );

      return { prevData };
    },

    onError: (_err, _data, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...messageKey, "admin"], context.prevData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: messageKey });
    },
  });
};
