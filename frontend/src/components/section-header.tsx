interface SectionHeaderProps {
  /** terminal-style path, e.g. "~/about" */
  path: string;
  /** command shown after the prompt, e.g. "cat about.md" */
  command: string;
  title: string;
  description?: string;
}

export function SectionHeader({
  path,
  command,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-accent sm:text-sm">
        <span className="text-text-secondary">{path}</span>
        <span className="text-text-secondary">$</span>
        <span>{command}</span>
      </p>

      <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl text-balance">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
