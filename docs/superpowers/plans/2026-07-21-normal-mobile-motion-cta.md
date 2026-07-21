# Normal Mobile Motion and CTA Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/normal` static and comfortable on phones while repairing the CTA’s mobile width and artwork sizing.

**Architecture:** Disable AOS through its existing initializer below 768px and add first-paint CSS fallbacks that neutralize both AOS and title reveal styles at the same breakpoint. Keep the CTA in its existing component, replacing only responsive utility classes so mobile uses normal document flow and desktop retains absolute artwork positioning.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, AOS, Vitest

---

### Task 1: Disable mobile reveal motion

**Files:**
- Modify: `components/providers.tsx`
- Modify: `app/normal/globals.css`
- Create: `tests/normal-mobile-experience.test.ts`

- [ ] **Step 1: Write the failing motion regression test**

Read `components/providers.tsx` and assert that the AOS options include `disable: () => window.innerWidth < 768`. Read `app/normal/globals.css`, isolate an `@media (max-width: 767px)` block, and assert it contains rules for `.atlas-title-reveal` and `[data-aos]` with full opacity, no blur, no transform, and no transition.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/normal-mobile-experience.test.ts`

Expected: FAIL because the mobile AOS disable option and mobile static-render CSS do not exist.

- [ ] **Step 3: Implement the mobile motion shutdown**

Add `disable: () => window.innerWidth < 768` to `AOS.init`. Add a max-width 767px media rule that forces `.atlas-title-reveal` to `opacity: 1`, `filter: none`, `transform: none`, `transition: none`, and `will-change: auto`; in the same block, force `[data-aos]` to full opacity with no transform or transition so content is static before the effect initializes.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- tests/normal-mobile-experience.test.ts`

Expected: the motion assertions pass while the CTA assertions remain red until Task 2.

### Task 2: Repair the mobile CTA layout

**Files:**
- Modify: `components/sections/cta-banner.tsx`
- Modify: `tests/normal-mobile-experience.test.ts`

- [ ] **Step 1: Add the failing CTA regression assertions**

Assert that the CTA section uses `max-w-7xl`, `w-full`, and `mt-24`; does not use `min-w-7xl`; the panel uses `overflow-hidden md:overflow-visible`; and the artwork wrapper uses `max-w-[16rem]` before returning to `md:absolute` desktop positioning.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/normal-mobile-experience.test.ts`

Expected: FAIL because the current CTA forces a 1280px minimum and renders a full-width 1024px image on mobile.

- [ ] **Step 3: Implement the responsive classes**

Change the outer section to a fluid `max-w-7xl` container with `mt-24`, restoring `lg:mt-60`. On mobile, keep the image in normal flow at a maximum width of 16rem and hide panel overflow; at `md`, restore the existing absolute right/bottom artwork placement and visible overflow. Constrain the desktop copy column so it cannot overlap the artwork.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- tests/normal-mobile-experience.test.ts tests/normal-images.test.ts tests/normal-title-animation.test.tsx`

Expected: all selected tests pass.

- [ ] **Step 5: Verify the real layout and production build**

At a 390px browser viewport, confirm the CTA section width is no greater than the viewport, the image width is capped near 256px, the document has no horizontal overflow, and mobile reveal styles compute to fully visible/static. Then run `npm run typecheck` followed by `npm run build`; both commands must exit 0 apart from already-known non-failing lint warnings.
