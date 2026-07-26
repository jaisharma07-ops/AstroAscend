"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { content } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/logo";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = content.navigation.links;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-[450ms] ease-out-expo",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="container">
        <nav
          aria-label="Primary"
          className={cn(
            "relative flex items-center justify-between gap-4 rounded-2xl px-3 sm:px-5",
            "border border-glass-border bg-glass backdrop-blur-xl backdrop-saturate-150",
            "transition-all duration-[450ms] ease-out-expo",
            scrolled ? "h-12 shadow-[0_8px_32px_-12px_rgba(10,15,31,0.18)]" : "h-14"
          )}
        >
          <Link
            href="/"
            className="focus-ring -mx-2 inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold tracking-[-0.01em]"
          >
            <LogoMark className="h-7 w-7" animated />
            <span>AstroAscend</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.id}>
                  <Link
                    href={l.href}
                    className={cn(
                      "focus-ring relative inline-flex h-8 items-center rounded-full px-3 text-[13px] tracking-[-0.005em] transition-colors",
                      active ? "text-fg" : "text-fg/65 hover:text-fg"
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-fg/[0.06] dark:bg-white/[0.07]"
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              onClick={() => setOpen((s) => !s)}
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-glass-border bg-glass md:hidden"
            >
              {open ? <X className="h-4 w-4" strokeWidth={1.6} /> : <Menu className="h-4 w-4" strokeWidth={1.6} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-nav-menu"
          aria-hidden={!open}
          className={cn(
            "mt-2 overflow-hidden rounded-2xl transition-all duration-[420ms] ease-out-expo md:hidden",
            open
              ? "pointer-events-auto visible max-h-[440px] opacity-100"
              : "pointer-events-none invisible max-h-0 opacity-0"
          )}
        >
          <div className="glass-strong rounded-2xl p-2">
            <ul className="flex flex-col">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.id}>
                    <Link
                      href={l.href}
                      className={cn(
                        "focus-ring flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-colors",
                        active ? "bg-fg/[0.05] text-fg" : "text-fg/80 hover:bg-fg/[0.04] hover:text-fg"
                      )}
                    >
                      <span>{l.label}</span>
                      <span aria-hidden className="text-fg/40">→</span>
                    </Link>
                  </li>
                );
              })}
              <li className="mt-1 flex items-center justify-between rounded-xl px-3 py-2">
                <span className="text-xs text-subtle">Appearance</span>
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
