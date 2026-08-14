"use client";

import { AlertCircle, ImagePlus, Loader2, Save } from "lucide-react";
import { BaseModal } from "./BaseModal";
import {
  useAddSetup,
  useEditSetup,
  type Setup,
} from "@/hooks/admin/use-setup-admin";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import z, { ZodError } from "zod";
import Image from "next/image";

const MAX_IMAGE_SIZE = 25 * 1024 * 1024;

const setupFormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  values: z.string().min(1, "Values are required"),
  description: z.string().min(1, "Description is required"),
  downloads: z.string().min(1, "Download URLs are required"),
  subValue: z.string().optional(),
  subDownload: z.string().optional(),
  imageLight: z.union([
    z
      .instanceof(File, { message: "Light mode image is required" })
      .refine((file) => file.size > 0, "Light mode image is required")
      .refine(
        (file) => file.size <= MAX_IMAGE_SIZE,
        "Image must be 25MB or smaller",
      )
      .refine(
        (file) => file.type.startsWith("image/"),
        "File must be an image",
      ),
    z.string().min(1, "Light mode image is required"),
  ]),
  imageDark: z
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
    .optional(),
});

interface SetupModalProps {
  setupForm: Partial<Setup>;
  setSetupForm: (setup: Partial<Setup> | null) => void;
}

export function SetupModal({
  setupForm,
  setSetupForm,
}: SetupModalProps) {
  const {
    mutate: addSetup,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddSetup();

  const {
    mutate: editSetup,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditSetup();

  const [validateError, setValidateError] = useState<ZodError | null>(null);

  const [lightPreview, setLightPreview] = useState<string | null>(
    setupForm.imageLight || null,
  );
  const [lightFileName, setLightFileName] = useState<string | null>(null);
  const lightInputRef = useRef<HTMLInputElement>(null);
  const lightPreviewRef = useRef<string | null>(lightPreview);

  const [darkPreview, setDarkPreview] = useState<string | null>(
    setupForm.imageDark || null,
  );
  const [darkFileName, setDarkFileName] = useState<string | null>(null);
  const darkInputRef = useRef<HTMLInputElement>(null);
  const darkPreviewRef = useRef<string | null>(darkPreview);

  useEffect(() => {
    lightPreviewRef.current = lightPreview;
  }, [lightPreview]);

  useEffect(() => {
    darkPreviewRef.current = darkPreview;
  }, [darkPreview]);

  useEffect(() => {
    return () => {
      if (lightPreviewRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(lightPreviewRef.current);
      }
      if (darkPreviewRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(darkPreviewRef.current);
      }
    };
  }, []);

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const categoryError =
    error && "path" in error && error.path[0] === "category"
      ? error
      : undefined;
  const valuesError =
    error && "path" in error && error.path[0] === "values"
      ? error
      : undefined;
  const descriptionError =
    error && "path" in error && error.path[0] === "description"
      ? error
      : undefined;
  const downloadsError =
    error && "path" in error && error.path[0] === "downloads"
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
      valuesError ||
      descriptionError ||
      downloadsError ||
      imageLightError ||
      imageDarkError,
  );

  const isEdit = typeof setupForm.id === "number" && setupForm.id > 0;

  const handleLightImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setLightPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return nextPreview;
    });
    setLightFileName(file.name);
  };

  const handleRemoveLightImage = () => {
    setLightPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setLightFileName(null);
    if (lightInputRef.current) lightInputRef.current.value = "";
  };

  const handleDarkImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setDarkPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return nextPreview;
    });
    setDarkFileName(file.name);
  };

  const handleRemoveDarkImage = () => {
    setDarkPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setDarkFileName(null);
    if (darkInputRef.current) darkInputRef.current.value = "";
  };

  const handleSubmitSetup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingAdd || isLoadingEdit) return;

    const formData = new FormData(e.currentTarget);

    const lightEntry = formData.get("imageLight");
    const hasNewLightFile = lightEntry instanceof File && lightEntry.size > 0;

    const darkEntry = formData.get("imageDark");
    const hasNewDarkFile = darkEntry instanceof File && darkEntry.size > 0;

    const dataToValidate: Record<string, unknown> = {
      ...Object.fromEntries(formData.entries()),
      ...(!hasNewLightFile && isEdit && setupForm.imageLight && lightPreview
        ? { imageLight: setupForm.imageLight }
        : {}),
      ...(!hasNewDarkFile && isEdit && setupForm.imageDark && darkPreview
        ? { imageDark: setupForm.imageDark }
        : {}),
    };

    if (!hasNewDarkFile && !darkPreview) {
      delete dataToValidate.imageDark;
    }

    const result = setupFormSchema.safeParse(dataToValidate);

    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    setValidateError(null);

    // Format comma-separated fields for backend multipart list parameters
    const valuesStr = (formData.get("values") as string) || "";
    const downloadsStr = (formData.get("downloads") as string) || "";

    formData.delete("values");
    formData.delete("downloads");

    valuesStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((val) => formData.append("values", val));

    downloadsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((dl) => formData.append("downloads", dl));

    if (isEdit && !hasNewLightFile) {
      formData.delete("imageLight");
    }
    if (isEdit && !hasNewDarkFile) {
      formData.delete("imageDark");
    }

    if (!isEdit && !hasNewDarkFile) {
      formData.delete("imageDark");
    }

    if (isEdit && setupForm.id !== undefined) {
      formData.append("id", String(setupForm.id));
      editSetup({ id: setupForm.id, data: formData });
    } else {
      addSetup(formData);
    }

    setSetupForm(null);
    handleRemoveLightImage();
    handleRemoveDarkImage();
  };

  const isLoading = isLoadingAdd || isLoadingEdit;

  return (
    <BaseModal
      title={isEdit ? "Edit Setup Item" : "Add Setup Item"}
      onClose={() => setSetupForm(null)}
      maxWidth="max-w-lg"
    >
      <form
        onSubmit={handleSubmitSetup}
        noValidate
        autoComplete="off"
        className="space-y-3 font-mono text-xs text-text-primary"
      >
        <div className="space-y-1">
          <label className="block text-text-secondary">Category</label>
          <input
            required
            name="category"
            defaultValue={setupForm.category || ""}
            disabled={isLoading}
            placeholder="Operating System, Code Editor, etc."
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              categoryError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {categoryError && (
            <p role="alert" className="text-destructive">
              {categoryError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">
            Value(s) <span className="text-text-secondary/50">— comma separated if multiple</span>
          </label>
          <input
            required
            name="values"
            defaultValue={setupForm.values?.join(", ") || ""}
            disabled={isLoading}
            placeholder="VS Codium, Rider"
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              valuesError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {valuesError && (
            <p role="alert" className="text-destructive">
              {valuesError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">Description</label>
          <textarea
            required
            name="description"
            rows={2}
            defaultValue={setupForm.description || ""}
            disabled={isLoading}
            placeholder="Primary development environment with Unix workflow"
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              descriptionError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {descriptionError && (
            <p role="alert" className="text-destructive">
              {descriptionError.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-text-secondary">
            Download URL(s) <span className="text-text-secondary/50">— comma separated if multiple</span>
          </label>
          <input
            required
            name="downloads"
            defaultValue={setupForm.downloads?.join(", ") || ""}
            disabled={isLoading}
            placeholder="https://vscodium.com, https://jetbrains.com/rider"
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
              downloadsError
                ? "border-destructive/60 focus:border-destructive"
                : "border-border focus:border-accent"
            }`}
          />
          {downloadsError && (
            <p role="alert" className="text-destructive">
              {downloadsError.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="block text-text-secondary">
              Sub-Value <span className="text-text-secondary/50">(optional)</span>
            </label>
            <input
              name="subValue"
              defaultValue={setupForm.subValue || ""}
              disabled={isLoading}
              placeholder="Download my Config"
              className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent disabled:opacity-60"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-text-secondary">
              Sub-Download <span className="text-text-secondary/50">(optional)</span>
            </label>
            <input
              name="subDownload"
              defaultValue={setupForm.subDownload || ""}
              disabled={isLoading}
              placeholder="https://github.com/..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent disabled:opacity-60"
            />
          </div>
        </div>

        {/* Light Image */}
        <div className="space-y-1">
          <label className="block text-text-secondary">
            Logo / Icon (Light Mode)
          </label>
          <label
            htmlFor="setupImageLight"
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
                  unoptimized={lightPreview.startsWith("blob:")}
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <ImagePlus
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
            id="setupImageLight"
            type="file"
            name="imageLight"
            accept="image/*"
            onChange={handleLightImageChange}
            disabled={isLoading}
            aria-invalid={imageLightError ? "true" : "false"}
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

        {/* Dark Image */}
        <div className="space-y-1">
          <label className="block text-text-secondary">
            Logo / Icon (Dark Mode){" "}
            <span className="text-text-secondary/50">— optional</span>
          </label>
          <label
            htmlFor="setupImageDark"
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
                  unoptimized={darkPreview.startsWith("blob:")}
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <ImagePlus
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
            id="setupImageDark"
            type="file"
            name="imageDark"
            accept="image/*"
            onChange={handleDarkImageChange}
            disabled={isLoading}
            aria-invalid={imageDarkError ? "true" : "false"}
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
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-on-accent hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : isEdit ? (
            <>
              <Save className="h-4 w-4" /> Save changes
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Setup Item
            </>
          )}
        </button>
      </form>
    </BaseModal>
  );
}
