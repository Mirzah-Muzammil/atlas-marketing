# Premium Services Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an illustrated Skiper17 service-card stack directly below the `/premium` hero.

**Architecture:** Extend the installed Skiper17 primitive with optional semantic overlays and responsive/reduced-motion behavior. A focused `PremiumServices` component maps the existing `normalServices` content into the primitive, while `PremiumPage` only composes sections.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS 4, GSAP/ScrollTrigger, Vitest, Testing Library

---

### Task 1: Define the services-section behavior test-first

**Files:**
- Modify: `tests/premium.test.tsx`
- Create: `components/premium/PremiumServices.tsx`
- Modify: `app/premium/page.tsx`

- [ ] Add a test asserting that the services heading follows the hero, all titles and descriptions from `normalServices` render, and every card exposes top-left and bottom-right overlay hooks.
- [ ] Run `npm test -- tests/premium.test.tsx` and confirm failure because the services section is missing.
- [ ] Add the minimal `PremiumServices` composition and wire it below `PremiumHero`.

### Task 2: Install and adapt Skiper17

**Files:**
- Create: `components/ui/skiper-ui/skiper17.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `components/premium/PremiumServices.tsx`

- [ ] Run `pnpm dlx shadcn@latest add @skiper-ui/skiper17` as requested.
- [ ] Adapt `StickyCard002` to accept title and description overlays, scoped ScrollTrigger selectors, cleanup limited to its own trigger, and a non-pinned mobile/reduced-motion fallback.
- [ ] Run the premium component test and confirm it passes.

### Task 3: Add matching illustrated artwork

**Files:**
- Create: `public/images/premium/services/*.png`
- Modify: `components/premium/PremiumServices.tsx`

- [ ] Generate eight text-free editorial illustrations matching the hero palette, one for each existing service.
- [ ] Map the illustrations to service records and verify meaningful alt text.

### Task 4: Verify the finished route

**Files:**
- Verify: `tests/premium.test.tsx`
- Verify: `app/premium/page.tsx`

- [ ] Run `npm test -- tests/premium.test.tsx`.
- [ ] Run `npm run typecheck` and `npm run lint`.
- [ ] Reload `http://localhost:3000/premium` and inspect desktop plus mobile layouts, content placement, console errors, and horizontal overflow.
