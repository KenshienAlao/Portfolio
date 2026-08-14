"use client";

import {
  AlertCircle,
  ArrowUpRight,
  Edit3,
  ExternalLink,
  FolderPlus,
  Loader2,
  PackagePlus,
  Plus,
  Terminal,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  useDeleteCategory,
  useDeleteItem,
  useSetupAdmin,
  type SetupCategory,
  type SetupItem,
} from "@/hooks/admin/use-setup-admin";
import { CategoryModal } from "@/components/dashboard/modals/CategoryModal";
import { ItemModal } from "@/components/dashboard/modals/ItemModal";
import Image from "next/image";

export function SetupTab() {
  const {
    data: categories,
    isPending: loadingSetup,
    error: setupError,
    refetch: refetchSetup,
  } = useSetupAdmin();

  const {
    mutate: deleteCategory,
    isPending: isDeletingCategory,
    variables: deletingCategoryId,
  } = useDeleteCategory();

  const {
    mutate: deleteItem,
    isPending: isDeletingItem,
    variables: deletingItemId,
  } = useDeleteItem();

  const [categoryForm, setCategoryForm] =
    useState<Partial<SetupCategory> | null>(null);
  const [itemForm, setItemForm] = useState<
    (Partial<SetupItem> & { categoryId?: number }) | null
  >(null);

  const [confirmDeleteCategoryId, setConfirmDeleteCategoryId] = useState<
    number | null
  >(null);
  const [confirmDeleteItemId, setConfirmDeleteItemId] = useState<number | null>(
    null,
  );

  const categoryList = categories ?? [];
  const totalItems = categoryList.reduce(
    (acc, cat) => acc + (cat.items?.length ?? 0),
    0,
  );
  const hasCategories = categoryList.length > 0;

  return (
    <div className="space-y-6 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-text-primary">
            Setup Configuration
            {hasCategories && (
              <span className="text-xs font-normal text-text-secondary">
                ({categoryList.length} categories, {totalItems} items)
              </span>
            )}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCategoryForm({})}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-surface"
          >
            <FolderPlus className="h-4 w-4 text-accent" /> Add Category
          </button>

          <button
            type="button"
            onClick={() => {
              if (!hasCategories) {
                setCategoryForm({});
              } else {
                setItemForm({});
              }
            }}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add Item
          </button>
        </div>
      </div>

      {setupError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-text-primary">
              Failed to load setup items
            </h3>
            <p className="max-w-xs text-xs text-text-secondary">
              {setupError.message ||
                "An unexpected error occurred while fetching your setup."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetchSetup()}
            className="mt-2 rounded-lg border border-border bg-surface px-4 py-2 text-xs font-medium text-text-primary transition-colors hover:bg-background"
          >
            Try again
          </button>
        </div>
      ) : loadingSetup ? (
        /* Loading skeleton */
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-xl border border-border bg-surface/50 p-5"
            />
          ))}
        </div>
      ) : !hasCategories ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
            <Terminal className="h-6 w-6 text-text-secondary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-text-primary">
              No setup categories yet
            </h3>
            <p className="max-w-xs text-xs text-text-secondary">
              Create your first setup category (e.g. Operating System, Code
              Editor) and add tools to it.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCategoryForm({})}
            className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            <FolderPlus className="h-4 w-4" /> Create First Category
          </button>
        </div>
      ) : (
        /* Categories List */
        <div className="space-y-6">
          {categoryList.map((cat) => {
            const isPendingCategory = cat.id < 0;
            const isDeletingThisCategory =
              isDeletingCategory && deletingCategoryId === cat.id;
            const isConfirmingDeleteCategory =
              confirmDeleteCategoryId === cat.id;
            const items = cat.items ?? [];

            return (
              <div
                key={cat.id}
                className={`rounded-2xl border bg-surface p-5 transition-colors ${
                  isPendingCategory
                    ? "border-accent/30 bg-accent/5 opacity-70"
                    : isDeletingThisCategory
                      ? "border-destructive/30 bg-destructive/5 opacity-60"
                      : "border-border hover:border-accent/40"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold tracking-wider uppercase text-text-primary">
                        {cat.category}
                      </h3>
                      <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-text-secondary">
                        {items.length} {items.length === 1 ? "item" : "items"}
                      </span>
                      {isPendingCategory && (
                        <span className="flex items-center gap-1 text-[10px] text-accent">
                          <Loader2 className="h-3 w-3 animate-spin" /> Saving
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setItemForm({ categoryId: cat.id })}
                      disabled={isPendingCategory}
                      className="flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-text-primary transition-colors hover:border-accent/50 hover:bg-accent/10 disabled:opacity-50"
                      title="Add item to this category"
                    >
                      <Plus className="h-3 w-3 text-accent" /> Add Item
                    </button>

                    <button
                      type="button"
                      onClick={() => setCategoryForm(cat)}
                      disabled={isDeletingThisCategory || isPendingCategory}
                      className="rounded-md border border-border bg-background p-1.5 text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                      title="Edit Category"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>

                    {isConfirmingDeleteCategory ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteCategory(cat.id);
                            setConfirmDeleteCategoryId(null);
                          }}
                          className="rounded-md bg-destructive px-2 py-1 text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteCategoryId(null)}
                          className="rounded-md border border-border bg-background px-2 py-1 text-[10px] text-text-secondary transition-colors hover:text-text-primary"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteCategoryId(cat.id)}
                        disabled={isDeletingThisCategory || isPendingCategory}
                        className="rounded-md border border-border bg-background p-1.5 text-text-secondary transition-colors hover:border-destructive hover:text-destructive disabled:opacity-50"
                        title="Delete Category"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {items.length === 0 ? (
                    <div className="flex items-center justify-between rounded-xl border border-dashed border-border/70 bg-background/50 p-4 text-xs text-text-secondary">
                      <span>No items in this category yet.</span>
                      <button
                        type="button"
                        onClick={() => setItemForm({ categoryId: cat.id })}
                        className="flex items-center gap-1 font-semibold text-accent hover:underline"
                      >
                        <PackagePlus className="h-3.5 w-3.5" /> Add first item
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((item) => {
                        const isPendingItem = item.id < 0;
                        const isDeletingThisItem =
                          isDeletingItem && deletingItemId === item.id;
                        const isConfirmingDeleteItem =
                          confirmDeleteItemId === item.id;

                        return (
                          <div
                            key={item.id}
                            className={`group relative flex flex-col justify-between gap-3 rounded-xl border bg-background p-3.5 transition-all ${
                              isPendingItem
                                ? "border-accent/30 bg-accent/5 opacity-70"
                                : isDeletingThisItem
                                  ? "border-destructive/30 opacity-50"
                                  : "border-border hover:border-accent/40"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2.5 min-w-0">
                                {item.imageLight ? (
                                  <div className="relative h-8 w-8 shrink-0 rounded-lg border border-border bg-surface p-1 flex items-center justify-center">
                                    <Image
                                      src={item.imageLight}
                                      alt={item.value}
                                      fill
                                      sizes="32px"
                                      unoptimized={
                                        item.imageLight.startsWith("blob:") ||
                                        item.imageLight.startsWith("http")
                                      }
                                      className={`object-contain p-0.5 ${
                                        item.imageDark ? "dark:hidden" : ""
                                      }`}
                                    />
                                    {item.imageDark && (
                                      <Image
                                        src={item.imageDark}
                                        alt={item.value}
                                        fill
                                        sizes="32px"
                                        unoptimized={
                                          item.imageDark.startsWith("blob:") ||
                                          item.imageDark.startsWith("http")
                                        }
                                        className="object-contain p-0.5 hidden dark:block"
                                      />
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary">
                                    <Terminal className="h-4 w-4" />
                                  </div>
                                )}

                                <div className="min-w-0">
                                  <a
                                    href={item.download}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-bold text-text-primary transition-colors hover:text-accent truncate"
                                    title={item.download}
                                  >
                                    <span className="truncate">
                                      {item.value}
                                    </span>
                                    <ArrowUpRight className="h-3 w-3 shrink-0 text-text-secondary" />
                                  </a>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                {isPendingItem ? (
                                  <span className="flex items-center gap-1 text-[10px] text-accent font-medium">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  </span>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setItemForm({
                                          ...item,
                                          categoryId: cat.id,
                                        })
                                      }
                                      disabled={isDeletingThisItem}
                                      className="rounded border border-transparent p-1 text-text-secondary transition-colors hover:border-border hover:text-accent"
                                      title="Edit Item"
                                    >
                                      <Edit3 className="h-3 w-3" />
                                    </button>

                                    {isConfirmingDeleteItem ? (
                                      <div className="flex items-center gap-0.5">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            deleteItem(item.id);
                                            setConfirmDeleteItemId(null);
                                          }}
                                          className="rounded bg-destructive px-1.5 py-0.5 text-[9px] font-semibold text-white"
                                        >
                                          Del
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setConfirmDeleteItemId(null)
                                          }
                                          className="rounded border border-border px-1.5 py-0.5 text-[9px] text-text-secondary"
                                        >
                                          No
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setConfirmDeleteItemId(item.id)
                                        }
                                        disabled={isDeletingThisItem}
                                        className="rounded border border-transparent p-1 text-text-secondary transition-colors hover:border-border hover:text-destructive"
                                        title="Delete Item"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>

                            {item.subValue && item.subDownload && (
                              <div className="pt-1">
                                <a
                                  href={item.subDownload}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/5 px-2 py-0.5 text-[10px] text-accent transition-colors hover:bg-accent/10"
                                >
                                  <ExternalLink className="h-2.5 w-2.5" />
                                  <span className="truncate">
                                    {item.subValue}
                                  </span>
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {categoryForm !== null && (
        <CategoryModal
          categoryForm={categoryForm}
          setCategoryForm={setCategoryForm}
        />
      )}

      {itemForm !== null && (
        <ItemModal
          categories={categoryList}
          itemForm={itemForm}
          setItemForm={setItemForm}
        />
      )}
    </div>
  );
}
