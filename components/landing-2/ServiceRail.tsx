"use client";

import Image from "next/image";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import { useRef, useState } from "react";

import type { CinematicService } from "@/components/landing-2/scene-data";

interface ServiceRailProps {
  reducedMotion: boolean;
  services: CinematicService[];
}

export function ServiceRail({ reducedMotion, services }: ServiceRailProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const programmaticIndexRef = useRef<number | null>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startScroll: 0,
    lastX: 0,
    moved: false,
    suppressClick: false,
  });

  const moveTo = (nextIndex: number) => {
    const bounded = Math.min(services.length - 1, Math.max(0, nextIndex));
    setActiveIndex(bounded);
    setHasInteracted(true);
    programmaticIndexRef.current = reducedMotion ? null : bounded;
    cardRefs.current[bounded]?.scrollIntoView?.({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const syncFromNativeScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let nearestIndex = activeIndex;
    let nearestDistance = Number.POSITIVE_INFINITY;
    const maxScroll = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    const requestedIndex = programmaticIndexRef.current;
    if (requestedIndex !== null) {
      const requestedCard = cardRefs.current[requestedIndex];
      if (!requestedCard) {
        programmaticIndexRef.current = null;
      } else {
        const requestedLeft = Math.min(requestedCard.offsetLeft, maxScroll);
        if (Math.abs(requestedLeft - viewport.scrollLeft) > 2) return;
        programmaticIndexRef.current = null;
      }
    }
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const reachableLeft = Math.min(card.offsetLeft, maxScroll);
      const distance = Math.abs(reachableLeft - viewport.scrollLeft);
      if (distance <= nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeIndex) {
      setActiveIndex(nearestIndex);
      setHasInteracted(true);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTo(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTo(activeIndex + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveTo(services.length - 1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    programmaticIndexRef.current = null;
    viewport.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScroll: viewport.scrollLeft,
      lastX: event.clientX,
      moved: false,
      suppressClick: false,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const drag = dragRef.current;
    if (!viewport || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    drag.lastX = event.clientX;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
    drag.moved = Math.abs(deltaX) > 6;
    viewport.scrollLeft = drag.startScroll - deltaX;
  };

  const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    const deltaX = drag.lastX - drag.startX;
    viewportRef.current?.releasePointerCapture?.(event.pointerId);
    drag.pointerId = -1;
    if (drag.moved) {
      drag.suppressClick = true;
      window.setTimeout(() => {
        drag.suppressClick = false;
      }, 0);
    }
    if (Math.abs(deltaX) >= 40) {
      moveTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
  };

  const preventDraggedLink = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.suppressClick = false;
  };

  const activeService = services[activeIndex];

  return (
    <div className="cine-rail-shell">
      <div className="cine-rail__controls">
        <p aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
        </p>
        <button
          aria-label="Previous service"
          disabled={activeIndex === 0}
          onClick={() => moveTo(activeIndex - 1)}
          type="button"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          aria-label="Next service"
          disabled={activeIndex === services.length - 1}
          onClick={() => moveTo(activeIndex + 1)}
          type="button"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div
        aria-label="Atlas essentials catalog"
        className="cine-rail__viewport"
        onClickCapture={preventDraggedLink}
        onKeyDown={onKeyDown}
        onPointerCancel={finishPointer}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onScroll={syncFromNativeScroll}
        onWheel={() => {
          programmaticIndexRef.current = null;
        }}
        ref={viewportRef}
        role="region"
        tabIndex={0}
      >
        <ul className="cine-rail">
          {services.map((service, index) => (
            <li
              data-active={index === activeIndex ? "true" : "false"}
              key={service.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
            >
              <article className="cine-card">
                <Image
                  alt=""
                  height={700}
                  sizes="(max-width: 700px) calc(100vw - 4rem), 24rem"
                  src={service.image}
                  width={1000}
                />
                <div className="cine-card__meta">
                  <p>{service.number}</p>
                  <span>Atlas essential</span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.copy}</p>
                <small>{service.note}</small>
                <a
                  href={`mailto:hello@atlas.study?subject=${encodeURIComponent(`Atlas ${service.name}`)}`}
                >
                  Ask Atlas about {service.name} <span aria-hidden="true">↗</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <p aria-atomic="true" aria-live="polite" className="cine-sr-only" role="status">
        {hasInteracted
          ? `${activeService.name}, ${activeIndex + 1} of ${services.length}`
          : ""}
      </p>
    </div>
  );
}
