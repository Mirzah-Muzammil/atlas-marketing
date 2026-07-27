# Landing 3 Showcase Raycast Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the oversized physical-laptop showcase with a Raycast-proportioned animated display that uses Atlas copy and the Atlas CRM screenshot.

**Architecture:** Keep the section in `Landing3DashboardShowcase.tsx`, make it a client component, and use the existing GSAP dependency for a one-time scroll entrance. Use CSS/Tailwind for the flat double-border display, star field, continuous screenshot drift, highlight sweep, and reduced-motion fallbacks.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, GSAP 3, Vitest, Testing Library, Playwright with Microsoft Edge.

## Global Constraints

- Copy must be Atlas-specific: “From application to arrival.” and “One Atlas, every next step.”
- Temporary media remains `/images/crm.png` with intrinsic dimensions 1144 by 575.
- No physical laptop base, notch, metallic wedge, floor reflection, or perspective tilt.
- The media slot must remain directly replaceable by a future video.
- Motion must resolve immediately to the final visible state when `prefers-reduced-motion: reduce` matches.
- Do not modify unrelated Premium files.

---

### Task 1: Encode the corrected showcase contract

**Files:**
- Modify: `tests/landing-3.test.tsx`
- Modify: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: `Landing3Page` and `data-landing-3-showcase`.
- Produces: assertions for `data-showcase-frame`, `data-showcase-media`, and Atlas-specific heading copy.

- [ ] **Step 1: Update the component test to require Atlas copy and a flat display**

Replace the existing showcase test expectations with:

```tsx
expect(
  screen.getByRole("heading", {
    level: 2,
    name: "From application to arrival. One Atlas, every next step.",
  }),
).toBeVisible();
expect(container.querySelector("[data-showcase-frame]")).not.toBeNull();
expect(container.querySelector("[data-showcase-media]")).not.toBeNull();
expect(container.querySelector("[data-macbook-base]")).toBeNull();
```

- [ ] **Step 2: Run the component test and verify RED**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: FAIL because the old Raycast copy and MacBook markers are still rendered.

- [ ] **Step 3: Update the browser test contract**

Assert the exact Atlas text, no physical base, compact desktop typography, a frame width between 75% and 90% of the viewport, and no horizontal overflow:

```ts
await expect(showcase.getByRole("heading", { level: 2 })).toHaveText(
  "From application to arrival.One Atlas, every next step.",
);
await expect(showcase.locator("[data-macbook-base]")).toHaveCount(0);
const frameBox = await showcase.locator("[data-showcase-frame]").boundingBox();
expect(frameBox!.width / page.viewportSize()!.width).toBeGreaterThan(0.75);
expect(frameBox!.width / page.viewportSize()!.width).toBeLessThan(0.9);
```

- [ ] **Step 4: Commit the failing contract**

```bash
git add tests/landing-3.test.tsx e2e/landing-3.spec.ts
git commit -m "test: define landing 3 showcase parity"
```

### Task 2: Build the flat animated Atlas display

**Files:**
- Modify: `components/landing-3/Landing3DashboardShowcase.tsx`
- Test: `tests/landing-3.test.tsx`
- Test: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: `/images/crm.png`, `gsap`, browser match-media preferences.
- Produces: `Landing3DashboardShowcase()` with `data-showcase-heading`, `data-showcase-frame`, and `data-showcase-media` hooks.

- [ ] **Step 1: Make the section a client component and add entrance motion**

Add `"use client"`, a section ref, and a GSAP context. If reduced motion is disabled, animate the heading from `{ autoAlpha: 0, y: 24 }` and the frame from `{ autoAlpha: 0, y: 64, scale: 0.96 }` when an `IntersectionObserver` first reports the section intersecting. Kill the context and disconnect the observer during cleanup. For reduced motion, set both elements directly to visible final values.

- [ ] **Step 2: Replace the physical laptop markup**

Use compact centered heading styles (`text-[clamp(1.25rem,1.65vw,1.5rem)]`, medium weight, approximately 1.25 line height), then render a wide flat frame:

```tsx
<div className="relative mx-auto mt-16 w-full max-w-[1180px]" data-showcase-frame>
  <div className="rounded-[22px] border border-white/15 bg-white/[.035] p-[7px] shadow-[0_0_0_1px_rgba(255,255,255,.035),0_40px_100px_rgba(0,0,0,.72)]">
    <div className="overflow-hidden rounded-[15px] border border-white/10 bg-[#090a0d]" data-showcase-media>
      <Image ... />
    </div>
  </div>
</div>
```

Do not render any `data-macbook-*` elements.

- [ ] **Step 3: Add reference-like atmosphere and passive media motion**

Add an `aria-hidden` star layer using multiple radial-gradient backgrounds, a low-opacity blue radial glow behind the frame, a CSS `animate-[atlasDashboardDrift_14s_ease-in-out_infinite_alternate]` transform on the image, and an `animate-[atlasDashboardSweep_8s_ease-in-out_infinite]` diagonal highlight overlay. Define the two keyframes in a component `<style jsx global>` block and disable both animations under `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- tests/landing-3.test.tsx tests/landing-3-shader.test.tsx`

Expected: 5 tests pass.

- [ ] **Step 5: Run static verification**

Run: `npm run typecheck`

Expected: exit 0.

Run: `npx eslint components/landing-3/Landing3DashboardShowcase.tsx tests/landing-3.test.tsx e2e/landing-3.spec.ts`

Expected: exit 0.

- [ ] **Step 6: Build and run browser verification**

Run: `npm run build`

Expected: `/landing-3` builds successfully.

Run: `npx playwright test e2e/landing-3.spec.ts`

Expected: all desktop Edge and mobile Edge cases pass.

- [ ] **Step 7: Perform visual QA and commit**

Capture desktop and mobile screenshots. Compare desktop against the inspected Raycast reference for compact heading scale, frame width, flat construction, spacing, glow, and visible entrance/final state. Confirm mobile has no clipping.

```bash
git add components/landing-3/Landing3DashboardShowcase.tsx tests/landing-3.test.tsx e2e/landing-3.spec.ts
git commit -m "feat: align landing 3 showcase with reference"
```
