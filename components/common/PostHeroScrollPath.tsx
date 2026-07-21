"use client";

import { useScroll } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { LinePath } from "@/components/ui/skiper-ui/skiper19";

interface PostHeroScrollPathProps {
  children: ReactNode;
}

export default function PostHeroScrollPath({
  children,
}: PostHeroScrollPathProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end end"],
  });

  return (
    <div
      className="relative isolate bg-white"
      data-post-hero-scroll-story
      ref={storyRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[58vw] max-w-[52rem] overflow-hidden opacity-[0.16] mix-blend-multiply sm:w-[44vw]"
      >
        <LinePath
          className="absolute -right-[42%] top-0 h-full w-[170%]"
          scrollYProgress={scrollYProgress}
          stroke="#FF5E1A"
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
