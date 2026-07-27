import { describe, expect, it } from "vitest";

import {
  FRAME_SEQUENCE,
  framePath,
  getCoverDrawRect,
  progressToFrameIndex,
} from "@/components/landing-2/frame-sequence";
import {
  clamp,
  getSceneState,
  lerp,
  rangeProgress,
  segmentInOut,
  smoothstep,
} from "@/components/landing-2/timeline";

describe("landing-2 timeline helpers", () => {
  it("maps scroll progress to bounded reversible frame indices", () => {
    expect(progressToFrameIndex(-1)).toBe(0);
    expect(progressToFrameIndex(0)).toBe(0);
    expect(progressToFrameIndex(0.5)).toBe(189);
    expect(progressToFrameIndex(1)).toBe(378);
    expect(progressToFrameIndex(2)).toBe(378);
  });

  it("builds stable one-based frame URLs", () => {
    expect(framePath(0)).toBe("/images/landing-2/sequence/frame-0001.webp");
    expect(framePath(FRAME_SEQUENCE.count - 1)).toBe(
      "/images/landing-2/sequence/frame-0379.webp",
    );
  });

  it("cover-fills landscape and portrait canvases without stretching", () => {
    expect(getCoverDrawRect(1280, 720, 1440, 900)).toEqual({
      x: -80,
      y: 0,
      width: 1600,
      height: 900,
    });
    const portrait = getCoverDrawRect(1280, 720, 390, 844);
    expect(portrait.x).toBeCloseTo(-555.2222);
    expect(portrait.y).toBe(0);
    expect(portrait.width).toBeCloseTo(1500.4444);
    expect(portrait.height).toBe(844);
  });

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

  it("provides reversible word-reveal progress for every narrative beat", () => {
    expect(getSceneState(0).introReveal).toBe(1);
    expect(getSceneState(0.18).introReveal).toBe(0);

    expect(getSceneState(0.22).panelAReveal).toBe(0);
    expect(getSceneState(0.3).panelAReveal).toBe(1);
    expect(getSceneState(0.44).panelAReveal).toBe(0);

    expect(getSceneState(0.48).panelBReveal).toBe(0);
    expect(getSceneState(0.6).panelBReveal).toBe(1);
    expect(getSceneState(0.74).panelBReveal).toBe(0);

    expect(getSceneState(0.79).catalogReveal).toBe(0);
    expect(getSceneState(1).catalogReveal).toBe(1);
  });

  it("maps every narrative checkpoint to the same reversible frame", () => {
    const checkpoints = [0, 0.18, 0.27, 0.44, 0.58, 0.74, 0.9, 1];
    const expected = [0, 68, 102, 166, 219, 280, 340, 378];

    expect(checkpoints.map((progress) => getSceneState(progress).frameIndex)).toEqual(
      expected,
    );
    expect(
      [...checkpoints]
        .reverse()
        .map((progress) => getSceneState(progress).frameIndex),
    ).toEqual([...expected].reverse());
  });

  it("darkens the real footage only when semantic text needs contrast", () => {
    expect(getSceneState(0).shadeOpacity).toBeGreaterThanOrEqual(0.2);
    expect(getSceneState(0.2).shadeOpacity).toBeLessThan(0.2);
    expect(getSceneState(0.3).shadeOpacity).toBeGreaterThanOrEqual(0.34);
    expect(getSceneState(0.6).shadeOpacity).toBeGreaterThanOrEqual(0.38);
    expect(getSceneState(1).shadeOpacity).toBeGreaterThanOrEqual(0.46);
  });
});
