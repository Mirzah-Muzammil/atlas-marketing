# Landing 3 Supported by Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dark Atlas support panel after the essentials orbit with Rainbow-matched scale, layered testimonial pills, and scroll-driven parallax.

**Architecture:** A focused client component owns the panel markup and one requestAnimationFrame-throttled scroll effect. `Landing3Hero` only composes the component. Existing Vitest and Edge suites cover content, order, responsive geometry, motion, reduced motion, and overflow.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Lucide React, Vitest, Testing Library, Playwright with Microsoft Edge.

## Global Constraints

- Keep the route at `/landing-3` and the production preview on port 3000.
- Use Atlas copy only; do not reuse Rainbow copy, imagery, or source assets.
- Preserve the Landing 3 background color `#050506`.
- Render the section immediately after `Landing3EssentialsOrbit`.
- Respect `prefers-reduced-motion: reduce`.
- Do not modify unrelated Landing 2 or Premium work.

---

### Task 1: Define the support-section contract

**Files:**
- Modify: `tests/landing-3.test.tsx`
- Create: `components/landing-3/Landing3SupportSection.tsx`
- Modify: `components/landing-3/Landing3Hero.tsx`

**Interfaces:**
- Produces: `export function Landing3SupportSection(): JSX.Element`
- Produces: `[data-landing-3-support]`, `[data-support-panel]`, `[data-support-pill]`, and `[data-support-visual]` selectors for browser verification.

- [ ] **Step 1: Write the failing component test**

Append a test that renders `Landing3Page`, finds the level-three heading “Controlled by you. Supported by Atlas.”, verifies the approved body and support line, asserts all five Atlas testimonials, and requires five `[data-support-pill]` elements inside `[data-landing-3-support]`.

- [ ] **Step 2: Run the test to verify RED**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: FAIL because the support heading and section do not exist.

- [ ] **Step 3: Implement the minimal semantic section**

Create `Landing3SupportSection.tsx` with the approved copy in a `section`, a level-three heading, and a five-item testimonial list. Give the section and elements the selectors in the Interfaces block. Import and render it after `<Landing3EssentialsOrbit />` in `Landing3Hero.tsx`.

- [ ] **Step 4: Run the component test to verify GREEN**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: all Landing 3 component tests PASS.

- [ ] **Step 5: Commit the semantic section**

```bash
git add tests/landing-3.test.tsx components/landing-3/Landing3SupportSection.tsx components/landing-3/Landing3Hero.tsx
git commit -m "feat: add Atlas support section content"
```

---

### Task 2: Match the Rainbow panel and scroll choreography

**Files:**
- Modify: `e2e/landing-3.spec.ts`
- Modify: `components/landing-3/Landing3SupportSection.tsx`

**Interfaces:**
- Consumes: selectors produced by Task 1.
- Produces: inline computed transforms on each `[data-support-pill]`; final transforms when reduced motion is active.

- [ ] **Step 1: Write the failing browser contract**

Add a test that navigates to `/landing-3`, asserts the support section follows the essentials section, checks a desktop panel height of at least 680px and width above 1300px at the 1440px viewport, records the first pill transform before entry, scrolls to the section midpoint, and polls until that transform changes. Also assert no document-level horizontal overflow.

Add a reduced-motion test that calls `page.emulateMedia({ reducedMotion: "reduce" })`, loads the route, and verifies every pill has `opacity: 1` in its settled state.

- [ ] **Step 2: Run the browser test to verify RED**

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --grep "Atlas support"`

Expected: FAIL because reference-scale geometry and scroll transforms are not implemented.

- [ ] **Step 3: Implement reference-matched layout and motion**

Style a centered `min(1360px, calc(100vw - 32px))` panel with a minimum desktop height near 720px, large rounded corners, clipped overflow, charcoal surface, low-contrast border, and subtle ambient radial gradients. Use a 36/64 desktop split and a single-column mobile layout. Highlight “Controlled by you.” with a warm gradient block.

Position five pills in the right visual with fixed settled x/y/rotation values and responsive widths. In `useEffect`, calculate viewport progress from the section rectangle, clamp it to `[0,1]`, apply `easeOutCubic`, and interpolate each pill from its own x/y/rotation offset to the settled transform. Throttle work through one animation frame. For reduced motion, paint progress `1` and do not attach listeners.

- [ ] **Step 4: Run the browser tests to verify GREEN**

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge`

Expected: all Landing 3 Edge tests PASS with no overflow.

- [ ] **Step 5: Commit the completed UI and motion**

```bash
git add e2e/landing-3.spec.ts components/landing-3/Landing3SupportSection.tsx
git commit -m "feat: animate Atlas support testimonials"
```

---

### Task 3: Production verification and port-3000 handoff

**Files:**
- Verify only: `components/landing-3/Landing3SupportSection.tsx`
- Verify only: `components/landing-3/Landing3Hero.tsx`
- Verify only: `tests/landing-3.test.tsx`
- Verify only: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: completed Landing 3 support section from Tasks 1–2.
- Produces: a verified production build served at `http://localhost:3000/landing-3`.

- [ ] **Step 1: Run focused static checks**

Run: `npm test -- tests/landing-3.test.tsx tests/landing-3-shader.test.tsx`

Run: `npm run typecheck`

Run: `npx eslint components/landing-3/Landing3SupportSection.tsx components/landing-3/Landing3Hero.tsx tests/landing-3.test.tsx e2e/landing-3.spec.ts`

Expected: all commands exit 0.

- [ ] **Step 2: Build the production application**

Run: `npm run build`

Expected: exit 0; unrelated pre-existing warnings may remain.

- [ ] **Step 3: Restart port 3000 with the production build**

Resolve the exact listener using `lsof -nP -iTCP:3000 -sTCP:LISTEN`, stop only that PID, and run `npm start -- -p 3000`.

- [ ] **Step 4: Verify the live page**

Confirm `http://localhost:3000/landing-3` returns HTTP 200 and contains `data-landing-3-support`. Capture and inspect the section at its entrance and settled scroll positions in Microsoft Edge.

- [ ] **Step 5: Check repository hygiene**

Run: `git diff --check`

Run: `git status --short`

Expected: no support-section changes remain uncommitted; unrelated user work is still present and untouched.
