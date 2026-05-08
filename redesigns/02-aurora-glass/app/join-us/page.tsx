"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { content } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { ease, viewportOnce } from "@/lib/motion";

const ACCENTS = [
  "var(--accent-violet)",
  "var(--accent-magenta)",
  "var(--accent-teal)",
  "var(--accent-violet)",
  "var(--accent-magenta)",
];

export default function JoinUsPage() {
  const j = content.pages["join-us"];
  return (
    <>
      <PageHeader eyebrow="Get involved" title={j.header.title} subtitle={j.header.subtitle} />

      <section className="relative pb-16 sm:pb-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
            }}
            className="grid gap-5 md:grid-cols-2"
          >
            {j.options.map((opt, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              const isFeature = i === 0;
              return (
                <motion.article
                  key={opt.id}
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.55, ease }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-glass-border bg-glass p-7 backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-0.5 sm:p-9 ${
                    isFeature ? "md:col-span-2" : ""
                  }`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: `radial-gradient(circle, ${accent}, transparent 60%)` }}
                  />
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                        {String(i + 1).padStart(2, "0")} / {j.options.length.toString().padStart(2, "0")}
                      </span>
                      <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: accent }} />
                    </div>
                    <h3
                      className={`mt-5 ${isFeature ? "display-3" : "text-2xl"} font-semibold tracking-[-0.02em]`}
                    >
                      {opt.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
                      {opt.body}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-2 pt-2">
                      {opt.cta?.href ? (
                        <a
                          href={opt.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-ring group/btn inline-flex items-center gap-1.5 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                        >
                          {opt.cta.label}
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            strokeWidth={1.8}
                          />
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="focus-ring group/btn inline-flex items-center gap-1.5 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                        >
                          {opt.cta?.label}
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            strokeWidth={1.8}
                          />
                        </button>
                      )}
                      {opt.secondary_cta && opt.secondary_cta.href ? (
                        <a
                          href={opt.secondary_cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-bg/30 px-5 py-2.5 text-sm text-fg/85 backdrop-blur-md transition-colors hover:bg-fg/[0.05] hover:text-fg"
                        >
                          {opt.secondary_cta.label}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative pb-28 sm:pb-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(700px 350px at 100% 100%, color-mix(in oklab, var(--accent-violet) 22%, transparent), transparent 60%)",
              }}
            />
            <div className="relative grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                  Documents
                </span>
                <h3 className="display-3 mt-3 text-balance">{j.documents.title}</h3>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
                  {j.documents.body}
                </p>
              </div>
              <div className="flex items-end lg:col-span-5 lg:justify-end">
                <button
                  type="button"
                  className="focus-ring group inline-flex items-center gap-2 rounded-full border border-glass-border bg-bg/40 px-5 py-3 text-sm text-fg/90 backdrop-blur-md transition-colors hover:bg-fg/[0.05] hover:text-fg"
                >
                  <FileText className="h-4 w-4" strokeWidth={1.6} />
                  Browse documents
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
