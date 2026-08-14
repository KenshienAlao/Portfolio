import { FaArrowRight, FaCheckCircle, FaCircle, FaInbox } from "react-icons/fa";
import { Message } from "@/hooks/admin/use-message-admin";
import { Tab } from "@/types/dashboard";

function formatDate(isoString: string) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface props {
  unreadMessagesCount: number;
  setActiveTab: (tab: Tab) => void;
  messages: Message[];
}

export function Messages({
  unreadMessagesCount,
  setActiveTab,
  messages,
}: props) {
  return (
    <div className="lg:col-span-2">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <FaInbox className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-bold text-text-primary">
              Recent Messages
            </h3>
            {unreadMessagesCount > 0 && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                {unreadMessagesCount} new
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("messages")}
            className="inline-flex items-center gap-1 text-xs text-text-secondary transition-colors hover:text-accent"
          >
            View all <FaArrowRight className="h-3 w-3" />
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-text-secondary">
            <FaInbox className="h-8 w-8 text-text-secondary/40" />
            <p className="mt-2 text-xs">No messages received yet.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {messages.slice(0, 4).map((msg) => (
              <button
                type="button"
                key={msg.id}
                onClick={() => setActiveTab("messages")}
                className="flex items-start gap-2 cursor-pointer rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {msg.isRead ? (
                      <FaCheckCircle className="h-3.5 w-3.5 text-text-secondary/40 shrink-0" />
                    ) : (
                      <FaCircle className="h-3.5 w-3.5 fill-accent text-accent shrink-0" />
                    )}
                    <span className="text-xs font-bold text-text-primary">
                      {msg.name}
                    </span>
                    <span className="text-[11px] text-text-secondary/60">
                      &lt;{msg.email}&gt;
                    </span>
                  </div>
                  <span className="text-[10px] text-text-secondary shrink-0">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                <p className="mt-1.5 text-xs font-medium text-accent truncate">
                  {msg.subject}
                </p>
                <p className="mt-1 text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                  {msg.message}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
