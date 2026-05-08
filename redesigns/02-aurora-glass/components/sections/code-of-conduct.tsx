"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";
import { Sparkles, Users, Sprout } from "lucide-react";

const ICONS = [Users, Sparkles, Sprout];

export function CodeOfConduct({
  heading,
  columns,
}: {
  heading: string;
  columns: { subheading: string; body: string }[];
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
            03 — How we behave
          </span>
          <h2 className="display-2 mt-4 text-balance">{heading}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {columns.map((col, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.article
                key={i}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease }}
                className="group relative h-full overflow-hidden rounded-3xl border border-glass-border bg-glass p-7 backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:bg-glass-strong"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{
                    background:
                      i === 0
                        ? "radial-gradient(circle, var(--accent-violet), transparent 60%)"
                        : i === 1
                          ? "radial-gradient(circle, var(--accent-magenta), transparent 60%)"
                          : "radial-gradient(circle, var(--accent-teal), transparent 60%)",
                  }}
                />
                <div className="relative flex flex-col gap-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-glass-border bg-bg/40">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">{col.subheading}</h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{col.body}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
