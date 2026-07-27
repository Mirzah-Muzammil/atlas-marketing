# Landing 3 Services Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved Raycast-matched Atlas services carousel after the readiness section on `/landing-3`.

**Architecture:** A client-side `Landing3ServicesSection` owns static Atlas service data, category selection, rail navigation, and its scoped GSAP entrance/category animation. `Landing3Hero` composes it after `Landing3ReadinessSection`; existing Vitest and Playwright files verify the user-visible contract and responsive geometry.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, GSAP, Lucide React, Vitest, Testing Library, Playwright.

## Global Constraints

- Preserve the approved Atlas copy and four category labels exactly.
- Match the inspected Raycast section's compact heading, glass segmented control, horizontal glowing card rail, partial edge cards, and staggered motion.
- Respect reduced motion and keep animated content accessible.
- Do not touch unrelated Premium files or other landing pages.
- Keep the implementation direct and local to Landing 3.

---

### Task 1: Define the services section behavior

**Files:**
- Modify: `tests/landing-3.test.tsx`
- Modify: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: the `/landing-3` page and Testing Library/Playwright APIs.
- Produces: a failing contract for `[data-landing-3-services]`, category tabs, service cards, carousel controls, section ordering, desktop sizing, and mobile overflow.

- [ ] **Step 1: Write the failing component test**

Add a test that renders the real page and expects the approved level-two heading, four category tabs with Prepare selected, Atlas service cards, and the “Explore every Atlas service” link.

- [ ] **Step 2: Write the failing browser test**

Add a Playwright test that expects the services section after readiness, verifies desktop cards are roughly 300–390px wide, checks category selection changes visible card content, moves the rail with the next button, and confirms no document-level horizontal overflow.

- [ ] **Step 3: Run the focused tests and verify RED**

Run `npm test -- tests/landing-3.test.tsx` and `npx playwright test e2e/landing-3.spec.ts --grep "services carousel" --project=desktop-edge`.

Expected: failures because the services section does not yet exist.

- [ ] **Step 4: Commit the failing contract**

Commit only the focused test changes with `test: define landing 3 services carousel`.

### Task 2: Implement the Atlas services carousel

**Files:**
- Create: `components/landing-3/Landing3ServicesSection.tsx`
- Modify: `components/landing-3/Landing3Hero.tsx`

**Interfaces:**
- Consumes: GSAP, Lucide icons, React state/refs, and the approved static service data.
- Produces: `Landing3ServicesSection`, markers used by focused tests, accessible tabs, semantic service cards, and previous/next rail controls.

- [ ] **Step 1: Implement the minimal component**

Create the client component with the approved heading, tablist, Atlas card data, card rail, CTA, and arrow controls. Use a 1170px heading row, approximately 350×300px desktop cards, edge fades, distinct dark glow tones, and a compact mobile rail.

- [ ] **Step 2: Implement scoped motion**

Use a scoped GSAP context and IntersectionObserver for the one-time staggered entrance. Animate category changes with opacity and vertical translation, render final styles immediately for reduced motion, and clean up animations/observers on unmount.

- [ ] **Step 3: Compose the section**

Import and render `Landing3ServicesSection` immediately after `Landing3ReadinessSection` in `Landing3Hero`.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run `npm test -- tests/landing-3.test.tsx` and `npx playwright test e2e/landing-3.spec.ts --grep "services carousel" --project=desktop-edge`.

Expected: both focused contracts pass.

### Task 3: Validate responsive visual parity

**Files:**
- Modify if needed: `components/landing-3/Landing3ServicesSection.tsx`
- Modify if needed: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: the running `/landing-3` page at desktop and mobile viewport sizes.
- Produces: verified Raycast-like geometry and screenshots without regressions.

- [ ] **Step 1: Run static verification**

Run focused ESLint, `npm run typecheck`, and `npm run build`.

- [ ] **Step 2: Run full Landing 3 browser coverage**

Run `npx playwright test e2e/landing-3.spec.ts` and verify desktop Edge and mobile Edge projects pass.

- [ ] **Step 3: Capture and inspect visuals**

Capture `/landing-3` at 1400×768 and 390×844, scroll the services section into the Raycast-equivalent position, and compare heading, control, cards, clipping, spacing, and mobile behavior against the live reference.

- [ ] **Step 4: Re-run verification after visual refinements**

Repeat focused tests, typecheck, targeted lint, build, and Landing 3 browser tests after any CSS changes.

- [ ] **Step 5: Commit implementation**

Commit the production component, composition, and final browser assertions with `feat: add landing 3 services carousel`.
