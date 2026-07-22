# Atlas Light Concierge and Ribbon Cursor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Concierge a light editorial chapter and add the reference video's elastic coral-head ribbon cursor to the landing hero.

**Architecture:** Preserve the current Concierge correspondence markup and restyle only its route-scoped CSS. Add one isolated `HeroRibbonCursor` canvas component inside the hero; it owns pointer tracking, drawing, responsive canvas sizing, and cleanup without adding dependencies or global state.

**Tech Stack:** React 19, TypeScript, Canvas 2D, route-scoped CSS, Vitest/Testing Library, Playwright.

## Global Constraints

- Keep the ribbon cursor inside `.land-hero` only.
- Enable it only for `(pointer: fine) and (prefers-reduced-motion: no-preference)`.
- Preserve the normal cursor and static hero on touch, coarse-pointer, and reduced-motion devices.
- Keep the existing Concierge letter, dossier, £1,500 CTA, content, and mail link.
- Add no dependency, image asset, global event state, or network request.

---

### Task 1: Hero ribbon cursor

**Files:**
- Create: `components/landing/HeroRibbonCursor.tsx`
- Modify: `components/landing/LandingExperience.tsx`
- Modify: `app/landing/landing.css`
- Create: `tests/landing-cursor.test.tsx`

**Interfaces:**
- Consumes: nearest `.land-hero` parent and fine-pointer/no-reduced-motion media query.
- Produces: an aria-hidden canvas, `data-ribbon-cursor="ready"` on the hero, and a cleaned-up requestAnimationFrame loop.

- [ ] **Step 1: Write the failing behavior test**

Render `HeroRibbonCursor` inside `.land-hero`, mock Canvas 2D and `requestAnimationFrame`, and assert that fine-pointer mode marks the hero ready, pointer movement schedules animation, and unmount cancels the frame and removes the marker.

- [ ] **Step 2: Run the cursor test and verify red**

Run: `npm test -- tests/landing-cursor.test.tsx`

Expected: FAIL because `HeroRibbonCursor` does not exist.

- [ ] **Step 3: Implement the canvas ribbon**

Create a client component that stores twelve spring-following points, draws a tapered smoke-gray trail plus coral circular head, resizes for device pixel ratio, and attaches pointer/resize listeners only while the media query matches.

- [ ] **Step 4: Mount and style the cursor**

Mount `<HeroRibbonCursor />` directly under `.land-hero`; position the canvas over the full hero with `pointer-events: none`, hide it until active, and hide the native cursor only while `data-ribbon-cursor="ready"` is present.

- [ ] **Step 5: Run the cursor test and verify green**

Run: `npm test -- tests/landing-cursor.test.tsx`

Expected: PASS.

### Task 2: Light Concierge palette

**Files:**
- Modify: `app/landing/landing.css`
- Create: `tests/landing-concierge-theme.test.ts`

**Interfaces:**
- Consumes: existing `.land-concierge` correspondence scene.
- Produces: warm off-white chapter background, navy typography, blue thread, lighter artifact shadows, and preserved responsive behavior.

- [ ] **Step 1: Write the failing palette contract**

Read `app/landing/landing.css` and assert that the base `.land-concierge` rule uses `#f2eee5` and navy text instead of the current dark background and white text.

- [ ] **Step 2: Run the palette test and verify red**

Run: `npm test -- tests/landing-concierge-theme.test.ts`

Expected: FAIL because Concierge is still dark.

- [ ] **Step 3: Restyle the existing scene**

Replace the black vignette with a warm paper field, subtle blue registration grid, navy heading, blue italic accent, blue connecting thread, lighter shadows, and accessible muted copy. Keep the lime ticket and dark CTA for continuity.

- [ ] **Step 4: Run focused tests and verify green**

Run: `npm test -- tests/landing-cursor.test.tsx tests/landing-concierge-theme.test.ts tests/landing.test.tsx`

Expected: all focused tests pass.

### Task 3: Browser and production verification

**Files:**
- Modify: `e2e/landing.spec.ts`

**Interfaces:**
- Consumes: hero ribbon readiness marker and light Concierge styling.
- Produces: browser coverage for fine-pointer activation and reduced-motion fallback.

- [ ] **Step 1: Extend Playwright coverage**

Assert that desktop hero gains `data-ribbon-cursor="ready"`, mobile does not require it, and reduced-motion mode does not add it.

- [ ] **Step 2: Run full focused verification**

Run: `npm run typecheck`, `npx eslint components/landing/HeroRibbonCursor.tsx components/landing/LandingExperience.tsx tests/landing-cursor.test.tsx tests/landing-concierge-theme.test.ts e2e/landing.spec.ts`, `npm run build`, and `npx playwright test e2e/landing.spec.ts --workers=1`.

- [ ] **Step 3: Perform visual QA**

Inspect the hero cursor and Concierge at desktop and mobile widths. Confirm the ribbon remains hero-scoped, the native cursor returns outside the hero, Concierge has no dark field, CTA remains at least 44px, no horizontal overflow appears, and the browser console has no errors.

- [ ] **Step 4: Commit**

Commit the implementation and tests with `feat: add light Concierge and hero ribbon cursor`.
