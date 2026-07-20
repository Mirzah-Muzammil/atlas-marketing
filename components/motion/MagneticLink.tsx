"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

type MagneticLinkProps = { children: ReactNode; className?: string; strength?: number };

export function MagneticLink({ children, className, strength = 0.16 }: MagneticLinkProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * strength;
      const y = (event.clientY - bounds.top - bounds.height / 2) * strength;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onLeave = () => { element.style.transform = "translate3d(0, 0, 0)"; };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return <div className={cn("w-fit transition-transform duration-500 ease-out", className)} ref={root}>{children}</div>;
}
