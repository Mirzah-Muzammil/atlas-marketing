# Dispatch Hero Draw Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the Dispatch hero a first-paint SVG drawing sequence and reveal `DispatchJourneyPanel` after one second without a reload flash.

**Architecture:** CSS owns the initial-load animation so its hidden and stroke-preparation states exist before React hydration or the asynchronous GSAP import. Static data attributes expose the panel, icon scope, connector paths, and connector nodes; GSAP retains heading, tab, scroll, and pointer behavior but stops controlling the same entrance properties.

**Tech Stack:** React 19, Next.js 15, Tailwind CSS 4, GSAP 3, Vitest, Testing Library

---

### Task 1: Add the animation contract to rendered markup

**Files:**
- Modify: `tests/dispatch.test.tsx`
- Modify: `components/home/dispatch/DispatchConnectorArtwork.tsx`
- Modify: `components/home/dispatch/DispatchJourneyPanel.tsx`

- [ ] **Step 1: Write the failing component test**

Add this focused test to `tests/dispatch.test.tsx`:

```tsx
it("marks the Dispatch hero artwork for its first-load draw sequence", () => {
  const { container } = render(<EditorialPage />);

  const panel = container.querySelector("[data-dispatch-panel-entrance]");
  expect(panel).toBeInTheDocument();
  expect(panel).toHaveAttribute("data-dispatch-draw-icons");
  expect(panel?.querySelectorAll("svg").length).toBeGreaterThan(0);

  const drawPaths = container.querySelectorAll("[data-dispatch-draw-step]");
  expect(drawPaths).toHaveLength(4);
  expect(Array.from(drawPaths).map((path) => path.getAttribute("data-dispatch-draw-step"))).toEqual([
    "0",
    "1",
    "2",
    "3",
  ]);
  expect(container.querySelectorAll("[data-dispatch-connector-node]")).toHaveLength(4);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: FAIL because `[data-dispatch-panel-entrance]` and the SVG draw hooks do not exist.

- [ ] **Step 3: Add the panel and icon-scope hooks**

Update the root element in `DispatchJourneyPanel.tsx`:

```tsx
<div
  className="relative overflow-hidden border border-dispatch-ink/10"
  data-dispatch-draw-icons
  data-dispatch-panel-entrance
  data-editorial-panel
>
```

- [ ] **Step 4: Add ordered connector hooks**

Give the two connector paths and two coil paths ordered `data-dispatch-draw-step` values from `0` through `3`, preserving their existing `data-editorial-connector` and `data-editorial-coil` attributes. Add `data-dispatch-connector-node` to each of the four connector circles.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: both dispatch component tests PASS.

### Task 2: Implement the first-paint animation sequence

**Files:**
- Modify: `styles/globals.css`
- Modify: `components/home/dispatch/DispatchHeroMotion.tsx`

- [ ] **Step 1: Add CSS keyframes and initial states**

Add three keyframes and their hook styles near the existing editorial styles in `styles/globals.css`:

```css
@keyframes dispatch-draw-stroke {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes dispatch-node-in {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dispatch-panel-in {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

[data-dispatch-draw-step] {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: dispatch-draw-stroke 720ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

[data-dispatch-draw-step="0"] { animation-delay: 80ms; }
[data-dispatch-draw-step="1"] { animation-delay: 180ms; }
[data-dispatch-draw-step="2"] { animation-delay: 280ms; }
[data-dispatch-draw-step="3"] { animation-delay: 380ms; }

[data-dispatch-connector-node] {
  opacity: 0;
  transform: scale(0.65);
  transform-box: fill-box;
  transform-origin: center;
  animation: dispatch-node-in 340ms ease-out 760ms forwards;
}

[data-dispatch-panel-entrance] {
  opacity: 0;
  transform: translateY(5.75rem) scale(0.88);
  filter: blur(10px);
  animation: dispatch-panel-in 820ms cubic-bezier(0.22, 1, 0.36, 1) 1s forwards;
  will-change: opacity, transform, filter;
}

[data-dispatch-draw-icons] svg > :where(path, line, polyline, polygon, circle, rect, ellipse) {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: dispatch-draw-stroke 620ms ease-out 1.12s forwards;
}
```

- [ ] **Step 2: Add the reduced-motion final states**

Inside the existing `@media (prefers-reduced-motion: reduce)` block, add:

```css
[data-dispatch-draw-step],
[data-dispatch-connector-node],
[data-dispatch-panel-entrance],
[data-dispatch-draw-icons] svg > :where(path, line, polyline, polygon, circle, rect, ellipse) {
  animation: none;
}

[data-dispatch-draw-step],
[data-dispatch-draw-icons] svg > :where(path, line, polyline, polygon, circle, rect, ellipse) {
  stroke-dashoffset: 0;
}

[data-dispatch-connector-node],
[data-dispatch-panel-entrance] {
  opacity: 1;
  transform: none;
  filter: none;
}
```

- [ ] **Step 3: Remove overlapping GSAP entrance ownership**

In `DispatchHeroMotion.tsx`, remove the connector `gsap.set`, the `panelWrap` entrance tween, the connector draw tween, and the panel-orbit entrance tween from `entrance`. Keep connector and panel-orbit queries because the scroll and pointer timelines still use them. Keep `panelWrap` because the scroll timeline still transforms it.

- [ ] **Step 4: Run focused verification**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: PASS.

Run: `npm run typecheck`

Expected: exit code 0.

### Task 3: Verify the finished behavior

**Files:**
- Verify: `components/home/dispatch/DispatchConnectorArtwork.tsx`
- Verify: `components/home/dispatch/DispatchJourneyPanel.tsx`
- Verify: `components/home/dispatch/DispatchHeroMotion.tsx`
- Verify: `styles/globals.css`
- Verify: `tests/dispatch.test.tsx`

- [ ] **Step 1: Run the complete automated checks**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run lint`

Expected: exit code 0 with no new errors.

Run: `npm run typecheck`

Expected: exit code 0.

- [ ] **Step 2: Review the diff for scope and collisions**

Run: `git diff --check && git diff -- components/home/dispatch/DispatchConnectorArtwork.tsx components/home/dispatch/DispatchJourneyPanel.tsx components/home/dispatch/DispatchHeroMotion.tsx styles/globals.css tests/dispatch.test.tsx`

Expected: no whitespace errors; only animation hooks, the CSS entrance sequence, removal of overlapping GSAP entrance tweens, and the focused test are present.
