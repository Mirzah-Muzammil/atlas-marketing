# Premium Page Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend `/premium` with an accessible navbar, an editorial services experience, and a four-step student journey while preserving the existing hero.

**Architecture:** Keep the route composition in `app/premium/page.tsx`, use focused premium components, and scope all new styling under `.premium-theme` in a route stylesheet. Use CSS sticky positioning and view timelines as progressive enhancement; the content remains readable without JavaScript.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, CSS view timelines, Vitest, Testing Library.

## Global Constraints

- Keep the existing `PremiumHero` markup and crowd animation unchanged.
- Add no dependency.
- Use only `#fffaf2`, `#111827`, muted cream/navy values, and `#f97316` as the saturated accent.
- Avoid generic bento grids, glass panels, gradient text, and excessive rounding.
- Keep changes on `main` and do not stage, commit, or push.

---

### Task 1: Lock the page contract with a failing test

**Files:**
- Modify: `tests/premium.test.tsx`

**Interfaces:**
- Consumes: `PremiumPage` default export.
- Produces: assertions for `[data-premium-nav]`, `[data-premium-services]`, and `[data-premium-journey]`.

- [x] Add assertions for the navigation anchors, eight service labels, four flagship service chapters, the ordered Match/Apply/Prepare/Arrive steps, and the final email CTA.
- [x] Run `npm test -- tests/premium.test.tsx`.
- [x] Confirm failure is caused by the missing navbar and new sections.

### Task 2: Implement the route composition and components

**Files:**
- Create: `components/premium/PremiumNav.tsx`
- Modify: `components/premium/PremiumServices.tsx`
- Create: `components/premium/PremiumJourney.tsx`
- Modify: `app/premium/page.tsx`

**Interfaces:**
- `PremiumNav(): JSX.Element` produces anchor navigation to `#premium-services` and `#premium-journey`.
- `PremiumServices(): JSX.Element` consumes `normalServices` and existing premium images.
- `PremiumJourney(): JSX.Element` produces four ordered journey articles and the early-access CTA.

- [x] Implement semantic server-rendered markup with stable data attributes required by the test.
- [x] Remove the unrelated editorial trust section from `/premium`.
- [x] Import the route stylesheet and wrap the page in `.premium-theme`.

### Task 3: Add the route-scoped art direction and motion

**Files:**
- Create: `app/premium/globals.css`

**Interfaces:**
- Consumes the class names emitted by the premium components.
- Produces responsive desktop/mobile layouts and reduced-motion fallbacks.

- [x] Style the navbar as a border-led overlay rather than a floating pill.
- [x] Style the services as a navy editorial sequence with a controllable marquee and sticky image stage.
- [x] Style the journey as an off-white route with an orange progress line and alternating steps.
- [x] Use transform/opacity motion only and disable continuous movement for `prefers-reduced-motion`.

### Task 4: Verify behavior and visual quality

**Files:**
- Test: `tests/premium.test.tsx`

**Interfaces:**
- Produces verification evidence only.

- [x] Run `npm test -- tests/premium.test.tsx` and confirm all tests pass.
- [x] Run `npm run typecheck` and confirm exit code 0.
- [x] Load `http://localhost:3000/premium` and verify desktop and mobile screenshots, anchors, readable fallback content, and no new console errors.
- [x] Run `git status --short` and `git diff --cached --quiet`; confirm branch `main` and no staged changes.
