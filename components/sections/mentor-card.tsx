"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Quote } from "lucide-react";
import type { Mentor } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { AvatarPlaceholder } from "@/components/avatar-placeholder";

const ACCENTS = [
  "var(--accent-violet)",
  "var(--accent-magenta)",
  "var(--accent-teal)",
  "var(--accent-violet)",
  "var(--accent-magenta)",
  "var(--accent-teal)",
  "var(--accent-violet)",
];

export function MentorCard({ mentor, index }: { mentor: Mentor; index: number }) {
  const [open, setOpen] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.55, ease }}
      className="group relative overflow-hidden rounded-3xl border border-glass-border bg-glass backdrop-blur-xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 60%)` }}
      />
      <div className="relative p-7 sm:p-8">
        <div className="flex items-start gap-5">
          <AvatarPlaceholder name={mentor.name} index={index} size="lg" />
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
              {String(index + 1).padStart(2, "0")} · Mentor
            </span>
            <h3 className="mt-1 text-xl font-semibold tracking-[-0.015em] sm:text-2xl">{mentor.name}</h3>
            <p className="mt-1 text-[13px] text-muted">{mentor.role_attribution}</p>
          </div>
        </div>

        <p className="mt-6 text-pretty text-sm leading-relaxed text-muted">{mentor.bio}</p>

        <figure
          className="mt-6 rounded-2xl border border-glass-border bg-bg/30 p-5"
        >
          <Quote className="h-4 w-4 text-fg/50" strokeWidth={1.6} />
          <blockquote className="mt-3 text-pretty text-[15px] leading-relaxed text-fg/95">
            {mentor.quote}
          </blockquote>
        </figure>

        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls={`mentor-${mentor.id}-details`}
          className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-bg/30 px-4 py-2 text-[13px] text-fg/85 transition-colors hover:bg-fg/[0.05] hover:text-fg"
        >
          {open ? "Hide credentials" : "View credentials"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-[450ms] ease-out-expo", open ? "rotate-180" : "")}
            strokeWidth={1.6}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`mentor-${mentor.id}-details`}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-3 rounded-2xl border border-glass-border bg-bg/30 p-5 text-[13px] leading-relaxed text-muted">
                {mentor.details
                  .split(/\n\n+/)
                  .map((para) => para.trim())
                  .filter(Boolean)
                  .map((para, k) => (
                    <p key={k}>
                      {/* Inline render of **bold** segments while keeping verbatim text */}
                      {para.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
                        seg.startsWith("**") && seg.endsWith("**") ? (
                          <strong key={j} className="font-semibold text-fg/95">
                            {seg.slice(2, -2)}
                          </strong>
                        ) : (
                          <span key={j} style={{ whiteSpace: "pre-wrap" }}>
                            {seg}
                          </span>
                        )
                      )}
                    </p>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
