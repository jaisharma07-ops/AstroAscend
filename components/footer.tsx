import Link from "next/link";
import { Instagram, Linkedin, Mail, Youtube, type LucideIcon } from "lucide-react";
import { content } from "@/lib/content";
import { LogoMark } from "@/components/logo";

const ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  youtube: Youtube,
};

export function Footer() {
  const f = content.footer;
  const a = f.canva_attribution;
  return (
    <footer className="relative mt-32 border-t border-glass-border">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-md">
              <LogoMark className="h-10 w-10" />
              <span className="display-3 inline-block bg-clip-text font-semibold tracking-[-0.04em]">
                {f.brand_mark}
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{f.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {f.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => {
                    const Icon = l.icon ? ICONS[l.icon] : null;
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="focus-ring link-underline -mx-1 inline-flex items-center gap-2 rounded-md px-1 py-1.5 text-sm text-fg/85 hover:text-fg"
                        >
                          {Icon ? <Icon className="h-4 w-4" strokeWidth={1.6} /> : null}
                          <span>{l.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-glass-border pt-8 text-[12px] leading-relaxed text-subtle md:grid-cols-2">
          <p>
            {a.subject_text}{" "}
            <a
              href={a.terms_of_use_link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-fg/80 hover:text-fg"
            >
              {a.terms_of_use_link.label}
            </a>
            {a.breaches_text}{" "}
            <a
              href={a.acceptable_use_link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-fg/80 hover:text-fg"
            >
              {a.acceptable_use_link.label}
            </a>
            {a.report_text}
          </p>
          <p>
            {a.privacy_lead}{" "}
            <a
              href={a.privacy_link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-fg/80 hover:text-fg"
            >
              {a.privacy_link.label}
            </a>{" "}
            {a.privacy_tail}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 text-[11px] text-subtle md:flex-row md:items-center">
          <span>© AstroAscend</span>
          <a
            href={a.designed_with.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline rounded-sm text-fg/70 hover:text-fg focus-ring"
          >
            {a.designed_with.label} Canva
          </a>
        </div>
      </div>
    </footer>
  );
}
