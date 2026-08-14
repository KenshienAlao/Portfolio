"use client";

import { useProjectAdmin } from "@/hooks/admin/use-project-admin";
import { useEducationAdmin } from "@/hooks/admin/use-education-admin";
import { useSkillAdmin } from "@/hooks/admin/use-skill-admin";
import { useSetupAdmin } from "@/hooks/admin/use-setup-admin";
import { useMessagesAdmin } from "@/hooks/admin/use-message-admin";
import { Header } from "./overviewTab/Overview-Header";
import { Manage } from "./overviewTab/Overview-Manage";
import { Messages } from "./overviewTab/Overview-Message";
import { Skills } from "./overviewTab/Overview-Skills";
import { Stack } from "./overviewTab/Overview-Stack";
import { Tab } from "@/types/dashboard";

interface OverviewTabProps {
  setActiveTab: (tab: Tab) => void;
}

export function OverviewTab({ setActiveTab }: OverviewTabProps) {
  const { data: projects = [] } = useProjectAdmin();
  const { data: education = [] } = useEducationAdmin();
  const { data: skills = [] } = useSkillAdmin();
  const { data: setupCategories = [] } = useSetupAdmin();
  const { data: messages = [] } = useMessagesAdmin();

  let unreadMessagesCount = 0;
  for (const m of messages) {
    if (!m.isRead) unreadMessagesCount++;
  }

  const skillsByCategory: Record<string, number> = {};
  for (const s of skills) {
    const cat = s.category || "General";
    skillsByCategory[cat] = (skillsByCategory[cat] || 0) + 1;
  }
  const maxCategoryCount = Math.max(1, ...Object.values(skillsByCategory));

  return (
    <div className="space-y-8 font-mono">
      <Header unreadMessagesCount={unreadMessagesCount} />
      <Manage
        projects={projects}
        skills={skills}
        setupCategories={setupCategories}
        education={education}
        messages={messages}
        unreadMessagesCount={unreadMessagesCount}
        setActiveTab={setActiveTab}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Messages
          unreadMessagesCount={unreadMessagesCount}
          setActiveTab={setActiveTab}
          messages={messages}
        />
        <div className="space-y-6">
          <Skills
            skills={skills}
            skillsByCategory={skillsByCategory}
            maxCategoryCount={maxCategoryCount}
          />
          <Stack />
        </div>
      </div>
    </div>
  );
}
