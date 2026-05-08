"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ease } from "@/lib/motion";

export function Hero({ brandMark, tagline }: { brandMark: string; tagline: string }) {
  // Stagger letters of brand mark
  const chars = brandMark.split("");

  return (
    <section className="relative pb-24 pt-44 sm:pt-48 lg:pb-32 lg:pt-56">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-subtle backdrop-blur-md">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent-magenta)" }}
            />
            New cohort · Education for the curious
          </span>

          <h1 className="display-1 text-balance">
            <span className="inline-flex whitespace-nowrap" aria-label={brandMark}>
              {chars.map((c, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.025 }}
                  className="inline-block"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, var(--fg) 0%, color-mix(in oklab, var(--fg) 55%, transparent) 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.32 }}
            className="display-3 max-w-2xl text-pretty font-medium text-muted"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.44 }}
            className="mt-4 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/masterclasses"
              className="focus-ring group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-all hover:opacity-90 active:scale-[0.99]"
            >
              Explore Masterclasses
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
            <Link
              href="/our-mentors"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-glass-border bg-glass px-5 text-sm text-fg backdrop-blur-md transition-colors hover:bg-fg/[0.04]"
            >
              Meet our mentors
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative orbital ring */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.5 }}
          className="pointer-events-none absolute right-[-16%] top-1/2 hidden h-[120%] w-[60%] -translate-y-1/2 lg:block"
        >
          <div className="absolute inset-0 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "conic-gradient(from 220deg at 50% 50%, color-mix(in oklab, var(--accent-violet) 35%, transparent), color-mix(in oklab, var(--accent-magenta) 30%, transparent), color-mix(in oklab, var(--accent-teal) 30%, transparent), color-mix(in oklab, var(--accent-violet) 35%, transparent))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
