# Landing 2 Text Motion Implementation Plan

**Goal:** Add a reversible word-by-word text reveal and route-scoped Lenis wheel smoothing to `/landing-2`.

**Architecture:** A small route-local `WordReveal` component splits copy into accessible visual word masks. Existing timeline envelopes drive CSS custom properties. The existing shared `LenisProvider` is consumed only by the landing-2 page, while the landing-2 timeline removes its second layer of interpolation.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS custom properties, Lenis 1.3, Vitest, Testing Library, Playwright.

## Constraints

- Modify only landing-2 route files, route-specific components, focused tests/E2E, and route documentation.
- Preserve all copy, links, headings, catalog behavior, canvas assets, and timeline markers.
- Keep native touch scrolling and reduced-motion normal-flow content.
- Do not add a dependency or create a commit.

### Task 1: Define the reveal contract

**Files:**
- Create: `components/landing-2/WordReveal.tsx`
- Modify: `tests/landing-2.test.tsx`

- [x] Add a failing test requiring visual word masks without duplicated accessible text.
- [x] Implement a semantic `WordReveal` component with configurable element, class, and timing band.
- [x] Confirm headings and paragraphs retain their original accessible names.

### Task 2: Choreograph the route copy

**Files:**
- Modify: `components/landing-2/CinematicLanding.tsx`
- Modify: `components/landing-2/timeline.ts`
- Modify: `components/landing-2/useCinematicTimeline.ts`
- Modify: `app/landing-2/landing-2.css`
- Modify: `tests/landing-2-timeline.test.ts`

- [x] Add failing assertions for reversible text reveal progress at each narrative beat.
- [x] Expose intro, panel A, panel B, and catalog reveal progress as CSS variables.
- [x] Wrap relevant copy in route-local word masks and remove large parent translations.
- [x] Add word opacity, rise, and blur interpolation with sequential hierarchy timing.
- [x] Disable all word motion in reduced-motion mode.

### Task 3: Add route-scoped Lenis

**Files:**
- Modify: `app/landing-2/page.tsx`
- Modify: `components/landing-2/useCinematicTimeline.ts`
- Modify: `tests/landing-2.test.tsx`

- [x] Add a failing test requiring the route to mount the existing Lenis provider with tuned options.
- [x] Wrap only `/landing-2` in `LenisProvider`.
- [x] Remove landing-2 playhead interpolation so Lenis is the only wheel smoother.
- [x] Preserve native touch, reduced-motion, local marker jumps, and reversible frame mapping.

### Task 4: Verify

**Files:**
- Modify if required: `e2e/landing-2.spec.ts`
- Modify: `app/landing-2/README.md`
- Modify: `app/landing-2/TIMELINE.md`

- [x] Run landing-2 unit tests, typecheck, scoped lint, and production build.
- [x] Run landing-2 Playwright tests for desktop and mobile.
- [x] Inspect the eight timeline checkpoints and reverse scroll.
- [x] Verify keyboard navigation, reduced motion, console output, and horizontal overflow.
- [x] Record the final behavior and verification results.
