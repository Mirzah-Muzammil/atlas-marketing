# Landing 3 Readiness Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Raycast-proportioned two-column readiness section to `/landing-3` with Atlas-specific copy, journey-key artwork, and a staged scroll entrance.

**Architecture:** Create one focused client component for the section, using static data arrays for decorative keys and four semantic feature tiles. Compose it after the dashboard showcase and use the existing GSAP dependency plus `IntersectionObserver` for a one-time entrance with a reduced-motion fallback.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP 3, Lucide React, Vitest, Testing Library, Playwright with Microsoft Edge.

## Global Constraints

- Use only the approved Atlas copy from the design spec.
- Match the reference's 40/60 desktop split, approximately 20px heading, compact white CTA, masked keyboard grid, and four raised tiles.
- Keep the background grid decorative and the feature tiles semantic.
- Never use `visibility:hidden` for entrance motion.
- Disable entrance transforms when `prefers-reduced-motion: reduce` matches.
- Do not modify unrelated Premium files.

---

### Task 1: Define the readiness-section contract

**Files:**
- Modify: `tests/landing-3.test.tsx`
- Modify: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: `Landing3Page` and existing showcase marker `data-landing-3-showcase`.
- Produces: expectations for `data-landing-3-readiness`, `data-readiness-grid`, and four `data-readiness-feature` elements.

- [ ] **Step 1: Add a failing component test**

```tsx
it("presents Atlas readiness in the Raycast feature-grid structure", () => {
  const { container } = render(<Landing3Page />);
  expect(screen.getByRole("heading", {
    level: 2,
    name: "It’s not just about getting in. It’s about being ready for everything after.",
  })).toBeVisible();
  expect(screen.getByRole("link", { name: "Start your Atlas" })).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20early%20access",
  );
  expect(container.querySelectorAll("[data-readiness-feature]")).toHaveLength(4);
  expect(container.querySelector("[data-readiness-grid]"))?.toHaveAttribute("aria-hidden", "true");
});
```

- [ ] **Step 2: Run the component test and verify RED**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: FAIL because the readiness heading does not exist.

- [ ] **Step 3: Add a browser placement and sizing test**

Navigate to `/landing-3`, locate `[data-landing-3-readiness]`, assert it follows `[data-landing-3-showcase]`, and on desktop assert a heading font size between 18px and 22px and a two-column layout. Assert no horizontal overflow on desktop and mobile.

- [ ] **Step 4: Commit the failing contract**

```bash
git add tests/landing-3.test.tsx e2e/landing-3.spec.ts
git commit -m "test: define landing 3 readiness section"
```

### Task 2: Build and animate the Atlas readiness section

**Files:**
- Create: `components/landing-3/Landing3ReadinessSection.tsx`
- Modify: `components/landing-3/Landing3Hero.tsx`
- Test: `tests/landing-3.test.tsx`
- Test: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: approved Atlas content, `gsap`, `IntersectionObserver`, and Lucide icons.
- Produces: `Landing3ReadinessSection()` and the markers defined in Task 1.

- [ ] **Step 1: Add the component and static tile data**

Create a client component with four feature objects and a decorative key array. Render a `section` with `id="journey"`, `data-landing-3-readiness`, a left copy/CTA column, and a right visual with `data-readiness-grid`.

- [ ] **Step 2: Match the desktop and mobile reference geometry**

Use a centered `max-w-[1170px]` container, `lg:grid-cols-[.4fr_.6fr]`, compact heading `text-[clamp(1.2rem,1.45vw,1.3rem)]`, a narrow left measure, and a right visual approximately 570px tall. Use a masked absolute key grid and a two-by-two foreground tile cluster with dark glass, thin borders, 14–16px radii, and differentiated opacity.

- [ ] **Step 3: Add the one-time staged entrance**

Use GSAP opacity and transform values only. Initialize copy at `opacity: 0, y: 18`, grid at `opacity: 0, scale: .97`, and feature tiles at `opacity: 0, y: 30`. On first intersection, animate copy, grid, then stagger the tiles. Disconnect the observer afterward and revert the GSAP context on cleanup. If reduced motion matches or `IntersectionObserver` is unavailable, clear inline properties and render the final state.

- [ ] **Step 4: Compose the section**

Import `Landing3ReadinessSection` into `Landing3Hero.tsx` and render it immediately after `Landing3DashboardShowcase`.

- [ ] **Step 5: Verify focused behavior**

Run: `npm test -- tests/landing-3.test.tsx tests/landing-3-shader.test.tsx`

Expected: all Landing 3 component tests pass.

Run: `npm run typecheck`

Expected: exit 0.

Run: `npx eslint components/landing-3/Landing3ReadinessSection.tsx components/landing-3/Landing3Hero.tsx tests/landing-3.test.tsx e2e/landing-3.spec.ts`

Expected: exit 0.

- [ ] **Step 6: Verify production and Edge behavior**

Run: `npm run build`

Expected: `/landing-3` builds successfully.

Run: `npx playwright test e2e/landing-3.spec.ts`

Expected: all desktop and mobile Edge cases pass.

- [ ] **Step 7: Perform visual QA and commit**

Capture desktop and mobile screenshots after scrolling the readiness section into view. Compare against the inspected Raycast reference for the 40/60 split, compact type, CTA position, grid masking, tile placement, contrast, and final motion state.

```bash
git add components/landing-3/Landing3ReadinessSection.tsx components/landing-3/Landing3Hero.tsx tests/landing-3.test.tsx e2e/landing-3.spec.ts
git commit -m "feat: add landing 3 readiness section"
```
