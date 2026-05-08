"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MasterclassCourse } from "@/lib/content";
import { ease, viewportOnce } from "@/lib/motion";

const ACCENTS = [
  "var(--accent-violet)",
  "var(--accent-magenta)",
  "var(--accent-teal)",
  "var(--accent-violet)",
];

export function MasterclassesPreview({ courses }: { courses: MasterclassCourse[] }) {
  // Show top 4
  const preview = courses.slice(0, 4);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
              04 — The curriculum
            </span>
            <h2 className="mt-4 text-balance">
              <Link
                href="/masterclasses"
                aria-label="Masterclasses — go to the dedicated Masterclasses page"
                className="focus-ring group inline-flex items-baseline gap-3 rounded-md transition-colors"
              >
                <span className="display-2">Masterclasses</span>
                <ArrowUpRight
                  aria-hidden
                  className="h-7 w-7 translate-y-1 text-fg/60 transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg sm:h-8 sm:w-8"
                  strokeWidth={1.6}
                />
              </Link>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Master Your Craft, Master Your Passion. From astronomy to AI/ML — depth-first courses with mentor-led
              cohorts.
            </p>
          </div>
          <Link
            href="/masterclasses"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-5 py-2.5 text-sm text-fg/90 backdrop-blur-md transition-colors hover:bg-fg/[0.05] hover:text-fg"
          >
            See all 8 courses
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {preview.map((c, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.li
                key={c.id}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, ease }}
              >
                <Link
                  href="/masterclasses"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-fg/15"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: `radial-gradient(circle, ${accent}, transparent 60%)` }}
                  />
                  <div className="relative flex flex-1 flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em]">{c.title}</h3>
                    <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted">
                      {c.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-fg/80">
                      Explore
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
