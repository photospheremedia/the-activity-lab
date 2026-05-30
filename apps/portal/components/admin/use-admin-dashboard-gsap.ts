"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { animateAdminDashboardEnter } from "@/lib/motion/admin-gsap";

export function useAdminDashboardGsap(ready: boolean) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const tween = animateAdminDashboardEnter(rootRef.current);
      return () => tween?.kill();
    },
    { scope: rootRef, dependencies: [ready] },
  );

  return rootRef;
}
