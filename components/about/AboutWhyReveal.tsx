"use client";

import { useEffect, useRef, useState } from "react";

const whyCopy =
  "For most international students, studying abroad is the largest financial commitment their family will ever make: forty to eighty thousand pounds, years of life, a visa journey, and sometimes debt against family property. Yet universities commonly pay agents £1,500 to £4,000 per enrolled student, creating an incentive to promote the institutions that pay most rather than the ones that fit best. Atlas is built differently: the Operating System is free end to end, every partner relationship is labelled, and specialist Concierge support is priced separately and openly.";

const words = whyCopy.split(" ");

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function AboutWhyReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    let animationFrame = 0;
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(clamp(-rect.top / scrollRange));
    };
    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [reducedMotion]);

  return (
    <section
      className="relative min-h-[260svh] border-t border-white/[.1] px-5 py-20 sm:px-8"
      data-about-reveal-pace="slow"
      data-about-why-reveal
      id="why-atlas"
      ref={sectionRef}
    >
      <div className="sticky top-0 flex min-h-svh items-center">
        <div className="mx-auto w-full max-w-[1060px] py-16">
          <div
            className="relative mx-auto max-w-[920px] text-balance text-center text-[clamp(1.8rem,3.35vw,3.7rem)] font-medium leading-[1.13] tracking-[-.055em]"
            data-about-why-copy
          >
            <p aria-hidden="true" className="relative">
              {words.map((word, index) => {
                const reveal = clamp(progress ** 1.65 * words.length * 1.08 - index);
                const opacity = reducedMotion ? 1 : reveal;

                return (
                  <span
                    className="transition-opacity duration-200 ease-out"
                    data-about-why-word
                    key={`${word}-${index}`}
                    style={{ opacity }}
                  >
                    {word}{index === words.length - 1 ? "" : " "}
                  </span>
                );
              })}
            </p>
            <p className="sr-only">{whyCopy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
