interface ProjectLinksProps {
  githubDefault?: string;
  demoDefault?: string;
  tagsDefault?: string;
  disabled?: boolean;
  githubError?: { message: string };
  demoError?: { message: string };
  tagsError?: { message: string };
}

export function ProjectLinks({
  githubDefault = "",
  demoDefault = "",
  tagsDefault = "",
  disabled = false,
  githubError,
  demoError,
  tagsError,
}: ProjectLinksProps) {
  return (
    <>
      <div className="space-y-1">
        <label htmlFor="github" className="text-text-secondary block">
          GitHub URL
        </label>
        <input
          id="github"
          aria-label="GitHub URL"
          type="url"
          name="github"
          defaultValue={githubDefault}
          disabled={disabled}
          aria-invalid={githubError ? "true" : "false"}
          className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
            githubError
              ? "border-destructive/60 focus:border-destructive"
              : "border-border focus:border-accent"
          }`}
        />
        {githubError && (
          <p role="alert" className="text-destructive">
            {githubError.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="demo" className="text-text-secondary block">
          Demo URL (optional)
        </label>
        <input
          id="demo"
          aria-label="Demo URL (optional)"
          type="url"
          name="demo"
          defaultValue={demoDefault}
          disabled={disabled}
          aria-invalid={demoError ? "true" : "false"}
          className={`w-full rounded-md border bg-background px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
            demoError
              ? "border-destructive/60 focus:border-destructive"
              : "border-border focus:border-accent"
          }`}
        />
        {demoError && (
          <p role="alert" className="text-destructive">
            {demoError.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="tags" className="text-text-secondary block">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          aria-label="Tags (comma separated)"
          name="tags"
          defaultValue={tagsDefault}
          placeholder="React, NextJS, Supabase"
          disabled={disabled}
          className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent disabled:cursor-not-allowed disabled:opacity-60"
        />
        {tagsError && (
          <p role="alert" className="text-destructive">
            {tagsError.message}
          </p>
        )}
      </div>
    </>
  );
}
