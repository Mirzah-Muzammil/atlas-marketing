# Atlas Cinematic Homepage Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the existing Horizon, Dispatch, and Orbit routes into three connected cinematic experiences, with Orbit as the flagship, while preserving product clarity, accessibility, route architecture, and performance.

**Architecture:** Keep App Router pages as Server Components and add narrowly scoped Client Components for loader/session state, route-level GSAP timelines, and pointer response. Shared motion infrastructure handles only lifecycle and accessibility; each route owns its visual motif, scene markup, and timelines. Heavy Three.js code remains isolated to Orbit.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, GSAP/ScrollTrigger, Lenis, Three.js, React Three Fiber/Drei, Vitest, Testing Library, Playwright.

---

## File structure

### Shared motion

- Create `components/motion/CinematicLoader.tsx`: route-aware loader shell and accessible dismissal behavior.
- Create `components/motion/LoaderMark.tsx`: shared Atlas mark geometry used by route-specific loader treatments.
- Create `components/motion/RouteTransitionLine.tsx`: lightweight decorative route line used by Horizon and Dispatch.
- Create `hooks/useFirstRouteVisit.ts`: session-scoped full-versus-short loader state.
- Create `hooks/usePointerLayers.ts`: one requestAnimationFrame pointer loop for bounded layer movement.
- Modify `components/common/RouteExperience.tsx`: accept a route identity and mount the correct loader inside Lenis.
- Modify `hooks/useGsapContext.ts`: refresh ScrollTrigger after setup and centralize safe cleanup.
- Modify `styles/globals.css`: shared loader, scene, focus, reduced-motion, and responsive utilities.
- Modify `tests/motion.test.tsx`: cover session behavior, accessible content, and reduced-motion fallbacks.

### Horizon

- Modify `app/page.tsx`: pass `route="horizon"` to `RouteExperience` without adding UI.
- Modify `components/home/horizon/HorizonHero.tsx`: add three depth layers and route-line handoff markup.
- Modify `components/home/horizon/HorizonHeroMotion.tsx`: choreograph loader handoff, image expansion, parallax, and hero-to-journey transition.
- Modify `components/home/horizon/JourneyStory.tsx`: convert repeated rows into one sticky stage with five accessible states.
- Modify `components/home/horizon/JourneyStoryMotion.tsx`: pin desktop stage and scrub state transitions.
- Modify `components/home/horizon/ProductProof.tsx`: expose four readable product states for scroll control.
- Create `components/home/horizon/ProductProofMotion.tsx`: animate active product state and route-line continuity.
- Modify `components/home/horizon/EssentialsSection.tsx`: replace equal cards with one active service and supporting signals.
- Modify `components/home/horizon/ConciergeSection.tsx`: connect product UI to the human conversation.
- Modify `components/home/horizon/ResourcesSection.tsx`: convert article row into focusable tear-card previews.
- Modify `components/home/horizon/HorizonCTA.tsx`: reduce form dominance and close the route-line story.
- Modify `tests/horizon.test.tsx`: verify all journey/product states, contextual essentials, and conversion paths remain in the DOM.

### Dispatch

- Modify `app/editorial/page.tsx`: pass `route="dispatch"` to `RouteExperience`.
- Modify `components/home/dispatch/DispatchHero.tsx`: add loader-grid handoff, masked headline groups, and image plate layers.
- Create `components/home/dispatch/DispatchHeroMotion.tsx`: run graphic hero entrance and bounded parallax.
- Modify `components/home/dispatch/FragmentedJourney.tsx`: add separable columns and continuous thread markup.
- Create `components/home/dispatch/FragmentedJourneyMotion.tsx`: deconstruct/reconnect the grid.
- Modify `components/home/dispatch/DispatchChapters.tsx`: add progress thread, chapter traces, and distinct graphic layers.
- Modify `components/home/dispatch/DispatchChaptersMotion.tsx`: preserve horizontal pin while choreographing chapter focus.
- Modify `components/home/dispatch/ConciergeInterlude.tsx`: create the oversized human margin note.
- Modify `components/home/dispatch/FieldGuide.tsx`: implement accessible tear-sheet previews.
- Modify `components/home/dispatch/OperatingPrinciples.tsx`: create full-width typographic beats.
- Modify `components/home/dispatch/DispatchCTA.tsx`: add closing-cover markup.
- Create `components/home/dispatch/DispatchClosingMotion.tsx`: animate principles into the closing cover.
- Modify `tests/dispatch.test.tsx`: verify all dispatches, margin note, guide items, principles, and CTAs remain accessible.

### Orbit

- Modify `app/orbit/page.tsx`: pass `route="orbit"` to `RouteExperience`.
- Create `components/home/orbit/OrbitStory.tsx`: shared scroll-progress provider for spatial scenes.
- Modify `components/home/orbit/OrbitHero.tsx`: expose scene ranges and persistent progress instruction.
- Modify `components/home/orbit/OrbitCanvas.tsx`: connect the canvas to section-scoped progress.
- Modify `components/home/orbit/OrbitScene.tsx`: replace global page rotation with camera targets, depth planes, and active node states.
- Modify `components/home/orbit/ProductConstellation.tsx`: change equal cards into a pinned dominant-node sequence.
- Create `components/home/orbit/ProductConstellationMotion.tsx`: synchronize DOM copy with scene node activation.
- Modify `components/home/orbit/EcosystemSection.tsx`: create service signals that attach to the route.
- Create `components/home/orbit/EcosystemMotion.tsx`: choreograph active relationships and spotlight movement.
- Modify `components/home/orbit/StudentRoute.tsx`: create flight-path milestone layers.
- Create `components/home/orbit/StudentRouteMotion.tsx`: animate route depth and handoff to Human Signal.
- Modify `components/home/orbit/OrbitConcierge.tsx`: convert the route signal into the human pulse.
- Modify `components/home/orbit/OrbitCTA.tsx`: create the dark-to-white Liftoff wash.
- Modify `tests/orbit.test.tsx`: verify spatial fallbacks and every route state without WebGL.

### Verification

- Create `e2e/cinematic-routes.spec.ts`: desktop/mobile route smoke tests, loader session behavior, and reduced-motion checks.
- Modify `playwright.config.ts` only if the existing server/viewport configuration cannot run the new spec.

## Task 1: Shared loader and motion lifecycle

**Files:**
- Create: `hooks/useFirstRouteVisit.ts`
- Create: `components/motion/LoaderMark.tsx`
- Create: `components/motion/CinematicLoader.tsx`
- Create: `components/motion/RouteTransitionLine.tsx`
- Modify: `components/common/RouteExperience.tsx`
- Modify: `hooks/useGsapContext.ts`
- Modify: `tests/motion.test.tsx`

- [ ] **Step 1: Write failing loader-session and accessible-content tests**

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { RouteExperience } from "@/components/common/RouteExperience";

it("keeps route content readable beneath the cinematic loader", () => {
  render(<RouteExperience route="horizon"><h1>Atlas journey</h1></RouteExperience>);
  expect(screen.getByRole("heading", { name: "Atlas journey" })).toBeVisible();
  expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("aria-hidden", "true");
});

it("marks a route introduction as seen for the current session", async () => {
  render(<RouteExperience route="orbit"><h1>Orbit</h1></RouteExperience>);
  await waitFor(() => expect(sessionStorage.getItem("atlas:intro:orbit")).toBe("seen"));
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/motion.test.tsx`

Expected: FAIL because `RouteExperience` has no `route` prop and no cinematic loader.

- [ ] **Step 3: Implement session state and the route-aware loader**

```ts
// hooks/useFirstRouteVisit.ts
"use client";

import { useEffect, useState } from "react";

export type AtlasRoute = "horizon" | "dispatch" | "orbit";

export function useFirstRouteVisit(route: AtlasRoute) {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  useEffect(() => {
    const key = `atlas:intro:${route}`;
    const first = sessionStorage.getItem(key) !== "seen";
    setIsFirstVisit(first);
    sessionStorage.setItem(key, "seen");
  }, [route]);
  return isFirstVisit;
}
```

`CinematicLoader` must render `data-testid="cinematic-loader"`, `aria-hidden="true"`, route-specific labels/layers, and use `useGsapContext` to exit immediately after its entrance timeline. `RouteExperience` becomes:

```tsx
type RouteExperienceProps = { children: ReactNode; route: AtlasRoute };

export function RouteExperience({ children, route }: RouteExperienceProps) {
  return <LenisProvider><CinematicLoader route={route} />{children}</LenisProvider>;
}
```

After GSAP setup, call `ScrollTrigger.refresh()` in `requestAnimationFrame`; cleanup must cancel that frame, run custom teardown, and revert the GSAP context.

- [ ] **Step 4: Run focused tests**

Run: `npm test -- tests/motion.test.tsx tests/foundation.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit shared motion infrastructure**

```bash
git add hooks/useFirstRouteVisit.ts components/motion components/common/RouteExperience.tsx hooks/useGsapContext.ts tests/motion.test.tsx
git commit -m "feat: add cinematic route introductions"
```

## Task 2: Horizon hero and connected journey

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/home/horizon/HorizonHero.tsx`
- Modify: `components/home/horizon/HorizonHeroMotion.tsx`
- Modify: `components/home/horizon/JourneyStory.tsx`
- Modify: `components/home/horizon/JourneyStoryMotion.tsx`
- Modify: `tests/horizon.test.tsx`

- [ ] **Step 1: Extend the Horizon test with the five accessible journey states**

```tsx
expect(screen.getByTestId("horizon-hero-depth")).toBeInTheDocument();
expect(screen.getByTestId("journey-stage")).toBeInTheDocument();
for (const title of ["Apply", "Visa", "Finance", "Arrive", "Thrive"]) {
  expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
}
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/horizon.test.tsx`

Expected: FAIL because the new scene test IDs do not exist.

- [ ] **Step 3: Build the hero depth planes and single journey stage**

Add `data-depth="back|mid|front"` layers inside a `data-testid="horizon-hero-depth"` wrapper. Keep the hero heading, body, CTAs, image alt, and floating product messages unchanged.

Render one `data-testid="journey-stage"` shell containing all five semantic `<article>` elements. Desktop CSS positions them in the same stage; base/mobile CSS keeps them in normal document flow. Add a persistent route line and product-state panel next to the active type.

`HorizonHeroMotion` must use one timeline for image mask entrance, depth-plane parallax, and the hero-to-journey frame expansion. `JourneyStoryMotion` must use `gsap.matchMedia()` and create one desktop pin with five labeled progress ranges; reduced motion and widths below 1024px must not pin or hide articles.

- [ ] **Step 4: Run Horizon and shared tests**

Run: `npm test -- tests/horizon.test.tsx tests/motion.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the Horizon opening sequence**

```bash
git add app/page.tsx components/home/horizon/HorizonHero.tsx components/home/horizon/HorizonHeroMotion.tsx components/home/horizon/JourneyStory.tsx components/home/horizon/JourneyStoryMotion.tsx tests/horizon.test.tsx
git commit -m "feat: connect Horizon hero and journey"
```

## Task 3: Horizon product, essentials, and closing sequence

**Files:**
- Modify: `components/home/horizon/ProductProof.tsx`
- Create: `components/home/horizon/ProductProofMotion.tsx`
- Modify: `components/home/horizon/EssentialsSection.tsx`
- Modify: `components/home/horizon/ConciergeSection.tsx`
- Modify: `components/home/horizon/ResourcesSection.tsx`
- Modify: `components/home/horizon/HorizonCTA.tsx`
- Modify: `tests/horizon.test.tsx`

- [ ] **Step 1: Add failing tests for product states and contextual services**

```tsx
for (const state of ["Shortlist", "Visa preparation", "Money plan", "Arrival plan"]) {
  expect(screen.getByText(state)).toBeInTheDocument();
}
expect(screen.getByTestId("contextual-essentials")).toBeInTheDocument();
expect(screen.getByText(/human answer/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/horizon.test.tsx`

Expected: FAIL on the new product-state labels and contextual scene.

- [ ] **Step 3: Implement the connected lower-page sequence**

`ProductProof` renders four semantic state panels and `ProductProofMotion` crossfades them inside one desktop sticky frame. `EssentialsSection` renders one active service at full scale with four supporting signals instead of five equal cards, while preserving all service names and descriptions in the DOM. The product route line enters Concierge, where it changes into the conversation line. Resources use focusable `<a>` tear cards with masked previews. `HorizonCTA` keeps the existing accessible form and email CTA but moves the form into a secondary compact panel.

- [ ] **Step 4: Run Horizon tests**

Run: `npm test -- tests/horizon.test.tsx tests/consultation-form.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit Horizon completion**

```bash
git add components/home/horizon tests/horizon.test.tsx
git commit -m "feat: complete Horizon cinematic story"
```

## Task 4: Dispatch loader handoff and fragmentation

**Files:**
- Modify: `app/editorial/page.tsx`
- Modify: `components/home/dispatch/DispatchHero.tsx`
- Create: `components/home/dispatch/DispatchHeroMotion.tsx`
- Modify: `components/home/dispatch/FragmentedJourney.tsx`
- Create: `components/home/dispatch/FragmentedJourneyMotion.tsx`
- Modify: `tests/dispatch.test.tsx`

- [ ] **Step 1: Add failing editorial-scene tests**

```tsx
expect(screen.getByTestId("dispatch-hero-grid")).toBeInTheDocument();
expect(screen.getByTestId("fragment-thread")).toBeInTheDocument();
expect(screen.getByText(/atlas edit/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: FAIL because the new grid and thread markers are absent.

- [ ] **Step 3: Implement the living publication opening**

Pass `route="dispatch"` to `RouteExperience`. Split the existing hero headline into masked line groups inside `data-testid="dispatch-hero-grid"`, keep the H1 text unchanged for accessibility, and add rule/image plate layers. `DispatchHeroMotion` reveals rules, type, and image with crisp timelines. `FragmentedJourney` adds three independently movable columns and a `data-testid="fragment-thread"` SVG/CSS line. Its motion component separates columns during the problem statement and reconnects them before `#dispatches`.

- [ ] **Step 4: Run Dispatch tests**

Run: `npm test -- tests/dispatch.test.tsx tests/motion.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the Dispatch opening**

```bash
git add app/editorial/page.tsx components/home/dispatch/DispatchHero* components/home/dispatch/FragmentedJourney* tests/dispatch.test.tsx
git commit -m "feat: animate Dispatch publication opening"
```

## Task 5: Dispatch chapters, tear sheets, and closing cover

**Files:**
- Modify: `components/home/dispatch/DispatchChapters.tsx`
- Modify: `components/home/dispatch/DispatchChaptersMotion.tsx`
- Modify: `components/home/dispatch/ConciergeInterlude.tsx`
- Modify: `components/home/dispatch/FieldGuide.tsx`
- Modify: `components/home/dispatch/OperatingPrinciples.tsx`
- Modify: `components/home/dispatch/DispatchCTA.tsx`
- Create: `components/home/dispatch/DispatchClosingMotion.tsx`
- Modify: `tests/dispatch.test.tsx`

- [ ] **Step 1: Add failing tests for editorial interaction surfaces**

```tsx
expect(screen.getByTestId("dispatch-progress-thread")).toBeInTheDocument();
expect(screen.getByTestId("human-margin-note")).toBeInTheDocument();
expect(screen.getAllByTestId("field-guide-sheet")).toHaveLength(3);
expect(screen.getByTestId("dispatch-closing-cover")).toBeInTheDocument();
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: FAIL on the new editorial surfaces.

- [ ] **Step 3: Implement the editorial progression**

Add a persistent progress thread and chapter trace layers without removing the five dispatch articles. Extend the existing desktop horizontal timeline to calculate active chapter progress, scale background chapter numbers, and fade neighboring chapters; the mobile layout remains vertical. Render Concierge as `data-testid="human-margin-note"`. Field-guide anchors receive `data-testid="field-guide-sheet"` and CSS mask/translation focus states. Principles become full-width beats. `DispatchClosingMotion` contracts the grid and reveals the existing CTA links inside `data-testid="dispatch-closing-cover"`.

- [ ] **Step 4: Run Dispatch tests**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit Dispatch completion**

```bash
git add components/home/dispatch tests/dispatch.test.tsx
git commit -m "feat: complete Dispatch editorial motion"
```

## Task 6: Orbit scroll state and spatial hero

**Files:**
- Modify: `app/orbit/page.tsx`
- Create: `components/home/orbit/OrbitStory.tsx`
- Modify: `components/home/orbit/OrbitHero.tsx`
- Modify: `components/home/orbit/OrbitCanvas.tsx`
- Modify: `components/home/orbit/OrbitScene.tsx`
- Modify: `tests/orbit.test.tsx`

- [ ] **Step 1: Add failing spatial-state tests**

```tsx
expect(screen.getByTestId("orbit-story")).toBeInTheDocument();
expect(screen.getByTestId("orbit-progress-instruction")).toHaveTextContent(/move one step/i);
expect(screen.getByTestId("orbit-static-route")).toBeInTheDocument();
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- tests/orbit.test.tsx`

Expected: FAIL because the Orbit story wrapper and fallback markers do not exist.

- [ ] **Step 3: Implement section-scoped spatial progress**

Pass `route="orbit"` to `RouteExperience`. `OrbitStory` owns a ref and exposes normalized scene progress through a small React context with `{ progress, activeScene }`. Update progress from one passive scroll listener scheduled through `requestAnimationFrame`, with reduced-motion returning zero. `OrbitScene` consumes that state instead of reading global `window.scrollY`, interpolates bounded camera targets, and pauses float/rotation when the document is hidden. Add distinct back/mid/front groups and keep a `data-testid="orbit-static-route"` DOM fallback adjacent to the canvas.

- [ ] **Step 4: Run Orbit tests**

Run: `npm test -- tests/orbit.test.tsx tests/motion.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the Orbit spatial foundation**

```bash
git add app/orbit/page.tsx components/home/orbit/OrbitStory.tsx components/home/orbit/OrbitHero.tsx components/home/orbit/OrbitCanvas.tsx components/home/orbit/OrbitScene.tsx tests/orbit.test.tsx
git commit -m "feat: add Orbit spatial story state"
```

## Task 7: Orbit constellation, ecosystem, route, and Liftoff

**Files:**
- Modify: `components/home/orbit/ProductConstellation.tsx`
- Create: `components/home/orbit/ProductConstellationMotion.tsx`
- Modify: `components/home/orbit/EcosystemSection.tsx`
- Create: `components/home/orbit/EcosystemMotion.tsx`
- Modify: `components/home/orbit/StudentRoute.tsx`
- Create: `components/home/orbit/StudentRouteMotion.tsx`
- Modify: `components/home/orbit/OrbitConcierge.tsx`
- Modify: `components/home/orbit/OrbitCTA.tsx`
- Modify: `tests/orbit.test.tsx`

- [ ] **Step 1: Add failing tests for the complete spatial sequence**

```tsx
expect(screen.getByTestId("product-node-stage")).toBeInTheDocument();
expect(screen.getByTestId("ecosystem-signals")).toBeInTheDocument();
expect(screen.getByTestId("student-flight-path")).toBeInTheDocument();
expect(screen.getByTestId("human-signal-pulse")).toBeInTheDocument();
expect(screen.getByTestId("liftoff-wash")).toBeInTheDocument();
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- tests/orbit.test.tsx`

Expected: FAIL on the new scene markers.

- [ ] **Step 3: Implement the continuous spatial sequence**

Replace equal constellation cards with one `data-testid="product-node-stage"` dominant-node scene while keeping Journey, Documents, Money, and Concierge as semantic articles. Render ecosystem services as route-attached `data-testid="ecosystem-signals"` nodes. Convert the student timeline into layered milestone planes inside `data-testid="student-flight-path"`. Route-specific motion components use desktop pins and set active data attributes that synchronize with `OrbitStory`; mobile keeps normal flow. The final route line becomes `data-testid="human-signal-pulse"`, then expands through `data-testid="liftoff-wash"` into the existing white CTA.

- [ ] **Step 4: Run Orbit tests**

Run: `npm test -- tests/orbit.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit Orbit completion**

```bash
git add components/home/orbit tests/orbit.test.tsx
git commit -m "feat: complete Orbit cinematic route"
```

## Task 8: Responsive styling, pointer layers, and reduced motion

**Files:**
- Create: `hooks/usePointerLayers.ts`
- Modify: `styles/globals.css`
- Modify: route components from Tasks 2–7 as required for class hooks
- Modify: `tests/motion.test.tsx`

- [ ] **Step 1: Add a failing pointer-layer cleanup test**

```tsx
it("leaves layered content readable when pointer motion is unavailable", () => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
  render(<div data-pointer-layer="0.4">Readable layer</div>);
  expect(screen.getByText("Readable layer")).toBeVisible();
});
```

- [ ] **Step 2: Run and verify the current suite before styling changes**

Run: `npm test -- tests/motion.test.tsx`

Expected: PASS for content presence; use this as the non-JS fallback baseline.

- [ ] **Step 3: Implement bounded pointer layers and responsive scene CSS**

`usePointerLayers` attaches one pointer listener to its scope, writes normalized CSS variables `--pointer-x` and `--pointer-y` through one requestAnimationFrame, and removes both listener and frame on cleanup. Apply transforms only inside `(hover: hover) and (pointer: fine)` media queries. Add route-specific desktop scene positioning at 1024px+, simplified tablet depth, normal-flow mobile layouts, and a comprehensive `prefers-reduced-motion` block that removes transforms, masks, pins, and loader delays without hiding content.

- [ ] **Step 4: Run unit, lint, and type checks**

Run: `npm test && npm run typecheck && npm run lint`

Expected: all commands exit 0.

- [ ] **Step 5: Commit responsive and accessibility polish**

```bash
git add hooks/usePointerLayers.ts styles/globals.css components tests/motion.test.tsx
git commit -m "feat: polish cinematic motion across devices"
```

## Task 9: Browser verification and production build

**Files:**
- Create: `e2e/cinematic-routes.spec.ts`
- Modify: `playwright.config.ts` only if required

- [ ] **Step 1: Write browser smoke tests**

```ts
import { expect, test } from "@playwright/test";

for (const route of ["/", "/editorial", "/orbit"]) {
  test(`${route} keeps its primary story and CTA usable`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /get started free/i }).first()).toBeVisible();
    await page.mouse.wheel(0, 2400);
    await expect(page.locator("main")).toBeVisible();
  });
}

test("reduced motion preserves Orbit content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/orbit");
  await expect(page.getByText("Journey")).toBeVisible();
  await expect(page.getByText("Ready for liftoff", { exact: false })).toBeVisible();
});
```

- [ ] **Step 2: Run browser tests and verify failures before any selector adjustment**

Run: `npm run e2e -- e2e/cinematic-routes.spec.ts`

Expected: tests exercise all routes; any failure must identify a real visibility, scroll, or selector issue.

- [ ] **Step 3: Fix only verified browser issues**

Use the browser failure output and screenshots to adjust scroll distances, overflow, focus order, loader timing, or scene visibility. Do not add new visual features during verification.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test && npm run typecheck && npm run lint && npm run build && npm run e2e -- e2e/cinematic-routes.spec.ts`

Expected: every command exits 0 with no runtime console errors.

- [ ] **Step 5: Review in Microsoft Edge**

Open `/`, `/editorial`, and `/orbit`; replay each loader in a fresh session, scroll every scene, test pointer movement, resize to mobile width, enable reduced motion, use keyboard navigation, and inspect console output. Compare against the specification’s creative acceptance criteria.

- [ ] **Step 6: Commit verification coverage and final fixes**

```bash
git add e2e/cinematic-routes.spec.ts playwright.config.ts components hooks styles tests
git commit -m "test: verify cinematic Atlas routes"
```

## Self-review record

- Spec coverage: loaders, continuity, route-specific motion, parallax, mobile, reduced motion, accessibility, performance, and Edge review all map to Tasks 1–9.
- Scope: no backend work, new route, external Spline asset, fabricated proof, or universal scene framework is included.
- Placeholder scan: the plan contains no deferred implementation markers. Browser fixes are intentionally limited to failures demonstrated by Task 9.
- Type consistency: `AtlasRoute` is defined once in `useFirstRouteVisit.ts`; `RouteExperience` consumes it; all three pages pass one valid route identity.
- Architecture consistency: pages only compose imported sections, route-specific Client Components remain outside `app`, and Orbit alone imports Three.js/R3F.
