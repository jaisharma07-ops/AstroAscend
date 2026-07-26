"use client";

export function LogoMark({ className = "h-7 w-7", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="AstroAscend"
    >
      <defs>
        <linearGradient id="aa-grad" x1="0" y1="100%" x2="100%" y2="0">
          <stop offset="0%" stopColor="var(--accent-teal)" />
          <stop offset="50%" stopColor="var(--accent-violet)" />
          <stop offset="100%" stopColor="var(--accent-magenta)" />
        </linearGradient>
        <radialGradient id="aa-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-magenta)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent-magenta)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* outer ring */}
      <circle
        cx="20"
        cy="20"
        r="17.5"
        fill="none"
        stroke="url(#aa-grad)"
        strokeWidth="1.2"
        opacity="0.7"
      />

      {/* ascending arc / comet trail */}
      <path
        d="M 7 30 Q 14 27 19 20 T 31 8"
        fill="none"
        stroke="url(#aa-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* star/comet head */}
      <circle cx="31" cy="8" r="5" fill="url(#aa-glow)" />
      <circle cx="31" cy="8" r="2.6" fill="url(#aa-grad)" />

      {/* small twinkle */}
      <circle cx="11" cy="14" r="0.9" fill="var(--accent-violet)" opacity="0.85">
        {animated && (
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="3.6s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <circle cx="24" cy="29" r="0.7" fill="var(--accent-teal)" opacity="0.7">
        {animated && (
          <animate
            attributeName="opacity"
            values="0.2;0.9;0.2"
            dur="4.4s"
            begin="0.6s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-7" animated />
      <span className="text-sm font-semibold tracking-[-0.01em]">AstroAscend</span>
    </span>
  );
}
