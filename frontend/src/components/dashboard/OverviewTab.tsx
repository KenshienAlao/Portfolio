"use client";

import {
  ArrowRight,
  CheckCircle2,
  Circle,
  ExternalLink,
  GraduationCap,
  Inbox,
  Layers,
  Mail,
  Plus,
  Terminal,
  Wrench,
} from "lucide-react";
import { useProjectAdmin } from "@/hooks/admin/use-project-admin";
import { useEducationAdmin } from "@/hooks/admin/use-education-admin";
import { useSkillAdmin } from "@/hooks/admin/use-skill-admin";
import { useSetupAdmin } from "@/hooks/admin/use-setup-admin";
import { useMessagesAdmin } from "@/hooks/admin/use-message-admin";
import { Tab } from "@/views/dashboard";

interface OverviewTabProps {
  setActiveTab: (tab: Tab) => void;
}

function formatDate(isoString: string) {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
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
      icon: Layers,
      tab: "projects" as Tab,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      label: "Skills",
      value: skills.length,
      icon: Wrench,
      tab: "skills" as Tab,
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    },
    {
      label: "Setup Tools",
      value: totalSetupItems,
      subtitle: `${setupCategories.length} categories`,
      icon: Terminal,
      tab: "setup" as Tab,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      label: "Education",
      value: education.length,
      icon: GraduationCap,
      tab: "education" as Tab,
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
    {
      label: "Messages",
      value: messages.length,
      subtitle:
        unreadMessagesCount > 0 ? `${unreadMessagesCount} unread` : "All read",
      icon: Inbox,
      tab: "messages" as Tab,
      color:
        unreadMessagesCount > 0
          ? "bg-accent/15 text-accent border-accent/30"
          : "bg-surface text-text-secondary border-border",
    },
  ];

  // Skill category breakdown
  const skillsByCategory = skills.reduce<Record<string, number>>((acc, s) => {
    const cat = s.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8 font-mono">
      {/* ── Stat Cards ──────────────────────────────────────────────────────── */}
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
            </div>
          </button>
        ))}
      </div>

      {/* ── Main Content Grid ───────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Recent Messages & Quick Actions */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Messages */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
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
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-text-secondary">
                <Inbox className="h-8 w-8 text-text-secondary/40" />
                <p className="mt-2 text-xs">No messages received yet.</p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {messages.slice(0, 3).map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setActiveTab("messages")}
                    className="cursor-pointer rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {msg.isRead ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-text-secondary/40 shrink-0" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 fill-accent text-accent shrink-0" />
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
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-accent" /> Quick Actions
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5 text-xs font-medium text-text-primary transition-all hover:border-accent/50 hover:bg-accent/5"
              >
                <span>Manage Projects</span>
                <ArrowRight className="h-3.5 w-3.5 text-text-secondary" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("skills")}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5 text-xs font-medium text-text-primary transition-all hover:border-accent/50 hover:bg-accent/5"
              >
                <span>Add Skill</span>
                <ArrowRight className="h-3.5 w-3.5 text-text-secondary" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("setup")}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5 text-xs font-medium text-text-primary transition-all hover:border-accent/50 hover:bg-accent/5"
              >
                <span>Setup Tools</span>
                <ArrowRight className="h-3.5 w-3.5 text-text-secondary" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("education")}
                className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5 text-xs font-medium text-text-primary transition-all hover:border-accent/50 hover:bg-accent/5"
              >
                <span>Education</span>
                <ArrowRight className="h-3.5 w-3.5 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Skills Distribution & System Status */}
        <div className="space-y-6">
          {/* Skills Breakdown */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center justify-between">
              <span>Skills by Category</span>
              <span className="text-xs font-normal text-text-secondary">
                {skills.length} total
              </span>
            </h3>

            {Object.keys(skillsByCategory).length === 0 ? (
              <p className="text-xs text-text-secondary py-4">
                No skills added yet.
              </p>
            ) : (
              <div className="space-y-2.5 mt-4">
                {Object.entries(skillsByCategory).map(([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-background px-3 py-2 text-xs"
                  >
                    <span className="text-text-secondary">{category}</span>
                    <span className="rounded-md bg-surface px-2 py-0.5 font-bold text-text-primary">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Status */}
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              System Status
            </h3>

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

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background py-2 text-xs font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <span>View Public Portfolio</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
