"use client";

import { ReactNode } from "react";
import { FaX } from "react-icons/fa6";

interface BaseModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export function BaseModal({
  title,
  onClose,
  children,
  maxWidth = "max-w-lg",
}: BaseModalProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className={`w-full ${maxWidth} rounded-2xl border border-border bg-surface p-6 shadow-2xl relative space-y-4`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close modal"
        >
          <FaX className="h-5 w-5" />
        </button>
        <h3 className="font-mono text-base font-bold text-text-primary">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
