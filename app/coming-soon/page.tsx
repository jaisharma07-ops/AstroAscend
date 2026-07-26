"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { content } from "@/lib/content";
import { ease } from "@/lib/motion";

export default function ComingSoonPage() {
  const c = content.pages["coming-soon"];
  const headlineLines = c.headline.split("\n");
  const bodyLines = c.body.split("\n");

  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] items-center pb-20 pt-36 sm:pt-44">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-subtle backdrop-blur-md">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--accent-magenta)" }} />
              {c.brand_mark}
            </span>

            <h1 className="display-1 mt-6 text-balance">
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.08 }}
                  className="block"
                  style={
                    i === headlineLines.length - 1
                      ? {
                          backgroundImage:
                            "linear-gradient(120deg, var(--accent-violet), var(--accent-magenta), var(--accent-teal))",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }
                      : undefined
                  }
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.36 }}
              className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
            >
              {bodyLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            >
              <span className="text-[13px] text-subtle">{c.contact_lead}</span>
              <a
                href={`mailto:${c.contact_email}`}
                className="focus-ring group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 text-sm text-fg/95 backdrop-blur-md transition-colors hover:bg-fg/[0.05]"
              >
                <Mail className="h-4 w-4" strokeWidth={1.6} />
                {c.contact_email}
              </a>
            </motion.div>
          </motion.div>

          {/* Spinning orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            aria-hidden
            className="relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center lg:col-span-5 lg:flex"
          >
            <div
              className="absolute inset-0 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "conic-gradient(from 220deg, var(--accent-violet), var(--accent-magenta), var(--accent-teal), var(--accent-violet))",
                animation: "spin 22s linear infinite",
              }}
            />
            <div className="absolute inset-8 rounded-full border border-glass-border bg-bg/30 backdrop-blur-2xl" />
            <div className="absolute inset-16 rounded-full border border-glass-border" />
            <div className="absolute inset-24 rounded-full border border-glass-border" />
            <div
              className="absolute inset-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "var(--accent-magenta)", boxShadow: "0 0 24px 4px color-mix(in oklab, var(--accent-magenta) 60%, transparent)" }}
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
