import Image from "next/image";

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
  return (
    <div className={cn("relative w-full", className)}>
      <div
        className="sticky-cards relative flex w-full items-center justify-center px-4 py-8 md:h-screen md:overflow-hidden md:px-8"
      >
        <div
          className={cn(
            "grid w-full gap-8",
            containerClassName,
          )}
        >
          {cards.map((card, index) => (
            <article
              key={card.id}
              data-service-card="true"
              data-premium-knowledge-card
              data-premium-reveal
              className="skiper17__card relative min-h-[72svh] overflow-hidden rounded-[2rem] bg-[#fffaf2] shadow-[0_36px_90px_-28px_rgba(0,0,0,0.65)]"
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
