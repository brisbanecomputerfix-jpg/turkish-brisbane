import * as React from "react";
import { cn } from "@/lib/utils";

export interface TurkishLogoProps extends React.SVGProps<SVGSVGElement> {
  /**
   * badge: Square rounded squircle with Turkish red background and white Ay-Yıldız
   * flag: Official 3:2 rectangular Turkish national flag
   * symbol: Standalone white or colored crescent & star with transparent background
   */
  variant?: "badge" | "flag" | "symbol";
  /** Size in pixels (sets both width and height for badge/symbol; maintains 3:2 for flag if width provided) */
  size?: number;
  className?: string;
}

/**
 * Official Turkish National Ay-Yıldız Emblem
 * Proportioned mathematically according to Turkish Flag Law (Türk Bayrağı Kanunu - Law No. 2893).
 * Red Pantone 186 C / Hex #E30A17.
 */
export function TurkishLogo({
  variant = "badge",
  size = 36,
  className,
  ...props
}: TurkishLogoProps) {
  // Canonical Ay-Yıldız path from Law 2893
  const ayYildizPath =
    "m41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z";

  if (variant === "flag") {
    const width = size;
    const height = Math.round((size * 2) / 3);
    return (
      <svg
        viewBox="0 -30000 90000 60000"
        width={width}
        height={height}
        className={cn("inline-block shrink-0 overflow-hidden rounded-sm shadow-xs", className)}
        role="img"
        aria-label="Flag of Türkiye"
        {...props}
      >
        <path fill="#E30A17" d="m0-30000h90000v60000H0z" />
        <path fill="#ffffff" d={ayYildizPath} />
      </svg>
    );
  }

  if (variant === "symbol") {
    return (
      <svg
        viewBox="13000 -22000 44000 44000"
        width={size}
        height={size}
        className={cn("inline-block shrink-0", className)}
        role="img"
        aria-label="Turkish Ay-Yıldız Emblem"
        {...props}
      >
        <path fill="currentColor" d={ayYildizPath} />
      </svg>
    );
  }

  // Default: "badge" (Modern Apple-style squircle with crisp subtle border)
  return (
    <svg
      viewBox="13000 -22000 44000 44000"
      width={size}
      height={size}
      className={cn("inline-block shrink-0 shadow-xs", className)}
      role="img"
      aria-label="Türkiye Emblem"
      {...props}
    >
      <rect
        x="13000"
        y="-22000"
        width="44000"
        height="44000"
        rx="9500"
        fill="#E30A17"
      />
      {/* Subtle top-light gradient overlay for depth */}
      <rect
        x="13000"
        y="-22000"
        width="44000"
        height="22000"
        rx="9500"
        fill="white"
        opacity="0.06"
      />
      {/* Mathematically precise Ay-Yıldız */}
      <path fill="#ffffff" d={ayYildizPath} />
    </svg>
  );
}
