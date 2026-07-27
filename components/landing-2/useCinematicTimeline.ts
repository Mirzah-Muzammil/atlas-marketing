"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";

import { clamp, getSceneState } from "@/components/landing-2/timeline";

interface CinematicOptions {
  reducedMotion: boolean;
  coarsePointer: boolean;
  ready?: boolean;
  renderFrame?: (index: number) => void;
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
  { reducedMotion, ready = true, renderFrame }: CinematicOptions,
) {
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const geometryRef = useRef({ top: 0, travel: 1 });
  const frameRef = useRef<number | null>(null);
  const renderedSequenceFrameRef = useRef(-1);
  const activeRef = useRef(true);
  const needsMeasureRef = useRef(true);
  const interactiveLayersRef = useRef<{
    catalog: HTMLElement | null;
    catalogFallback: HTMLElement | null;
    intro: HTMLElement | null;
    introFallback: HTMLElement | null;
  }>({ catalog: null, catalogFallback: null, intro: null, introFallback: null });

  const writeScene = useCallback(
    (progress: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const scene = getSceneState(progress);
      const values: Record<string, string> = {
        "--scene-progress": format(progress),
        "--frame-index": String(scene.frameIndex),
        "--shade-opacity": format(scene.shadeOpacity),
        "--intro-opacity": format(scene.introOpacity),
        "--intro-reveal": format(scene.introReveal),
        "--intro-y": `${format(scene.introY)}px`,
        "--panel-a-opacity": format(scene.panelAOpacity),
        "--panel-a-reveal": format(scene.panelAReveal),
        "--panel-a-y": `${format(scene.panelAY)}px`,
        "--panel-b-opacity": format(scene.panelBOpacity),
        "--panel-b-reveal": format(scene.panelBReveal),
        "--panel-b-y": `${format(scene.panelBY)}px`,
        "--catalog-opacity": format(scene.catalogOpacity),
        "--catalog-reveal": format(scene.catalogReveal),
        "--catalog-y": `${format(scene.catalogY)}px`,
        "--controls-opacity": format(scene.controlsOpacity),
      };

      for (const [property, value] of Object.entries(values)) {
        section.style.setProperty(property, value);
      }
      if (scene.frameIndex !== renderedSequenceFrameRef.current) {
        renderFrame?.(scene.frameIndex);
        renderedSequenceFrameRef.current = scene.frameIndex;
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
    [reducedMotion, renderFrame, sectionRef],
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
    progressRef.current = target;

    writeScene(progressRef.current);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => requestFrame();
    const onResize = () => {
      needsMeasureRef.current = true;
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
    needsMeasureRef.current = true;
    writeScene(0);
    requestFrame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [measure, requestFrame, sectionRef, writeScene]);

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
