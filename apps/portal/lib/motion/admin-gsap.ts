import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

/** Stagger admin sidebar / nav rows on enter. */
export function animateAdminNavItems(container: HTMLElement | null): gsap.core.Tween | null {
  if (!container || prefersReducedMotion()) return null;

  const items = container.querySelectorAll<HTMLElement>("[data-admin-nav-item]");
  if (items.length === 0) return null;

  return gsap.fromTo(
    items,
    { opacity: 0, x: -14 },
    {
      opacity: 1,
      x: 0,
      duration: 0.42,
      stagger: 0.045,
      ease: "power2.out",
      clearProps: "transform",
    },
  );
}

/** Dashboard metric cards + quick actions entrance. */
export function animateAdminDashboardEnter(root: HTMLElement | null): gsap.core.Tween | null {
  if (!root || prefersReducedMotion()) return null;

  const blocks = root.querySelectorAll<HTMLElement>(
    "[data-admin-animate='metric'], [data-admin-animate='panel']",
  );
  if (blocks.length === 0) return null;

  return gsap.fromTo(
    blocks,
    { opacity: 0, y: 22 },
    {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.07,
      ease: "back.out(1.2)",
      clearProps: "transform",
    },
  );
}

/** Status badge pop when value changes (staff table). */
export function animateStatusBadge(el: HTMLElement | null): gsap.core.Tween | null {
  if (!el || prefersReducedMotion()) return null;

  return gsap.fromTo(
    el,
    { scale: 0.92, opacity: 0.6 },
    { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" },
  );
}
