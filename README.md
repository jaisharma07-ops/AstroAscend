# AstroAscend — Aurora Glass

A full redesign of [astroascend.my.canva.site](https://astroascend.my.canva.site/), preserving every word of the source verbatim while completely re-imagining the visual system.

## Concept

Aurora Glass leans into iridescent ambience: three large, slowly-drifting gradient blobs (teal → violet → magenta) sit behind a glassmorphic content layer. Cards use `backdrop-filter: blur` over a translucent surface with a hairline border. Type is Geist Sans throughout, with massive display weights at tight tracking. Motion is restrained: 600ms scroll-reveals, gentle hover-lift on cards, and a `view-transition-api`-driven fade for theme switching.

The design philosophy is "Linear meets Arc Browser meets a cold morning sky" — confident negative space, tight typography, vivid accents used sparingly, and movement that breathes rather than bounces.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

## Stack

- **Next.js 14** (App Router, TypeScript strict)
- **Tailwind CSS** + CSS variables (so dark/light is a single source of truth, not `dark:` overrides)
- **Framer Motion 11** for in-view reveals, hover affordances, and the mentor-credentials accordion
- **Lenis** for smooth scrolling (disabled under `prefers-reduced-motion`)
- **next-themes** for persisted theme selection, with `view-transition-api` crossfade
- **Geist Sans / Mono** via the `geist` package
- **Lucide** icons (no emoji)

## Source content

Every visible string comes from [`content/source-content.json`](./content/source-content.json), which was originally extracted from the live Canva site (headless Chromium + JSON-blob extraction from the rendered HTML — not OCR or DOM reconstruction). Source typos (`envison`, `truely`, `informtion`, `Imarting`, `recived`, `Pyschology`, etc.) and grammar issues have since been corrected in an editorial pass (May 2026).

`lib/content.ts` re-exports the JSON behind a typed shape so components import strings, never hardcode them.

## Pages

| Route | What's there |
|---|---|
| `/` | Hero, "Why ASTROASCEND?", "What is ASTROASCEND?", Code of Conduct (3 columns), Vision/Mission, closing CTA |
| `/masterclasses` | 8 course cards (Astronomy, Psychology, Quantum, LinkedIn, Astrophysics, Semiconductors, Molecular Biology, AI/ML) + contact band |
| `/another-comet` | Exhibitions intro + 6 secondary courses (CHESS, Quizzing, MUN, Myths, Western Vocals, Piano "Coming Soon") |
| `/our-mentors` | 7 mentor cards with expandable credentials (Dev Keerthi P, Krishna Deepti, Varsha Deepak, Daksh Jain, Pallavi Harish, Donna Christine George, Sanskriti Hooli) |
| `/coming-soon` | Single-screen "we're giving the site a little makeover" with animated orb |
| `/join-us` | 5 join paths (Mentor, Donor, Ideator, Challenger, Sustainer) + public documents block |

## Theme system

CSS custom properties live in `app/globals.css` under `:root` and `.dark`. Tailwind reads them via `tailwind.config.ts` so utility classes like `text-fg`, `bg-glass`, `border-glass-border` are theme-aware. There are no hardcoded hex values in components.

Toggle uses `next-themes` with `attribute="class"` and persists to `localStorage`. First paint respects `prefers-color-scheme`. The animated theme switch uses `document.startViewTransition()` where supported, falling back to a 280ms colour crossfade.

## Motion

Defaults are in `lib/motion.ts`: ease curve `cubic-bezier(0.22, 1, 0.36, 1)` ("ease-out-expo"), 600ms entrance duration, 250ms hover. The `Reveal` component honours `useReducedMotion()` and renders content visible-by-default for users with the reduced-motion preference. Aurora blobs are CSS keyframes (38–44s loops) that don't run a JS animation loop.

## Build

`npm run build` produces 6 statically-rendered routes. First-load JS is ~133–142 kB on every route (Next 14 baseline + Framer + Lenis). All routes pass `tsc --noEmit` and `next lint` clean.

## Out of scope (in this build)


- Stitch / Figma MCP integration to refine specific section visuals
- Per-mentor avatar imagery (stand-in initials are used; the source had no images attached to mentors)
- Real `/forms.gle` integration for the Coming Soon page contact (the email link is `mailto:` per source)
- Pages 1, 3, 4, 5 of the original brief's five-concept set — this build is concept #2 only (per agreed scope)
