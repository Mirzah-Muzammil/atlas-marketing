"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { cn } from "@/utils/cn";

interface SimpleMarqueeProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  baseVelocity?: number;
  repeat?: number;
  slowdownOnHover?: boolean;
  slowDownFactor?: number;
  useScrollVelocity?: boolean;
  scrollAwareDirection?: boolean;
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export default function SimpleMarquee({
  children,
  className,
  direction = "left",
  baseVelocity = 5,
  repeat = 4,
  slowdownOnHover = true,
  slowDownFactor = 0.12,
  useScrollVelocity = true,
  scrollAwareDirection = true,
}: SimpleMarqueeProps) {
  const baseX = useMotionValue(0);
  const hoverFactor = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactor, {
    damping: 60,
    stiffness: 300,
  });
  const directionFactor = useRef(1);
  const isHovered = useRef(false);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScrollVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const scrollFactor = useTransform(
    smoothScrollVelocity,
    [-1000, 0, 1000],
    [-4, 0, 4],
    { clamp: false },
  );
  const x = useTransform(baseX, (value) => `${wrap(-100, 0, value)}%`);
  const signedVelocity = direction === "left" ? -baseVelocity : baseVelocity;

  useAnimationFrame((_, delta) => {
    hoverFactor.set(
      isHovered.current && slowdownOnHover ? slowDownFactor : 1,
    );

    const currentScrollFactor = useScrollVelocity ? scrollFactor.get() : 0;

    if (scrollAwareDirection && Math.abs(currentScrollFactor) > 0.05) {
      directionFactor.current = currentScrollFactor < 0 ? -1 : 1;
    }

    const baseMovement =
      directionFactor.current *
      signedVelocity *
      (delta / 1000) *
      smoothHoverFactor.get();

    baseX.set(
      baseX.get() +
        baseMovement * (1 + Math.abs(currentScrollFactor)),
    );
  });

  return (
    <motion.div
      className={cn("flex w-max touch-pan-y", className)}
      data-marquee-direction={direction}
      onHoverStart={() => {
        isHovered.current = true;
      }}
      onHoverEnd={() => {
        isHovered.current = false;
      }}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <motion.div
          aria-hidden={index > 0}
          className="flex shrink-0"
          key={index}
          style={{ x }}
        >
          {children}
        </motion.div>
      ))}
    </motion.div>
  );
}
