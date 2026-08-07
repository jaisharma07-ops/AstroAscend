"use client";

/**
 * Dark mode: dramatic orange arc-glow emulating the ember/fire radial light
 * from the reference image (concentrated bottom-right, with a faint upper bloom).
 * Light mode: soft teal/violet/magenta aurora blobs.
 */
export function AuroraBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      {/* ── DARK-ONLY: orange arc glow (bottom-right corner, like the reference) ── */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            /* Main arc: large radial burst from bottom-right corner */
            "radial-gradient(ellipse 90% 80% at 110% 115%, #E8520C 0%, #b03a08 18%, #601e04 38%, transparent 62%)," +
            /* Secondary warm halo slightly offset inward */
            "radial-gradient(ellipse 55% 50% at 95% 100%, #FF7A2F 0%, #9c3608 25%, transparent 55%)," +
            /* Faint upper-left ambient bleed so corners aren't pitch black */
            "radial-gradient(ellipse 50% 35% at -5% -5%, rgba(232,82,12,0.09) 0%, transparent 60%)",
        }}
      />

      {/* ── DARK-ONLY: subtle orange glow strip along the bottom edge ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] hidden dark:block"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #E8520C 45%, #FF7A2F 55%, transparent 100%)",
          filter: "blur(6px)",
          opacity: 0.6,
        }}
      />

      {/* ── LIGHT-ONLY: soft aurora blobs (original violet/magenta/teal) ── */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "radial-gradient(1200px 800px at 10% -10%, color-mix(in oklab, #a78bfa 22%, transparent), transparent 60%)," +
            "radial-gradient(1000px 700px at 110% 20%, color-mix(in oklab, #f472b6 18%, transparent), transparent 60%)," +
            "radial-gradient(1100px 800px at 50% 110%, color-mix(in oklab, #2dd4bf 18%, transparent), transparent 60%)",
          opacity: 0.42,
        }}
      />
      <div
        className="absolute -left-40 top-[-12%] h-[60vmax] w-[60vmax] rounded-full dark:hidden mix-blend-screen blur-[120px] animate-blob-drift-1"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 60%)", opacity: 0.42 }}
      />
      <div
        className="absolute right-[-16%] top-[8%] h-[55vmax] w-[55vmax] rounded-full dark:hidden mix-blend-screen blur-[120px] animate-blob-drift-2"
        style={{ background: "radial-gradient(circle, #f472b6, transparent 60%)", opacity: 0.42 }}
      />
      <div
        className="absolute bottom-[-22%] left-[20%] h-[65vmax] w-[65vmax] rounded-full dark:hidden mix-blend-screen blur-[120px] animate-blob-drift-3"
        style={{ background: "radial-gradient(circle, #2dd4bf, transparent 60%)", opacity: 0.42 }}
      />

      {/* Noise overlay (both modes) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "256px 256px",
          opacity: "var(--noise-opacity)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
