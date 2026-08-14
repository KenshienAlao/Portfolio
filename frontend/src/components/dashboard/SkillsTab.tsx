"use client";

import { useState } from "react";
import { SkillModal } from "@/components/dashboard/modals/SkillModal";
import {
  Skill,
  useDeleteSkillById,
  useSkillAdmin,
} from "@/hooks/admin/use-skill-admin";
import { DashboardSkillCategorySkeleton } from "../ui/skeleton";
import { Header } from "./skillsTab/Skills-Header";
import { FetchError } from "./skillsTab/Skills-Error";
import { Empty } from "./skillsTab/Skills-Empty";
import { Content } from "./skillsTab/Skills-Content";

export function SkillsTab() {
  const {
    data: skills,
    isPending: loadingSkills,
    error: skillsError,
    refetch: refetchSkills,
  } = useSkillAdmin();

  const groupedSkills = (() => {
    if (!skills) return {};
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      const cat = skill.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});
  })();

  const {
    mutate: deleteSkill,
    isPending: isDeletingSkill,
    variables: deletingSkillId,
  } = useDeleteSkillById();

  const [skillForm, setSkillForm] = useState<Partial<Skill> | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const hasSkills = (skills?.length ?? 0) > 0;
  const categoryCount = Object.keys(groupedSkills).length;

  return (
    <div className="space-y-6">
      <Header
        categoryCount={categoryCount}
        hasSkills={hasSkills}
        setSkillForm={setSkillForm}
      />
      {skillsError ? (
        <FetchError skillError={skillsError} refetchSkill={refetchSkills} />
      ) : loadingSkills ? (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <DashboardSkillCategorySkeleton key={i} />
          ))}
        </div>
      ) : !hasSkills ? (
        <Empty setSkillForm={setSkillForm} />
      ) : (
        <Content
          groupedSkills={groupedSkills}
          setSkillForm={setSkillForm}
          deleteSkill={deleteSkill}
          isDeletingSkill={isDeletingSkill}
          deletingSkillId={deletingSkillId}
          confirmDeleteId={confirmDeleteId}
          setConfirmDeleteId={setConfirmDeleteId}
        />
      )}

      {skillForm !== null && (
        <SkillModal
          skillForm={skillForm}
          skills={skills || []}
          setSkillForm={setSkillForm}
        />
      )}
    </div>
  );
}
