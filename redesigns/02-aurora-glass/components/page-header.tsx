"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative pb-12 pt-36 sm:pt-40 lg:pb-20 lg:pt-48">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-4xl"
        >
          {eyebrow ? (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-subtle backdrop-blur-md">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-violet)" }}
              />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="display-1 text-balance">{title}</h1>
          {subtitle ? (
            <p className="mt-6 max-w-2xl text-pretty text-lg text-muted sm:text-xl">{subtitle}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
