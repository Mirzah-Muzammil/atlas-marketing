# Landing 3 University Marquee and Message Bubbles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Match the supplied iMessage bubble reference and add a three-row, alternating UK university logo marquee after readiness.

**Architecture:** Keep support testimonials in their existing section but separate identity and message-bubble layers. Add one self-contained marquee client component backed by a static university manifest and local assets; CSS animations handle seamless alternating motion and hover pause without runtime data fetching.

**Tech Stack:** React, TypeScript, Tailwind CSS v4, CSS keyframes, Next.js Image, Vitest, Testing Library, Playwright.

## Global Constraints

- Preserve all existing testimonial names and review copy.
- Message bubbles use charcoal gray, light text, wide pill radii, and curved lower-left tails.
- The university section renders immediately after `Landing3ReadinessSection`.
- Use the current Universities UK membership set.
- Render exactly three marquee rows with directions left, right, left.
- Store university assets locally and keep their official domains in a source manifest.
- Hover/focus pauses the relevant row and lifts, enlarges, recolors, and glows the tile.
- Reduced-motion mode stops movement and preserves horizontal access.
- Do not add a package dependency.

---

### Task 1: Reference-style testimonial messages

**Files:**
- Modify: `components/landing-3/Landing3SupportSection.tsx`
- Modify: `tests/landing-3.test.tsx`
- Modify: `e2e/landing-3.spec.ts`

- [ ] **Step 1: Write failing structure tests**

Assert five `[data-support-message]` charcoal bubbles, five `[data-support-tail]` curved two-part tails, and five separate `[data-support-identity]` rows.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/landing-3.test.tsx`

- [ ] **Step 3: Implement minimal message redesign**

Remove testimonial-specific gradients, reduce rotations and overlap, render the avatar/name above a charcoal message bubble, and build each tail from two rounded decorative spans. Keep the existing hover/focus expansion and semantic `blockquote` wrapper.

- [ ] **Step 4: Verify GREEN**

Run: `npx vitest run tests/landing-3.test.tsx`

### Task 2: University source manifest and local marks

**Files:**
- Create: `components/landing-3/universities.ts`
- Create: `public/images/landing-3/universities/*`
- Create: `tests/landing-3-universities.test.ts`

- [ ] **Step 1: Write failing manifest tests**

Assert that the manifest contains the current Universities UK member count, has unique names and domains, uses official HTTPS website URLs, and points only to local university image paths.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/landing-3-universities.test.ts`

- [ ] **Step 3: Build the manifest and retrieve assets**

Collect member names from Universities UK, associate each with its official university domain, retrieve its official mark or official-site icon, store it locally, and record `name`, `domain`, `href`, and `logo` in the manifest.

- [ ] **Step 4: Verify GREEN**

Run: `npx vitest run tests/landing-3-universities.test.ts`

### Task 3: Three-row alternating marquee

**Files:**
- Create: `components/landing-3/Landing3UniversityMarquee.tsx`
- Modify: `components/landing-3/Landing3Hero.tsx`
- Modify: `styles/globals.css`
- Modify: `tests/landing-3.test.tsx`
- Modify: `e2e/landing-3.spec.ts`

- [ ] **Step 1: Write failing integration tests**

Assert section order, exactly three row directions `left`, `right`, `left`, one accessible copy per university, one hidden duplicate per row, and local logo images.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/landing-3.test.tsx`

- [ ] **Step 3: Implement the marquee**

Split the manifest into three rows, duplicate each row for looping, add alternating CSS keyframes and durations, pause a row with `:has()` when a tile is hovered or focused, and add reduced-motion horizontal scrolling.

- [ ] **Step 4: Run scoped verification**

Run: `npx vitest run tests/landing-3-universities.test.ts tests/landing-3-title-animation.test.tsx tests/landing-3-shader.test.tsx tests/landing-3.test.tsx`

Run: `npm run build`

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge`

- [ ] **Step 5: Live visual verification**

Restart port 3000, inspect the message-tail silhouette and all three marquee rows at desktop and mobile widths, and verify the route responds successfully without horizontal page overflow.

