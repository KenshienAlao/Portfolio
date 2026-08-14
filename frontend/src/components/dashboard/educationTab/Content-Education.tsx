import { Education } from "@/service/education.service";
import { Dispatch, SetStateAction } from "react";
import { FaExternalLinkAlt, FaMapPin, FaTrash } from "react-icons/fa";
import { FiEdit3, FiLoader } from "react-icons/fi";

interface props {
  sortedEducation: Education[] | undefined;
  setEducationForm: Dispatch<SetStateAction<Partial<Education | null>>>;
  confirmDeleteId: number | null;
  setConfirmDeleteId: Dispatch<SetStateAction<number | null>>;
  isDeletingEducation: boolean;
  deletingEducationId: number | undefined;
  deleteEducation: (id: number) => void;
}

export function Content({
  sortedEducation,
  setEducationForm,
  confirmDeleteId,
  setConfirmDeleteId,
  isDeletingEducation,
  deletingEducationId,
  deleteEducation,
}: props) {
  return (
    <div className="space-y-4">
      {sortedEducation?.map((item) => {
        const isPendingCreate = item.id < 0;
        const isDeletingThis =
          isDeletingEducation && deletingEducationId === item.id;
        const isConfirmingDelete = confirmDeleteId === item.id;
        const actionsDisabled = isPendingCreate || isDeletingThis;

        return (
          <div
            key={item.id}
            className={`flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-200 md:flex-row hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft-lg ${
              isPendingCreate ? "opacity-60 grayscale" : ""
            }`}
          >
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-mono text-sm font-bold text-text-primary">
                  {item.school}
                </h4>
                <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-medium text-accent">
                  {item.yearStart} - {item.yearEnd}
                </span>
              </div>
              <p className="font-mono text-xs font-semibold text-accent">
                {item.degree}
              </p>
              <p className="max-w-3xl text-xs leading-relaxed text-text-secondary">
                {item.description}
              </p>
              {item.location && (
                <a
                  href={item.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-text-secondary transition-colors hover:text-accent"
                >
                  <FaMapPin className="h-3 w-3" /> Map Location{" "}
                  <FaExternalLinkAlt className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
            <div className="flex shrink-0 items-end justify-start gap-2 md:flex-col">
              {isConfirmingDelete ? (
                <div className="flex flex-col gap-2">
                  <span className="text-center font-mono text-[10px] font-semibold text-destructive">
                    Are you sure?
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        deleteEducation(item.id);
                        setConfirmDeleteId(null);
                      }}
                      className="rounded-md bg-destructive px-3 py-1.5 font-mono text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setEducationForm(item)}
                    disabled={actionsDisabled}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiEdit3 className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(item.id)}
                    disabled={actionsDisabled}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-destructive hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isDeletingThis ? (
                      <>
                        <FiLoader className="h-3.5 w-3.5 animate-spin" />{" "}
                        Deleting...
                      </>
                    ) : (
                      <>
                        <FaTrash className="h-3.5 w-3.5" /> Delete
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
