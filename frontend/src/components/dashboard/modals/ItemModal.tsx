"use client";

import { BaseModal } from "./BaseModal";
import {
  useAddItem,
  useEditItem,
  type SetupCategory,
  type SetupItem,
} from "@/hooks/admin/use-setup-admin";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import z, { ZodError } from "zod";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { FaSave } from "react-icons/fa";

const MAX_IMAGE_SIZE = 25 * 1024 * 1024;

const imageSchemaLight = z.union([
  z
    .instanceof(File, { message: "Light mode image is required" })
    .refine((file) => file.size > 0, "Light mode image is required")
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      "Image must be 25MB or smaller",
    )
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
  z.string().min(1, "Light mode image is required"),
]);

const imageSchemaDark = z
  .union([
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_IMAGE_SIZE,
        "Image must be 25MB or smaller",
      )
      .refine(
        (file) => file.type.startsWith("image/"),
        "File must be an image",
      ),
    z.string(),
  ])
  .optional();

const itemFormSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  value: z.string().min(1, "Value/Name is required"),
  download: z.string().min(1, "Download URL is required"),
  subValue: z.string().optional(),
  subDownload: z.string().optional(),
  imageLight: imageSchemaLight,
  imageDark: imageSchemaDark,
});

interface ItemModalProps {
  categories: SetupCategory[];
  itemForm: Partial<SetupItem> & { categoryId?: number };
  setItemForm: (
    item: (Partial<SetupItem> & { categoryId?: number }) | null,
  ) => void;
}

export function ItemModal({
  categories,
  itemForm,
  setItemForm,
}: ItemModalProps) {
  const {
    mutate: addItem,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddItem();
  const {
    mutate: editItem,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditItem();

  const isEdit = typeof itemForm.id === "number" && itemForm.id > 0;
  const isLoading = isLoadingAdd || isLoadingEdit;

  const [validateError, setValidateError] = useState<ZodError | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    itemForm.categoryId
      ? String(itemForm.categoryId)
      : categories[0]?.id
        ? String(categories[0].id)
        : "",
  );

  const [lightPreview, setLightPreview] = useState<string | null>(
    itemForm.imageLight || null,
  );
  const [lightFileName, setLightFileName] = useState<string | null>(null);
  const lightInputRef = useRef<HTMLInputElement>(null);

  const [darkPreview, setDarkPreview] = useState<string | null>(
    itemForm.imageDark || null,
  );
  const [darkFileName, setDarkFileName] = useState<string | null>(null);
  const darkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (lightPreview?.startsWith("blob:")) URL.revokeObjectURL(lightPreview);
      if (darkPreview?.startsWith("blob:")) URL.revokeObjectURL(darkPreview);
    };
  }, [lightPreview, darkPreview]);

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const categoryError =
    error && "path" in error && error.path[0] === "categoryId"
      ? error
      : undefined;
  const valueError =
    error && "path" in error && error.path[0] === "value" ? error : undefined;
  const downloadError =
    error && "path" in error && error.path[0] === "download"
      ? error
      : undefined;
  const imageLightError =
    error && "path" in error && error.path[0] === "imageLight"
      ? error
      : undefined;
  const imageDarkError =
    error && "path" in error && error.path[0] === "imageDark"
      ? error
      : undefined;

  const hasFieldError = Boolean(
    categoryError ||
    valueError ||
    downloadError ||
    imageLightError ||
    imageDarkError,
  );

  const handleLightImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setLightPreview(nextPreview);
    setLightFileName(file.name);
  };

  const handleRemoveLightImage = () => {
    setLightPreview(null);
    setLightFileName(null);
    if (lightInputRef.current) lightInputRef.current.value = "";
  };

  const handleDarkImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setDarkPreview(nextPreview);
    setDarkFileName(file.name);
  };

  const handleRemoveDarkImage = () => {
    setDarkPreview(null);
    setDarkFileName(null);
    if (darkInputRef.current) darkInputRef.current.value = "";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const lightEntry = formData.get("imageLight");
    const hasNewLightFile = lightEntry instanceof File && lightEntry.size > 0;
    const darkEntry = formData.get("imageDark");
    const hasNewDarkFile = darkEntry instanceof File && darkEntry.size > 0;

    const dataToValidate: Record<string, unknown> = {
      ...Object.fromEntries(formData.entries()),
      ...(!hasNewLightFile && isEdit && itemForm.imageLight && lightPreview
        ? { imageLight: itemForm.imageLight }
        : {}),
      ...(!hasNewDarkFile && isEdit && itemForm.imageDark && darkPreview
        ? { imageDark: itemForm.imageDark }
        : {}),
    };

    if (!hasNewDarkFile && !darkPreview) {
      delete dataToValidate.imageDark;
    }

    const result = itemFormSchema.safeParse(dataToValidate);
    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    setValidateError(null);

    if (isEdit && !hasNewLightFile) {
      formData.delete("imageLight");
    }
    if (isEdit && !hasNewDarkFile) {
      formData.delete("imageDark");
    }
    if (!isEdit && !hasNewDarkFile) {
      formData.delete("imageDark");
    }

    if (isEdit && itemForm.id !== undefined) {
      editItem({ id: itemForm.id, data: formData });
    } else {
      addItem(formData);
    }

    setItemForm(null);
    handleRemoveLightImage();
    handleRemoveDarkImage();
  };

  return (
    <BaseModal
      title={isEdit ? "Edit Setup Item" : "Add Setup Item"}
      onClose={() => setItemForm(null)}
      maxWidth="max-w-lg"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="space-y-3 font-mono text-xs text-text-primary"
      >
        <div className="space-y-1">
          <label className="block text-text-secondary">Category</label>
          <select
            required
            name="categoryId"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            disabled={isLoading}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              categoryError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.category}
              </option>
            ))}
          </select>
          {categoryError && (
            <p role="alert" className="text-destructive">
              {categoryError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">Tool / Item Name</label>
          <input
            required
            name="value"
            defaultValue={itemForm.value || ""}
            disabled={isLoading}
            placeholder="VS Codium, Arch Linux, Alacritty..."
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              valueError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {valueError && (
            <p role="alert" className="text-destructive">
              {valueError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">
            Download / Website URL
          </label>
          <input
            required
            name="download"
            defaultValue={itemForm.download || ""}
            disabled={isLoading}
            placeholder="https://vscodium.com"
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              downloadError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {downloadError && (
            <p role="alert" className="text-destructive">
              {downloadError.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="block text-text-secondary">
              Sub-Button Text{" "}
              <span className="text-text-secondary/50">(optional)</span>
            </label>
            <input
              name="subValue"
              defaultValue={itemForm.subValue || ""}
              disabled={isLoading}
              placeholder="Download my Config"
              className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent disabled:opacity-60"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-text-secondary">
              Sub-Button URL{" "}
              <span className="text-text-secondary/50">(optional)</span>
            </label>
            <input
              name="subDownload"
              defaultValue={itemForm.subDownload || ""}
              disabled={isLoading}
              placeholder="https://github.com/..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent disabled:opacity-60"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">
            Logo / Icon (Light Mode)
          </label>
          <label
            htmlFor="itemImageLight"
            className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed bg-background px-3 py-3 text-center transition-colors ${
              isLoading
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:border-accent/60"
            } ${imageLightError ? "border-destructive/60" : "border-border"}`}
          >
            {lightPreview ? (
              <div className="relative h-14 w-full overflow-hidden rounded">
                <Image
                  src={lightPreview}
                  alt={lightFileName || "Light mode preview"}
                  fill
                  sizes="(max-width: 640px) 100vw, 448px"
                  unoptimized={
                    lightPreview.startsWith("blob:") ||
                    lightPreview.startsWith("http")
                  }
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <LuImagePlus
                  className="h-4 w-4 text-text-secondary"
                  aria-hidden="true"
                />
                <span className="text-text-secondary">
                  Click to upload light icon (max 25MB)
                </span>
              </>
            )}
          </label>
          <input
            ref={lightInputRef}
            id="itemImageLight"
            type="file"
            name="imageLight"
            accept="image/*"
            onChange={handleLightImageChange}
            disabled={isLoading}
            className="hidden"
          />
          {lightPreview && (
            <div className="flex items-center justify-between text-text-secondary">
              <span className="truncate">
                {lightFileName ?? "Current image"}
              </span>
              <button
                type="button"
                onClick={handleRemoveLightImage}
                disabled={isLoading}
                className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60"
              >
                Remove
              </button>
            </div>
          )}
          {imageLightError && (
            <p role="alert" className="text-destructive">
              {imageLightError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">
            Logo / Icon (Dark Mode){" "}
            <span className="text-text-secondary/50">— optional</span>
          </label>
          <label
            htmlFor="itemImageDark"
            className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed bg-background px-3 py-3 text-center transition-colors ${
              isLoading
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:border-accent/60"
            } ${imageDarkError ? "border-destructive/60" : "border-border"}`}
          >
            {darkPreview ? (
              <div className="relative h-14 w-full overflow-hidden rounded">
                <Image
                  src={darkPreview}
                  alt={darkFileName || "Dark mode preview"}
                  fill
                  sizes="(max-width: 640px) 100vw, 448px"
                  unoptimized={
                    darkPreview.startsWith("blob:") ||
                    darkPreview.startsWith("http")
                  }
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <LuImagePlus
                  className="h-4 w-4 text-text-secondary"
                  aria-hidden="true"
                />
                <span className="text-text-secondary">
                  Click to upload dark icon (optional)
                </span>
              </>
            )}
          </label>
          <input
            ref={darkInputRef}
            id="itemImageDark"
            type="file"
            name="imageDark"
            accept="image/*"
            onChange={handleDarkImageChange}
            disabled={isLoading}
            className="hidden"
          />
          {darkPreview && (
            <div className="flex items-center justify-between text-text-secondary">
              <span className="truncate">
                {darkFileName ?? "Current image"}
              </span>
              <button
                type="button"
                onClick={handleRemoveDarkImage}
                disabled={isLoading}
                className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60"
              >
                Remove
              </button>
            </div>
          )}
          {imageDarkError && (
            <p role="alert" className="text-destructive">
              {imageDarkError.message}
            </p>
          )}
        </div>

        {error && !hasFieldError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-destructive"
          >
            <FiAlertCircle
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
              <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : (
            <>
              <FaSave className="h-4 w-4" />
              {isEdit ? "Save Changes" : "Save Item"}
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
