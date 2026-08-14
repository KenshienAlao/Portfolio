import Image from "next/image";
import {
  FiArrowUpRight,
  FiEdit3,
  FiExternalLink,
  FiLoader,
  FiPlus,
  FiTerminal,
  FiTrash2,
} from "react-icons/fi";
import { LuPackagePlus } from "react-icons/lu";
import type { SetupCategory, SetupItem } from "@/hooks/admin/use-setup-admin";

interface props {
  categoryList: SetupCategory[];
  setItemForm: (
    item: (Partial<SetupItem> & { categoryId?: number }) | null,
  ) => void;
  isDeletingCategory: boolean;
  deletingCategoryId: number | undefined;
  setCategoryForm: (cat: Partial<SetupCategory> | null) => void;
  confirmDeleteCategoryId: number | null;
  setConfirmDeleteCategoryId: (id: number | null) => void;
  deleteCategory: (id: number) => void;
  isDeletingItem: boolean;
  deletingItemId: number | undefined;
  setConfirmDeleteItemId: (id: number | null) => void;
  deleteItem: (id: number) => void;
  confirmDeleteItemId: number | null;
}

export function Content({
  categoryList,
  setItemForm,
  isDeletingCategory,
  deletingCategoryId,
  setCategoryForm,
  confirmDeleteCategoryId,
  setConfirmDeleteCategoryId,
  deleteCategory,
  isDeletingItem,
  deletingItemId,
  setConfirmDeleteItemId,
  deleteItem,
  confirmDeleteItemId,
}: props) {
  return (
    <div className="space-y-6">
      {categoryList.map((cat) => {
        const isPendingCategory = cat.id < 0;
        const isDeletingThisCategory =
          isDeletingCategory && deletingCategoryId === cat.id;
        const isConfirmingDeleteCategory = confirmDeleteCategoryId === cat.id;
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
                      <FiLoader className="h-3 w-3 animate-spin" /> Saving
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
                  <FiPlus className="h-3 w-3 text-accent" /> Add Item
                </button>

                <button
                  type="button"
                  onClick={() => setCategoryForm(cat)}
                  disabled={isDeletingThisCategory || isPendingCategory}
                  className="rounded-md border border-border bg-background p-1.5 text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                  title="Edit Category"
                >
                  <FiEdit3 className="h-3.5 w-3.5" />
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
                    <FiTrash2 className="h-3.5 w-3.5" />
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
                    <LuPackagePlus className="h-3.5 w-3.5" /> Add first item
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
                        className="group flex flex-col justify-between gap-3 rounded-xl border border-border/60 bg-background/60 p-3.5 transition-all hover:border-accent/40 hover:bg-background"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {item.imageLight || item.imageDark ? (
                              <div className="relative h-8 w-8 shrink-0 rounded-lg border border-border/70 bg-surface overflow-hidden">
                                {item.imageLight && (
                                  <Image
                                    src={item.imageLight}
                                    alt={item.value}
                                    fill
                                    sizes="64px"
                                    unoptimized={item.imageLight.startsWith(
                                      "http",
                                    )}
                                    className="object-contain p-0.5 dark:hidden"
                                  />
                                )}
                                {item.imageDark && (
                                  <Image
                                    src={item.imageDark}
                                    alt={item.value}
                                    fill
                                    sizes="64px"
                                    unoptimized={item.imageDark.startsWith(
                                      "http",
                                    )}
                                    className="object-contain p-0.5 hidden dark:block"
                                  />
                                )}
                              </div>
                            ) : (
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary">
                                <FiTerminal className="h-4 w-4" />
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
                                <span className="truncate">{item.value}</span>
                                <FiArrowUpRight className="h-3 w-3 shrink-0 text-text-secondary" />
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {isPendingItem ? (
                              <span className="flex items-center gap-1 text-[10px] text-accent font-medium">
                                <FiLoader className="h-3 w-3 animate-spin" />
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
                                  <FiEdit3 className="h-3 w-3" />
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
                                    <FiTrash2 className="h-3 w-3" />
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
                              <FiExternalLink className="h-2.5 w-2.5" />
                              <span className="truncate">{item.subValue}</span>
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
  );
}
