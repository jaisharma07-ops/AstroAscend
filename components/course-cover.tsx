"use client";

import {
  Telescope,
  Brain,
  Atom,
  Linkedin,
  Sparkles,
  Cpu,
  Crown,
  HelpCircle,
  Globe,
  BookOpen,
  Mic2,
  Music,
  Code2,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  astronomy: Telescope,
  psychology: Brain,
  quantum: Atom,
  linkedin: Linkedin,
  astrophysics: Sparkles,
  semiconductors: Cpu,
  "ai-python": Code2,
  chess: Crown,
  quizzing: HelpCircle,
  mun: Globe,
  myths: BookOpen,
  "western-vocals": Mic2,
  piano: Music,
};

const ACCENTS = [
  ["var(--accent-violet)", "var(--accent-magenta)"],
  ["var(--accent-magenta)", "var(--accent-teal)"],
  ["var(--accent-teal)", "var(--accent-violet)"],
];

export function CourseCover({
  id,
  index,
}: {
  id: string;
  index: number;
}) {
  const Icon = ICON_MAP[id] ?? Sparkles;
  const [a, b] = ACCENTS[index % ACCENTS.length];

  return (
    <div
      aria-hidden
      className="relative -mx-7 -mt-7 mb-6 h-32 overflow-hidden border-b border-glass-border sm:h-36"
      style={{
        background: `linear-gradient(135deg, color-mix(in oklab, ${a} 22%, transparent), color-mix(in oklab, ${b} 18%, transparent) 60%, transparent)`,
      }}
    >
      <div
        className="absolute -right-10 -top-12 h-44 w-44 rounded-full opacity-50 blur-3xl"
        style={{ background: `radial-gradient(circle, ${a}, transparent 60%)` }}
      />
      <div
        className="absolute -left-12 -bottom-16 h-40 w-40 rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, ${b}, transparent 60%)` }}
      />
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
      </svg>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 rounded-2xl border border-glass-border bg-glass p-3 backdrop-blur-md">
        <Icon className="h-7 w-7 text-fg/80" strokeWidth={1.5} />
      </div>
    </div>
  );
}
