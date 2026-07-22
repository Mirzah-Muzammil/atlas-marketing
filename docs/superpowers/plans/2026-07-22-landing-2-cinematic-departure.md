# Atlas `/landing-2` Cinematic Departure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality `/landing-2` route as one reversible, scroll-driven airport scene with two narrative beats and an accessible final service catalog.

**Architecture:** A route-scoped Next.js page renders one client scene component. A pure timing module owns deterministic interpolation; a small hook caches section geometry and writes CSS custom properties through `requestAnimationFrame`; CSS owns final layer transforms, focus effects, and responsive/reduced-motion presentation. Copy, assets, and timeline markers remain data-driven and separate from the motion calculations.

**Tech Stack:** Next.js 15, React 19, TypeScript 5.9, route-scoped CSS, Vitest/Testing Library, Playwright, native Pointer Events and `requestAnimationFrame`.

## Global Constraints

- Reuse only written copy and service information from `/landing`; do not reuse its palette, typography, layouts, components, or motion ideas.
- Add no framework or animation dependency.
- Keep unrelated `/landing` and `/premium` worktree changes untouched.
- Use a sticky `100svh` stage inside one long cinematic section with z-index bands `0–9`, `10–19`, `20–29`, `30–39`, and `40+`.
- Derive normalized progress from the local cinematic section, cache geometry, and stop rendering after values converge.
- Keep all content available in a genuine reduced-motion normal-flow mode.
- Keep the final rail usable by pointer, touch, keyboard, and visible focus with polite active-position announcements.
- Document all supplied visual roles, dimensions, anchors, depth, and missing production layers.

---

## File Structure

- Create `app/landing-2/page.tsx`: route metadata and server entry.
- Create `app/landing-2/layout.tsx`: route-scoped wrapper and stylesheet import.
- Create `app/landing-2/landing-2.css`: tokens, world composition, timeline variable consumption, responsive behavior, focus, loading, and reduced motion.
- Create `components/landing-2/scene-data.ts`: editable copy, service data, asset manifest objects, and normalized marker values.
- Create `components/landing-2/timeline.ts`: pure clamp/interpolation and scene-state functions.
- Create `components/landing-2/useCinematicTimeline.ts`: geometry caching, event invalidation, pointer smoothing, visibility pausing, and CSS-variable writes.
- Create `components/landing-2/ServiceRail.tsx`: bounded previous/next controls, drag/swipe, keyboard, live region, and service links.
- Create `components/landing-2/CinematicLanding.tsx`: semantic stage/layer markup, navigation marker jumps, loading readiness, and composition.
- Create `tests/landing-2-timeline.test.ts`: exact timing-helper and checkpoint-state tests.
- Create `tests/landing-2.test.tsx`: route semantics, content, controls, navigation, and accessibility tests.
- Create `e2e/landing-2.spec.ts`: responsive overflow, progress markers, keyboard, reverse-scroll, reduced-motion, and console checks.
- Create `app/landing-2/README.md`: local run command, file map, QA results, and production notes.
- Create `app/landing-2/ASSET_MANIFEST.md`: role, dimensions, alpha, visible bounds, anchors, and depth.
- Create `app/landing-2/TIMELINE.md`: readable timing map and retiming instructions.

---

### Task 1: Deterministic Timeline Model

**Files:**
- Create: `components/landing-2/timeline.ts`
- Create: `tests/landing-2-timeline.test.ts`

**Interfaces:**
- Produces: `clamp(value, min?, max?)`, `lerp(start, end, amount)`, `smoothstep(edge0, edge1, value)`, `rangeProgress(value, start, end)`, `segmentInOut(value, enterStart, enterEnd, exitStart, exitEnd)`, and `getSceneState(progress)`.
- `getSceneState` returns numeric fields `worldScale`, `worldX`, `worldY`, `worldBlur`, `worldBrightness`, `worldSaturation`, `shadeOpacity`, `introOpacity`, `introY`, `portalLeftX`, `portalRightX`, `portalOpacity`, `phoneX`, `phoneY`, `phoneScale`, `phoneRotate`, `phoneOpacity`, `panelAOpacity`, `panelAY`, `panelBOpacity`, `panelBY`, `catalogOpacity`, `catalogY`, and `controlsOpacity`.

- [ ] **Step 1: Write failing helper and checkpoint tests**

```ts
import { describe, expect, it } from "vitest";
import {
  clamp,
  lerp,
  rangeProgress,
  segmentInOut,
  smoothstep,
  getSceneState,
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
    expect(getSceneState(1).catalogOpacity).toBe(1);
  });
});
```

- [ ] **Step 2: Run the targeted test and confirm the module is missing**

Run: `npm test -- tests/landing-2-timeline.test.ts`

Expected: FAIL because `@/components/landing-2/timeline` does not exist.

- [ ] **Step 3: Implement the pure helpers and scene state**

```ts
export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * clamp(amount);

export function smoothstep(edge0: number, edge1: number, value: number) {
  const t = rangeProgress(value, edge0, edge1);
  return t * t * (3 - 2 * t);
}

export function rangeProgress(value: number, start: number, end: number) {
  if (start === end) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start));
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
```

Implement `getSceneState` by composing those helpers against the approved timeline ranges; clamp its input first so reverse scrolling produces exactly the same values.

- [ ] **Step 4: Run the timeline tests**

Run: `npm test -- tests/landing-2-timeline.test.ts`

Expected: 4 tests PASS.

- [ ] **Step 5: Commit the timeline model**

```bash
git add components/landing-2/timeline.ts tests/landing-2-timeline.test.ts
git commit -m "feat: add landing 2 cinematic timeline"
```

---

### Task 2: Route Data and Semantic Scene Shell

**Files:**
- Create: `components/landing-2/scene-data.ts`
- Create: `components/landing-2/CinematicLanding.tsx`
- Create: `app/landing-2/page.tsx`
- Create: `app/landing-2/layout.tsx`
- Create: `app/landing-2/landing-2.css`
- Create: `tests/landing-2.test.tsx`

**Interfaces:**
- Consumes: `getSceneState` types from Task 1.
- Produces: `services`, `sceneMarkers`, `criticalAssets`, `CinematicLanding`, and route `/landing-2`.
- `sceneMarkers` is `{ start: 0, journey: 0.27, essentials: 0.9 }`.
- Critical assets are `/images/normal/cta-departure-v2.jpg` at `1536×1024` and `/images/normal/phone-hand.png` at `1086×1448`.

- [ ] **Step 1: Write the failing semantic route test**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import Landing2Page from "@/app/landing-2/page";

it("renders one cinematic world with landing copy and real anchors", () => {
  const { container } = render(<Landing2Page />);
  expect(container.querySelector("[data-cinematic-scroll]")).not.toBeNull();
  expect(container.querySelectorAll("[data-cinematic-stage]")).toHaveLength(1);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your operating system for studying and succeeding abroad",
  );
  expect(screen.getByRole("heading", { name: /the route changes/i })).toBeVisible();
  expect(screen.getByRole("heading", { name: /everything you need/i })).toBeVisible();
  expect(screen.getAllByRole("link", { name: /start free/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: "Journey" })).toHaveAttribute("href", "#journey");
  expect(screen.getByRole("link", { name: "Essentials" })).toHaveAttribute("href", "#essentials");
});
```

- [ ] **Step 2: Run the route test and confirm it fails**

Run: `npm test -- tests/landing-2.test.tsx`

Expected: FAIL because `@/app/landing-2/page` does not exist.

- [ ] **Step 3: Add data and semantic markup**

Create service objects with the exact eight `/landing` names, copy, notes, and matching existing image paths. Render:

```tsx
<main id="main-content" className="cine-page">
  <section ref={sectionRef} className="cine-scroll" data-cinematic-scroll>
    <div className="cine-stage" data-cinematic-stage>
      <div className="cine-world" aria-hidden="true">{/* aligned visual layers */}</div>
      <header className="cine-nav">{/* Atlas, Start, Journey, Essentials */}</header>
      <div className="cine-intro">{/* h1, lead, Start free */}</div>
      <article id="journey" className="cine-panel cine-panel--a">{/* narrative A */}</article>
      <article className="cine-panel cine-panel--b">{/* narrative B */}</article>
      <section id="essentials" className="cine-catalog">{/* ServiceRail in Task 4 */}</section>
    </div>
  </section>
</main>
```

Use decorative `alt=""`, explicit image `width`/`height`, and no image-baked UI. Add minimal route CSS so all semantic content is visible before motion enhancement.

- [ ] **Step 4: Run the route test**

Run: `npm test -- tests/landing-2.test.tsx`

Expected: semantic route test PASS.

- [ ] **Step 5: Commit the route shell**

```bash
git add app/landing-2 components/landing-2/scene-data.ts components/landing-2/CinematicLanding.tsx tests/landing-2.test.tsx
git commit -m "feat: add landing 2 cinematic scene shell"
```

---

### Task 3: Local Scroll Engine and Layer Choreography

**Files:**
- Create: `components/landing-2/useCinematicTimeline.ts`
- Modify: `components/landing-2/CinematicLanding.tsx`
- Modify: `app/landing-2/landing-2.css`
- Modify: `tests/landing-2.test.tsx`

**Interfaces:**
- Consumes: `getSceneState(progress)` and `sceneMarkers`.
- Produces: `useCinematicTimeline(sectionRef, options)` returning `{ jumpToMarker, progressRef }`.
- `jumpToMarker(progress)` maps the local progress to `sectionTop + progress * travel` and honors reduced motion.

- [ ] **Step 1: Add failing structural motion tests**

```tsx
it("exposes deterministic scene variables and marker controls", () => {
  const { container } = render(<Landing2Page />);
  const section = container.querySelector<HTMLElement>("[data-cinematic-scroll]")!;
  expect(section.style.getPropertyValue("--scene-progress")).toBe("0");
  fireEvent.click(screen.getByRole("link", { name: "Journey" }));
  expect(window.scrollTo).toHaveBeenCalled();
});

it("uses explicit foreground placeholder roles", () => {
  const { container } = render(<Landing2Page />);
  expect(container.querySelector('[data-layer-role="40-foreground-left"]')).not.toBeNull();
  expect(container.querySelector('[data-layer-role="41-foreground-right"]')).not.toBeNull();
});
```

Set up `window.scrollTo`, `requestAnimationFrame`, `matchMedia`, `IntersectionObserver`, and geometry mocks in the test rather than weakening runtime behavior.

- [ ] **Step 2: Run the structural tests and confirm failure**

Run: `npm test -- tests/landing-2.test.tsx`

Expected: FAIL because no timeline hook or layer roles exist.

- [ ] **Step 3: Implement cached measurement and invalidated rendering**

The hook must:

```ts
type CinematicOptions = {
  reducedMotion: boolean;
  coarsePointer: boolean;
};

export function useCinematicTimeline(
  sectionRef: React.RefObject<HTMLElement | null>,
  options: CinematicOptions,
) {
  // Cache sectionTop and travel in measure().
  // Event handlers only update targets and call requestFrame().
  // render() smooths playhead/pointer, calls getSceneState(), writes variables,
  // and schedules another frame only while values have not converged.
  // IntersectionObserver toggles an active flag so offscreen scenes stop rendering.
  // Return jumpToMarker and progressRef.
}
```

Write only the approved CSS variables: `--scene-progress`, `--world-scale`, `--world-x`, `--world-y`, `--world-blur`, `--world-brightness`, `--world-saturation`, `--shade-opacity`, `--intro-opacity`, `--intro-y`, `--portal-left-x`, `--portal-right-x`, `--portal-opacity`, `--phone-x`, `--phone-y`, `--phone-scale`, `--phone-rotate`, `--phone-opacity`, `--panel-a-opacity`, `--panel-a-y`, `--panel-b-opacity`, `--panel-b-y`, `--catalog-opacity`, `--catalog-y`, `--controls-opacity`, `--pointer-x`, and `--pointer-y`.

- [ ] **Step 4: Compose and style the world**

Use the airport image as role `00-background`, a CSS atmosphere as role `20-midground-environment`, phone/hand as role `30-hero-object`, and CSS portal panels as roles `40-foreground-left` and `41-foreground-right`. Add a separate shade layer in z-index band `10–19`. Give every photographic layer deliberate `object-position`, `transform-origin`, and enough scale to prevent exposed edges.

- [ ] **Step 5: Run focused tests and typecheck**

Run: `npm test -- tests/landing-2-timeline.test.ts tests/landing-2.test.tsx && npm run typecheck`

Expected: all landing-2 tests PASS and TypeScript exits `0`.

- [ ] **Step 6: Commit the motion engine**

```bash
git add components/landing-2/useCinematicTimeline.ts components/landing-2/CinematicLanding.tsx app/landing-2/landing-2.css tests/landing-2.test.tsx
git commit -m "feat: choreograph landing 2 scroll scene"
```

---

### Task 4: Accessible Final Service Rail

**Files:**
- Create: `components/landing-2/ServiceRail.tsx`
- Modify: `components/landing-2/CinematicLanding.tsx`
- Modify: `app/landing-2/landing-2.css`
- Modify: `tests/landing-2.test.tsx`

**Interfaces:**
- Consumes: `services` where each item has `id`, `name`, `number`, `copy`, `note`, and `image`.
- Produces: `<ServiceRail services={services} />` with bounded index, previous/next buttons, focusable list, pointer drag, touch swipe, arrow-key movement, semantic links, and one polite live region.

- [ ] **Step 1: Add failing rail interaction tests**

```tsx
it("moves through all eight services with buttons and keyboard", () => {
  render(<Landing2Page />);
  const rail = screen.getByRole("region", { name: /atlas essentials/i });
  expect(screen.getByText("SIM & eSIM")).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Next service" }));
  expect(screen.getByRole("status")).toHaveTextContent("Banking, 2 of 8");
  fireEvent.keyDown(rail, { key: "ArrowRight" });
  expect(screen.getByRole("status")).toHaveTextContent("Housing, 3 of 8");
  fireEvent.keyDown(rail, { key: "Home" });
  expect(screen.getByRole("status")).toHaveTextContent("SIM & eSIM, 1 of 8");
});

it("keeps controls bounded and service actions real", () => {
  render(<Landing2Page />);
  expect(screen.getByRole("button", { name: "Previous service" })).toBeDisabled();
  expect(screen.getAllByRole("link", { name: /ask atlas about/i })[0]).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:hello@atlas.study"),
  );
});
```

- [ ] **Step 2: Run the rail tests and confirm failure**

Run: `npm test -- tests/landing-2.test.tsx`

Expected: FAIL because the rail controls do not exist.

- [ ] **Step 3: Implement bounded rail state and input handling**

Use `setActiveIndex((current) => clamp(current + delta, 0, services.length - 1))`. Set pointer capture on pointer down, ignore drags whose vertical delta exceeds horizontal delta, and advance one card when horizontal travel exceeds `40px`. Support `ArrowLeft`, `ArrowRight`, `Home`, and `End`. Announce only after an interaction sets `hasInteracted`.

- [ ] **Step 4: Add stable-size catalog styling**

Position the catalog outside the scaled `.cine-world` so its cards stay readable. Use a transform based on `--catalog-y` only for scene entry and a separate `--rail-index` custom property for card translation. Use `touch-action: pan-y`, `cursor: grab`, `scroll-snap`-like card alignment through transforms, disabled-button styling, and a clear focus ring.

- [ ] **Step 5: Run route tests**

Run: `npm test -- tests/landing-2.test.tsx`

Expected: all landing-2 component tests PASS.

- [ ] **Step 6: Commit the rail**

```bash
git add components/landing-2/ServiceRail.tsx components/landing-2/CinematicLanding.tsx app/landing-2/landing-2.css tests/landing-2.test.tsx
git commit -m "feat: add accessible landing 2 service rail"
```

---

### Task 5: Loading, Responsive, and Reduced-Motion Modes

**Files:**
- Modify: `components/landing-2/CinematicLanding.tsx`
- Modify: `components/landing-2/useCinematicTimeline.ts`
- Modify: `app/landing-2/landing-2.css`
- Modify: `tests/landing-2.test.tsx`

**Interfaces:**
- Produces: `data-scene-ready`, `data-reduced-motion`, and CSS modes for the five required viewports.

- [ ] **Step 1: Add failing readiness and motion-safety tests**

```tsx
it("reserves critical image geometry and exposes readiness state", async () => {
  const { container } = render(<Landing2Page />);
  expect(container.querySelector('img[width="1536"][height="1024"]')).not.toBeNull();
  expect(container.querySelector('img[width="1086"][height="1448"]')).not.toBeNull();
  expect(container.querySelector("[data-scene-ready]")).not.toBeNull();
});

it("keeps all narrative content in reduced motion", () => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  const { container } = render(<Landing2Page />);
  expect(container.querySelector('[data-reduced-motion="true"]')).not.toBeNull();
  expect(screen.getByRole("heading", { name: /the route changes/i })).toBeVisible();
  expect(screen.getByRole("heading", { name: /everything you need/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the tests and confirm the missing states**

Run: `npm test -- tests/landing-2.test.tsx`

Expected: FAIL on readiness or reduced-motion attributes.

- [ ] **Step 3: Implement decode barrier and safety fallback**

Track the two critical `img` elements. Resolve readiness after both `decode()` calls settle, or after a `2200ms` fallback timer. Failed images release the loader. Use `aria-hidden="true"` on the visual-only loading mark and keep semantic content in the DOM throughout.

- [ ] **Step 4: Implement five-viewport and reduced-motion CSS**

Use `min-height: 100vh; min-height: 100svh` on the stage, safe-area padding, desktop travel `4600px`, portrait travel `3900px`, and mobile travel `3300px`. At coarse pointer sizes, set pointer variables to zero. At `prefers-reduced-motion: reduce`, remove sticky positioning, set the cinematic section to normal height, display hero and both panels in normal flow over deliberate backgrounds, remove blur/zoom/lateral travel, and keep the rail controls visible.

- [ ] **Step 5: Run focused tests, lint, and typecheck**

Run: `npm test -- tests/landing-2-timeline.test.ts tests/landing-2.test.tsx && npm run lint && npm run typecheck`

Expected: tests PASS, ESLint exits `0`, TypeScript exits `0`.

- [ ] **Step 6: Commit responsive and safety behavior**

```bash
git add components/landing-2 app/landing-2/landing-2.css tests/landing-2.test.tsx
git commit -m "feat: make landing 2 responsive and motion safe"
```

---

### Task 6: Documentation and Browser QA

**Files:**
- Create: `app/landing-2/README.md`
- Create: `app/landing-2/ASSET_MANIFEST.md`
- Create: `app/landing-2/TIMELINE.md`
- Create: `e2e/landing-2.spec.ts`
- Modify: implementation files only when QA finds a concrete defect.

**Interfaces:**
- Consumes: final route selectors and timeline marker math.
- Produces: reproducible local run instructions, complete asset contract, retiming map, and browser verification evidence.

- [ ] **Step 1: Add Playwright coverage**

```ts
import { expect, test } from "@playwright/test";

const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`landing-2 has no horizontal overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/landing-2");
    await expect(page.locator("[data-scene-ready]")).toHaveAttribute("data-scene-ready", "true");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
```

Add one test that scrolls to each checkpoint in both directions and asserts finite CSS variables, one keyboard rail test, one reduced-motion normal-flow test, and one console/page-error collector.

- [ ] **Step 2: Write the documentation**

`README.md` must contain `npm install`, `npm run dev`, `/landing-2`, file responsibilities, supported interactions, QA command list, and the final verification table. `ASSET_MANIFEST.md` must include all audited image dimensions, alpha status, visible bounding boxes for transparent images, chosen/unused role, anchor, and depth. `TIMELINE.md` must repeat the normalized ranges, marker values, checkpoint list, and instructions to retime only `getSceneState` and `sceneMarkers`.

- [ ] **Step 3: Run the complete automated suite**

Run: `npm test && npm run lint && npm run typecheck && npm run build`

Expected: every command exits `0`; note any unrelated pre-existing failure separately rather than editing unrelated files.

- [ ] **Step 4: Run Playwright and capture checkpoints**

Run: `npm run dev` in a persistent terminal, then `npx playwright test e2e/landing-2.spec.ts`.

Capture screenshots at progress `0.00`, `0.18`, `0.27`, `0.44`, `0.58`, `0.74`, `0.90`, and `1.00` for `1440×900`, plus final-state screenshots for `768×1024` and `390×844`. Inspect every image for transparent holes, layer order, collisions, opacity pops, stretching, subject crop, loading flashes, and horizontal overflow. Apply only concrete fixes and rerun the affected checkpoint.

- [ ] **Step 5: Record final evidence**

Update `README.md` with actual pass/fail results for desktop, laptop, landscape tablet, portrait tablet, mobile, keyboard, reduced motion, reverse scrolling, console, unit tests, lint, typecheck, build, and E2E. List the two missing production assets exactly as the design spec defines them.

- [ ] **Step 6: Commit docs and QA**

```bash
git add app/landing-2/README.md app/landing-2/ASSET_MANIFEST.md app/landing-2/TIMELINE.md e2e/landing-2.spec.ts
git commit -m "docs: verify landing 2 cinematic experience"
```
