import * as React from "react";

interface IsometricIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

/**
 * Isometric Community Network & Unity Icon
 * Represents connected nodes, bridge, and community cohesion.
 */
export function IsometricNetwork({ size = 64, className, ...props }: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Base platform */}
      <polygon points="50,15 85,35 50,55 15,35" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <polygon points="15,35 50,55 50,65 15,45" fill="#cbd5e1" />
      <polygon points="85,35 50,55 50,65 85,45" fill="#94a3b8" />

      {/* Center Turkish Hub Tower */}
      <polygon points="50,22 62,29 50,36 38,29" fill="#E30A17" />
      <polygon points="38,29 50,36 50,50 38,43" fill="#b91c1c" />
      <polygon points="62,29 50,36 50,50 62,43" fill="#991b1b" />
      {/* Turkish Star / Beacon on top */}
      <circle cx="50" cy="18" r="3" fill="#E30A17" />

      {/* Left Node */}
      <polygon points="26,38 34,42 26,47 18,42" fill="#38bdf8" />
      <polygon points="18,42 26,47 26,55 18,50" fill="#0284c7" />
      <polygon points="34,42 26,47 26,55 34,50" fill="#0369a1" />

      {/* Right Node */}
      <polygon points="74,38 82,42 74,47 66,42" fill="#38bdf8" />
      <polygon points="66,42 74,47 74,55 66,50" fill="#0284c7" />
      <polygon points="82,42 74,47 74,55 82,50" fill="#0369a1" />

      {/* Lower Front Node */}
      <polygon points="50,48 58,52 50,57 42,52" fill="#10b981" />
      <polygon points="42,52 50,57 50,65 42,60" fill="#059669" />
      <polygon points="58,52 50,57 50,65 58,60" fill="#047857" />

      {/* Isometric Connection Beams */}
      <line x1="50" y1="36" x2="26" y2="47" stroke="#E30A17" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="50" y1="36" x2="74" y2="47" stroke="#E30A17" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="50" y1="36" x2="50" y2="48" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="50" cy="36" r="2" fill="#ffffff" />
    </svg>
  );
}

/**
 * Isometric Job Pool & Talent Marketplace Icon
 * Represents career progression, talent blocks, and employment.
 */
export function IsometricJobPool({ size = 64, className, ...props }: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Base platform */}
      <polygon points="50,15 88,37 50,59 12,37" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <polygon points="12,37 50,59 50,67 12,45" fill="#e2e8f0" />
      <polygon points="88,37 50,59 50,67 88,45" fill="#cbd5e1" />

      {/* Stepping podiums (Career Ladder) */}
      {/* Step 1 - Left */}
      <polygon points="28,38 40,45 28,52 16,45" fill="#93c5fd" />
      <polygon points="16,45 28,52 28,60 16,53" fill="#60a5fa" />
      <polygon points="40,45 28,52 28,60 40,53" fill="#3b82f6" />

      {/* Step 2 - Right */}
      <polygon points="65,30 77,37 65,44 53,37" fill="#60a5fa" />
      <polygon points="53,37 65,44 65,56 53,49" fill="#3b82f6" />
      <polygon points="77,37 65,44 65,56 77,49" fill="#1d4ed8" />

      {/* Step 3 - Center Top (Turkish Red Peak) */}
      <polygon points="46,18 60,26 46,34 32,26" fill="#f87171" />
      <polygon points="32,26 46,34 46,52 32,44" fill="#E30A17" />
      <polygon points="60,26 46,34 46,52 60,44" fill="#b91c1c" />

      {/* Floating Briefcase / Diploma on top */}
      <polygon points="46,12 52,15 46,19 40,15" fill="#ffffff" stroke="#E30A17" strokeWidth="1" />
      <path d="M44,15 L48,15" stroke="#E30A17" strokeWidth="1" />
    </svg>
  );
}

/**
 * Isometric Business Network & Trade Investment Icon
 * Represents capital growth, trade logistics, and business expansion.
 */
export function IsometricInvestment({ size = 64, className, ...props }: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Base Grid */}
      <polygon points="50,15 88,37 50,59 12,37" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <polygon points="12,37 50,59 50,67 12,45" fill="#e2e8f0" />
      <polygon points="88,37 50,59 50,67 88,45" fill="#cbd5e1" />

      {/* Bar 1 (Growth) */}
      <polygon points="26,40 36,46 26,52 16,46" fill="#a7f3d0" />
      <polygon points="16,46 26,52 26,60 16,54" fill="#34d399" />
      <polygon points="36,46 26,52 26,60 36,54" fill="#059669" />

      {/* Bar 2 (Higher) */}
      <polygon points="45,30 55,36 45,42 35,36" fill="#6ee7b7" />
      <polygon points="35,36 45,42 45,56 35,50" fill="#10b981" />
      <polygon points="55,36 45,42 45,56 55,50" fill="#047857" />

      {/* Bar 3 (Highest - Enterprise Turkish Red) */}
      <polygon points="65,20 77,27 65,34 53,27" fill="#fca5a5" />
      <polygon points="53,27 65,34 65,52 53,45" fill="#E30A17" />
      <polygon points="77,27 65,34 65,52 77,45" fill="#b91c1c" />

      {/* Upward Trend Line */}
      <polyline
        points="26,38 45,28 65,16 75,10"
        stroke="#E30A17"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow tip */}
      <polygon points="75,10 70,12 73,15" fill="#E30A17" />
      <circle cx="65" cy="16" r="3" fill="#ffffff" stroke="#E30A17" strokeWidth="2" />
    </svg>
  );
}

/**
 * Isometric Legal, Compliance & Trade Governance Icon
 * Represents legal authority, trade compliance, and regulatory clarity.
 */
export function IsometricLegalTrade({ size = 64, className, ...props }: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Base Marble Pedestal */}
      <polygon points="50,15 88,37 50,59 12,37" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <polygon points="12,37 50,59 50,67 12,45" fill="#e2e8f0" />
      <polygon points="88,37 50,59 50,67 88,45" fill="#cbd5e1" />

      {/* Central Pillar */}
      <polygon points="50,22 62,29 50,36 38,29" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
      <polygon points="38,29 50,36 50,54 38,47" fill="#e2e8f0" />
      <polygon points="62,29 50,36 50,54 62,47" fill="#cbd5e1" />

      {/* Isometric Shield (Front) */}
      <polygon points="50,26 64,34 64,48 50,58 36,48 36,34" fill="#ffffff" stroke="#E30A17" strokeWidth="1.5" />
      <polygon points="50,29 61,35 61,46 50,54 39,46 39,35" fill="#fef2f2" />

      {/* Official Check / Scale inside Shield */}
      <path d="M44,41 L48,46 L57,36" stroke="#E30A17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Floating balance weights */}
      <circle cx="28" cy="38" r="4" fill="#38bdf8" />
      <line x1="28" y1="42" x2="28" y2="48" stroke="#0284c7" strokeWidth="1.5" />

      <circle cx="72" cy="38" r="4" fill="#38bdf8" />
      <line x1="72" y1="42" x2="72" y2="48" stroke="#0284c7" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Isometric Bridge & Diaspora Connection Icon
 * Represents uniting the Turkish diaspora and bridging cultures.
 */
export function IsometricBridge({ size = 64, className, ...props }: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Left Landmass (Türkiye) */}
      <polygon points="26,18 45,29 30,38 11,27" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
      <polygon points="11,27 30,38 30,46 11,35" fill="#ef4444" />
      <polygon points="45,29 30,38 30,46 45,37" fill="#b91c1c" />

      {/* Right Landmass (Queensland) */}
      <polygon points="70,33 89,44 74,53 55,42" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <polygon points="55,42 74,53 74,61 55,50" fill="#3b82f6" />
      <polygon points="89,44 74,53 74,61 89,52" fill="#1d4ed8" />

      {/* Connecting Suspension Bridge Arch */}
      <path
        d="M26,30 Q48,22 72,44"
        stroke="#E30A17"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Suspension Cables */}
      <line x1="38" y1="27" x2="38" y2="35" stroke="#94a3b8" strokeWidth="1" />
      <line x1="48" y1="26" x2="48" y2="38" stroke="#94a3b8" strokeWidth="1" />
      <line x1="58" y1="30" x2="58" y2="44" stroke="#94a3b8" strokeWidth="1" />

      {/* Bridge Deck */}
      <polygon points="28,33 72,46 70,49 26,36" fill="#334155" />
    </svg>
  );
}
