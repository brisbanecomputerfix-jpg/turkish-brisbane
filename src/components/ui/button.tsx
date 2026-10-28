import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "whatsapp"
    | "turkish"
    | "turquoise";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-red-700 text-white hover:bg-red-800 shadow-sm focus-visible:ring-red-600 transition-all",
      turkish:
        "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 border border-red-500/30 transition-all",
      turquoise:
        "bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 text-white hover:from-teal-700 hover:via-teal-600 hover:to-cyan-700 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 border border-teal-400/30 transition-all",
      whatsapp:
        "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 focus-visible:ring-emerald-500 transition-all",
      secondary:
        "bg-stone-100 text-stone-900 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700",
      outline:
        "border border-stone-200 bg-white/90 backdrop-blur-sm hover:bg-stone-50 text-stone-700 hover:text-stone-900 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-300 dark:hover:bg-stone-800 transition-all",
      ghost:
        "hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-50 transition-colors",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm font-medium",
      sm: "h-8 rounded-lg px-3 text-xs font-semibold",
      lg: "h-12 rounded-xl px-6 text-base font-semibold",
      icon: "h-9 w-9 p-0 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
