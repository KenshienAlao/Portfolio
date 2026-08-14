import Image from "next/image";
import { ChangeEvent } from "react";
import { LuImagePlus } from "react-icons/lu";

interface props {
  imageLightError?: { message?: string };
  isLoading: boolean;
  handleLightImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveLightImage: () => void;
  lightInputRef: React.RefObject<HTMLInputElement | null>;
  lightPreview: string | null;
  lightFileName: string | null;
}

export function ImageLight({
  imageLightError,
  isLoading,
  handleLightImageChange,
  handleRemoveLightImage,
  lightInputRef,
  lightPreview,
  lightFileName,
}: props) {
  return (
    <div className="space-y-1">
      <label htmlFor="itemImageLight" className="block text-text-secondary">
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
        aria-label="Logo / Icon (Light Mode)"
        type="file"
        name="imageLight"
        accept="image/*"
        onChange={handleLightImageChange}
        disabled={isLoading}
        className="hidden"
      />
      {lightPreview && (
        <div className="flex items-center justify-between text-text-secondary">
          <span className="truncate">{lightFileName ?? "Current image"}</span>
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
  );
}
