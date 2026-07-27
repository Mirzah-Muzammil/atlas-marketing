# Landing 2 Scroll Frame Sequence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/landing-2`'s layered still/video world with a reversible 12 fps WebP frame sequence drawn to canvas and shaded by a timeline-controlled black readability layer.

**Architecture:** FFmpeg extracts approximately 379 route-local WebP frames from the supplied 31.59-second MP4. Pure helpers own frame paths, progress mapping, and cover geometry; a focused React hook owns progressive image loading and canvas drawing; the existing local-scroll hook owns only timeline progress and requests the required frame.

**Tech Stack:** Next.js 15, React 19, TypeScript, HTML canvas, CSS custom properties, FFmpeg, Vitest, Testing Library, Playwright.

## Global Constraints

- Modify only `/landing-2` route files, `components/landing-2`, its focused tests/E2E spec, route documentation, and `/public/images/landing-2/sequence`.
- Preserve existing copy, navigation targets, and service-rail interactions.
- Extract at 12 fps and 1280×720 WebP; do not ship the source MP4 or all 757 frames.
- Do not add a framework or animation dependency.
- Keep reduced-motion content and interactions available in normal flow.
- Do not create a git commit.

---

### Task 1: Define and generate the frame sequence

**Files:**
- Create: `components/landing-2/frame-sequence.ts`
- Modify: `tests/landing-2-timeline.test.ts`
- Create: `public/images/landing-2/sequence/frame-0001.webp` through the final frame

**Interfaces:**
- Produces: `FRAME_SEQUENCE`, `framePath(index)`, `progressToFrameIndex(progress)`, and `getCoverDrawRect(...)`.

- [ ] **Step 1: Write failing tests for the sequence contract**

Add assertions that progress `0`, `0.5`, and `1` map to frame indices `0`, midpoint, and `FRAME_SEQUENCE.count - 1`; frame paths are one-based and zero-padded; cover geometry fills portrait and landscape targets without stretching.

- [ ] **Step 2: Run the focused timeline test and verify RED**

Run: `npm test -- tests/landing-2-timeline.test.ts`

Expected: FAIL because `frame-sequence.ts` and its exports do not exist.

- [ ] **Step 3: Implement the pure frame helpers**

Use this public contract:

```ts
export const FRAME_SEQUENCE = {
  count: 379,
  width: 1280,
  height: 720,
  directory: "/images/landing-2/sequence",
} as const;

export function framePath(index: number): string;
export function progressToFrameIndex(progress: number): number;
export function getCoverDrawRect(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
): { x: number; y: number; width: number; height: number };
```

- [ ] **Step 4: Run the focused timeline test and verify GREEN**

Run: `npm test -- tests/landing-2-timeline.test.ts`

Expected: PASS.

- [ ] **Step 5: Extract and inspect the optimized assets**

Run FFmpeg against `/Users/mirzah/Downloads/Initial_Scene_-_2026-07-27_202607271802.mp4` with `fps=12`, 1280×720 output, WebP picture preset, and a tuned quality setting. Confirm exactly 379 frames, inspect a contact sheet containing the aircraft, clouds, aerial campus, gate, corridor, and classroom, and record total bytes.

### Task 2: Add the canvas sequence renderer

**Files:**
- Create: `components/landing-2/useFrameSequenceCanvas.ts`
- Modify: `components/landing-2/CinematicLanding.tsx`
- Modify: `tests/landing-2.test.tsx`

**Interfaces:**
- Consumes: `framePath`, `FRAME_SEQUENCE`, and `getCoverDrawRect`.
- Produces: `useFrameSequenceCanvas(canvasRef, options)` returning `{ ready, renderFrame }`, where `renderFrame(index: number): void` is stable.

- [ ] **Step 1: Write a failing component contract test**

Require exactly one decorative canvas with `data-layer-role="00-frame-sequence"`, width `1280`, height `720`, and a black layer with `data-layer-role="10-black-readability"`. Assert that the legacy flight, campus, classroom, and classroom-video roles are absent.

- [ ] **Step 2: Run the component test and verify RED**

Run: `npm test -- tests/landing-2.test.tsx`

Expected: FAIL because the page still renders the legacy image/video layers.

- [ ] **Step 3: Implement progressive canvas loading**

The hook loads frame zero first, calls `onReady` after it draws, keeps the latest successful frame during misses, prioritizes the requested frame plus a bounded nearby window, limits concurrent loads, and redraws after a `ResizeObserver` update. Keep only a bounded decoded-frame cache to avoid retaining the full raw sequence in memory.

- [ ] **Step 4: Replace the visual layer markup**

Remove Next Image and the classroom video from `CinematicLanding.tsx`. Render the canvas, atmosphere/grain, and one explicit black readability layer. Drive the existing readiness attribute from the canvas hook with the existing safety timeout as a fallback.

- [ ] **Step 5: Run the component test and verify GREEN**

Run: `npm test -- tests/landing-2.test.tsx`

Expected: PASS with no React or accessibility warnings.

### Task 3: Connect local scroll progress to frames and text shading

**Files:**
- Modify: `components/landing-2/timeline.ts`
- Modify: `components/landing-2/useCinematicTimeline.ts`
- Modify: `app/landing-2/landing-2.css`
- Modify: `tests/landing-2-timeline.test.ts`

**Interfaces:**
- `SceneState` produces `frameIndex`, `shadeOpacity`, and the existing semantic text/catalog animation values.
- `useCinematicTimeline` consumes `renderFrame(frameIndex)` through its options.

- [ ] **Step 1: Write failing timeline assertions**

Assert monotonic and reversible frame indices across the eight checkpoints. Assert black opacity is restrained at the hero, lower during clean visual travel, stronger during narrative holds, and strongest in the final catalog state.

- [ ] **Step 2: Run the timeline test and verify RED**

Run: `npm test -- tests/landing-2-timeline.test.ts`

Expected: FAIL because `SceneState.frameIndex` and the new shade curve are absent.

- [ ] **Step 3: Implement the minimal timeline and scroll integration**

Delete legacy plate transform/video-time values from `SceneState` and CSS property writes. Map clamped progress through `progressToFrameIndex`, call `renderFrame` only when the requested index changes, preserve local scroll measurement and non-reduced smoothing, and remove pointer parallax from the visual world.

- [ ] **Step 4: Simplify the route CSS**

Make the canvas fill the stage, use a pure black shade layer, remove legacy plate/window selectors, keep text/card positioning, and update reduced-motion selectors so frame zero remains static above normal-flow content.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `npm test -- tests/landing-2-timeline.test.ts tests/landing-2.test.tsx`

Expected: all focused tests PASS.

### Task 4: Browser verification and handoff documentation

**Files:**
- Modify: `e2e/landing-2.spec.ts`
- Modify: `app/landing-2/ASSET_MANIFEST.md`
- Modify: `app/landing-2/TIMELINE.md`
- Modify: `app/landing-2/README.md`

**Interfaces:**
- Verifies the canvas `data-frame-index`, route readiness, reversal, black overlay, accessibility, and responsive behavior.

- [ ] **Step 1: Update E2E assertions**

Replace legacy CSS-variable checks with canvas frame-index checks at all eight checkpoints. Verify indices increase downward, decrease upward, remain within `0..378`, and canvas pixels stay present while the route is ready.

- [ ] **Step 2: Run static verification**

Run:

```bash
npm test -- tests/landing-2-timeline.test.ts tests/landing-2.test.tsx
npm run typecheck
npx eslint app/landing-2 components/landing-2 tests/landing-2-timeline.test.ts tests/landing-2.test.tsx e2e/landing-2.spec.ts
npm run build
```

Expected: focused tests, typecheck, scoped lint, and production build all pass; unrelated existing warnings are reported separately.

- [ ] **Step 3: Run browser verification**

Run: `npx playwright test e2e/landing-2.spec.ts --workers=1`

Expected: desktop and mobile projects pass frame progression/reversal, overflow, keyboard rail, reduced motion, and console checks.

- [ ] **Step 4: Inspect visual checkpoints**

Inspect screenshots at `0.00`, `0.18`, `0.27`, `0.44`, `0.58`, `0.74`, `0.90`, and `1.00` plus portrait hero/final captures. Confirm no blank canvas, text collision, stretched footage, or insufficient contrast.

- [ ] **Step 5: Update route documentation**

Record source metadata, 12 fps frame count and total size, frame role/anchor, black-layer behavior, timeline mapping, run commands, and measured verification results. List no placeholder if every generated frame is present.
