import { Reveal } from "@/components/reveal";

export function WhySection({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
            01 — The premise
          </span>
        </Reveal>

        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display-2 text-balance">{heading}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="glass h-full rounded-3xl p-7 sm:p-8 lg:p-7">
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">{body}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
