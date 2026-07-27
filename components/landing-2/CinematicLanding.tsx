"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import {
  earlyAccessHref,
  sceneMarkers,
  services,
} from "@/components/landing-2/scene-data";
import { ServiceRail } from "@/components/landing-2/ServiceRail";
import { useCinematicTimeline } from "@/components/landing-2/useCinematicTimeline";
import { useFrameSequenceCanvas } from "@/components/landing-2/useFrameSequenceCanvas";
import { WordReveal } from "@/components/landing-2/WordReveal";

export function CinematicLanding() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const { ready: frameReady, renderFrame } = useFrameSequenceCanvas(canvasRef, {
    reducedMotion,
  });
  const { jumpToMarker } = useCinematicTimeline(sectionRef, {
    reducedMotion,
    coarsePointer,
    ready: sceneReady,
    renderFrame,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const update = () => {
      setReducedMotion(motionQuery.matches);
      setCoarsePointer(pointerQuery.matches);
    };
    update();
    motionQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (frameReady) {
      setSceneReady(true);
      return;
    }
    const timeout = window.setTimeout(() => {
      setSceneReady(true);
    }, 700);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [frameReady]);

  const onMarkerClick =
    (marker: keyof typeof sceneMarkers) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (reducedMotion) return;
      event.preventDefault();
      jumpToMarker(sceneMarkers[marker]);
    };

  return (
    <main className="cine-page" id="main-content">
      <section
        className="cine-scroll"
        data-cinematic-scroll
        data-reduced-motion={reducedMotion ? "true" : "false"}
        data-scene-ready={sceneReady ? "true" : "false"}
        ref={sectionRef}
        style={{ "--scene-progress": 0 } as CSSProperties}
      >
        <div className="cine-stage" data-cinematic-stage>
          <div aria-hidden="true" className="cine-world">
            <canvas
              className="cine-layer cine-frame-canvas"
              data-layer-role="00-frame-sequence"
              height={720}
              ref={canvasRef}
              width={1280}
            />
            <div className="cine-layer cine-layer--atmosphere" />
            <div className="cine-layer cine-layer--grain" />
          </div>

          <div
            aria-hidden="true"
            className="cine-shade"
            data-layer-role="10-black-readability"
          />

          <div aria-hidden="true" className="cine-loader">
            <span className="cine-loader__mark">A</span>
            <span>Opening the journey</span>
          </div>

          <header className="cine-nav">
            <a
              aria-label="Atlas cinematic home"
              className="cine-brand"
              href="#start"
              onClick={onMarkerClick("start")}
            >
              <span aria-hidden="true" className="cine-brand__mark">A</span>
              <span>Atlas</span>
            </a>
            <nav aria-label="Cinematic timeline">
              <a data-timeline-nav="start" href="#start" onClick={onMarkerClick("start")}>Start</a>
              <a href="#journey" onClick={onMarkerClick("journey")}>Journey</a>
              <a data-timeline-nav="essentials" href="#essentials" onClick={onMarkerClick("essentials")}>Essentials</a>
            </nav>
          </header>

          <div className="cine-intro" id="start">
            <WordReveal as="p" className="cine-kicker" end={0.14} start={0}>
              Free, end to end
            </WordReveal>
            <WordReveal as="h1" end={0.5} start={0.12}>
              Your operating system for studying and succeeding abroad.
            </WordReveal>
            <WordReveal as="p" className="cine-lede" end={0.72} start={0.44}>
              Match universities. Sort your services. Settle in. Then build a life. One personal system from your first application to long after you land.
            </WordReveal>
            <a className="cine-cta" href={earlyAccessHref}>
              <WordReveal end={0.84} start={0.7}>Start free</WordReveal>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <article className="cine-panel cine-panel--a" id="journey">
            <WordReveal as="p" className="cine-kicker" end={0.14} start={0}>
              One system · every stage
            </WordReveal>
            <WordReveal as="h2" end={0.5} start={0.12}>
              The route changes. Your Atlas stays.
            </WordReveal>
            <WordReveal as="p" end={0.72} start={0.44}>
              Most platforms stop at admission. Atlas is designed around the full life you are trying to build.
            </WordReveal>
            <dl className="cine-facts">
              <div><WordReveal as="dt" end={0.76} start={0.65}>01</WordReveal><WordReveal as="dd" end={0.8} start={0.69}>Plan & apply</WordReveal></div>
              <div><WordReveal as="dt" end={0.82} start={0.71}>02</WordReveal><WordReveal as="dd" end={0.86} start={0.75}>Arrive & settle</WordReveal></div>
              <div><WordReveal as="dt" end={0.88} start={0.77}>03</WordReveal><WordReveal as="dd" end={0.92} start={0.81}>Build & thrive</WordReveal></div>
            </dl>
          </article>

          <article className="cine-panel cine-panel--b">
            <WordReveal as="p" className="cine-kicker" end={0.14} start={0}>
              The actual backbone
            </WordReveal>
            <WordReveal as="h2" end={0.5} start={0.12}>
              Everything you need. Already in order.
            </WordReveal>
            <WordReveal as="p" end={0.72} start={0.44}>
              You were going to buy these anyway. Atlas finds the student-ready option, explains the trade-offs, and tells you exactly how we get paid.
            </WordReveal>
          </article>

          <section
            aria-hidden="true"
            aria-labelledby="cine-catalog-title"
            className="cine-catalog"
            id="essentials"
            inert
          >
            <div className="cine-catalog__heading">
              <WordReveal as="p" className="cine-kicker" end={0.18} start={0}>
                Atlas essentials
              </WordReveal>
              <WordReveal as="h2" end={0.58} start={0.16}>
                Your arrival sequence.
              </WordReveal>
            </div>
            <ServiceRail reducedMotion={reducedMotion} services={services} />
          </section>
        </div>
      </section>
    </main>
  );
}
