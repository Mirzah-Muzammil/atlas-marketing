import { describe, expect, it } from "vitest";

import {
  clamp,
  getSceneState,
  lerp,
  rangeProgress,
  segmentInOut,
  smoothstep,
} from "@/components/landing-2/timeline";

describe("landing-2 timeline helpers", () => {
  it("clamps and interpolates deterministic values", () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(lerp(10, 30, 0.25)).toBe(15);
    expect(rangeProgress(0.2, 0.1, 0.3)).toBeCloseTo(0.5);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5);
  });

  it("creates reversible enter-hold-exit envelopes", () => {
    expect(segmentInOut(0.1, 0.2, 0.3, 0.5, 0.6)).toBe(0);
    expect(segmentInOut(0.4, 0.2, 0.3, 0.5, 0.6)).toBe(1);
    expect(segmentInOut(0.6, 0.2, 0.3, 0.5, 0.6)).toBe(0);
  });

  it.each([0, 0.18, 0.27, 0.44, 0.58, 0.74, 0.9, 1])(
    "returns finite values at checkpoint %s",
    (progress) => {
      Object.values(getSceneState(progress)).forEach((value) => {
        expect(Number.isFinite(value)).toBe(true);
      });
    },
  );

  it("keeps only the intended narrative visible at each hold", () => {
    expect(getSceneState(0).introOpacity).toBe(1);
    expect(getSceneState(0.3).panelAOpacity).toBeGreaterThan(0.9);
    expect(getSceneState(0.44).panelAOpacity).toBeLessThan(0.05);
    expect(getSceneState(0.6).panelBOpacity).toBeGreaterThan(0.9);
    expect(getSceneState(0.74).panelBOpacity).toBeLessThan(0.05);
    expect(getSceneState(0.9).controlsOpacity).toBeGreaterThan(0.6);
    expect(getSceneState(1).catalogOpacity).toBe(1);
  });

  it("moves from flight window through aerial campus and its window into the classroom", () => {
    const flight = getSceneState(0);
    const campus = getSceneState(0.34);
    const classroom = getSceneState(0.72);

    expect(flight.flightOpacity).toBe(1);
    expect(flight.universityOpacity).toBe(0);
    expect(flight.classroomOpacity).toBe(0);

    expect(campus.flightOpacity).toBeLessThan(0.05);
    expect(campus.universityOpacity).toBeGreaterThan(0.95);
    expect(campus.classroomOpacity).toBe(0);

    expect(classroom.universityOpacity).toBeLessThan(0.05);
    expect(classroom.classroomOpacity).toBeGreaterThan(0.95);
    expect(classroom.universityScale).toBeGreaterThan(1.4);
    expect(classroom.videoOpacity).toBeGreaterThan(0.95);
  });
});
