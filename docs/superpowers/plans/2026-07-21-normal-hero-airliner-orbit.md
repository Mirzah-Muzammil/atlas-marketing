# Normal Hero Airliner Orbit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the short cartoon airplane movement on “abroad.” with a polished airliner that orbits the stationary hero headline and restores the word.

**Architecture:** Keep the interaction CSS-only and use the existing focusable trigger. Make the `AnimatedTitle` headline the positioning context, place the icon absolutely against that context, and animate percentage-based `left`, `top`, and banking rotation values so the route scales with the title.

**Tech Stack:** React 19, inline SVG, CSS keyframes, Vitest, Testing Library

---

### Task 1: Replace the airplane and flight path

**Files:**
- Modify: `components/sections/hero.tsx`
- Modify: `app/normal/globals.css`
- Modify: `tests/normal-hero-airplane.test.tsx`

- [ ] **Step 1: Write the failing regression assertions**

Extend the existing test to require `data-hero-title-orbit` on the `h1`, a filled aircraft body identified by `data-airliner-body`, an accent path identified by `data-airliner-accent`, and CSS keyframes named `atlas-airliner-orbit` and `atlas-abroad-return`. Assert that the old `atlas-plane-flight` keyframe no longer exists.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/normal-hero-airplane.test.tsx`

Expected: FAIL because the title lacks the orbit context, the current SVG is an outlined cartoon path, and the new keyframes do not exist.

- [ ] **Step 3: Implement the airliner markup**

Add `relative overflow-visible isolate` and `data-hero-title-orbit` to the hero `AnimatedTitle`. Replace the 24px outlined path with a 64px top-view aircraft made from one filled graphite body path and one filled orange accent path. Preserve `aria-hidden`, the focusable trigger, and the readable “abroad.” text.

- [ ] **Step 4: Implement the complete orbit**

Make the trigger position static so its absolutely positioned aircraft uses the headline as its containing block. Add a 2.6-second `atlas-airliner-orbit` sequence that launches from the bottom center, travels clockwise around the headline boundary while banking, returns to the bottom center, and fades away. Add `atlas-abroad-return` so the word hides only during flight and is visible again at 100%. Gate hover animation behind fine-pointer media and retain keyboard focus behavior. Keep the reduced-motion word static and aircraft hidden.

- [ ] **Step 5: Verify GREEN and production readiness**

Run: `npm test -- tests/normal-hero-airplane.test.tsx tests/normal-mobile-experience.test.ts`

Expected: all selected tests pass.

Visually verify the orbit at a desktop viewport and confirm the title bounding box remains unchanged throughout. Then run `npm run typecheck` and `npm run build`; both must exit 0 apart from already-known non-failing lint warnings.
