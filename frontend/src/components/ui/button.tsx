import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/40 relative overflow-hidden isolate",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:brightness-105 active:brightness-95 hover:shadow-soft-lg",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_2px_8px_rgba(239,64,64,0.2)] hover:bg-destructive/95 hover:shadow-[0_4px_16px_rgba(239,64,64,0.35)]",
        outline:
          "border border-border bg-card text-foreground shadow-xs backdrop-blur-md hover:bg-accent/10 hover:text-accent hover:border-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted dark:hover:bg-muted/80 border border-transparent hover:border-border",
        ghost: "text-foreground hover:bg-accent-light hover:text-accent",
        link: "text-accent underline-offset-4 hover:underline relative p-0 h-auto font-semibold",
      },
      size: {
        default: "h-11 px-5 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-md gap-1.5 px-3.5 has-[>svg]:px-3 text-xs",
        lg: "h-13 rounded-xl px-7 text-base has-[>svg]:px-5 tracking-tight",
        icon: "size-11 rounded-lg",
        "icon-sm": "size-9 rounded-md",
        "icon-lg": "size-13 rounded-xl",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
