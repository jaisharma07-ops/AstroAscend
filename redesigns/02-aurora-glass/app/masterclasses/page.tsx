"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { content } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { MasterclassCard } from "@/components/sections/masterclass-card";
import { ease, viewportOnce } from "@/lib/motion";

export default function MasterclassesPage() {
  const m = content.pages.masterclasses;
  return (
    <>
      <PageHeader eyebrow="Curriculum" title={m.header.title} subtitle={m.header.subtitle} />

      <section className="relative pb-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {m.courses.map((course, i) => (
              <MasterclassCard key={course.id} course={course} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(600px 300px at 100% 0%, color-mix(in oklab, var(--accent-teal) 22%, transparent), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                  {m.contact.label}
                </span>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                  {m.contact.email}
                </p>
              </div>
              <a
                href={`mailto:${m.contact.email}`}
                className="focus-ring group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" strokeWidth={1.8} />
                {m.contact.email_label}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
