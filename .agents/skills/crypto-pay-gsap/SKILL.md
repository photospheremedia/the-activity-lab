---
name: crypto-pay-gsap
description: GSAP animations for Crypto Pay portal (React/Next.js admin + marketing). Use when adding motion to admin UI, dashboard, or marketing pages.
---

# Crypto Pay GSAP (React / Next.js)

Portal-specific GSAP patterns. Generic GSAP theory lives in `.agents/skills/gsap/SKILL.md`.

## Stack

- `gsap` + `@gsap/react` (`useGSAP`) in `apps/portal`
- Marketing: class-based scroll reveals in `components/marketing/gsap-provider.tsx`
- Admin: imperative helpers in `lib/motion/admin-gsap.ts` + hooks in `components/admin/use-admin-*-gsap.ts`

## Rules

1. **Client components only** — `"use client"`; never import GSAP in Server Components.
2. **`useGSAP` + scope ref** — prefer `useGSAP(fn, { scope: ref, dependencies: [...] })` over raw `useEffect`.
3. **Cleanup** — return kill/revert from `useGSAP` callback; helpers return tweens you can `.kill()`.
4. **Reduced motion** — always gate with `prefersReducedMotion()` from `lib/motion/reduced-motion.ts`.
5. **GPU-friendly** — animate `opacity`, `transform` (x/y/scale/rotation); avoid width/height/top/left.
6. **Subtle admin motion** — short durations (0.35–0.55s), `power2.out` / `back.out(1.2)`; no bounce spam.
7. **Data attributes** — target `[data-admin-nav-item]`, `[data-admin-animate]`, `[data-coming-soon-badge]` for stable selectors.

## Admin patterns

### Sidebar nav stagger

```tsx
import { useAdminNavGsap } from "@/components/admin/use-admin-nav-gsap";

const navRef = useAdminNavGsap(sidebarOpen ? "open" : "closed");
return (
  <div ref={navRef}>
    <Link data-admin-nav-item href="...">...</Link>
  </div>
);
```

### Coming soon badge

Use `ComingSoonBadge` from `components/admin/coming-soon-badge.tsx` (warm gradient + sparkle loop).

### Dashboard entrance

```tsx
const rootRef = useAdminDashboardGsap(!loading && !!stats);
return (
  <div ref={rootRef}>
    <div data-admin-animate="metric">...</div>
    <section data-admin-animate="panel">...</section>
  </div>
);
```

## Marketing patterns

- Add utility classes (`gsap-fade-up`, `gsap-stagger-item`, …) to JSX.
- Wrap marketing layout with `GsapProvider` (ScrollTrigger registered once).
- See `gsap-provider.tsx` for easing and `toggleActions`.

## When adding new admin animation

1. Add a small function to `lib/motion/admin-gsap.ts`.
2. Wire via `useGSAP` hook colocated or in `use-admin-*-gsap.ts`.
3. Respect `prefersReducedMotion()`.
4. Run `pnpm typecheck:portal` after changes.

## Do not

- Duplicate ScrollTrigger setup in every page — reuse provider or helpers.
- Animate layout-critical properties on large lists without virtualization consideration.
- Block navigation until animations finish.
