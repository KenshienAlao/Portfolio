import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export function Header({
  unreadMessagesCount,
}: {
  unreadMessagesCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-text-secondary">
        {unreadMessagesCount > 0 ? (
          <>
            You have{" "}
            <span className="font-bold text-accent">
              {unreadMessagesCount} unread message
              {unreadMessagesCount !== 1 ? "s" : ""}
            </span>
            .
          </>
        ) : (
          "All caught up — no unread messages."
        )}
      </p>
      <Link
        href="/?clear=session"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
      >
        View Public Portfolio <FaExternalLinkAlt className="h-3 w-3" />
      </Link>
    </div>
  );
}
