"use client";

import { useProjectAdmin } from "@/hooks/admin/use-project-admin";
import { useEducationAdmin } from "@/hooks/admin/use-education-admin";
import { useSkillAdmin } from "@/hooks/admin/use-skill-admin";
import { useSetupAdmin } from "@/hooks/admin/use-setup-admin";
import { useMessagesAdmin } from "@/hooks/admin/use-message-admin";
import { IoLayers } from "react-icons/io5";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCircle,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaInbox,
  FaTerminal,
  FaWrench,
} from "react-icons/fa";
import Link from "next/link";

export type Tab =
  | "overview"
  | "projects"
  | "education"
  | "skills"
  | "setup"
  | "messages";

interface OverviewTabProps {
  setActiveTab: (tab: Tab) => void;
}

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

export function OverviewTab({ setActiveTab }: OverviewTabProps) {
  const { data: projects = [] } = useProjectAdmin();
  const { data: education = [] } = useEducationAdmin();
  const { data: skills = [] } = useSkillAdmin();
  const { data: setupCategories = [] } = useSetupAdmin();
  const { data: messages = [] } = useMessagesAdmin();

  const totalSetupItems = setupCategories.reduce(
    (acc, cat) => acc + (cat.items?.length ?? 0),
    0,
  );
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      icon: IoLayers,
      tab: "projects" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Skills",
      value: skills.length,
      icon: FaWrench,
      tab: "skills" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Setup Tools",
      value: totalSetupItems,
      subtitle: `${setupCategories.length} categories`,
      icon: FaTerminal,
      tab: "setup" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Education",
      value: education.length,
      icon: FaGraduationCap,
      tab: "education" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Messages",
      value: messages.length,
      subtitle:
        unreadMessagesCount > 0 ? `${unreadMessagesCount} unread` : "All read",
      icon: FaInbox,
      tab: "messages" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
  ];

  const skillsByCategory = skills.reduce<Record<string, number>>((acc, s) => {
    const cat = s.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const maxCategoryCount = Math.max(1, ...Object.values(skillsByCategory));

  return (
    <div className="space-y-8 font-mono">
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <button
            type="button"
            key={stat.label}
            onClick={() => setActiveTab(stat.tab)}
            className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 text-left transition-all hover:border-accent/40 hover:bg-surface/80"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl font-extrabold text-text-primary">
                {stat.value}
              </span>
              <div
                className={`rounded-xl border p-2.5 transition-transform group-hover:scale-110 ${stat.color}`}
              >
                <stat.icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                {stat.label}
              </p>
              {stat.subtitle && (
                <p className="text-[10px] text-text-secondary/70">
                  {stat.subtitle}
                </p>
              )}
              <span className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Manage <FaArrowRight className="h-2.5 w-2.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
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
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="mb-4 flex items-center justify-between text-sm font-bold text-text-primary">
              <span>Skills by Category</span>
              <span className="text-xs font-normal text-text-secondary">
                {skills.length} total
              </span>
            </h3>

            {Object.keys(skillsByCategory).length === 0 ? (
              <p className="py-4 text-xs text-text-secondary">
                No skills added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {Object.entries(skillsByCategory).map(([category, count]) => (
                  <div key={category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary">{category}</span>
                      <span className="font-bold text-text-primary">
                        {count}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full rounded-full bg-accent transition-all"
                        style={{
                          width: `${(count / maxCategoryCount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-accent/40" />
              <span className="h-3 w-3 rounded-full bg-accent/70" />
              <span className="ml-3 flex items-center gap-1.5 text-xs text-text-secondary">
                stack.json
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
              </span>
            </div>

            <div className="space-y-2 text-xs text-text-secondary">
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span>Frontend:</span>
                <span className="font-semibold text-text-primary">
                  Next.js 16 / React 19
                </span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span>Backend:</span>
                <span className="font-semibold text-text-primary">
                  Spring Boot 3
                </span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span>Assets:</span>
                <span className="font-semibold text-text-primary">
                  Cloudinary
                </span>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="font-semibold text-text-primary">
                  Supabase
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
