"use client";

import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";

export function VisionMission({
  columns,
}: {
  columns: { heading: string; body: string }[];
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-5 md:grid-cols-2"
        >
          {columns.map((col, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.65, ease }}
              className="relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-8 backdrop-blur-xl sm:p-12"
            >
              <span
                aria-hidden
                className="absolute right-8 top-8 inline-flex h-7 items-center rounded-full border border-glass-border bg-bg/40 px-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle"
              >
                {String(i + 1).padStart(2, "0")} /{String(columns.length).padStart(2, "0")}
              </span>
              <h3
                className="display-2"
                style={{
                  backgroundImage:
                    i === 0
                      ? "linear-gradient(120deg, var(--accent-violet), var(--accent-teal))"
                      : "linear-gradient(120deg, var(--accent-magenta), var(--accent-violet))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {col.heading}
              </h3>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {col.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
