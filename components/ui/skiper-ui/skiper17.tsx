"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { cn } from "@/utils/cn";

export interface CardData {
  id: number | string;
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description: string;
  meta?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef<HTMLDivElement>(null);
  const stickyCards = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (
        !window.matchMedia(
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        ).matches
      ) {
        return;
      }

      const cardElements = cardRefs.current.filter(
        (card): card is HTMLElement => card !== null,
      );
      const trigger = stickyCards.current;

      if (!trigger || cardElements.length < 2) return;

      gsap.set(cardElements, { scale: 1, rotation: 0 });
      gsap.set(cardElements[0], { yPercent: 0 });
      gsap.set(cardElements.slice(1), { yPercent: 110 });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: () => trigger.getBoundingClientRect().top + window.scrollY,
          end: `+=${window.innerHeight * (cardElements.length - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 0; index < cardElements.length - 1; index += 1) {
        scrollTimeline.to(
          cardElements[index],
          {
            scale: 0.82,
            rotation: index % 2 === 0 ? 3 : -3,
            duration: 1,
            ease: "none",
          },
          index,
        );
        scrollTimeline.to(
          cardElements[index + 1],
          { yPercent: 0, duration: 1, ease: "none" },
          index,
        );
      }

      const resizeObserver =
        typeof ResizeObserver === "undefined"
          ? null
          : new ResizeObserver(() => ScrollTrigger.refresh());
      const refreshScrollTrigger = () => ScrollTrigger.refresh();
      const refreshFrame = window.requestAnimationFrame(refreshScrollTrigger);

      if (container.current) resizeObserver?.observe(container.current);
      document.fonts?.ready.then(refreshScrollTrigger);

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        resizeObserver?.disconnect();
        scrollTimeline.scrollTrigger?.kill();
        scrollTimeline.kill();
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative w-full", className)} ref={container}>
      <div
        ref={stickyCards}
        className="sticky-cards relative flex w-full items-center justify-center px-4 py-8 md:h-screen md:overflow-hidden md:px-8"
      >
        <div
          className={cn(
            "grid w-full max-w-5xl gap-8 md:relative md:h-[82vh] md:max-h-[820px] md:min-h-[620px]",
            containerClassName,
          )}
        >
          {cards.map((card, index) => (
            <article
              key={card.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              data-service-card="true"
              data-premium-knowledge-card
              className="skiper17__card relative min-h-[72svh] overflow-hidden rounded-[2rem] bg-[#fffaf2] shadow-[0_36px_90px_-28px_rgba(0,0,0,0.65)] md:absolute md:inset-0 md:h-full md:min-h-0"
              style={{ zIndex: index + 1 }}
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 960px, (min-width: 768px) 88vw, 100vw"
                className={cn("object-cover", imageClassName)}
              />
              <div className="skiper17__shade pointer-events-none absolute inset-0" />
              <div className="skiper17__content absolute inset-0">
                <div className="skiper17__topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {card.eyebrow ? <b>{card.eyebrow}</b> : null}
                </div>
                <div className="skiper17__copy">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                {card.meta ? (
                  <div className="skiper17__meta">
                    <span>{card.meta}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export { StickyCard002 };

/**
 * Adapted from Skiper 17 StickyCard_002 by @gurvinder-singh02 (gxuri.me).
 * The free version requires attribution.
 */
