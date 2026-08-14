import Image from "next/image";
import { ChangeEvent, RefObject } from "react";
import { LuImagePlus } from "react-icons/lu";

interface ProjectImageProps {
  imagePreview: string | null;
  imageFileName: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  imageError?: { message: string };
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export function ProjectImage({
  imagePreview,
  imageFileName,
  fileInputRef,
  disabled = false,
  imageError,
  onImageChange,
  onRemoveImage,
}: ProjectImageProps) {
  return (
    <div className="space-y-1">
      <label htmlFor="image" className="text-text-secondary block">
        Image
      </label>
      <label
        htmlFor="image"
        className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed bg-background px-3 py-4 text-center transition-colors ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-accent/60"
        } ${imageError ? "border-destructive/60" : "border-border"}`}
      >
        {imagePreview ? (
          <div className="relative h-28 w-full overflow-hidden rounded">
            <Image
              src={imagePreview}
              alt={imageFileName || "Project preview"}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              unoptimized={imagePreview.startsWith("blob:")}
              className="object-cover"
            />
          </div>
        ) : (
          <>
            <LuImagePlus
              className="h-5 w-5 text-text-secondary"
              aria-hidden="true"
            />
            <span className="text-text-secondary">
              Click to upload (max 25MB)
            </span>
          </>
        )}
      </label>
      <input
        ref={fileInputRef}
        id="image"
        aria-label="Image"
        type="file"
        name="image"
        accept="image/*"
        onChange={onImageChange}
        disabled={disabled}
        aria-invalid={imageError ? "true" : "false"}
        className="hidden"
      />
      {imagePreview && (
        <div className="flex items-center justify-between text-text-secondary">
          <span className="truncate">{imageFileName ?? "Current image"}</span>
          <button
            type="button"
            onClick={onRemoveImage}
            disabled={disabled}
            className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:no-underline"
          >
            Remove
          </button>
        </div>
      )}
      {imageError && (
        <p role="alert" className="text-destructive">
          {imageError.message}
        </p>
      )}
    </div>
  );
}
