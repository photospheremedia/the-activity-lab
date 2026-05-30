---
name: the-activity-lab-gsap-video
description: Build cinematic GSAP hero sections for The Activity Lab (4K-style crossfades, camera motion, and scene transitions) in React + Vite.
version: 1.0.0
risk_level: LOW
---

# The Activity Lab GSAP Video Skill

Use this skill when the user asks for:
- cinematic hero animation
- 4K-style video transition feel
- scripted walkthrough motion
- GSAP timeline improvements

## Project context

- Stack: React 19 + Vite + Tailwind 4
- Main page is in `src/App.tsx`
- Smooth scrolling helpers live in `src/lib/scroll.ts`

## Core rules

1. Use one master `gsap.timeline()` as the source of truth.
2. Use labels/ordered beats instead of independent timelines for related motion.
3. Prefer transform + opacity only (`x/y/scale/rotation/opacity`).
4. Respect reduced motion with `window.matchMedia('(prefers-reduced-motion: reduce)')`.
5. Always scope animations and cleanup (`gsap.context(...).revert()` in React effects).
6. Treat hero backgrounds as "plates": crossfade + slow scale for a filmed look.

## 4K-style transition recipe

1. Render 2-3 full-bleed background layers.
2. Set first layer visible and others hidden.
3. Animate current layer scale from ~`1.08` to ~`1.16`.
4. Crossfade current out and next in over `0.9s` to `1.3s`.
5. Keep a slight overlap (`"<"` or negative offset) for seamless transitions.
6. Repeat infinitely with a short `repeatDelay`.

## React implementation pattern

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) return
    const tl = gsap.timeline({ repeat: -1 })
    // add plate transitions...
  }, rootRef)

  return () => ctx.revert()
}, [])
```

## Quality checklist

- Animation still looks good at 1440p and 4K viewport widths
- No layout shift during transitions
- No active GSAP instances after unmount
- Motion remains readable under reduced motion preference

## References to install alongside this skill

- Official GSAP skills:
  - `npx skills add https://github.com/greensock/gsap-skills`
- Optional choreography skill:
  - `npx skills add https://github.com/Costumary/gsap-choreography`
