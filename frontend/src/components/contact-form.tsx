"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { messageService } from "@/service/message.service";
import { FiAlertCircle, FiCheck, FiLoader, FiSend } from "react-icons/fi";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    setErrorMsg(null);
    setIsSending(true);

    try {
      await messageService.sendMessage(form);
      setSent(true);
      setForm(INITIAL_STATE);
      setTimeout(() => setSent(false), 5000);
    } catch (err: unknown) {
      setErrorMsg(
        (
          err as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
          (err as { message?: string })?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 font-mono text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60";

  const labelClass =
    "font-mono text-[11px] uppercase tracking-widest text-text-secondary";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={isSending}
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isSending}
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          disabled={isSending}
          value={form.subject}
          onChange={handleChange}
          placeholder="Project Inquiry, Job Opportunity..."
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={isSending}
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project or opportunity..."
          className={`${fieldClass} resize-none`}
        />
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-mono text-destructive"
        >
          <FiAlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSending}
        className="w-full gap-2 rounded-lg bg-accent font-semibold text-on-accent hover:bg-accent/90 active:scale-95 disabled:opacity-70"
      >
        {isSending ? (
          <>
            <FiLoader className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : sent ? (
          <>
            <FiCheck className="h-4 w-4" />
            Message Sent!
          </>
        ) : (
          <>
            <FiSend className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
