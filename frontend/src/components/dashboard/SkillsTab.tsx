"use client";

import { useState } from "react";
import { SkillModal } from "@/components/dashboard/modals/SkillModal";
import {
  Skill,
  useDeleteSkillById,
  useSkillAdmin,
} from "@/hooks/admin/use-skill-admin";
import { DashboardSkillCategorySkeleton } from "../ui/skeleton";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import {
  FiAlertCircle,
  FiEdit3,
  FiLoader,
  FiTrash2,
  FiZap,
} from "react-icons/fi";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-text-primary">
            {categoryCount !== 1 ? "Categories" : "Category"}
            {hasSkills && (
              <span className="font-mono text-xs font-normal text-text-secondary">
                ({categoryCount})
              </span>
            )}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setSkillForm({})}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
        >
          <FaPlus className="h-4 w-4" /> Add Skill
        </button>
      </div>

      {skillsError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <FiAlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              Couldn&apos;t load skills
            </h3>
            <p className="max-w-xs text-xs text-text-secondary">
              {skillsError.message || "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetchSkills()}
            className="mt-2 flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-mono text-xs font-semibold text-text-primary transition-colors hover:border-accent/40"
          >
            Retry
          </button>
        </div>
      ) : loadingSkills ? (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <DashboardSkillCategorySkeleton key={i} />
          ))}
        </div>
      ) : !hasSkills ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <FiZap className="h-6 w-6 text-accent" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              No skills yet
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setSkillForm({})}
            className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-xs font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            <FaPlus className="h-4 w-4" /> Add Skill
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, list]) => (
            <div
              key={category}
              className="rounded-xl border border-border bg-surface p-6 space-y-4"
            >
              <h3 className="font-mono text-sm font-bold text-text-primary border-b border-border pb-2 capitalize">
                {category}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {list.map((skill) => {
                  const isPendingCreate = skill.id < 0;
                  const isDeletingThis =
                    isDeletingSkill && deletingSkillId === skill.id;
                  const isConfirmingDelete = confirmDeleteId === skill.id;
                  const actionsDisabled = isPendingCreate || isDeletingThis;

                  return (
                    <div
                      key={skill.id}
                      className={`flex items-center justify-between rounded-lg border p-3 transition-all duration-200 ${
                        isPendingCreate
                          ? "border-accent/30 bg-accent/5"
                          : "border-border/60 bg-background/50 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft-lg"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 ${
                          isPendingCreate ? "animate-pulse opacity-70" : ""
                        }`}
                      >
                        {skill.imageLight ? (
                          <div
                            className={`relative h-4 w-4 shrink-0 ${skill.imageDark ? "dark:hidden" : ""}`}
                          >
                            <Image
                              src={skill.imageLight as string}
                              alt={skill.name}
                              fill
                              sizes="16px"
                              priority
                              unoptimized={String(skill.imageLight).startsWith(
                                "blob:",
                              )}
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                        {skill.imageDark ? (
                          <div className="relative h-4 w-4 shrink-0 hidden dark:block">
                            <Image
                              src={skill.imageDark as string}
                              alt={skill.name}
                              fill
                              sizes="16px"
                              priority
                              unoptimized={String(skill.imageDark).startsWith(
                                "blob:",
                              )}
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                        <span className="font-mono text-xs font-bold text-text-primary block">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {isPendingCreate ? (
                          <span className="flex items-center gap-1 font-mono text-[10px] font-medium text-accent">
                            <FiLoader className="h-3 w-3 animate-spin" />
                            Saving
                          </span>
                        ) : isConfirmingDelete ? (
                          <div className="flex flex-col gap-1 items-center">
                            <span className="text-center font-mono text-[10px] font-semibold text-destructive">
                              Sure?
                            </span>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  deleteSkill(skill.id);
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
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => setSkillForm(skill)}
                              disabled={actionsDisabled}
                              className="p-1 hover:bg-background rounded text-text-secondary hover:text-accent transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FiEdit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(skill.id)}
                              disabled={actionsDisabled}
                              className="p-1 hover:bg-destructive/10 rounded text-text-secondary hover:text-destructive transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isDeletingThis ? (
                                <FiLoader className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <FiTrash2 className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
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
