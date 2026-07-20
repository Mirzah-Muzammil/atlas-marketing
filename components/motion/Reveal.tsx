"use client";

import type { ElementType, ReactNode } from "react";
import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  distance?: number;
};

export function Reveal({ as: Tag = "div", children, className, delay = 0, distance = 42 }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    root,
    ({ gsap }) => {
      if (prefersReducedMotion || !root.current) return;
      gsap.fromTo(
        root.current,
        { autoAlpha: 0, y: distance, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          delay,
          duration: 1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
        },
      );
    },
    [prefersReducedMotion, delay, distance],
  );

  return <Tag className={cn("transform-gpu", className)} ref={root}>{children}</Tag>;
}

