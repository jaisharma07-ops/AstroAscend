"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { content } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { MentorCard } from "@/components/sections/mentor-card";
import { ease, viewportOnce } from "@/lib/motion";

export default function MentorsPage() {
  const m = content.pages["our-mentors"];
  return (
    <>
      <PageHeader eyebrow="The team" title={m.header.title} subtitle={m.header.subtitle} />

      <section id="mentors-intro" className="relative pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease }}
            className="grid gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                Why us
              </span>
              <h2 className="display-3 mt-4 text-balance">{m.intro.heading}</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">{m.intro.body}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-28 sm:pb-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {m.mentors.map((mentor, i) => (
              <MentorCard key={mentor.id} mentor={mentor} index={i} />
            ))}
          </motion.div>

          <div className="mt-14 flex justify-center">
            <a
              href="#main"
              className="focus-ring group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 text-[13px] text-fg/85 backdrop-blur-md transition-colors hover:bg-fg/[0.05] hover:text-fg"
            >
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
                strokeWidth={1.6}
              />
              {m.back_to_top_label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
