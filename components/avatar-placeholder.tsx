"use client";

import { UserRound } from "lucide-react";

const ACCENTS = [
  "var(--accent-violet)",
  "var(--accent-magenta)",
  "var(--accent-teal)",
];

export function AvatarPlaceholder({
  name,
  index,
  size = "lg",
  src,
}: {
  name: string;
  index: number;
  size?: "md" | "lg";
  src?: string;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const accentB = ACCENTS[(index + 1) % ACCENTS.length];
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dim = size === "lg" ? "h-20 w-20" : "h-14 w-14";
  const initialClass = size === "lg" ? "text-2xl" : "text-lg";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={`${dim} rounded-2xl object-cover border border-glass-border shrink-0`}
      />
    );
  }

  return (
    <div
      aria-label={`${name} avatar placeholder`}
      className={`relative ${dim} shrink-0 overflow-hidden rounded-2xl border border-glass-border`}
      style={{
        background: `linear-gradient(140deg, color-mix(in oklab, ${accent} 32%, transparent), color-mix(in oklab, ${accentB} 22%, transparent) 65%, transparent 90%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 30% 25%, color-mix(in oklab, ${accent} 40%, transparent), transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-30"
        style={{
          background: `linear-gradient(180deg, transparent, color-mix(in oklab, ${accentB} 18%, transparent))`,
        }}
      />
      <UserRound
        aria-hidden
        className="absolute -bottom-2 left-1/2 h-12 w-12 -translate-x-1/2 text-fg/15"
        strokeWidth={1.2}
      />
      <span
        className={`relative z-10 flex h-full w-full items-center justify-center font-semibold tracking-[-0.02em] ${initialClass}`}
      >
        {initials}
      </span>
    </div>
  );
}
