"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { animateAdminNavItems } from "@/lib/motion/admin-gsap";

/** Sidebar nav stagger + coming-soon sparkle loop. Re-runs when `sidebarKey` changes (e.g. mobile open). */
export function useAdminNavGsap(sidebarKey?: string | number) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const navTween = animateAdminNavItems(containerRef.current);
      return () => navTween?.kill();
    },
    { scope: containerRef, dependencies: [sidebarKey] },
  );

  return containerRef;
}
