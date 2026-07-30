# Landing 3 Cinematic Readiness Depth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the readiness section’s keyboard backdrop with a cinematic orange glow, grid, and grain field while preserving the centered Atlas window and four value cards.

**Architecture:** Keep the change inside `Landing3ReadinessSection`. Remove the generated keyboard data and nodes, add three decorative background layers with stable data attributes, and simplify the existing entrance animation so it only controls the interactive window and value cards.

**Tech Stack:** React, TypeScript, Tailwind CSS, GSAP, Vitest, Testing Library, Playwright

---

### Task 1: Replace the keyboard backdrop with cinematic depth

**Files:**
- Modify: `tests/landing-3.test.tsx`
- Modify: `e2e/landing-3.spec.ts`
- Modify: `components/landing-3/Landing3ReadinessSection.tsx`

- [ ] **Step 1: Write the failing component test**

Update the readiness assertion to require the cinematic depth layers and reject keyboard nodes:

```tsx
expect(container.querySelector("[data-readiness-cinematic-depth]")).not.toBeNull();
expect(container.querySelector("[data-readiness-depth-grid]")).not.toBeNull();
expect(container.querySelector("[data-readiness-depth-glow]")).not.toBeNull();
expect(container.querySelector("[data-readiness-depth-grain]")).not.toBeNull();
expect(container.querySelectorAll("[data-readiness-key]")).toHaveLength(0);
```

- [ ] **Step 2: Run the component test and verify RED**

Run: `npm test -- --run tests/landing-3.test.tsx`

Expected: FAIL because the cinematic depth attributes do not exist and 25 keyboard keys still render.

- [ ] **Step 3: Add the browser-level expectations**

In the readiness E2E scenario, replace the keyboard-grid opacity check with:

```ts
await expect(readiness.locator("[data-readiness-cinematic-depth]")).toBeVisible();
await expect(readiness.locator("[data-readiness-depth-grid]")).toBeVisible();
await expect(readiness.locator("[data-readiness-depth-glow]")).toBeVisible();
await expect(readiness.locator("[data-readiness-depth-grain]")).toBeVisible();
await expect(readiness.locator("[data-readiness-key]")).toHaveCount(0);
```

- [ ] **Step 4: Implement the cinematic depth layers**

Remove `journeyKeys`, the 25-key mapped backdrop, and the GSAP `grid` query/tween. Add one `aria-hidden` depth wrapper before the center stage containing:

```tsx
<div data-readiness-cinematic-depth>
  <div data-readiness-depth-grid />
  <div data-readiness-depth-glow />
  <div data-readiness-depth-grain />
</div>
```

Style the grid with two subtle linear gradients, the glow with strong orange radial gradients and dark falloff, and the grain with an inline SVG turbulence texture. Keep every layer pointer-inert and below the preview window and value cards.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `npm test -- --run tests/landing-3.test.tsx`

Expected: 13 tests pass.

- [ ] **Step 6: Verify production and browser behavior**

Run: `git diff --check`

Expected: no output.

Run: `npm run build`

Expected: production build succeeds.

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge -g "places an interactive Atlas macOS preview" --reporter=line`

Expected: both focused browser tests pass with the keyboard absent and cinematic layers visible.
