import { Reveal } from "@/components/reveal";

export function WhatSection({
  heading,
  bodyLead,
  body,
}: {
  heading: string;
  bodyLead?: string;
  body: string;
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
            02 — What it is
          </span>
          <h2 className="display-2 mt-4 max-w-3xl text-balance">{heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-pretty text-xl leading-relaxed text-fg/90 sm:text-2xl">
            {bodyLead ? (
              <span
                className="font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, var(--accent-violet), var(--accent-magenta), var(--accent-teal))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {bodyLead}
              </span>
            ) : null}
            {bodyLead ? " " : null}
            <span className="text-muted">{body}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
