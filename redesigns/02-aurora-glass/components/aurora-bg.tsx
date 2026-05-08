"use client";

/**
 * Three soft gradient blobs that drift slowly, plus a fine-grain noise overlay.
 * Disabled (replaced with a static gradient) when prefers-reduced-motion is set.
 */
export function AuroraBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 10% -10%, color-mix(in oklab, var(--accent-violet) 22%, transparent), transparent 60%)," +
            "radial-gradient(1000px 700px at 110% 20%, color-mix(in oklab, var(--accent-magenta) 18%, transparent), transparent 60%)," +
            "radial-gradient(1100px 800px at 50% 110%, color-mix(in oklab, var(--accent-teal) 18%, transparent), transparent 60%)",
          opacity: "var(--aurora-opacity)",
        }}
      />
      <div className="absolute -left-40 top-[-12%] h-[60vmax] w-[60vmax] rounded-full opacity-[var(--aurora-opacity)] mix-blend-screen blur-[120px] animate-blob-drift-1"
        style={{ background: "radial-gradient(circle, var(--accent-violet), transparent 60%)" }}
      />
      <div className="absolute right-[-16%] top-[8%] h-[55vmax] w-[55vmax] rounded-full opacity-[var(--aurora-opacity)] mix-blend-screen blur-[120px] animate-blob-drift-2"
        style={{ background: "radial-gradient(circle, var(--accent-magenta), transparent 60%)" }}
      />
      <div className="absolute bottom-[-22%] left-[20%] h-[65vmax] w-[65vmax] rounded-full opacity-[var(--aurora-opacity)] mix-blend-screen blur-[120px] animate-blob-drift-3"
        style={{ background: "radial-gradient(circle, var(--accent-teal), transparent 60%)" }}
      />
      {/* Noise overlay */}
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
