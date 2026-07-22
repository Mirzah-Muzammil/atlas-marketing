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
  worldScale: number;
  worldBrightness: number;
  worldSaturation: number;
  flightOpacity: number;
  flightScale: number;
  flightY: number;
  universityOpacity: number;
  universityScale: number;
  universityY: number;
  universityBlur: number;
  classroomOpacity: number;
  classroomScale: number;
  classroomReveal: number;
  videoOpacity: number;
  videoTime: number;
  shadeOpacity: number;
  introOpacity: number;
  introY: number;
  panelAOpacity: number;
  panelAY: number;
  panelBOpacity: number;
  panelBY: number;
  catalogOpacity: number;
  catalogY: number;
  controlsOpacity: number;
}

export function getSceneState(progress: number): SceneState {
  const p = clamp(progress);
  const introExit = smoothstep(0.04, 0.18, p);
  const flightPush = smoothstep(0.04, 0.23, p);
  const flightExit = smoothstep(0.18, 0.27, p);
  const universityEnter = smoothstep(0.13, 0.25, p);
  const universityPush = smoothstep(0.28, 0.7, p);
  const universityExit = smoothstep(0.61, 0.72, p);
  const classroomEnter = smoothstep(0.57, 0.71, p);
  const panelAOpacity = segmentInOut(p, 0.22, 0.27, 0.35, 0.44);
  const panelBOpacity = segmentInOut(p, 0.48, 0.58, 0.68, 0.72);
  const catalogEntry = smoothstep(0.79, 0.93, p);

  return {
    worldScale: 1,
    worldBrightness: 1 - panelBOpacity * 0.1 - catalogEntry * 0.16,
    worldSaturation: 1 - panelBOpacity * 0.08 - catalogEntry * 0.12,
    flightOpacity: 1 - flightExit,
    flightScale: lerp(1.02, 2.9, flightPush),
    flightY: lerp(0, 2.5, flightPush),
    universityOpacity: universityEnter * (1 - universityExit),
    universityScale: lerp(1.01, 5.2, universityPush),
    universityY: lerp(0, 10, universityPush),
    universityBlur: universityExit * 1.8,
    classroomOpacity: classroomEnter,
    classroomScale: lerp(1.08, 1.01, classroomEnter),
    classroomReveal: classroomEnter,
    videoOpacity: classroomEnter,
    videoTime: lerp(0, 14.7, smoothstep(0.66, 1, p)),
    shadeOpacity: panelAOpacity * 0.2 + panelBOpacity * 0.24 + catalogEntry * 0.46,
    introOpacity: 1 - introExit,
    introY: lerp(0, -28, introExit),
    panelAOpacity,
    panelAY: lerp(22, 0, panelAOpacity),
    panelBOpacity,
    panelBY: lerp(22, 0, panelBOpacity),
    catalogOpacity: catalogEntry,
    catalogY: lerp(74, 0, catalogEntry),
    controlsOpacity: smoothstep(0.86, 0.92, p),
  };
}
