"use client";

export function LogoMark({ className = "h-7 w-7", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="astroascend"
    >
      <path
        d="M 12 31 L 20 14.5 L 28 31"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="9.5" r="3.2" fill="#FF5E1A" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-7" animated />
      <span className="text-sm font-semibold tracking-[-0.01em]">astroascend</span>
    </span>
  );
}
