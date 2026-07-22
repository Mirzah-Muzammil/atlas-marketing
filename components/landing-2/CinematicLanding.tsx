"use client";

import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import {
  earlyAccessHref,
  sceneMarkers,
  services,
} from "@/components/landing-2/scene-data";
import { ServiceRail } from "@/components/landing-2/ServiceRail";
import { useCinematicTimeline } from "@/components/landing-2/useCinematicTimeline";

export function CinematicLanding() {
  const sectionRef = useRef<HTMLElement>(null);
  const flightRef = useRef<HTMLImageElement>(null);
  const aerialRef = useRef<HTMLImageElement>(null);
  const classroomRef = useRef<HTMLImageElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const { jumpToMarker } = useCinematicTimeline(sectionRef, {
    reducedMotion,
    coarsePointer,
    ready: sceneReady,
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
    let active = true;
    const timeout = window.setTimeout(() => {
      if (active) setSceneReady(true);
    }, 2200);
    const images = [flightRef.current, aerialRef.current, classroomRef.current].filter(
      (image): image is HTMLImageElement => image !== null,
    );
    const decodes = images.map((image) =>
      typeof image.decode === "function" ? image.decode().catch(() => undefined) : Promise.resolve(),
    );
    Promise.all(decodes).then(() => {
      if (!active) return;
      window.clearTimeout(timeout);
      setSceneReady(true);
    });

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, []);

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
            <video
              className="cine-layer cine-layer--classroom-video"
              data-layer-role="30-classroom-video"
              loop
              muted
              playsInline
              poster="/images/landing-2/classroom-interior.webp"
              preload="metadata"
              src="/videos/atlas-student-study.mp4"
            />
            <Image
              alt=""
              className="cine-layer cine-layer--classroom"
              data-layer-role="20-classroom-interior"
              height={1024}
              ref={classroomRef}
              sizes="100vw"
              src="/images/landing-2/classroom-interior.webp"
              width={1536}
            />
            <Image
              alt=""
              className="cine-layer cine-layer--university"
              data-layer-role="10-campus-aerial"
              height={1024}
              ref={aerialRef}
              sizes="100vw"
              src="/images/landing-2/campus-aerial.webp"
              width={1536}
            />
            <Image
              alt=""
              className="cine-layer cine-layer--flight"
              data-layer-role="00-flight-window"
              height={1024}
              priority
              ref={flightRef}
              sizes="100vw"
              src="/images/landing-2/flight-window.webp"
              width={1536}
            />
            <div className="cine-layer cine-flight-frame" />
            <div className="cine-layer cine-layer--atmosphere" />
            <div className="cine-layer cine-layer--grain" />
          </div>

          <div aria-hidden="true" className="cine-shade" />

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
            <p className="cine-kicker">Free, end to end</p>
            <h1>Your operating system for studying and succeeding abroad.</h1>
            <p className="cine-lede">
              Match universities. Sort your services. Settle in. Then build a life.
              One personal system from your first application to long after you land.
            </p>
            <a className="cine-cta" href={earlyAccessHref}>
              Start free <span aria-hidden="true">↗</span>
            </a>
          </div>

          <article className="cine-panel cine-panel--a" id="journey">
            <p className="cine-kicker">One system · every stage</p>
            <h2>The route changes. Your Atlas stays.</h2>
            <p>
              Most platforms stop at admission. Atlas is designed around the full life
              you are trying to build.
            </p>
            <dl className="cine-facts">
              <div><dt>01</dt><dd>Plan & apply</dd></div>
              <div><dt>02</dt><dd>Arrive & settle</dd></div>
              <div><dt>03</dt><dd>Build & thrive</dd></div>
            </dl>
          </article>

          <article className="cine-panel cine-panel--b">
            <p className="cine-kicker">The actual backbone</p>
            <h2>Everything you need. Already in order.</h2>
            <p>
              You were going to buy these anyway. Atlas finds the student-ready option,
              explains the trade-offs, and tells you exactly how we get paid.
            </p>
          </article>

          <section
            aria-hidden="true"
            aria-labelledby="cine-catalog-title"
            className="cine-catalog"
            id="essentials"
            inert
          >
            <div className="cine-catalog__heading">
              <p className="cine-kicker">Atlas essentials</p>
              <h2 id="cine-catalog-title">Your arrival sequence.</h2>
            </div>
            <ServiceRail reducedMotion={reducedMotion} services={services} />
          </section>
        </div>
      </section>
    </main>
  );
}
