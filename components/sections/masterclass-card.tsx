"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import type { MasterclassCourse } from "@/lib/content";
import { ease } from "@/lib/motion";
import { CourseCover } from "@/components/course-cover";

const COURSE_GLOWS = [
  "var(--accent-violet)",
  "var(--accent-magenta)",
  "var(--accent-teal)",
  "var(--accent-violet)",
  "var(--accent-magenta)",
  "var(--accent-teal)",
  "var(--accent-violet)",
  "var(--accent-magenta)",
];

export function MasterclassCard({ course, index }: { course: MasterclassCourse; index: number }) {
  const glow = COURSE_GLOWS[index % COURSE_GLOWS.length];
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.55, ease }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-glass-border bg-glass p-7 backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-fg/15"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${glow}, transparent 60%)` }}
      />

      <div className="relative flex flex-1 flex-col">
        <CourseCover id={course.id} index={index} />

        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle"
          >
            {String(index + 1).padStart(2, "0")} / Course
          </span>
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: glow }}
          />
        </div>

        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">{course.title}</h3>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">{course.description}</p>

        {course.details && course.details.length > 0 && (
          <dl className="mt-6 grid gap-2 border-t border-glass-border pt-5">
            {course.details.map((d, i) => (
              <div key={i} className="text-[13px] text-fg/85">
                <span className="font-mono text-subtle">·</span> {d}
              </div>
            ))}
          </dl>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-2 pt-2">
          {course.ctas.map((cta, i) =>
            cta.kind === "primary" ? (
              cta.href ? (
                <a
                  key={i}
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group/btn inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
                >
                  {cta.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </a>
              ) : (
                <button
                  key={i}
                  type="button"
                  className="focus-ring group/btn inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
                >
                  {cta.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </button>
              )
            ) : cta.href ? (
              <a
                key={i}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-bg/40 px-4 py-2 text-[13px] text-fg/85 backdrop-blur-md transition-colors hover:bg-fg/[0.05] hover:text-fg"
              >
                <FileText className="h-3.5 w-3.5" strokeWidth={1.6} />
                {cta.label}
              </a>
            ) : (
              <button
                key={i}
                type="button"
                className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-bg/40 px-4 py-2 text-[13px] text-fg/85 backdrop-blur-md transition-colors hover:bg-fg/[0.05] hover:text-fg"
              >
                <FileText className="h-3.5 w-3.5" strokeWidth={1.6} />
                {cta.label}
              </button>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
}
