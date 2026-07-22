"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";

import { clamp, getSceneState } from "@/components/landing-2/timeline";

interface CinematicOptions {
  reducedMotion: boolean;
  coarsePointer: boolean;
  ready?: boolean;
}

const format = (value: number) => String(Number(value.toFixed(4)));

export function setTimelineLayerInteractive(
  element: HTMLElement | null,
  enabled: boolean,
  fallback: HTMLElement | null,
) {
  if (!element) return;
  if (!enabled && element.contains(document.activeElement)) {
    fallback?.focus({ preventScroll: true });
  }
  element.inert = !enabled;
  element.toggleAttribute("inert", !enabled);
  if (enabled) element.removeAttribute("aria-hidden");
  else element.setAttribute("aria-hidden", "true");
}

export function useCinematicTimeline(
  sectionRef: RefObject<HTMLElement | null>,
  { reducedMotion, coarsePointer, ready = true }: CinematicOptions,
) {
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const geometryRef = useRef({ top: 0, travel: 1 });
  const frameRef = useRef<number | null>(null);
  const activeRef = useRef(true);
  const needsMeasureRef = useRef(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const interactiveLayersRef = useRef<{
    catalog: HTMLElement | null;
    catalogFallback: HTMLElement | null;
    intro: HTMLElement | null;
    introFallback: HTMLElement | null;
  }>({ catalog: null, catalogFallback: null, intro: null, introFallback: null });

  const writeScene = useCallback(
    (progress: number, pointerX: number, pointerY: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const scene = getSceneState(progress);
      const values: Record<string, string> = {
        "--scene-progress": format(progress),
        "--world-scale": format(scene.worldScale),
        "--world-brightness": format(scene.worldBrightness),
        "--world-saturation": format(scene.worldSaturation),
        "--flight-opacity": format(scene.flightOpacity),
        "--flight-scale": format(scene.flightScale),
        "--flight-y": `${format(scene.flightY)}vh`,
        "--university-opacity": format(scene.universityOpacity),
        "--university-scale": format(scene.universityScale),
        "--university-y": `${format(scene.universityY)}vh`,
        "--university-blur": `${format(scene.universityBlur)}px`,
        "--classroom-opacity": format(scene.classroomOpacity),
        "--classroom-scale": format(scene.classroomScale),
        "--classroom-reveal": format(scene.classroomReveal),
        "--video-opacity": format(scene.videoOpacity),
        "--shade-opacity": format(scene.shadeOpacity),
        "--intro-opacity": format(scene.introOpacity),
        "--intro-y": `${format(scene.introY)}px`,
        "--panel-a-opacity": format(scene.panelAOpacity),
        "--panel-a-y": `${format(scene.panelAY)}px`,
        "--panel-b-opacity": format(scene.panelBOpacity),
        "--panel-b-y": `${format(scene.panelBY)}px`,
        "--catalog-opacity": format(scene.catalogOpacity),
        "--catalog-y": `${format(scene.catalogY)}px`,
        "--controls-opacity": format(scene.controlsOpacity),
        "--pointer-x": format(pointerX),
        "--pointer-y": format(pointerY),
      };

      for (const [property, value] of Object.entries(values)) {
        section.style.setProperty(property, value);
      }
      const video = videoRef.current;
      if (video && video.readyState >= 1) {
        if (!reducedMotion && progress >= 0.995) {
          if (video.paused) void video.play().catch(() => undefined);
        } else {
          if (!video.paused) video.pause();
          if (Math.abs(video.currentTime - scene.videoTime) > 0.06) {
            video.currentTime = scene.videoTime;
          }
        }
      }
      setTimelineLayerInteractive(
        interactiveLayersRef.current.intro,
        reducedMotion || scene.introOpacity >= 0.5,
        interactiveLayersRef.current.introFallback,
      );
      setTimelineLayerInteractive(
        interactiveLayersRef.current.catalog,
        reducedMotion || progress >= 0.88,
        interactiveLayersRef.current.catalogFallback,
      );
      section.dataset.finalInteractive = progress >= 0.88 ? "true" : "false";
    },
    [reducedMotion, sectionRef],
  );

  const measure = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    interactiveLayersRef.current = {
      catalog: section.querySelector<HTMLElement>(".cine-catalog"),
      catalogFallback: section.querySelector<HTMLElement>(
        '[data-timeline-nav="essentials"]',
      ),
      intro: section.querySelector<HTMLElement>(".cine-intro"),
      introFallback: section.querySelector<HTMLElement>('[data-timeline-nav="start"]'),
    };
    videoRef.current = section.querySelector<HTMLVideoElement>(
      '[data-layer-role="30-classroom-video"]',
    );
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const height = Math.max(rect.height, section.offsetHeight);
    geometryRef.current = {
      top,
      travel: Math.max(height - window.innerHeight, 1),
    };
    needsMeasureRef.current = false;
  }, [sectionRef]);

  const updateTarget = useCallback(() => {
    const { top, travel } = geometryRef.current;
    targetProgressRef.current = clamp((window.scrollY - top) / travel);
  }, []);

  const renderFrameRef = useRef<(time: number) => void>(() => undefined);

  const requestFrame = useCallback(() => {
    if (frameRef.current !== null || !activeRef.current) return;
    frameRef.current = window.requestAnimationFrame(renderFrameRef.current);
  }, []);

  renderFrameRef.current = () => {
    frameRef.current = null;
    if (!activeRef.current) return;
    if (needsMeasureRef.current) measure();
    updateTarget();

    const target = targetProgressRef.current;
    const progressDelta = target - progressRef.current;
    progressRef.current = reducedMotion
      ? target
      : progressRef.current + progressDelta * 0.09;

    const pointerTarget = coarsePointer
      ? { x: 0, y: 0 }
      : pointerTargetRef.current;
    const pointer = pointerRef.current;
    pointer.x = reducedMotion
      ? 0
      : pointer.x + (pointerTarget.x - pointer.x) * 0.1;
    pointer.y = reducedMotion
      ? 0
      : pointer.y + (pointerTarget.y - pointer.y) * 0.1;

    writeScene(progressRef.current, pointer.x, pointer.y);

    const moving =
      Math.abs(target - progressRef.current) > 0.0005 ||
      Math.abs(pointerTarget.x - pointer.x) > 0.001 ||
      Math.abs(pointerTarget.y - pointer.y) > 0.001;
    if (moving) requestFrame();
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => requestFrame();
    const onResize = () => {
      needsMeasureRef.current = true;
      requestFrame();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (coarsePointer || reducedMotion) return;
      pointerTargetRef.current = {
        x: clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1),
        y: clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1),
      };
      requestFrame();
    };

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        activeRef.current = entry.isIntersecting;
        if (entry.isIntersecting) requestFrame();
      });
      observer.observe(section);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    needsMeasureRef.current = true;
    writeScene(0, 0, 0);
    requestFrame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      observer?.disconnect();
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [coarsePointer, measure, reducedMotion, requestFrame, sectionRef, writeScene]);

  useEffect(() => {
    if (!ready) return;
    needsMeasureRef.current = true;
    requestFrame();
  }, [ready, requestFrame]);

  const jumpToMarker = useCallback(
    (progress: number) => {
      if (needsMeasureRef.current) measure();
      const { top, travel } = geometryRef.current;
      window.scrollTo({
        top: top + clamp(progress) * travel,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [measure, reducedMotion],
  );

  return { jumpToMarker, progressRef };
}
