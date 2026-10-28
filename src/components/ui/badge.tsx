import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "red"
    | "emerald"
    | "amber"
    | "blue";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default:
      "border-transparent bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    secondary:
      "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
    outline:
      "border-zinc-200 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 bg-transparent",
    red: "border-red-100 bg-red-50 text-[#c40813] dark:border-red-950 dark:bg-red-950/40 dark:text-red-300 font-medium",
    emerald:
      "border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300",
    amber:
      "border-amber-100 bg-amber-50 text-amber-800 dark:border-amber-950 dark:bg-amber-950/40 dark:text-amber-300",
    blue: "border-blue-100 bg-blue-50 text-blue-700 dark:border-blue-950 dark:bg-blue-950/40 dark:text-blue-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
