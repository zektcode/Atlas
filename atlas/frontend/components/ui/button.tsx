import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-indigo text-[#0a0a12] hover:-translate-y-px hover:shadow-lg hover:shadow-indigo/20",
        ghost: "text-text-2 hover:text-text-1",
        outline: "border border-border-strong text-text-1 hover:bg-bg-surface",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
