"use client";

import { AlertCircle, Loader2, Save } from "lucide-react";
import { BaseModal } from "./BaseModal";
import {
  useAddCategory,
  useEditCategory,
  type SetupCategory,
} from "@/hooks/admin/use-setup-admin";
import { FormEvent, useState } from "react";
import z, { ZodError } from "zod";

const categorySchema = z.object({
  category: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Max 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Max 1000 characters"),
});

interface CategoryModalProps {
  categoryForm: Partial<SetupCategory>;
  setCategoryForm: (category: Partial<SetupCategory> | null) => void;
}

export function CategoryModal({
  categoryForm,
  setCategoryForm,
}: CategoryModalProps) {
  const {
    mutate: addCategory,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddCategory();
  const {
    mutate: editCategory,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditCategory();

  const isEdit = typeof categoryForm.id === "number" && categoryForm.id > 0;
  const isLoading = isLoadingAdd || isLoadingEdit;

  const [validateError, setValidateError] = useState<ZodError | null>(null);

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const categoryError =
    error && "path" in error && error.path[0] === "category"
      ? error
      : undefined;
  const descriptionError =
    error && "path" in error && error.path[0] === "description"
      ? error
      : undefined;
  const hasFieldError = Boolean(categoryError || descriptionError);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const category = (formData.get("category") as string)?.trim() || "";
    const description = (formData.get("description") as string)?.trim() || "";

    const result = categorySchema.safeParse({ category, description });
    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    setValidateError(null);

    if (isEdit && categoryForm.id !== undefined) {
      editCategory({ id: categoryForm.id, data: { category, description } });
    } else {
      addCategory({ category, description });
    }

    setCategoryForm(null);
  };

  return (
    <BaseModal
      title={isEdit ? "Edit Setup Category" : "Add Setup Category"}
      onClose={() => setCategoryForm(null)}
      maxWidth="max-w-md"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="space-y-4 font-mono text-xs text-text-primary"
      >
        <div className="space-y-1">
          <label className="block text-text-secondary">Category Name</label>
          <input
            required
            name="category"
            defaultValue={categoryForm.category || ""}
            disabled={isLoading}
            placeholder="Operating System, Code Editor, Terminal..."
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              categoryError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {categoryError && (
            <p role="alert" className="text-destructive text-[11px]">
              {categoryError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">Description</label>
          <textarea
            required
            name="description"
            rows={3}
            defaultValue={categoryForm.description || ""}
            disabled={isLoading}
            placeholder="Describe the category, workflow, or environment..."
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              descriptionError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {descriptionError && (
            <p role="alert" className="text-destructive text-[11px]">
              {descriptionError.message}
            </p>
          )}
        </div>

        {error && !hasFieldError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-destructive"
          >
            <AlertCircle
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>{error.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {isEdit ? "Save Changes" : "Create Category"}
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
