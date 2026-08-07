"use client";

import { useState } from "react";
import { ThemeTogglerButton } from "@/components/theme-toggle";
import { Orb } from "@/components/ui/orb";
import { Navbar } from "@/components/dashboard/navbar";

// import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { ProjectsTab } from "@/components/dashboard/ProjectsTab";
import { EducationTab } from "@/components/dashboard/EducationTab";
// import { SkillsTab } from "@/components/dashboard/SkillsTab";
// import { SetupTab } from "@/components/dashboard/SetupTab";
// import { MessagesTab } from "@/components/dashboard/MessagesTab";

export type Tab =
  // | "overview"
  "projects" | "education";
// | "skills"
// | "setup"
// | "messages";

export function DashboardView() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  const tabs: Record<Tab, React.ReactNode> = {
    // overview: <OverviewTab setActiveTab={setActiveTab} />,
    projects: <ProjectsTab />,
    education: <EducationTab />,
    // skills: <SkillsTab />,
    // setup: <SetupTab />,
    // messages: <MessagesTab />,
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground flex-col md:flex-row">
      <Orb />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto pb-24 md:pb-10 relative z-40">
        <div className="mb-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs text-accent mb-2">
              <span className="text-text-secondary">~/portfolio/dashboard</span>
              <span className="text-text-secondary"> $ </span>
              <span>show -t {activeTab}</span>
            </div>
            <div className="md:hidden">
              <ThemeTogglerButton />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary capitalize sm:text-4xl">
            {activeTab}
          </h1>
        </div>

        <div className="max-w-5xl mx-auto">{tabs[activeTab]}</div>
      </main>
    </div>
  );
}
