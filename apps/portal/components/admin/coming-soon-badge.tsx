"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import { cn } from "@/lib/utils";

/** Warm “en camino” pill — amber / rose / emerald gradient (sidebar + light surfaces). */
export function ComingSoonBadge({
  label,
  variant = "sidebar",
  className,
}: {
  label: string;
  variant?: "sidebar" | "light";
  className?: string;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const sparkleRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!sparkleRef.current || prefersReducedMotion()) return;

      gsap.to(sparkleRef.current, {
        scale: 1.25,
        rotation: 12,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: rootRef },
  );

  return (
    <span
      ref={rootRef}
      data-coming-soon-badge
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide",
        variant === "sidebar"
          ? "border-rose-400/35 bg-gradient-to-r from-amber-500/25 via-rose-500/15 to-emerald-500/20 text-amber-100 shadow-sm shadow-amber-900/25"
          : "border-amber-400/50 bg-gradient-to-r from-amber-50 via-orange-50 to-emerald-50 text-amber-900",
        className,
      )}
    >
      <span ref={sparkleRef} data-coming-soon-sparkle className="inline-flex origin-center">
        <Sparkles
          className={cn(
            "size-2.5 shrink-0",
            variant === "sidebar" ? "text-amber-300/90" : "text-amber-600",
          )}
          aria-hidden
        />
      </span>
      <span className={variant === "light" ? "uppercase" : undefined}>{label}</span>
    </span>
  );
}
