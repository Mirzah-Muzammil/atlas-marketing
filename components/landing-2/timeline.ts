import { progressToFrameIndex } from "@/components/landing-2/frame-sequence";

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * clamp(amount);

export function rangeProgress(value: number, start: number, end: number) {
  if (start === end) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start));
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const t = rangeProgress(value, edge0, edge1);
  return t * t * (3 - 2 * t);
}

export function segmentInOut(
  value: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) {
  return Math.min(
    smoothstep(enterStart, enterEnd, value),
    1 - smoothstep(exitStart, exitEnd, value),
  );
}

export interface SceneState {
  frameIndex: number;
  shadeOpacity: number;
  introOpacity: number;
  introReveal: number;
  introY: number;
  panelAOpacity: number;
  panelAReveal: number;
  panelAY: number;
  panelBOpacity: number;
  panelBReveal: number;
  panelBY: number;
  catalogOpacity: number;
  catalogReveal: number;
  catalogY: number;
  controlsOpacity: number;
}

export function getSceneState(progress: number): SceneState {
  const p = clamp(progress);
  const introExit = smoothstep(0.04, 0.18, p);
  const panelAOpacity = segmentInOut(p, 0.22, 0.27, 0.35, 0.44);
  const panelBOpacity = segmentInOut(p, 0.48, 0.58, 0.68, 0.72);
  const catalogEntry = smoothstep(0.79, 0.93, p);
  const travelingShade = lerp(0.26, 0.14, smoothstep(0.1, 0.22, p));

  return {
    frameIndex: progressToFrameIndex(p),
    shadeOpacity: Math.max(
      travelingShade,
      panelAOpacity * 0.4,
      panelBOpacity * 0.42,
      catalogEntry * 0.48,
    ),
    introOpacity: 1 - introExit,
    introReveal: 1 - introExit,
    introY: 0,
    panelAOpacity,
    panelAReveal: panelAOpacity,
    panelAY: 0,
    panelBOpacity,
    panelBReveal: panelBOpacity,
    panelBY: 0,
    catalogOpacity: catalogEntry,
    catalogReveal: catalogEntry,
    catalogY: lerp(74, 0, catalogEntry),
    controlsOpacity: smoothstep(0.86, 0.92, p),
  };
}
