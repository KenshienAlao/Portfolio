"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, Eye, EyeOff, Key, Lock } from "lucide-react";
import z, { ZodError } from "zod";

const validate = z.object({
  code: z.string().min(1, "Code is required").trim(),
  password: z.string().min(1, "Password is required").trim(),
});

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorValidate, setIsErrorValidate] = useState<ZodError | null>(null);

  const error = isErrorValidate?.issues[0];
  const codeError = error?.path[0] === "code" ? error : undefined;
  const passwordError = error?.path[0] === "password" ? error : undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = validate.safeParse(data);

    if (!result.success) {
      setIsErrorValidate(result.error);
      return;
    }
    setIsErrorValidate(null);
    console.log(result.data);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-24">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="gradient-mesh" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md">
        <p className="mb-8 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-accent sm:text-sm">
          <span className="text-text-secondary">~/auth</span>
          <span className="text-text-secondary">$</span>
          <span>./login --admin</span>
        </p>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft-lg md:p-8">
          <div className="mb-6 flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-accent/40" />
            <span className="h-3 w-3 rounded-full bg-accent/70" />
            <span className="ml-3 font-mono text-xs text-text-secondary">
              login.sh
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl">
            Portfolio Command Center
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            A private workspace to manage my portfolio, projects, and incoming
            feedback.
          </p>

          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="code"
                className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-text-secondary"
              >
                code
              </label>
              <div className="relative">
                <Key
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  name="code"
                  id="code"
                  placeholder="enter code here"
                  aria-invalid={codeError ? "true" : "false"}
                  className={`w-full rounded-md border bg-background py-2.5 pl-10 pr-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:ring-2 ${
                    codeError
                      ? "border-destructive/60 focus:border-destructive focus:ring-destructive/30"
                      : "border-border focus:border-accent focus:ring-accent/30"
                  }`}
                />
              </div>
              {codeError && (
                <p
                  role="alert"
                  className="mt-1.5 font-mono text-xs text-destructive"
                >
                  {codeError.message}
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-mono text-[11px] uppercase tracking-widest text-text-secondary"
                >
                  password
                </label>
              </div>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                  aria-hidden="true"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  aria-invalid={passwordError ? "true" : "false"}
                  className={`w-full rounded-md border bg-background py-2.5 pl-10 pr-10 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:ring-2 ${
                    passwordError
                      ? "border-destructive/60 focus:border-destructive focus:ring-destructive/30"
                      : "border-border focus:border-accent focus:ring-accent/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p
                  role="alert"
                  className="mt-1.5 font-mono text-xs text-destructive"
                >
                  {passwordError.message}
                </p>
              )}
            </div>

            {error && !codeError && !passwordError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 font-mono text-xs text-destructive"
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
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              log in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
