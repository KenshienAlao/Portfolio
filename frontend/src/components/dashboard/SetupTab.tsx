"use client";

import { AlertCircle, Edit3, Loader2, Plus, Terminal, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Setup } from "@/hooks/admin/use-setup-admin";
import { SetupModal } from "@/components/dashboard/modals/SetupModal";
import {
  useDeleteSetupById,
  useSetupAdmin,
} from "@/hooks/admin/use-setup-admin";
import Image from "next/image";

export function SetupTab() {
  const {
    data: setupItems,
    isPending: loadingSetup,
    error: setupError,
    refetch: refetchSetup,
  } = useSetupAdmin();

  const {
    mutate: deleteSetup,
    isPending: isDeletingSetup,
    variables: deletingSetupId,
  } = useDeleteSetupById();

  const [setupForm, setSetupForm] = useState<Partial<Setup> | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const hasItems = (setupItems?.length ?? 0) > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-text-primary">
            Setup Items
            {hasItems && (
              <span className="font-mono text-xs font-normal text-text-secondary">
                ({setupItems?.length})
              </span>
            )}
          </h2>
        </div>
        <button
          onClick={() => setSetupForm({})}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
        >
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      {setupError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              Couldn&apos;t load setup items
            </h3>
            <p className="max-w-xs text-xs text-text-secondary">
              {setupError.message || "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            onClick={() => refetchSetup()}
            className="mt-2 flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 font-mono text-xs font-semibold text-text-primary transition-colors hover:border-accent/40"
          >
            Retry
          </button>
        </div>
      ) : loadingSetup ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl border border-border bg-surface/50 p-5"
            />
          ))}
        </div>
      ) : !hasItems ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <Terminal className="h-6 w-6 text-accent" />
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-sm font-bold text-text-primary">
              No setup items yet
            </h3>
            <p className="max-w-xs text-xs text-text-secondary">
              Add the tools, operating system, and hardware configuration you use.
            </p>
          </div>
          <button
            onClick={() => setSetupForm({})}
            className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-xs font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add Item
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {setupItems?.map((item) => {
            const isPendingCreate = item.id < 0;
            const isDeletingThis =
              isDeletingSetup && deletingSetupId === item.id;
            const isConfirmingDelete = confirmDeleteId === item.id;
            const actionsDisabled = isPendingCreate || isDeletingThis;

            return (
              <div
                key={item.id}
                className={`rounded-xl border bg-surface p-5 flex flex-col justify-between transition-all ${
                  isPendingCreate
                    ? "border-accent/30 bg-accent/5 opacity-70"
                    : "border-border hover:border-accent/40"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {item.imageLight && (
                        <div className="relative h-9 w-9 shrink-0 rounded-lg border border-border bg-background p-1.5 flex items-center justify-center">
                          <Image
                            src={item.imageLight}
                            alt={item.category}
                            fill
                            sizes="36px"
                            unoptimized={item.imageLight.startsWith("blob:")}
                            className={`object-contain p-1 ${item.imageDark ? "dark:hidden" : ""}`}
                          />
                          {item.imageDark && (
                            <Image
                              src={item.imageDark}
                              alt={item.category}
                              fill
                              sizes="36px"
                              unoptimized={item.imageDark.startsWith("blob:")}
                              className="object-contain p-1 hidden dark:block"
                            />
                          )}
                        </div>
                      )}
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                          {item.category}
                        </span>
                        <h4 className="font-mono text-sm font-bold text-text-primary">
                          {Array.isArray(item.values)
                            ? item.values.join(" / ")
                            : item.values}
                        </h4>
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      {isPendingCreate ? (
                        <span className="flex items-center gap-1 font-mono text-[10px] font-medium text-accent">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Saving
                        </span>
                      ) : isConfirmingDelete ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              deleteSetup(item.id);
                              setConfirmDeleteId(null);
                            }}
                            className="rounded-md bg-destructive px-2 py-1 font-mono text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-text-secondary transition-colors hover:text-text-primary"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => setSetupForm(item)}
                            disabled={actionsDisabled}
                            className="p-1.5 hover:bg-background rounded-md text-text-secondary hover:text-accent transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Edit item"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(item.id)}
                            disabled={actionsDisabled}
                            className="p-1.5 hover:bg-destructive/10 rounded-md text-text-secondary hover:text-destructive transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Delete item"
                          >
                            {isDeletingThis ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.description}
                  </p>

                  {item.downloads && item.downloads.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.downloads.map((dl, i) => (
                        <a
                          key={i}
                          href={dl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] text-accent hover:underline break-all"
                        >
                          {dl}
                        </a>
                      ))}
                    </div>
                  )}

                  {item.subValue && (
                    <p className="text-[10px] font-mono text-accent">
                      Sub-Value: {item.subValue}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {setupForm !== null && (
        <SetupModal
          setupForm={setupForm}
          setSetupForm={setSetupForm}
        />
      )}
    </div>
  );
}
