import { Skill } from "@/service/skill.service";
import Image from "next/image";
import { FiEdit3, FiLoader, FiTrash2 } from "react-icons/fi";

interface props {
  groupedSkills: Record<string, Skill[]>;
  setSkillForm: (skill: Partial<Skill>) => void;
  deleteSkill: (skillId: number) => void;
  isDeletingSkill: boolean;
  deletingSkillId: number | undefined;
  confirmDeleteId: number | null;
  setConfirmDeleteId: (id: number | null) => void;
}

export function Content({
  groupedSkills,
  setSkillForm,
  deleteSkill,
  isDeletingSkill,
  deletingSkillId,
  confirmDeleteId,
  setConfirmDeleteId,
}: props) {
  return (
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
  );
}
