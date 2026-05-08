"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { ease, viewportOnce } from "@/lib/motion";

const TAG_ACCENT: Record<string, string> = {
  "Free class": "var(--accent-teal)",
  "Free Class": "var(--accent-teal)",
  Masterclass: "var(--accent-violet)",
  "Masterclass ": "var(--accent-violet)",
};

export default function AnotherCometPage() {
  const a = content.pages["another-comet"];
  return (
    <>
      <PageHeader eyebrow="Beyond curriculum" title={a.header.title} subtitle={a.header.subtitle} />

      <section className="relative pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(700px 350px at 0% 100%, color-mix(in oklab, var(--accent-magenta) 25%, transparent), transparent 60%)",
              }}
            />
            <div className="relative grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                  {a.intro.tag}
                </span>
                <h2 className="display-3 mt-3 text-balance">{a.intro.heading}</h2>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                  {a.intro.body}
                </p>
              </div>
              <div className="flex items-end lg:col-span-5 lg:justify-end">
                <button
                  type="button"
                  className="focus-ring group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                >
                  {a.intro.cta.label}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-28 sm:pb-32">
        <div className="container">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {a.courses.map((c, i) => {
              const accent = c.tag ? TAG_ACCENT[c.tag.trim()] ?? "var(--accent-violet)" : "var(--accent-violet)";
              return (
                <motion.li
                  key={c.id}
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.55, ease }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-glass-border bg-glass p-7 backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-0.5"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: `radial-gradient(circle, ${accent}, transparent 60%)` }}
                  />
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                        {String(i + 1).padStart(2, "0")} / {c.tag ?? "Class"}
                      </span>
                      {c.badge ? (
                        <span
                          className="rounded-full border border-glass-border bg-bg/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle"
                        >
                          {c.badge}
                        </span>
                      ) : (
                        <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: accent }} />
                      )}
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] sm:text-[26px]">{c.title}</h3>
                    <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">{c.description}</p>

                    {c.details && c.details.length > 0 && (
                      <ul className="mt-6 grid gap-2 border-t border-glass-border pt-5 text-[13px] text-fg/85">
                        {c.details.map((d, k) => (
                          <li key={k}>
                            <span className="font-mono text-subtle">·</span> {d}
                          </li>
                        ))}
                      </ul>
                    )}

                    {c.cta && !c.badge && (
                      <div className="mt-7 pt-2">
                        <button
                          type="button"
                          className="focus-ring group/btn inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
                        >
                          {c.cta.label}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            strokeWidth={1.8}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
