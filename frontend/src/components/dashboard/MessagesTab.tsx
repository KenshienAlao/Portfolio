"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Inbox,
  Loader2,
  Trash2,
} from "lucide-react";
import {
  useDeleteMessageById,
  useMessagesAdmin,
  useToggleMessageRead,
} from "@/hooks/admin/use-message-admin";

function formatDate(isoString: string) {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

export function MessagesTab() {
  const {
    data: messages,
    isPending: loadingMessages,
    error: messagesError,
    refetch: refetchMessages,
  } = useMessagesAdmin();

  const {
    mutate: deleteMessage,
    isPending: isDeleting,
    variables: deletingId,
  } = useDeleteMessageById();

  const { mutate: toggleRead } = useToggleMessageRead();

  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const hasMessages = (messages?.length ?? 0) > 0;
  const unreadCount = messages?.filter((m) => !m.isRead).length ?? 0;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-text-primary">
          Inbox
          {hasMessages && (
            <span className="font-mono text-xs font-normal text-text-secondary">
              ({messages?.length} total
              {unreadCount > 0 ? `, ${unreadCount} unread` : ""})
            </span>
          )}
        </h2>
      </div>

      {messagesError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              Couldn&apos;t load messages
            </h3>
            <p className="max-w-xs text-xs text-text-secondary">
              {messagesError.message ||
                "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetchMessages()}
            className="mt-2 flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-mono text-xs font-semibold text-text-primary transition-colors hover:border-accent/40"
          >
            Retry
          </button>
        </div>
      ) : loadingMessages ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl border border-border bg-surface/50 p-5"
            />
          ))}
        </div>
      ) : !hasMessages ? (
        <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
          <Inbox className="h-10 w-10 text-text-secondary/40 mx-auto mb-3" />
          <h3 className="font-mono text-sm font-bold text-text-primary mb-1">
            Your inbox is empty
          </h3>
          <p className="text-xs font-mono text-text-secondary">
            Messages sent through your contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages?.map((msg) => {
            const isDeletingThis = isDeleting && deletingId === msg.id;
            const isConfirmingDelete = confirmDeleteId === msg.id;

            return (
              <div
                key={msg.id}
                className={`rounded-xl border p-5 space-y-3 transition-all ${
                  !msg.isRead
                    ? "border-accent/40 bg-surface shadow-soft"
                    : "border-border bg-surface/60 opacity-85"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-start gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleRead(msg.id)}
                      title={msg.isRead ? "Mark as unread" : "Mark as read"}
                      className="mt-0.5 text-text-secondary hover:text-accent transition-colors"
                    >
                      {msg.isRead ? (
                        <CheckCircle2 className="h-4 w-4 text-accent/70" />
                      ) : (
                        <Circle className="h-4 w-4 fill-accent/20 text-accent" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-mono text-sm font-bold text-text-primary">
                          {msg.name}
                        </h4>
                        {!msg.isRead && (
                          <span className="rounded bg-accent/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-accent">
                            New
                          </span>
                        )}
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs font-mono text-accent hover:underline block"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-text-secondary">
                      {formatDate(msg.createdAt)}
                    </span>

                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteMessage(msg.id);
                            setConfirmDeleteId(null);
                          }}
                          className="rounded-md bg-destructive px-2 py-1 font-mono text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-text-secondary transition-colors hover:text-text-primary"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(msg.id)}
                        disabled={isDeletingThis}
                        className="p-1.5 hover:bg-destructive/10 rounded-md text-text-secondary hover:text-destructive transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Delete message"
                      >
                        {isDeletingThis ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-accent font-semibold block">
                    Subject: {msg.subject}
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
