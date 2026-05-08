"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ease, viewportOnce } from "@/lib/motion";

export function HomeClosing({ lines }: { lines: string[] }) {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-3xl border border-glass-border bg-glass-strong p-10 sm:p-16"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(800px 400px at 50% 0%, color-mix(in oklab, var(--accent-violet) 28%, transparent), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col items-start gap-8">
            <div>
              {lines.map((line, i) => (
                <h2
                  key={i}
                  className="display-2 text-balance"
                  style={{
                    backgroundImage:
                      i === 0
                        ? "linear-gradient(120deg, var(--fg), color-mix(in oklab, var(--fg) 65%, transparent))"
                        : "linear-gradient(120deg, var(--accent-violet), var(--accent-magenta), var(--accent-teal))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {line}
                </h2>
              ))}
            </div>
            <Link
              href="/join-us"
              className="focus-ring group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Be part of the journey
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
