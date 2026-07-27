# Landing 3 Title Reveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Copy the Normal page title reveal into a Landing 3-specific component and apply it to the seven primary section headings.

**Architecture:** A focused client component owns IntersectionObserver state and emits a Landing 3-specific data attribute. Shared global CSS contains the copied reveal styles under a Landing 3-specific class; each section swaps only its primary semantic heading wrapper, leaving existing layout and GSAP behavior intact.

**Tech Stack:** React, TypeScript, Tailwind CSS v4, IntersectionObserver, Vitest, Testing Library, Playwright.

## Global Constraints

- Animate exactly seven primary Landing 3 headings.
- Preserve every heading's semantic level, accessible name, children, classes, and existing data attributes.
- Do not animate card, testimonial, FAQ-row, navigation, or footer headings.
- Use a 15% IntersectionObserver threshold.
- Use the Normal reveal values: 22% starting opacity, 12px blur, and a 1.3-second `cubic-bezier(0.22, 1, 0.36, 1)` transition.
- Reduced-motion users see titles immediately without a transition.
- Do not import the Normal page component or stylesheet.

---

### Task 1: Landing 3 animated title component

**Files:**
- Create: `components/landing-3/Landing3AnimatedTitle.tsx`
- Modify: `styles/globals.css`
- Create: `tests/landing-3-title-animation.test.tsx`

**Interfaces:**
- Produces: `Landing3AnimatedTitle({ as?, className?, ...headingProps })` and `[data-landing-3-title-reveal]`.

- [ ] **Step 1: Write failing component tests**

Test that the component renders the requested semantic tag and class, starts pending, becomes visible after an intersecting observer entry, disconnects the observer, and falls back to visible without IntersectionObserver.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/landing-3-title-animation.test.tsx`

Expected: FAIL because `Landing3AnimatedTitle` does not exist.

- [ ] **Step 3: Implement the copied component and scoped CSS**

Copy the Normal component's observer lifecycle with `HeadingTag = "h1" | "h2" | "h3" | "h4" | "p"`, use the class `landing-3-title-reveal`, and emit `data-landing-3-title-reveal="pending|visible"`. Add the copied reveal values and a reduced-motion override to `styles/globals.css`.

- [ ] **Step 4: Verify GREEN**

Run: `npx vitest run tests/landing-3-title-animation.test.tsx`

Expected: all component tests PASS.

### Task 2: Seven primary heading integrations

**Files:**
- Modify: `components/landing-3/Landing3Hero.tsx`
- Modify: `components/landing-3/Landing3DashboardShowcase.tsx`
- Modify: `components/landing-3/Landing3ReadinessSection.tsx`
- Modify: `components/landing-3/Landing3ServicesSection.tsx`
- Modify: `components/landing-3/Landing3EssentialsOrbit.tsx`
- Modify: `components/landing-3/Landing3SupportSection.tsx`
- Modify: `components/landing-3/Landing3FaqSection.tsx`
- Modify: `tests/landing-3.test.tsx`
- Modify: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: `Landing3AnimatedTitle` and `[data-landing-3-title-reveal]` from Task 1.
- Produces: exactly seven reveal-enabled primary headings on `/landing-3`.

- [ ] **Step 1: Write failing integration tests**

Assert that the rendered Landing 3 page has exactly seven `[data-landing-3-title-reveal]` elements and that each expected primary heading is one of them. Add browser assertions that all seven titles settle to `visible` and reduced-motion CSS removes the transition.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/landing-3.test.tsx`

Expected: FAIL because none of the seven headings use the new component.

- [ ] **Step 3: Replace the seven heading wrappers**

Import `Landing3AnimatedTitle` into each section and replace only the primary heading element, passing its existing tag through `as`. Preserve all existing attributes, class names, and children.

- [ ] **Step 4: Verify scoped behavior**

Run: `npx vitest run tests/landing-3-title-animation.test.tsx tests/landing-3-shader.test.tsx tests/landing-3.test.tsx`

Run: `npm run build`

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge`

Expected: all scoped tests and the production build PASS.

- [ ] **Step 5: Inspect the live page**

Restart the production server on port 3000, open `http://localhost:3000/landing-3`, and confirm the seven titles reveal once without changing layout or hiding reduced-motion content.

